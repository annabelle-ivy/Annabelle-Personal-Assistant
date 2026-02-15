/**
 * Base error class for all MCP services
 * Provides a consistent error pattern with code and details
 */
export declare class BaseError extends Error {
    code: string;
    details?: unknown | undefined;
    constructor(message: string, code: string, details?: unknown | undefined);
}
/**
 * Configuration-related errors (missing env vars, invalid config, etc.)
 */
export declare class ConfigurationError extends BaseError {
    constructor(message: string, details?: unknown);
}
/**
 * Input validation errors (invalid parameters, schema validation failures)
 */
export declare class ValidationError extends BaseError {
    constructor(message: string, details?: unknown);
}
/**
 * Database operation errors
 */
export declare class DatabaseError extends BaseError {
    constructor(message: string, details?: unknown);
}
/**
 * Network/connectivity errors
 */
export declare class NetworkError extends BaseError {
    constructor(message: string, details?: unknown);
}
/**
 * Timeout errors
 */
export declare class TimeoutError extends BaseError {
    constructor(message: string, details?: unknown);
}
//# sourceMappingURL=errors.d.ts.map