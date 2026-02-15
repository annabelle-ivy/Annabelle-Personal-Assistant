import type { Config } from '../config.js';
import type { CostStatus } from '../cost/types.js';
import type { IncomingMessage, ProcessingResult } from './types.js';
/**
 * Agent that processes messages using ReAct pattern
 */
export declare class Agent {
    private config;
    private orchestrator;
    private modelFactory;
    private tools;
    private conversationStates;
    private currentTrace;
    private currentChatId;
    private logger;
    private playbookCache;
    private customSystemPrompt;
    private personaPrompt;
    private defaultSystemPrompt;
    private lastApiCallTime;
    private minApiCallIntervalMs;
    private consecutiveErrors;
    private maxConsecutiveErrors;
    private circuitBreakerTripped;
    private costMonitor;
    private sessionStore;
    private embeddingSelector;
    private extractionTimers;
    constructor(config: Config);
    /**
     * Initialize the agent - discover tools, etc.
     */
    initialize(): Promise<void>;
    /**
     * Re-discover tools from Orchestrator and re-initialize the embedding selector
     * when the tool set changes. Uses getCachedToolsOrRefresh() which has a 10-min
     * TTL, so this is a no-op on most calls.
     */
    private refreshToolsIfNeeded;
    /**
     * Get or create conversation state for a chat.
     * On cache miss, attempts to load from disk (session JSONL file).
     */
    private getConversationState;
    /**
     * Select relevant history messages using embedding similarity.
     * Always includes the last 3 exchanges (6 messages) for recency.
     * Older messages are scored by cosine similarity to the current message
     * and included if above threshold. Cap total at 20 messages.
     */
    private selectRelevantHistory;
    /**
     * Build context for agent processing
     */
    private buildContext;
    /**
     * Process a single message
     */
    processMessage(message: IncomingMessage): Promise<ProcessingResult>;
    /**
     * Process a proactive task (skill execution) — no Telegram context
     * Called by the /execute-skill HTTP endpoint when Inngest fires a skill
     */
    processProactiveTask(taskInstructions: string, maxSteps?: number, noTools?: boolean, requiredTools?: string[], skillName?: string, chatId?: string): Promise<ProcessingResult & {
        summary: string;
    }>;
    /**
     * Schedule fact extraction for a chat after idle timeout.
     * Resets the timer on each new message so extraction only runs
     * after the conversation goes quiet.
     */
    private scheduleFactExtraction;
    /**
     * Run post-conversation fact extraction for a chat.
     * Reviews recent turns with awareness of existing facts to catch
     * information the LLM didn't store during task-focused exchanges.
     */
    private runFactExtraction;
    /**
     * Clean up old conversation states
     */
    cleanupOldConversations(maxAgeMs?: number): void;
    /**
     * Clear a session entirely — deletes JSONL file, clears in-memory state,
     * and cancels any pending fact extraction timer.
     */
    clearSession(chatId: string): Promise<void>;
    /**
     * Clean up session JSONL files older than the configured max age.
     */
    cleanupOldSessions(): Promise<void>;
    /**
     * Get current cost monitor status (for /cost-status endpoint).
     */
    getCostStatus(): CostStatus | null;
    /**
     * Get embedding selector status (for /health endpoint).
     */
    getEmbeddingSelectorStatus(): {
        enabled: boolean;
        initialized: boolean;
        toolCount: number;
        lastSelection: {
            method: string;
            selectedCount: number;
            totalTools: number;
            topScore: number;
        } | null;
    };
    /**
     * Check if Orchestrator is reachable (for deep health checks).
     */
    checkOrchestratorHealth(): Promise<boolean>;
    /**
     * Resume from a cost-control pause (for /cost-resume endpoint).
     */
    resumeFromCostPause(resetWindow?: boolean): {
        success: boolean;
        message: string;
    };
}
//# sourceMappingURL=loop.d.ts.map