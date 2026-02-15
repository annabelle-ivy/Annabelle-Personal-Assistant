/**
 * Shared transport layer for MCP services
 * Supports both stdio (default) and HTTP/SSE transports
 */
import { type Server as HttpServer } from 'http';
/**
 * Interface for MCP Server - uses structural typing to avoid
 * dependency conflicts between different node_modules
 */
interface MCPServer {
    connect(transport: unknown): Promise<void>;
}
export interface ToolDefinition {
    name: string;
    description: string;
    inputSchema: unknown;
}
export interface TransportConfig {
    /** Transport type: 'stdio' (default) or 'sse'/'http' */
    transport: 'stdio' | 'sse' | 'http';
    /** Port for HTTP/SSE transport */
    port: number;
    /** Server name for logging */
    serverName: string;
    /** Optional: Shared auth token — requests to non-/health endpoints are rejected without it */
    token?: string;
    /** Optional: Additional health check data */
    onHealth?: () => Record<string, unknown>;
    /** Optional: Tool call handler for /tools/call endpoint (for testing) */
    onToolCall?: (name: string, args: unknown) => Promise<unknown>;
    /** Optional: Tool definitions for /tools/list endpoint (required for HTTP MCPs) */
    tools?: ToolDefinition[];
    /** Optional: Shutdown callback */
    onShutdown?: () => void | Promise<void>;
    /** Optional: Custom logger (defaults to console.error) */
    log?: (message: string, data?: unknown) => void;
}
export interface TransportResult {
    /** The HTTP server instance (null for stdio) */
    httpServer: HttpServer | null;
    /** Shutdown function */
    shutdown: () => Promise<void>;
}
/**
 * Start the MCP transport layer
 *
 * @example
 * ```typescript
 * const { shutdown } = await startTransport(server, {
 *   transport: 'sse',
 *   port: 8005,
 *   serverName: 'memory-mcp',
 *   onHealth: () => ({ dbConnected: true }),
 *   onShutdown: () => closeDatabase(),
 * });
 * ```
 */
export declare function startTransport(server: MCPServer, config: TransportConfig): Promise<TransportResult>;
export {};
//# sourceMappingURL=dual-transport.d.ts.map