/**
 * Shared tool definition types for MCP services
 */
/**
 * Validation error thrown when tool input fails schema validation.
 * Dispatch code can catch this to return a 400 response.
 */
export class ValidationError extends Error {
    zodError;
    constructor(zodError) {
        super(`Invalid parameters: ${zodError.message}`);
        this.zodError = zodError;
        this.name = 'ValidationError';
    }
}
/**
 * Create a type-safe ToolMapEntry.
 * Validation and handler call happen in the same generic scope where T is known,
 * so safeParse().data (T) flows directly into handler (T) — no cast needed.
 */
export function toolEntry(schema, handler) {
    return {
        schema,
        call(input) {
            const result = schema.safeParse(input);
            if (!result.success) {
                throw new ValidationError(result.error);
            }
            return handler(result.data);
        }
    };
}
//# sourceMappingURL=tools.js.map