import type { CoreTool } from 'ai';
import type { OrchestratorClient } from './client.js';
import type { OrchestratorTool } from './types.js';
import type { TraceContext } from '../tracing/types.js';
/**
 * Relax numeric and boolean types in JSON Schema to also accept strings.
 * Smaller LLMs (e.g. Llama on Groq) often stringify primitives in tool calls
 * (e.g. `"count": "5"` instead of `"count": 5`, `"clear": "true"` instead of
 * `"clear": true`). The downstream MCP tools handle numeric coercion via
 * `z.coerce.number()`. Boolean coercion is handled by `coerceStringBooleans()`
 * in the execute callback before args are sent to the Orchestrator.
 */
export declare function relaxSchemaTypes(schema: Record<string, unknown>): Record<string, unknown>;
/**
 * Strip null values from tool call args.
 * LLMs (especially Llama on Groq) send `null` for optional params instead of omitting them.
 * `relaxSchemaTypes` lets nulls pass JSON Schema validation; this cleans them before
 * sending to the Orchestrator/MCP where Zod schemas use `.optional()` (not `.nullish()`).
 * Mutates the args object in-place.
 */
export declare function stripNullValues(args: Record<string, unknown>): Record<string, unknown>;
/**
 * Auto-inject or fix chat_id for telegram_send_message tool calls.
 * LLMs (especially Llama/Groq in proactive tasks) hallucinate placeholder
 * chat_ids like "the user's chat id or username" or "@username".
 * The known primary chat_id is injected from the channel manager.
 * Mutates the args object in-place.
 */
export declare function injectChatId(toolName: string, args: Record<string, unknown>, chatId: string | undefined): Record<string, unknown>;
/**
 * Create Vercel AI SDK tools from Orchestrator tools.
 *
 * Uses `jsonSchema()` to pass the MCP's original JSON Schema directly to the
 * AI SDK, avoiding a lossy JSON Schema → Zod → JSON Schema roundtrip that
 * was stripping type information from tool parameters (e.g. `"query":{}` instead
 * of `"query":{"type":"string"}`), which caused Groq/Maverick to intermittently
 * output tool calls as text instead of using the structured tool_calls API.
 */
export declare function createToolsFromOrchestrator(orchestratorTools: OrchestratorTool[], client: OrchestratorClient, getTrace: () => TraceContext | undefined, getChatId: () => string | undefined): Record<string, CoreTool>;
/**
 * Create essential tools that are always available
 * These are hardcoded tools for core functionality
 */
export declare function createEssentialTools(client: OrchestratorClient, agentId: string, getTrace: () => TraceContext | undefined, getChatId: () => string | undefined): Record<string, CoreTool>;
//# sourceMappingURL=tools.d.ts.map