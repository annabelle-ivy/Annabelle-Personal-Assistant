/**
 * PlaybookClassifier - Lightweight keyword matching to map user messages to domain playbooks.
 * Pure functions, no I/O, no dependencies on the agent loop.
 */
export interface CachedPlaybook {
    id: number;
    name: string;
    description: string | null;
    instructions: string;
    keywords: string[];
    priority: number;
    requiredTools: string[];
    /** Where this playbook came from: 'database' (Memorizer) or 'file' (~/.annabelle/skills/) */
    source: 'database' | 'file';
    /** Optional scheduling config for file-based skills with trigger_config in frontmatter */
    triggerConfig?: Record<string, unknown>;
    /** Max LLM steps for agent-tier execution */
    maxSteps?: number;
    /** Compiled execution plan for direct-tier execution */
    executionPlan?: Array<{
        id: string;
        toolName: string;
        parameters?: Record<string, unknown>;
    }>;
}
/**
 * Classify a user message against cached playbooks using word-boundary keyword matching.
 * Returns matching playbooks sorted by priority (highest first).
 * Multiple playbooks can match a single message.
 */
export declare function classifyMessage(message: string, playbooks: CachedPlaybook[]): CachedPlaybook[];
/**
 * Parse a Memorizer skill record into a CachedPlaybook.
 * Returns null if the skill doesn't have valid playbook trigger_config.
 */
export declare function parseSkillToPlaybook(skill: Record<string, unknown>): CachedPlaybook | null;
//# sourceMappingURL=playbook-classifier.d.ts.map