import { type EmbeddingConfig } from './config.js';
import { BaseEmbeddingProvider } from './provider.js';
export declare class OllamaEmbeddingProvider extends BaseEmbeddingProvider {
    private baseUrl;
    private model;
    constructor(config: EmbeddingConfig);
    embed(text: string): Promise<Float32Array>;
    embedBatch(texts: string[]): Promise<Float32Array[]>;
    private callOllama;
}
//# sourceMappingURL=ollama-provider.d.ts.map