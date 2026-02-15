import type { MCPMetadata } from './types.js';
export interface ExternalMCPEntry {
    command: string;
    args?: string[];
    env?: Record<string, string>;
    timeout: number;
    required: false;
    sensitive: boolean;
    description?: string;
    metadata?: MCPMetadata;
}
/**
 * Load external MCP configs from the given path.
 *
 * @param configPath - Path to external-mcps.json. Required.
 */
export declare function loadExternalMCPs(configPath: string): Record<string, ExternalMCPEntry>;
//# sourceMappingURL=external-loader.d.ts.map