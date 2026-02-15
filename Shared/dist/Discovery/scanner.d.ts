/**
 * MCP Auto-Discovery Scanner
 *
 * Scans sibling directories of the MCPs root for packages that declare
 * an "annabelle" manifest in their package.json. This allows new MCPs to be
 * registered automatically by simply dropping a folder into the MCPs root.
 *
 * Convention: each MCP's package.json must include:
 *   "annabelle": { "mcpName": "my-mcp" }
 *
 * Used by both the Orchestrator (TypeScript import) and start-all.sh (CLI).
 */
import type { DiscoveredMCP } from './types.js';
/**
 * Scan the MCPs root directory for sibling packages with an "annabelle" manifest.
 * Returns an array of discovered MCPs, excluding any disabled via env vars.
 */
export declare function scanForMCPs(mcpsRoot: string): DiscoveredMCP[];
//# sourceMappingURL=scanner.d.ts.map