import { BaseEmbeddingProvider } from './provider.js';
import { Logger } from '../Utils/logger.js';
const logger = new Logger('shared:embeddings');
export { BaseEmbeddingProvider } from './provider.js';
export { EmbeddingConfigSchema } from './config.js';
export { cosineSimilarity } from './math.js';
// Lazy wrapper for Ollama provider (dynamic import avoids loading code until needed)
class OllamaProviderWrapper extends BaseEmbeddingProvider {
    config;
    provider = null;
    constructor(config) {
        super('ollama-embedding');
        this.config = config;
    }
    async getProvider() {
        if (!this.provider) {
            const { OllamaEmbeddingProvider } = await import('./ollama-provider.js');
            this.provider = new OllamaEmbeddingProvider(this.config);
        }
        return this.provider;
    }
    async embed(text) {
        const provider = await this.getProvider();
        return provider.embed(text);
    }
    async embedBatch(texts) {
        const provider = await this.getProvider();
        return provider.embedBatch(texts);
    }
}
// Lazy wrapper for HuggingFace provider
class HuggingFaceProviderWrapper extends BaseEmbeddingProvider {
    config;
    provider = null;
    constructor(config) {
        super('huggingface-embedding');
        this.config = config;
    }
    async getProvider() {
        if (!this.provider) {
            const { HuggingFaceEmbeddingProvider } = await import('./huggingface-provider.js');
            this.provider = new HuggingFaceEmbeddingProvider(this.config);
        }
        return this.provider;
    }
    async embed(text) {
        const provider = await this.getProvider();
        return provider.embed(text);
    }
    async embedBatch(texts) {
        const provider = await this.getProvider();
        return provider.embedBatch(texts);
    }
}
/**
 * Create an embedding provider from config.
 *
 * Built-in providers: `ollama`, `huggingface`, `none`.
 * Pass `extraProviders` to register additional providers (e.g. `lmstudio`)
 * without Shared needing those dependencies.
 */
export function createEmbeddingProvider(config, extraProviders) {
    // Check extraProviders first so consumers can override built-ins
    if (extraProviders && config.provider in extraProviders) {
        return extraProviders[config.provider](config);
    }
    switch (config.provider) {
        case 'ollama':
            return new OllamaProviderWrapper(config);
        case 'huggingface':
            return new HuggingFaceProviderWrapper(config);
        case 'none':
            logger.info('Embedding provider disabled');
            return null;
        default:
            logger.warn('Unknown embedding provider, disabling', { provider: config.provider });
            return null;
    }
}
//# sourceMappingURL=index.js.map