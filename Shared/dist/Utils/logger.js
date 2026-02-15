/**
 * Shared logger for MCP services
 * Uses console.error for ALL log levels to keep stdout clean for MCP JSON-RPC protocol
 */
const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
const VALID_LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
function isValidLogLevel(value) {
    return value !== undefined && VALID_LOG_LEVELS.includes(value);
}
/**
 * JSON replacer that serializes Error objects (whose properties are non-enumerable).
 */
function errorReplacer(_key, value) {
    if (value instanceof Error) {
        const obj = { message: value.message, name: value.name };
        if (value.stack)
            obj.stack = value.stack;
        if ('code' in value)
            obj.code = value.code;
        return obj;
    }
    return value;
}
export class Logger {
    level;
    context;
    constructor(context = 'mcp') {
        this.context = context;
        const envLevel = process.env.LOG_LEVEL;
        this.level = isValidLogLevel(envLevel) ? envLevel : 'info';
    }
    shouldLog(level) {
        return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
    }
    formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const base = `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
        if (data !== undefined) {
            return `${base} ${JSON.stringify(data, errorReplacer)}`;
        }
        return base;
    }
    debug(message, data) {
        if (this.shouldLog('debug')) {
            console.error(this.formatMessage('debug', message, data));
        }
    }
    info(message, data) {
        if (this.shouldLog('info')) {
            console.error(this.formatMessage('info', message, data));
        }
    }
    warn(message, data) {
        if (this.shouldLog('warn')) {
            console.error(this.formatMessage('warn', message, data));
        }
    }
    error(message, data) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message, data));
        }
    }
    /**
     * Create a child logger with additional context
     */
    child(context) {
        const child = new Logger(`${this.context}:${context}`);
        child.level = this.level;
        return child;
    }
    /**
     * Set the context prefix (e.g. service name) for this logger and future children.
     * Call early at startup so child loggers inherit the correct prefix.
     */
    setContext(context) {
        this.context = context;
    }
    /**
     * Set the log level dynamically
     */
    setLevel(level) {
        this.level = level;
    }
    /**
     * Get the current log level
     */
    getLevel() {
        return this.level;
    }
}
/** Default logger instance */
export const logger = new Logger();
//# sourceMappingURL=logger.js.map