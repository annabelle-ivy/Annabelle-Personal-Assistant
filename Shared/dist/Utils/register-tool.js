/**
 * Shared tool registration wrapper for McpServer.
 *
 * Provides project conventions on top of the SDK's registerTool():
 * - Handler returns StandardResponse, wrapper formats for MCP content
 * - Consistent error handling with StandardResponse on failures
 * - Tool annotations support
 */
import { createErrorFromException } from '../Types/StandardResponse.js';
/**
 * Register a tool on McpServer with project conventions.
 *
 * The inputSchema should be a Zod object — its `.shape` is extracted for the SDK,
 * and the SDK validates input before calling the handler.
 *
 * Handler receives already-validated input and should return a StandardResponse.
 * The wrapper handles MCP content formatting and error wrapping.
 */
export function registerTool(server, config) {
    server.registerTool(config.name, {
        description: config.description,
        inputSchema: config.inputSchema.shape,
        annotations: config.annotations,
    }, async (args) => {
        try {
            // SDK validates args against inputSchema before calling this callback,
            // so the cast is safe — it's centralised here instead of at every call site.
            const result = await config.handler(args);
            return {
                content: [{ type: 'text', text: JSON.stringify(result) }],
            };
        }
        catch (error) {
            const errorResponse = createErrorFromException(error);
            return {
                content: [{ type: 'text', text: JSON.stringify(errorResponse) }],
            };
        }
    });
}
//# sourceMappingURL=register-tool.js.map