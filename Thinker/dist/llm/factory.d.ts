import type { LanguageModel } from 'ai';
import type { Config } from '../config.js';
/**
 * Create a language model instance based on configuration
 */
export declare function createLanguageModel(config: Config): LanguageModel;
/**
 * Model factory that caches the model instance
 */
export declare class ModelFactory {
    private model;
    private compactionModel;
    private config;
    constructor(config: Config);
    /**
     * Get or create the language model
     */
    getModel(): LanguageModel;
    /**
     * Get or create the compaction model (cheap summarization).
     * Uses a dedicated small model (e.g. llama-3.1-8b-instant) to minimize cost.
     * Falls back to the main agent model if compaction model is not configured.
     */
    getCompactionModel(): LanguageModel;
    /**
     * Reset the model (useful for provider switching)
     */
    reset(): void;
    /**
     * Get current provider info
     */
    getProviderInfo(): {
        provider: string;
        model: string;
    };
}
//# sourceMappingURL=factory.d.ts.map