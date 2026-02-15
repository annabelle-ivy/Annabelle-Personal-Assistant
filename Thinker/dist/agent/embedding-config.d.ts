import type { EmbeddingProvider } from '@mcp/shared/Embeddings/provider.js';
/**
 * Create an embedding provider from environment variables.
 * Returns null if EMBEDDING_PROVIDER is unset or 'none'.
 *
 * Thinker supports `ollama` and `huggingface` (not `lmstudio` — no openai dep).
 */
export declare function createEmbeddingProviderFromEnv(): EmbeddingProvider | null;
//# sourceMappingURL=embedding-config.d.ts.map