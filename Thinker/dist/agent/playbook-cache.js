/**
 * PlaybookCache - In-memory cache of playbooks from two sources:
 * 1. Database playbooks from Memorizer (refreshed periodically)
 * 2. File-based skills from ~/.annabelle/skills/ (loaded at startup)
 */
import { parseSkillToPlaybook } from './playbook-classifier.js';
import { SkillLoader } from './skill-loader.js';
import { Logger } from '@mcp/shared/Utils/logger.js';
const logger = new Logger('thinker:playbooks');
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
export class PlaybookCache {
    playbooks = [];
    fileSkills = [];
    lastRefresh = 0;
    orchestrator;
    agentId;
    skillLoader = null;
    constructor(orchestrator, agentId, skillsDir) {
        this.orchestrator = orchestrator;
        this.agentId = agentId;
        if (skillsDir) {
            this.skillLoader = new SkillLoader(skillsDir);
        }
    }
    /**
     * Load file-based skills and database playbooks.
     */
    async initialize(trace) {
        // Load file-based skills once at startup
        if (this.skillLoader) {
            try {
                this.fileSkills = await this.skillLoader.scan();
                if (this.fileSkills.length > 0) {
                    logger.info(`Loaded ${this.fileSkills.length} file-based skill(s) from disk`);
                }
                // Sync file skills that have trigger_config to Memorizer (for scheduling)
                await this.syncScheduledFileSkills();
            }
            catch (error) {
                logger.warn('Failed to load file-based skills (non-fatal)', error);
            }
        }
        // Load database playbooks
        await this.refresh(trace);
    }
    /**
     * Refresh the cache if it's stale (older than 5 minutes).
     */
    async refreshIfNeeded(trace) {
        if (Date.now() - this.lastRefresh > REFRESH_INTERVAL_MS) {
            await this.refresh(trace);
        }
    }
    /**
     * Force the next `refreshIfNeeded` call to reload.
     */
    invalidate() {
        this.lastRefresh = 0;
    }
    /**
     * Get the current cached playbooks (database + file-based merged).
     */
    getPlaybooks() {
        return this.playbooks;
    }
    /**
     * Get file-based skills that have no keywords (description-only).
     * These are injected as an <available_skills> block for progressive disclosure.
     */
    getDescriptionOnlySkills() {
        return this.fileSkills.filter((s) => s.keywords.length === 0);
    }
    async refresh(trace) {
        // Re-scan file skills on refresh (picks up new/changed SKILL.md files)
        if (this.skillLoader) {
            try {
                const newFileSkills = await this.skillLoader.scan();
                if (newFileSkills.length !== this.fileSkills.length) {
                    logger.info(`File skills changed: ${this.fileSkills.length} → ${newFileSkills.length}`);
                    this.fileSkills = newFileSkills;
                    await this.syncScheduledFileSkills();
                }
                else {
                    this.fileSkills = newFileSkills;
                }
            }
            catch (error) {
                logger.warn('Failed to re-scan file-based skills', error);
            }
        }
        try {
            const { skills } = await this.orchestrator.listSkills(this.agentId, 'event', true, trace);
            const dbPlaybooks = [];
            for (const skill of skills) {
                const pb = parseSkillToPlaybook(skill);
                if (pb)
                    dbPlaybooks.push(pb);
            }
            // Merge: database playbooks + file-based skills
            this.playbooks = [...dbPlaybooks, ...this.fileSkills];
            this.lastRefresh = Date.now();
        }
        catch (error) {
            // Keep stale cache on failure — better than no playbooks
            logger.error('Failed to refresh playbook cache', error);
        }
    }
    /**
     * Sync file-based skills that have trigger_config to Memorizer.
     * This enables scheduling for SKILL.md files that declare a schedule.
     * Upserts by name — if a DB skill with the same name exists, skip.
     */
    async syncScheduledFileSkills() {
        const scheduledSkills = this.fileSkills.filter(s => s.triggerConfig);
        if (scheduledSkills.length === 0)
            return;
        // Get existing DB skills to avoid duplicates
        let existingNames;
        try {
            const { skills } = await this.orchestrator.listSkills(this.agentId, 'cron');
            existingNames = new Set(skills.map(s => s.name).filter(Boolean));
        }
        catch {
            logger.warn('Cannot list existing skills for sync — skipping');
            return;
        }
        for (const skill of scheduledSkills) {
            if (existingNames.has(skill.name)) {
                continue; // Already exists in DB — don't duplicate
            }
            try {
                const args = {
                    agent_id: this.agentId,
                    name: skill.name,
                    description: skill.description || skill.name,
                    trigger_type: 'cron',
                    trigger_config: skill.triggerConfig,
                    instructions: skill.instructions,
                    required_tools: skill.requiredTools,
                    max_steps: skill.maxSteps || 10,
                };
                if (skill.executionPlan) {
                    args.execution_plan = skill.executionPlan;
                }
                const response = await this.orchestrator.executeTool('memory_store_skill', args);
                if (response.success) {
                    logger.info(`Auto-synced file skill to Memorizer: ${skill.name}`);
                }
                else {
                    logger.warn(`Failed to sync file skill ${skill.name}: ${response.error}`);
                }
            }
            catch (error) {
                logger.warn(`Failed to sync file skill ${skill.name}`, error);
            }
        }
    }
}
//# sourceMappingURL=playbook-cache.js.map