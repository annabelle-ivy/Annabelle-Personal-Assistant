import { type EmbeddingConfig } from './config.js';
import { BaseEmbeddingProvider } from './provider.js';
export declare class HuggingFaceEmbeddingProvider extends BaseEmbeddingProvider {
    private apiKey;
    private model;
    constructor(config: EmbeddingConfig);
    embed(text: string): Promise<Float32Array>;
    embedBatch(texts: string[]): Promise<Float32Array[]>;
    private callHuggingFace;
}
//# sourceMappingURL=huggingface-provider.d.ts.map