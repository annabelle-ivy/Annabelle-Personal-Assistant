import type { LanguageModel } from 'ai';
import type { Config } from '../config.js';
import type { ProviderName } from './types.js';
/**
 * Create Groq provider using the dedicated @ai-sdk/groq package.
 * This handles tool calling properly for Groq-hosted models (Llama, etc.)
 * instead of the generic OpenAI-compatible provider which can misformat tool calls.
 */
export declare function createGroqProvider(config: Config): import("@ai-sdk/groq").GroqProvider;
/**
 * Create LM Studio provider using OpenAI-compatible API
 */
export declare function createLMStudioProvider(config: Config): import("@ai-sdk/openai").OpenAIProvider;
/**
 * Create Ollama provider using OpenAI-compatible API
 */
export declare function createOllamaProvider(config: Config): import("@ai-sdk/openai").OpenAIProvider;
/**
 * Get the model ID for the selected provider
 */
export declare function getModelId(config: Config): string;
/**
 * Create a language model for session compaction (cheap summarization).
 * Uses a dedicated provider/model configured via compactionProvider + compactionModel.
 */
export declare function createCompactionModel(config: Config): LanguageModel;
/**
 * Get provider name for logging
 */
export declare function getProviderDisplayName(provider: ProviderName): string;
//# sourceMappingURL=providers.d.ts.map