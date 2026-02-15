/**
 * Shared logger for MCP services
 * Uses console.error for ALL log levels to keep stdout clean for MCP JSON-RPC protocol
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export declare class Logger {
    private level;
    private context;
    constructor(context?: string);
    private shouldLog;
    private formatMessage;
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
    /**
     * Create a child logger with additional context
     */
    child(context: string): Logger;
    /**
     * Set the context prefix (e.g. service name) for this logger and future children.
     * Call early at startup so child loggers inherit the correct prefix.
     */
    setContext(context: string): void;
    /**
     * Set the log level dynamically
     */
    setLevel(level: LogLevel): void;
    /**
     * Get the current log level
     */
    getLevel(): LogLevel;
}
/** Default logger instance */
export declare const logger: Logger;
//# sourceMappingURL=logger.d.ts.map