import { BaseError } from './errors.js';
/**
 * Create a successful response with data
 */
export function createSuccess(data) {
    return { success: true, data };
}
/**
 * Create an error response, optionally with a structured error code and details.
 */
export function createError(error, errorCode, errorDetails) {
    const response = { success: false, error };
    if (errorCode !== undefined)
        response.errorCode = errorCode;
    if (errorDetails !== undefined)
        response.errorDetails = errorDetails;
    return response;
}
/**
 * Create error from caught exception.
 * If the error is a BaseError subclass, the code and details are preserved.
 */
export function createErrorFromException(error) {
    if (error instanceof BaseError) {
        return createError(error.message, error.code, error.details !== undefined ? error.details : undefined);
    }
    return createError(error instanceof Error ? error.message : 'Unknown error');
}
//# sourceMappingURL=StandardResponse.js.map