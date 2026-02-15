import { createTraceHeaders } from '../tracing/context.js';
/**
 * Direct HTTP client for Telegram MCP (bypasses Orchestrator)
 */
export class TelegramDirectClient {
    baseUrl;
    constructor(telegramDirectUrl) {
        this.baseUrl = telegramDirectUrl;
    }
    /**
     * Make HTTP request to Telegram MCP
     */
    async request(toolName, args, trace) {
        const url = `${this.baseUrl}/tools/call`;
        const headers = {
            'Content-Type': 'application/json',
            ...(trace ? createTraceHeaders(trace) : {}),
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({ name: toolName, arguments: args }),
            });
            if (!response.ok) {
                const error = await response.text();
                return {
                    success: false,
                    error: `Telegram MCP request failed: ${response.status} - ${error}`,
                };
            }
            const mcpResponse = (await response.json());
            // Parse MCP response format
            if (!mcpResponse.content || mcpResponse.content.length === 0) {
                return { success: false, error: 'Empty response from Telegram MCP' };
            }
            const textContent = mcpResponse.content[0];
            if (textContent.type !== 'text') {
                return { success: false, error: 'Unexpected response type' };
            }
            try {
                return JSON.parse(textContent.text);
            }
            catch {
                return { success: false, error: 'Failed to parse response' };
            }
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
    /**
     * Check health of Telegram MCP
     */
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            const data = (await response.json());
            return data.status === 'ok';
        }
        catch {
            return false;
        }
    }
    /**
     * Get new messages from Telegram
     */
    async getNewMessages(peek = false, trace) {
        const response = await this.request('get_new_messages', { peek }, trace);
        if (!response.success || !response.data) {
            return [];
        }
        return response.data.messages || [];
    }
    /**
     * Send a message to Telegram
     */
    async sendMessage(chatId, message, replyTo, trace) {
        const args = { chat_id: chatId, message };
        if (replyTo) {
            args.reply_to = replyTo;
        }
        const response = await this.request('send_message', args, trace);
        return response.success;
    }
    /**
     * Subscribe to a chat for real-time messages
     */
    async subscribeChat(chatId, trace) {
        const response = await this.request('subscribe_chat', { action: 'subscribe', chat_id: chatId }, trace);
        return response.success;
    }
    /**
     * List current subscriptions
     */
    async listSubscriptions(trace) {
        const response = await this.request('subscribe_chat', { action: 'list' }, trace);
        return response.data?.subscriptions || [];
    }
    /**
     * Clear subscriptions (receive all chats)
     */
    async clearSubscriptions(trace) {
        const response = await this.request('subscribe_chat', { action: 'clear' }, trace);
        return response.success;
    }
    /**
     * Get recent messages from a specific chat (direct fetch, bypasses queue)
     * This is more reliable than get_new_messages since it doesn't depend on real-time handlers
     */
    async getRecentMessages(chatId, limit = 10, trace) {
        const response = await this.request('get_messages', { chat_id: chatId, limit }, trace);
        if (!response.success || !response.data) {
            return [];
        }
        return response.data.messages || [];
    }
    /**
     * Get info about the current user (to identify our own messages)
     */
    async getMe(trace) {
        const response = await this.request('get_me', {}, trace);
        if (!response.success || !response.data) {
            return null;
        }
        return response.data.user;
    }
    /**
     * List available chats (for auto-discovering which chats to monitor)
     */
    async listChats(limit = 20, trace) {
        const response = await this.request('list_chats', { limit }, trace);
        if (!response.success || !response.data)
            return [];
        return response.data.chats || [];
    }
}
//# sourceMappingURL=client.js.map