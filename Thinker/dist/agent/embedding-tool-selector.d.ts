import type { CoreTool } from 'ai';
import type { EmbeddingProvider } from '@mcp/shared/Embeddings/provider.js';
export interface EmbeddingToolSelectorConfig {
    /** Minimum cosine similarity to include a tool (default 0.3) */
    similarityThreshold: number;
    /** Maximum number of semantically selected tools (default 15) */
    topK: number;
    /** Minimum tools to include regardless of threshold (default 5) */
    minTools: number;
    /** Path to the embedding cache file (optional — disables caching if unset) */
    cachePath?: string;
    /** Embedding provider name for cache key validation (e.g. 'ollama') */
    providerName?: string;
    /** Embedding model name for cache key validation (e.g. 'nomic-embed-text') */
    modelName?: string;
}
export interface ToolSelectionStats {
    method: 'embedding';
    selectedCount: number;
    totalTools: number;
    topScore: number;
    bottomSelectedScore: number;
    coreToolCount: number;
    aboveThreshold: number;
    topTools: Array<{
        name: string;
        score: number;
    }>;
}
export declare class EmbeddingToolSelector {
    private provider;
    private config;
    private toolEmbeddings;
    private initialized;
    private lastStats;
    private lastScores;
    constructor(provider: EmbeddingProvider, config?: Partial<EmbeddingToolSelectorConfig>);
    /**
     * Embed tool descriptions, using cache for previously-seen tools.
     * Must be called before selectTools().
     */
    initialize(tools: Record<string, CoreTool>): Promise<void>;
    /**
     * Select tools relevant to the given message using cosine similarity.
     */
    selectTools(message: string, allTools: Record<string, CoreTool>, coreToolNames: string[]): Promise<Record<string, CoreTool>>;
    getLastSelectionStats(): ToolSelectionStats | null;
    getLastScores(): Map<string, number> | null;
    isInitialized(): boolean;
    /**
     * Get the underlying embedding provider for reuse (e.g. semantic history selection).
     */
    getProvider(): EmbeddingProvider;
    private loadCache;
    private saveCache;
}
//# sourceMappingURL=embedding-tool-selector.d.ts.map