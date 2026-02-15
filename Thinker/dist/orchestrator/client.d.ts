import type { Config } from '../config.js';
import type { TraceContext } from '../tracing/types.js';
import type { OrchestratorTool, ToolExecutionResponse, TelegramMessage, MemoryFact, AgentProfile, ConversationEntry, MCPMetadata } from './types.js';
/**
 * HTTP client for Orchestrator MCP
 */
export declare class OrchestratorClient {
    private baseUrl;
    private agentId;
    private timeout;
    private tools;
    private mcpMetadata;
    private toolsCachedAt;
    private static readonly TOOL_CACHE_TTL_MS;
    constructor(config: Config);
    /**
     * Make an HTTP request to the Orchestrator
     */
    private request;
    /**
     * Check if Orchestrator is healthy
     */
    healthCheck(): Promise<boolean>;
    /**
     * Discover available tools from Orchestrator
     */
    discoverTools(): Promise<OrchestratorTool[]>;
    /**
     * Get cached tools, re-discovering if the cache has expired.
     */
    getCachedToolsOrRefresh(): Promise<OrchestratorTool[]>;
    /**
     * Get cached tools (without refresh check — use getCachedToolsOrRefresh() for TTL-aware access)
     */
    getCachedTools(): OrchestratorTool[];
    /**
     * Get cached MCP metadata (populated alongside tools during discovery).
     */
    getMCPMetadata(): Record<string, MCPMetadata> | undefined;
    /**
     * Get a specific tool definition
     */
    getTool(name: string): OrchestratorTool | undefined;
    /**
     * Parse MCP response format to ToolExecutionResponse
     */
    private parseMCPResponse;
    /**
     * Execute a tool via Orchestrator
     */
    executeTool(toolName: string, args: Record<string, unknown>, trace?: TraceContext): Promise<ToolExecutionResponse>;
    /**
     * Get new Telegram messages from queue
     */
    getNewTelegramMessages(peek?: boolean, trace?: TraceContext): Promise<TelegramMessage[]>;
    /**
     * Send a Telegram message
     */
    sendTelegramMessage(chatId: string, message: string, replyTo?: number, trace?: TraceContext): Promise<boolean>;
    /**
     * Store a fact in Memory MCP
     */
    storeFact(agentId: string, fact: string, category: string, trace?: TraceContext): Promise<boolean>;
    /**
     * Retrieve memories from Memory MCP
     */
    retrieveMemories(agentId: string, query: string, limit?: number, trace?: TraceContext): Promise<{
        facts: MemoryFact[];
        conversations: ConversationEntry[];
    }>;
    /**
     * Get agent profile from Memory MCP
     */
    getProfile(agentId: string, trace?: TraceContext): Promise<AgentProfile | null>;
    /**
     * Store a conversation in Memory MCP
     */
    storeConversation(agentId: string, userMessage: string, agentResponse: string, sessionId?: string, trace?: TraceContext): Promise<boolean>;
    /**
     * List skills from Memory MCP
     */
    listSkills(agentId: string, triggerType?: string, enabled?: boolean, trace?: TraceContext): Promise<{
        skills: Array<Record<string, unknown>>;
        total_count: number;
    }>;
    /**
     * List stored facts from Memory MCP (for dedup context in fact extraction)
     */
    listFacts(agentId: string, limit?: number, trace?: TraceContext): Promise<Array<{
        fact: string;
        category: string;
    }>>;
    /**
     * Search conversations in Memory MCP
     */
    searchConversations(agentId: string, query: string, limit?: number, trace?: TraceContext): Promise<ConversationEntry[]>;
}
//# sourceMappingURL=client.d.ts.map