import { type EmbeddingConfig } from './config.js';
import { type EmbeddingProvider } from './provider.js';
export type { EmbeddingProvider } from './provider.js';
export { BaseEmbeddingProvider } from './provider.js';
export { EmbeddingConfigSchema, type EmbeddingConfig } from './config.js';
export { cosineSimilarity } from './math.js';
/**
 * Extra provider factory — lets consumers register providers that
 * depend on libraries Shared doesn't ship (e.g. Memorizer's lmstudio via openai SDK).
 */
export type ExtraProviderFactory = (config: EmbeddingConfig) => EmbeddingProvider;
/**
 * Create an embedding provider from config.
 *
 * Built-in providers: `ollama`, `huggingface`, `none`.
 * Pass `extraProviders` to register additional providers (e.g. `lmstudio`)
 * without Shared needing those dependencies.
 */
export declare function createEmbeddingProvider(config: EmbeddingConfig, extraProviders?: Record<string, ExtraProviderFactory>): EmbeddingProvider | null;
//# sourceMappingURL=index.d.ts.map