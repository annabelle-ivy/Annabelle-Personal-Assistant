/**
 * CodeExec MCP Server
 *
 * Registers code execution and session tools on an McpServer instance.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SessionManager } from './sessions/manager.js';
export declare function createServer(): {
    server: McpServer;
    sessionManager: SessionManager;
};
//# sourceMappingURL=server.d.ts.map