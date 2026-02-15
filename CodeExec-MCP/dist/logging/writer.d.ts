/**
 * JSONL log writers.
 *
 * - logExecution(): daily rotation for one-shot executions
 * - logSessionEvent(): per-session JSONL files for session lifecycle
 */
import type { ExecutionLogEntry, SessionLogEntry } from './types.js';
/**
 * Append an execution log entry to the daily JSONL file.
 */
export declare function logExecution(entry: ExecutionLogEntry): Promise<void>;
/**
 * Append a session lifecycle event to the per-session JSONL file.
 */
export declare function logSessionEvent(entry: SessionLogEntry): Promise<void>;
//# sourceMappingURL=writer.d.ts.map