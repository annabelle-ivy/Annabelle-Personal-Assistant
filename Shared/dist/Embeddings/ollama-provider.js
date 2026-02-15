import { BaseEmbeddingProvider } from './provider.js';
export class OllamaEmbeddingProvider extends BaseEmbeddingProvider {
    baseUrl;
    model;
    constructor(config) {
        super('ollama-embedding');
        this.baseUrl = config.ollamaBaseUrl;
        this.model = config.ollamaModel;
        this.logger.info('Ollama embedding provider initialized', {
            baseUrl: this.baseUrl,
            model: this.model,
        });
    }
    async embed(text) {
        const results = await this.callOllama([text]);
        return results[0];
    }
    async embedBatch(texts) {
        if (texts.length === 0)
            return [];
        return this.callOllama(texts);
    }
    async callOllama(input) {
        const url = `${this.baseUrl}/api/embed`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: this.model, input }),
        });
        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Ollama embedding request failed (${response.status}): ${body}`);
        }
        const data = (await response.json());
        if (!data.embeddings || data.embeddings.length !== input.length) {
            throw new Error(`Ollama returned ${data.embeddings?.length ?? 0} embeddings for ${input.length} inputs`);
        }
        return data.embeddings.map(vec => new Float32Array(vec));
    }
}
//# sourceMappingURL=ollama-provider.js.map