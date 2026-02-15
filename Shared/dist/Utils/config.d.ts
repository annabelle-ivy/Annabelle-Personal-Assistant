/**
 * Shared configuration utilities for MCP services
 */
/**
 * Expand ~ to user's home directory in a path
 */
export declare function expandPath(path: string): string;
/**
 * Get a string value from environment variable
 */
export declare function getEnvString(key: string, defaultValue?: string): string | undefined;
/**
 * Get a number value from environment variable
 * Uses parseInt for whole numbers (ports, timeouts, counts)
 */
export declare function getEnvNumber(key: string, defaultValue?: number): number | undefined;
/**
 * Get a floating point number from environment variable
 * Uses parseFloat for decimal values (thresholds, temperatures)
 */
export declare function getEnvFloat(key: string, defaultValue?: number): number | undefined;
/**
 * Get a boolean value from environment variable
 * Recognizes 'true', 'false', '1', '0'
 */
export declare function getEnvBoolean(key: string, defaultValue?: boolean): boolean | undefined;
/**
 * Get a required string value from environment variable
 * Throws if not defined
 */
export declare function requireEnvString(key: string): string;
//# sourceMappingURL=config.d.ts.map