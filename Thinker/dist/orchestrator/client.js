import { createTraceHeaders } from '../tracing/context.js';
import { Logger } from '@mcp/shared/Utils/logger.js';
const logger = new Logger('thinker:orchestrator');
/**
 * HTTP client for Orchestrator MCP
 */
export class OrchestratorClient {
    baseUrl;
    agentId;
    timeout;
    tools = new Map();
    mcpMetadata;
    toolsCachedAt = 0;
    static TOOL_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
    constructor(config) {
        this.baseUrl = config.orchestratorUrl;
        this.agentId = config.thinkerAgentId;
        this.timeout = config.orchestratorTimeout;
    }
    /**
     * Make an HTTP request to the Orchestrator
     */
    async request(method, path, body, trace) {
        const url = `${this.baseUrl}${path}`;
        const headers = {
            'Content-Type': 'application/json',
            'X-Agent-Id': this.agentId,
            ...(process.env.ANNABELLE_TOKEN ? { 'X-Annabelle-Token': process.env.ANNABELLE_TOKEN } : {}),
            ...(trace ? createTraceHeaders(trace) : {}),
        };
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal: AbortSignal.timeout(this.timeout),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Orchestrator request failed: ${response.status} - ${error}`);
        }
        return response.json();
    }
    /**
     * Check if Orchestrator is healthy
     */
    async healthCheck() {
        try {
            const response = await this.request('GET', '/health');
            return response.status === 'ok';
        }
        catch {
            return false;
        }
    }
    /**
     * Discover available tools from Orchestrator
     */
    async discoverTools() {
        try {
            const response = await this.request('GET', '/tools/list');
            const tools = response.tools;
            // Cache tools with timestamp
            this.tools.clear();
            for (const tool of tools) {
                this.tools.set(tool.name, tool);
            }
            this.mcpMetadata = response.mcpMetadata;
            this.toolsCachedAt = Date.now();
            return tools;
        }
        catch (error) {
            logger.error('Failed to discover tools', error);
            return [];
        }
    }
    /**
     * Get cached tools, re-discovering if the cache has expired.
     */
    async getCachedToolsOrRefresh() {
        if (this.tools.size === 0 || Date.now() - this.toolsCachedAt > OrchestratorClient.TOOL_CACHE_TTL_MS) {
            logger.debug('Tool cache expired or empty — re-discovering');
            return this.discoverTools();
        }
        return Array.from(this.tools.values());
    }
    /**
     * Get cached tools (without refresh check — use getCachedToolsOrRefresh() for TTL-aware access)
     */
    getCachedTools() {
        return Array.from(this.tools.values());
    }
    /**
     * Get cached MCP metadata (populated alongside tools during discovery).
     */
    getMCPMetadata() {
        return this.mcpMetadata;
    }
    /**
     * Get a specific tool definition
     */
    getTool(name) {
        return this.tools.get(name);
    }
    /**
     * Parse MCP response format to ToolExecutionResponse
     */
    parseMCPResponse(mcpResponse) {
        if (!mcpResponse.content || mcpResponse.content.length === 0) {
            return { success: false, error: 'Empty response from Orchestrator' };
        }
        const textContent = mcpResponse.content[0];
        if (textContent.type !== 'text') {
            return { success: false, error: 'Unexpected response type from Orchestrator' };
        }
        try {
            const parsed = JSON.parse(textContent.text);
            // Internal MCPs return StandardResponse: { success, data?, error? }
            if ('success' in parsed) {
                return {
                    success: parsed.success,
                    result: parsed.data,
                    error: parsed.error,
                };
            }
            // External MCPs (e.g. vercel-mcp) return raw JSON without StandardResponse wrapping.
            // The Orchestrator passes their response text through directly, so we treat
            // any valid JSON without a 'success' field as a successful result.
            return { success: true, result: parsed };
        }
        catch {
            // If parsing fails, treat the text as the result
            return { success: true, result: textContent.text };
        }
    }
    /**
     * Execute a tool via Orchestrator
     */
    async executeTool(toolName, args, trace) {
        const request = {
            name: toolName,
            arguments: args,
        };
        try {
            const mcpResponse = await this.request('POST', '/tools/call', request, trace);
            return this.parseMCPResponse(mcpResponse);
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    /**
     * Get new Telegram messages from queue
     */
    async getNewTelegramMessages(peek = false, trace) {
        const response = await this.executeTool('telegram_get_new_messages', { peek }, trace);
        if (!response.success || !response.result) {
            return [];
        }
        // Response is double-wrapped: Orchestrator wraps the Telegram MCP response
        // Need to unwrap: { content: [{ text: "{ success, data: { messages } }" }] }
        try {
            const outerResult = response.result;
            if (outerResult.content && outerResult.content[0]?.type === 'text') {
                const innerJson = JSON.parse(outerResult.content[0].text);
                if (innerJson.success && innerJson.data?.messages) {
                    return innerJson.data.messages;
                }
            }
            return [];
        }
        catch {
            // Fallback: maybe it's already unwrapped
            const result = response.result;
            return result.messages || [];
        }
    }
    /**
     * Send a Telegram message
     */
    async sendTelegramMessage(chatId, message, replyTo, trace) {
        const args = {
            chat_id: chatId,
            message,
        };
        if (replyTo) {
            args.reply_to = replyTo;
        }
        const response = await this.executeTool('telegram_send_message', args, trace);
        return response.success;
    }
    /**
     * Store a fact in Memory MCP
     */
    async storeFact(agentId, fact, category, trace) {
        const response = await this.executeTool('memory_store_fact', { agent_id: agentId, fact, category }, trace);
        return response.success;
    }
    /**
     * Retrieve memories from Memory MCP
     */
    async retrieveMemories(agentId, query, limit = 5, trace) {
        const response = await this.executeTool('memory_retrieve_memories', { agent_id: agentId, query, limit, include_conversations: true }, trace);
        if (!response.success || !response.result) {
            return { facts: [], conversations: [] };
        }
        const result = response.result;
        return {
            facts: result.facts || [],
            conversations: result.conversations || [],
        };
    }
    /**
     * Get agent profile from Memory MCP
     */
    async getProfile(agentId, trace) {
        const response = await this.executeTool('memory_get_profile', { agent_id: agentId }, trace);
        if (!response.success || !response.result) {
            return null;
        }
        return response.result;
    }
    /**
     * Store a conversation in Memory MCP
     */
    async storeConversation(agentId, userMessage, agentResponse, sessionId, trace) {
        const args = {
            agent_id: agentId,
            user_message: userMessage,
            agent_response: agentResponse,
        };
        if (sessionId) {
            args.session_id = sessionId;
        }
        const response = await this.executeTool('memory_store_conversation', args, trace);
        return response.success;
    }
    /**
     * List skills from Memory MCP
     */
    async listSkills(agentId, triggerType, enabled, trace) {
        const args = { agent_id: agentId };
        if (triggerType !== undefined)
            args.trigger_type = triggerType;
        if (enabled !== undefined)
            args.enabled = enabled;
        const response = await this.executeTool('memory_list_skills', args, trace);
        if (!response.success || !response.result) {
            return { skills: [], total_count: 0 };
        }
        const result = response.result;
        return {
            skills: result.skills ?? [],
            total_count: result.total_count ?? 0,
        };
    }
    /**
     * List stored facts from Memory MCP (for dedup context in fact extraction)
     */
    async listFacts(agentId, limit = 30, trace) {
        const response = await this.executeTool('memory_list_facts', { agent_id: agentId, limit }, trace);
        if (!response.success || !response.result) {
            return [];
        }
        const result = response.result;
        return result.facts || [];
    }
    /**
     * Search conversations in Memory MCP
     */
    async searchConversations(agentId, query, limit = 10, trace) {
        const response = await this.executeTool('memory_search_conversations', { agent_id: agentId, query, limit }, trace);
        if (!response.success || !response.result) {
            return [];
        }
        const result = response.result;
        return result.conversations || [];
    }
}
//# sourceMappingURL=client.js.map