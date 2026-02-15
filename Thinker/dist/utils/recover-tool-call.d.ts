/**
 * Recovery for leaked tool calls.
 *
 * Groq/Llama sometimes returns tool calls as JSON text instead of using
 * structured function calling. This module detects that pattern and
 * executes the tool directly so the user's action still happens.
 */
import type { CoreTool } from 'ai';
interface LeakDetection {
    detected: boolean;
    toolName: string;
    parameters: Record<string, unknown>;
    /** Conversational text before the JSON blob (e.g. "I'll set a reminder for you.") */
    preamble: string;
}
/**
 * Detect whether `text` contains a tool call leaked as JSON.
 * Only reports a match when the extracted tool name exists in `availableTools`
 * to avoid false positives on arbitrary user JSON.
 */
export declare function detectLeakedToolCall(text: string, availableTools: Record<string, CoreTool>): LeakDetection;
interface RecoveryResult {
    success: boolean;
    result?: unknown;
    error?: string;
}
/**
 * Execute a leaked tool call using the Vercel AI SDK tool's own `execute` fn.
 * This follows the exact same code path as a normal tool call.
 */
export declare function recoverLeakedToolCall(toolName: string, parameters: Record<string, unknown>, tools: Record<string, CoreTool>): Promise<RecoveryResult>;
export {};
//# sourceMappingURL=recover-tool-call.d.ts.map