import type { CoreTool } from 'ai';
import type { EmbeddingToolSelector } from './embedding-tool-selector.js';
import type { MCPMetadata } from '../orchestrator/types.js';
/** Core tools that are always included regardless of selection method */
export declare const CORE_TOOL_NAMES: string[];
/**
 * Select tools with embedding-based selection, falling back to regex on error or absence.
 *
 * @param message - The user message text
 * @param allTools - All available tools
 * @param embeddingSelector - The embedding selector (null if not configured)
 * @param mcpMetadata - Optional MCP metadata for dynamic group/keyword generation
 * @returns Filtered tool map
 */
export declare function selectToolsWithFallback(message: string, allTools: Record<string, CoreTool>, embeddingSelector: EmbeddingToolSelector | null, mcpMetadata?: Record<string, MCPMetadata>): Promise<Record<string, CoreTool>>;
//# sourceMappingURL=tool-selection.d.ts.map