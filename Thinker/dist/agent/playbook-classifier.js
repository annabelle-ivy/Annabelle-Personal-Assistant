/**
 * PlaybookClassifier - Lightweight keyword matching to map user messages to domain playbooks.
 * Pure functions, no I/O, no dependencies on the agent loop.
 */
/** Escape special regex characters so a string can be used literally in a RegExp. */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/**
 * Test whether a keyword matches in a message using word-boundary regex.
 * Falls back to simple substring matching if the keyword starts/ends with
 * non-word characters (where \b cannot anchor) or if regex construction fails.
 */
function matchesKeyword(lowerMessage, keyword) {
    if (!/^\w/.test(keyword) || !/\w$/.test(keyword)) {
        return lowerMessage.includes(keyword);
    }
    try {
        const pattern = new RegExp('\\b' + escapeRegex(keyword) + '\\b', 'i');
        return pattern.test(lowerMessage);
    }
    catch {
        return lowerMessage.includes(keyword);
    }
}
/**
 * Classify a user message against cached playbooks using word-boundary keyword matching.
 * Returns matching playbooks sorted by priority (highest first).
 * Multiple playbooks can match a single message.
 */
export function classifyMessage(message, playbooks) {
    if (!message || playbooks.length === 0)
        return [];
    const lower = message.toLowerCase();
    const matched = [];
    for (const pb of playbooks) {
        if (pb.keywords.some((kw) => matchesKeyword(lower, kw))) {
            matched.push(pb);
        }
    }
    return matched.sort((a, b) => b.priority - a.priority);
}
/**
 * Parse a Memorizer skill record into a CachedPlaybook.
 * Returns null if the skill doesn't have valid playbook trigger_config.
 */
export function parseSkillToPlaybook(skill) {
    const id = skill.id;
    const name = skill.name;
    const instructions = skill.instructions;
    if (!id || !name || !instructions)
        return null;
    const triggerConfig = skill.trigger_config;
    const keywords = triggerConfig?.keywords ?? [];
    if (keywords.length === 0)
        return null;
    return {
        id,
        name,
        description: skill.description ?? null,
        instructions,
        keywords: keywords.map((k) => k.toLowerCase()),
        priority: triggerConfig?.priority ?? 0,
        requiredTools: skill.required_tools ?? [],
        source: 'database',
    };
}
//# sourceMappingURL=playbook-classifier.js.map