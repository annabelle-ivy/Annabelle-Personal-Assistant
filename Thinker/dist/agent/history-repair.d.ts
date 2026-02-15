import type { CoreMessage } from 'ai';
/**
 * Truncates old tool results in conversation history to reduce token usage.
 *
 * Keeps the most recent `preserveLastN` tool-result messages intact,
 * and replaces older tool results with a one-line summary.
 * Does not mutate the input array.
 */
export declare function truncateHistoryToolResults(messages: CoreMessage[], preserveLastN?: number): CoreMessage[];
/**
 * Repairs conversation history to ensure valid tool-call/tool-result pairing.
 *
 * Fixes three categories of damage:
 * 1. Leading orphan tool results (no preceding assistant tool-call) — removed
 * 2. Missing tool results (assistant has tool-calls, no tool result follows) — synthetic result inserted
 * 3. Orphaned tool results (tool-result with no matching preceding call) — removed
 *
 * Does not mutate the input array.
 */
export declare function repairConversationHistory(messages: CoreMessage[]): CoreMessage[];
//# sourceMappingURL=history-repair.d.ts.map