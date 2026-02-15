/**
 * Base MCP Test Client — HTTP helper for calling MCP servers during tests.
 * Shared across all packages to avoid duplication.
 */
export interface MCPToolCallResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    duration: number;
}
export interface MCPHealthResult {
    healthy: boolean;
    status?: number;
    error?: string;
    duration: number;
}
export interface MCPTestClientOptions {
    /** Tool name prefix (e.g. "filer_" when routing through Orchestrator) */
    toolPrefix?: string;
    /** Request timeout in ms (default: 10000) */
    timeout?: number;
    /** Auth token override. If omitted, auto-detects from env / token file. */
    token?: string;
}
/** Read the Annabelle auth token from env or ~/.annabelle/annabelle.token */
export declare function resolveToken(explicit?: string): string | undefined;
export declare class MCPTestClient {
    private baseUrl;
    private name;
    private timeout;
    private toolPrefix;
    private token;
    constructor(name: string, baseUrl: string, options?: MCPTestClientOptions);
    /** Build common headers including auth token when available */
    private authHeaders;
    healthCheck(): Promise<MCPHealthResult>;
    /**
     * Call an MCP tool via HTTP POST /tools/call.
     * Automatically parses MCP content wrapper: `{ content: [{ type: "text", text: "..." }] }`
     */
    callTool<T = unknown>(toolName: string, args?: Record<string, unknown>): Promise<MCPToolCallResult<T>>;
    getName(): string;
    getBaseUrl(): string;
    getToken(): string | undefined;
}
/**
 * Check if multiple MCPs are available. Returns map of MCP name → availability.
 */
export declare function checkMCPsAvailable(clients: MCPTestClient[]): Promise<Map<string, boolean>>;
//# sourceMappingURL=mcp-test-client.d.ts.map