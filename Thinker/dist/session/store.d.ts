/**
 * SessionStore — JSONL-based session persistence for Thinker conversations
 *
 * Each conversation (chatId) gets its own JSONL file at:
 *   ~/.annabelle/sessions/<agentId>/<chatId>.jsonl
 *
 * Files are append-only during normal operation. Compaction rewrites the file
 * atomically (write to temp + rename) when the conversation exceeds the
 * configured token threshold.
 */
import { type LanguageModelV1, type CoreMessage } from 'ai';
import type { SessionConfig, LoadedSession } from './types.js';
export declare class SessionStore {
    private sessionsDir;
    private agentId;
    private config;
    private dirEnsured;
    /** Track estimated character count per chatId (for shouldCompact checks) */
    private charCounts;
    /** Track turn counts per chatId */
    private turnCounts;
    /** Track last compaction time per chatId */
    private lastCompactionTimes;
    constructor(sessionsDir: string, agentId: string, config: SessionConfig);
    /**
     * Get the file path for a session
     */
    private getSessionPath;
    /**
     * Ensure the sessions directory exists
     */
    private ensureDir;
    /**
     * Append a single JSONL line to a session file
     */
    private appendEntry;
    /**
     * Load a session from disk. Returns null if no file exists.
     */
    loadSession(chatId: string, stickyLookback?: number): Promise<LoadedSession | null>;
    /**
     * Save a conversation turn to the session JSONL file.
     * Creates the file with a header if it doesn't exist.
     */
    saveTurn(chatId: string, userText: string, assistantText: string, toolsUsed: string[], tokens: {
        prompt: number;
        completion: number;
    }, structuredMessages?: CoreMessage[]): Promise<void>;
    /**
     * Check if a session needs compaction based on estimated token count,
     * minimum turn count, and cooldown period.
     */
    shouldCompact(chatId: string): boolean;
    /**
     * Compact a session by summarizing older turns and rewriting the JSONL file.
     *
     * Keeps the most recent K turns intact, sends older turns to the LLM for
     * summarization, and rewrites the file atomically (temp + rename).
     */
    compact(chatId: string, messages: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>, compactionModel: LanguageModelV1): Promise<{
        messages: Array<{
            role: 'user' | 'assistant';
            content: string;
        }>;
        summary: string;
    }>;
    /**
     * Clear a session entirely — deletes the JSONL file and resets tracking maps.
     * The session file will be recreated on the next message.
     */
    clearSession(chatId: string): Promise<void>;
    /**
     * Delete session files older than maxAgeDays.
     * Returns the number of sessions cleaned up.
     */
    cleanupOldSessions(maxAgeDays?: number): Promise<number>;
}
//# sourceMappingURL=store.d.ts.map