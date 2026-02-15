import type { TraceContext, TraceEvent } from './types.js';
/**
 * Trace logger for centralized request tracing
 */
export declare class TraceLogger {
    private logPath;
    private initialized;
    constructor(logPath?: string);
    /**
     * Ensure the log directory exists
     */
    private ensureDir;
    /**
     * Log a trace event
     */
    log(ctx: TraceContext, event: TraceEvent | string, data?: Record<string, unknown>): Promise<void>;
    /**
     * Log message received event
     */
    logMessageReceived(ctx: TraceContext, chatId: string, text: string): Promise<void>;
    /**
     * Log context loaded event
     */
    logContextLoaded(ctx: TraceContext, factsCount: number, hasProfile: boolean): Promise<void>;
    /**
     * Log LLM call start
     */
    logLLMCallStart(ctx: TraceContext, provider: string, model: string): Promise<void>;
    /**
     * Log LLM call complete
     */
    logLLMCallComplete(ctx: TraceContext, provider: string, model: string, inputTokens: number, outputTokens: number, durationMs: number): Promise<void>;
    /**
     * Log tool call start
     */
    logToolCallStart(ctx: TraceContext, toolName: string, args: Record<string, unknown>): Promise<void>;
    /**
     * Log tool call complete
     */
    logToolCallComplete(ctx: TraceContext, toolName: string, success: boolean, durationMs: number): Promise<void>;
    /**
     * Log tool call error
     */
    logToolCallError(ctx: TraceContext, toolName: string, error: string): Promise<void>;
    /**
     * Log response sent
     */
    logResponseSent(ctx: TraceContext, chatId: string, responseLength: number): Promise<void>;
    /**
     * Log error
     */
    logError(ctx: TraceContext, error: string, details?: Record<string, unknown>): Promise<void>;
    /**
     * Log trace complete
     */
    logComplete(ctx: TraceContext, toolsUsed: string[], totalSteps: number): Promise<void>;
    /**
     * Get the log file path
     */
    getPath(): string;
}
/**
 * Get or create the trace logger singleton
 */
export declare function getTraceLogger(logPath?: string): TraceLogger;
//# sourceMappingURL=logger.d.ts.map