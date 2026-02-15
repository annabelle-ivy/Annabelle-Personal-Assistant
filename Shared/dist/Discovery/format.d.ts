/**
 * Output formatters for discovery results.
 *
 * The pipe-delimited format is consumed by start-all.sh:
 *   mcpName|transport|httpPort|dir|sensitive
 */
import type { DiscoveredMCP } from './types.js';
/**
 * Format discovered MCPs as pipe-delimited lines for bash consumption.
 * Each line: name|transport|httpPort|dir|sensitive
 */
export declare function formatPipe(mcps: DiscoveredMCP[]): string;
//# sourceMappingURL=format.d.ts.map