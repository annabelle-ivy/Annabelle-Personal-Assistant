import { appendFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
/**
 * Resolve path with home directory expansion
 */
function resolvePath(path) {
    if (path.startsWith('~')) {
        return path.replace('~', homedir());
    }
    return path;
}
/**
 * Trace logger for centralized request tracing
 */
export class TraceLogger {
    logPath;
    initialized = false;
    constructor(logPath = '~/.annabelle/logs/traces.jsonl') {
        this.logPath = resolvePath(logPath);
    }
    /**
     * Ensure the log directory exists
     */
    async ensureDir() {
        if (this.initialized)
            return;
        const dir = dirname(this.logPath);
        if (!existsSync(dir)) {
            await mkdir(dir, { recursive: true });
        }
        this.initialized = true;
    }
    /**
     * Log a trace event
     */
    async log(ctx, event, data = {}) {
        await this.ensureDir();
        const entry = {
            trace_id: ctx.traceId,
            ts: new Date().toISOString(),
            mcp: ctx.mcp,
            event,
            data,
        };
        const line = JSON.stringify(entry) + '\n';
        await appendFile(this.logPath, line, 'utf-8');
    }
    /**
     * Log message received event
     */
    async logMessageReceived(ctx, chatId, text) {
        await this.log(ctx, 'message_received', {
            chat_id: chatId,
            text: text.substring(0, 100), // Truncate for privacy
        });
    }
    /**
     * Log context loaded event
     */
    async logContextLoaded(ctx, factsCount, hasProfile) {
        await this.log(ctx, 'context_loaded', {
            facts: factsCount,
            profile: hasProfile,
        });
    }
    /**
     * Log LLM call start
     */
    async logLLMCallStart(ctx, provider, model) {
        await this.log(ctx, 'llm_call_start', {
            provider,
            model,
        });
    }
    /**
     * Log LLM call complete
     */
    async logLLMCallComplete(ctx, provider, model, inputTokens, outputTokens, durationMs) {
        await this.log(ctx, 'llm_call_complete', {
            provider,
            model,
            input_tokens: inputTokens,
            output_tokens: outputTokens,
            duration_ms: durationMs,
        });
    }
    /**
     * Log tool call start
     */
    async logToolCallStart(ctx, toolName, args) {
        await this.log(ctx, 'tool_call_start', {
            tool: toolName,
            args,
        });
    }
    /**
     * Log tool call complete
     */
    async logToolCallComplete(ctx, toolName, success, durationMs) {
        await this.log(ctx, 'tool_call_complete', {
            tool: toolName,
            success,
            duration_ms: durationMs,
        });
    }
    /**
     * Log tool call error
     */
    async logToolCallError(ctx, toolName, error) {
        await this.log(ctx, 'tool_call_error', {
            tool: toolName,
            error,
        });
    }
    /**
     * Log response sent
     */
    async logResponseSent(ctx, chatId, responseLength) {
        await this.log(ctx, 'response_sent', {
            chat_id: chatId,
            response_length: responseLength,
        });
    }
    /**
     * Log error
     */
    async logError(ctx, error, details) {
        await this.log(ctx, 'error', {
            error,
            ...details,
        });
    }
    /**
     * Log trace complete
     */
    async logComplete(ctx, toolsUsed, totalSteps) {
        const durationMs = Date.now() - ctx.startedAt;
        await this.log(ctx, 'complete', {
            duration_ms: durationMs,
            tools_used: toolsUsed,
            total_steps: totalSteps,
        });
    }
    /**
     * Get the log file path
     */
    getPath() {
        return this.logPath;
    }
}
// Singleton instance
let traceLogger = null;
/**
 * Get or create the trace logger singleton
 */
export function getTraceLogger(logPath) {
    if (!traceLogger) {
        traceLogger = new TraceLogger(logPath);
    }
    return traceLogger;
}
//# sourceMappingURL=logger.js.map