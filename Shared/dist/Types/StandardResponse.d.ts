/**
 * Standardized response format used across all MCP tools
 */
export interface StandardResponse<T = unknown> {
    success: boolean;
    error?: string;
    errorCode?: string;
    errorDetails?: Record<string, unknown>;
    data?: T;
}
/**
 * Create a successful response with data
 */
export declare function createSuccess<T>(data: T): StandardResponse<T>;
/**
 * Create an error response, optionally with a structured error code and details.
 */
export declare function createError(error: string, errorCode?: string, errorDetails?: Record<string, unknown>): StandardResponse<never>;
/**
 * Create error from caught exception.
 * If the error is a BaseError subclass, the code and details are preserved.
 */
export declare function createErrorFromException(error: unknown): StandardResponse<never>;
//# sourceMappingURL=StandardResponse.d.ts.map