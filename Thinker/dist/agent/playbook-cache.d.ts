/**
 * PlaybookCache - In-memory cache of playbooks from two sources:
 * 1. Database playbooks from Memorizer (refreshed periodically)
 * 2. File-based skills from ~/.annabelle/skills/ (loaded at startup)
 */
import type { OrchestratorClient } from '../orchestrator/client.js';
import type { TraceContext } from '../tracing/types.js';
import { type CachedPlaybook } from './playbook-classifier.js';
export declare class PlaybookCache {
    private playbooks;
    private fileSkills;
    private lastRefresh;
    private orchestrator;
    private agentId;
    private skillLoader;
    constructor(orchestrator: OrchestratorClient, agentId: string, skillsDir?: string);
    /**
     * Load file-based skills and database playbooks.
     */
    initialize(trace?: TraceContext): Promise<void>;
    /**
     * Refresh the cache if it's stale (older than 5 minutes).
     */
    refreshIfNeeded(trace?: TraceContext): Promise<void>;
    /**
     * Force the next `refreshIfNeeded` call to reload.
     */
    invalidate(): void;
    /**
     * Get the current cached playbooks (database + file-based merged).
     */
    getPlaybooks(): CachedPlaybook[];
    /**
     * Get file-based skills that have no keywords (description-only).
     * These are injected as an <available_skills> block for progressive disclosure.
     */
    getDescriptionOnlySkills(): CachedPlaybook[];
    private refresh;
    /**
     * Sync file-based skills that have trigger_config to Memorizer.
     * This enables scheduling for SKILL.md files that declare a schedule.
     * Upserts by name — if a DB skill with the same name exists, skip.
     */
    private syncScheduledFileSkills;
}
//# sourceMappingURL=playbook-cache.d.ts.map