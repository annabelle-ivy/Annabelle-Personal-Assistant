/**
 * Base MCP Test Client — HTTP helper for calling MCP servers during tests.
 * Shared across all packages to avoid duplication.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
/** Read the Annabelle auth token from env or ~/.annabelle/annabelle.token */
export function resolveToken(explicit) {
    if (explicit)
        return explicit;
    if (process.env.ANNABELLE_TOKEN)
        return process.env.ANNABELLE_TOKEN;
    try {
        return readFileSync(join(homedir(), '.annabelle', 'annabelle.token'), 'utf-8').trim();
    }
    catch {
        return undefined;
    }
}
export class MCPTestClient {
    baseUrl;
    name;
    timeout;
    toolPrefix;
    token;
    constructor(name, baseUrl, options) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.timeout = options?.timeout ?? 10_000;
        this.toolPrefix = options?.toolPrefix ?? '';
        this.token = resolveToken(options?.token);
    }
    /** Build common headers including auth token when available */
    authHeaders() {
        if (this.token)
            return { 'X-Annabelle-Token': this.token };
        return {};
    }
    async healthCheck() {
        const start = Date.now();
        try {
            const response = await fetch(`${this.baseUrl}/health`, {
                headers: this.authHeaders(),
                signal: AbortSignal.timeout(this.timeout),
            });
            const duration = Date.now() - start;
            return { healthy: response.ok, status: response.status, duration };
        }
        catch (error) {
            const duration = Date.now() - start;
            return {
                healthy: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                duration,
            };
        }
    }
    /**
     * Call an MCP tool via HTTP POST /tools/call.
     * Automatically parses MCP content wrapper: `{ content: [{ type: "text", text: "..." }] }`
     */
    async callTool(toolName, args = {}) {
        const start = Date.now();
        try {
            const prefixedName = this.toolPrefix ? `${this.toolPrefix}${toolName}` : toolName;
            const response = await fetch(`${this.baseUrl}/tools/call`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...this.authHeaders() },
                body: JSON.stringify({ name: prefixedName, arguments: args }),
                signal: AbortSignal.timeout(this.timeout),
            });
            const duration = Date.now() - start;
            if (!response.ok) {
                const text = await response.text();
                // Try to parse error body as MCP format (some servers return 400 with MCP content)
                try {
                    const errorJson = JSON.parse(text);
                    if (errorJson.content?.[0]?.text) {
                        const parsed = JSON.parse(errorJson.content[0].text);
                        return { success: false, error: parsed.error, data: parsed, duration };
                    }
                }
                catch {
                    // Fall through to plain text error
                }
                return { success: false, error: `HTTP ${response.status}: ${text}`, duration };
            }
            const data = await response.json();
            // Parse MCP content wrapper
            if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
                try {
                    const parsed = JSON.parse(data.content[0].text);
                    return {
                        success: parsed.success !== false,
                        data: (parsed.data ?? parsed),
                        error: parsed.error,
                        duration,
                    };
                }
                catch {
                    return { success: true, data: data, duration };
                }
            }
            return { success: true, data: data, duration };
        }
        catch (error) {
            const duration = Date.now() - start;
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                duration,
            };
        }
    }
    getName() {
        return this.name;
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    getToken() {
        return this.token;
    }
}
/**
 * Check if multiple MCPs are available. Returns map of MCP name → availability.
 */
export async function checkMCPsAvailable(clients) {
    const results = new Map();
    await Promise.all(clients.map(async (client) => {
        const health = await client.healthCheck();
        results.set(client.getName(), health.healthy);
    }));
    return results;
}
//# sourceMappingURL=mcp-test-client.js.map