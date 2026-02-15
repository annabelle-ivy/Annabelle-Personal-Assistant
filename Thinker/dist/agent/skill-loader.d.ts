/**
 * SkillLoader - Scans ~/.annabelle/skills/ for agentskills.io-compatible SKILL.md files.
 * Parses YAML frontmatter + markdown body, maps to CachedPlaybook for classifier.
 *
 * Compatible with the Agent Skills specification (https://agentskills.io/specification).
 * Annabelle-specific extensions (keywords, priority, required_tools) go in the
 * standard `metadata` block, which the spec reserves for arbitrary key-value pairs.
 */
import type { CachedPlaybook } from './playbook-classifier.js';
export declare class SkillLoader {
    private skillsDir;
    constructor(skillsDir: string);
    /**
     * Scan skillsDir for directories containing SKILL.md.
     * Returns parsed skills mapped to CachedPlaybook format.
     */
    scan(): Promise<CachedPlaybook[]>;
    /**
     * Parse a single SKILL.md file into a CachedPlaybook.
     * Returns null if the file doesn't exist or has invalid format.
     */
    private parseSkillFile;
}
//# sourceMappingURL=skill-loader.d.ts.map