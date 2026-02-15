/**
 * Base error class for all MCP services
 * Provides a consistent error pattern with code and details
 */
export class BaseError extends Error {
    code;
    details;
    constructor(message, code, details) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'BaseError';
        // Maintain proper prototype chain for instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/**
 * Configuration-related errors (missing env vars, invalid config, etc.)
 */
export class ConfigurationError extends BaseError {
    constructor(message, details) {
        super(message, 'CONFIGURATION_ERROR', details);
        this.name = 'ConfigurationError';
    }
}
/**
 * Input validation errors (invalid parameters, schema validation failures)
 */
export class ValidationError extends BaseError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', details);
        this.name = 'ValidationError';
    }
}
/**
 * Database operation errors
 */
export class DatabaseError extends BaseError {
    constructor(message, details) {
        super(message, 'DATABASE_ERROR', details);
        this.name = 'DatabaseError';
    }
}
/**
 * Network/connectivity errors
 */
export class NetworkError extends BaseError {
    constructor(message, details) {
        super(message, 'NETWORK_ERROR', details);
        this.name = 'NetworkError';
    }
}
/**
 * Timeout errors
 */
export class TimeoutError extends BaseError {
    constructor(message, details) {
        super(message, 'TIMEOUT_ERROR', details);
        this.name = 'TimeoutError';
    }
}
//# sourceMappingURL=errors.js.map