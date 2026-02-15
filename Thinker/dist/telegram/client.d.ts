import type { TraceContext } from '../tracing/types.js';
import type { TelegramMessage } from '../orchestrator/types.js';
/**
 * Direct HTTP client for Telegram MCP (bypasses Orchestrator)
 */
export declare class TelegramDirectClient {
    private baseUrl;
    constructor(telegramDirectUrl: string);
    /**
     * Make HTTP request to Telegram MCP
     */
    private request;
    /**
     * Check health of Telegram MCP
     */
    healthCheck(): Promise<boolean>;
    /**
     * Get new messages from Telegram
     */
    getNewMessages(peek?: boolean, trace?: TraceContext): Promise<TelegramMessage[]>;
    /**
     * Send a message to Telegram
     */
    sendMessage(chatId: string, message: string, replyTo?: number, trace?: TraceContext): Promise<boolean>;
    /**
     * Subscribe to a chat for real-time messages
     */
    subscribeChat(chatId: string, trace?: TraceContext): Promise<boolean>;
    /**
     * List current subscriptions
     */
    listSubscriptions(trace?: TraceContext): Promise<string[]>;
    /**
     * Clear subscriptions (receive all chats)
     */
    clearSubscriptions(trace?: TraceContext): Promise<boolean>;
    /**
     * Get recent messages from a specific chat (direct fetch, bypasses queue)
     * This is more reliable than get_new_messages since it doesn't depend on real-time handlers
     */
    getRecentMessages(chatId: string, limit?: number, trace?: TraceContext): Promise<TelegramMessage[]>;
    /**
     * Get info about the current user (to identify our own messages)
     */
    getMe(trace?: TraceContext): Promise<{
        id: string;
        username?: string;
    } | null>;
    /**
     * List available chats (for auto-discovering which chats to monitor)
     */
    listChats(limit?: number, trace?: TraceContext): Promise<Array<{
        id: string;
        type: string;
        title: string;
        unreadCount: number;
    }>>;
}
//# sourceMappingURL=client.d.ts.map