import type { CoreTool } from 'ai';
import type { MCPMetadata } from '../orchestrator/types.js';
/**
 * Tool groups — core is always included.
 * Glob patterns (e.g. "memory_*") are expanded against the full tool map at runtime.
 */
export declare const TOOL_GROUPS: Record<string, string[]>;
/**
 * Select a subset of tools relevant to the given message.
 * Always includes `core` tools. Adds groups based on keyword matching.
 * Falls back to `DEFAULT_GROUPS` when no keywords match.
 *
 * When mcpMetadata is provided, auto-generates tool groups and keyword routes
 * for MCPs not covered by the hardcoded maps (Tier 3 fallback).
 */
export declare function selectToolsForMessage(message: string, allTools: Record<string, CoreTool>, mcpMetadata?: Record<string, MCPMetadata>): Record<string, CoreTool>;
//# sourceMappingURL=tool-selector.d.ts.map