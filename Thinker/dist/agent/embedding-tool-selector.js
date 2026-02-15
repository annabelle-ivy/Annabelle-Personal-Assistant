import { readFile, writeFile, rename, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { cosineSimilarity } from '@mcp/shared/Embeddings/math.js';
import { Logger } from '@mcp/shared/Utils/logger.js';
const logger = new Logger('thinker:embedding-tool-selector');
const DEFAULT_CONFIG = {
    similarityThreshold: 0.3,
    topK: 15,
    minTools: 5,
};
function embeddingToBase64(emb) {
    return Buffer.from(emb.buffer, emb.byteOffset, emb.byteLength).toString('base64');
}
function base64ToEmbedding(b64) {
    const buf = Buffer.from(b64, 'base64');
    return new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
}
export class EmbeddingToolSelector {
    provider;
    config;
    toolEmbeddings = new Map();
    initialized = false;
    lastStats = null;
    lastScores = null;
    constructor(provider, config) {
        this.provider = provider;
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    /**
     * Embed tool descriptions, using cache for previously-seen tools.
     * Must be called before selectTools().
     */
    async initialize(tools) {
        const entries = Object.entries(tools);
        if (entries.length === 0) {
            this.toolEmbeddings.clear();
            this.initialized = true;
            return;
        }
        // Build text for each tool: "toolName: description"
        const textByName = new Map();
        for (const [name, tool] of entries) {
            const description = tool.description ?? '';
            textByName.set(name, `${name}: ${description}`);
        }
        // Try loading cache
        const cache = await this.loadCache();
        const cachedEmbeddings = new Map();
        const uncachedNames = [];
        const uncachedTexts = [];
        for (const [name, text] of textByName) {
            if (cache?.entries[text]) {
                cachedEmbeddings.set(name, base64ToEmbedding(cache.entries[text]));
            }
            else {
                uncachedNames.push(name);
                uncachedTexts.push(text);
            }
        }
        logger.info(`Loaded ${cachedEmbeddings.size} cached embeddings, embedding ${uncachedTexts.length} new tools`);
        // Only embed uncached tools
        let freshEmbeddings = [];
        if (uncachedTexts.length > 0) {
            freshEmbeddings = await this.provider.embedBatch(uncachedTexts);
        }
        // Rebuild toolEmbeddings (replacing any stale state from prior initialize)
        this.toolEmbeddings.clear();
        for (const [name, emb] of cachedEmbeddings) {
            this.toolEmbeddings.set(name, emb);
        }
        for (let i = 0; i < uncachedNames.length; i++) {
            this.toolEmbeddings.set(uncachedNames[i], freshEmbeddings[i]);
        }
        // Save updated cache
        await this.saveCache(textByName);
        this.initialized = true;
        logger.info(`Embedding tool selector initialized (${this.toolEmbeddings.size} tools)`);
    }
    /**
     * Select tools relevant to the given message using cosine similarity.
     */
    async selectTools(message, allTools, coreToolNames) {
        if (!this.initialized) {
            throw new Error('EmbeddingToolSelector not initialized — call initialize() first');
        }
        // Embed the user message
        const messageEmbedding = await this.provider.embed(message);
        // Score each tool
        const scores = [];
        for (const [name, embedding] of this.toolEmbeddings) {
            if (!(name in allTools))
                continue; // tool was removed
            scores.push({ name, score: cosineSimilarity(messageEmbedding, embedding) });
        }
        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);
        // Store full scores for use by tool cap logic
        this.lastScores = new Map(scores.map(s => [s.name, s.score]));
        // Build selected set: always include core tools
        const selected = new Set();
        let coreToolCount = 0;
        for (const name of coreToolNames) {
            if (name in allTools) {
                selected.add(name);
                coreToolCount++;
            }
        }
        // Include top minTools regardless of threshold
        let added = 0;
        for (const { name } of scores) {
            if (added >= this.config.minTools)
                break;
            if (!selected.has(name)) {
                selected.add(name);
                added++;
            }
        }
        // Count above-threshold tools and include up to topK
        let aboveThreshold = 0;
        for (const { name, score } of scores) {
            if (score >= this.config.similarityThreshold) {
                aboveThreshold++;
                if (selected.size < this.config.topK) {
                    selected.add(name);
                }
            }
        }
        // Build filtered tool map and find the bottom selected score
        const result = {};
        let bottomSelectedScore = Infinity;
        for (const name of selected) {
            if (allTools[name])
                result[name] = allTools[name];
            const scoreEntry = scores.find(s => s.name === name);
            if (scoreEntry && scoreEntry.score < bottomSelectedScore) {
                bottomSelectedScore = scoreEntry.score;
            }
        }
        if (!isFinite(bottomSelectedScore))
            bottomSelectedScore = 0;
        // Build stats
        const topScore = scores[0]?.score ?? 0;
        this.lastStats = {
            method: 'embedding',
            selectedCount: selected.size,
            totalTools: scores.length,
            topScore,
            bottomSelectedScore,
            coreToolCount,
            aboveThreshold,
            topTools: scores.slice(0, 5).map(s => ({ name: s.name, score: s.score })),
        };
        logger.info(`Embedding selector: ${selected.size}/${scores.length} tools ` +
            `(top: ${topScore.toFixed(3)}, cutoff: ${bottomSelectedScore.toFixed(3)}, above threshold: ${aboveThreshold})`);
        logger.debug(`Top tools: ${this.lastStats.topTools.map(t => `${t.name}=${t.score.toFixed(3)}`).join(', ')}`);
        return result;
    }
    getLastSelectionStats() {
        return this.lastStats;
    }
    getLastScores() {
        return this.lastScores;
    }
    isInitialized() {
        return this.initialized;
    }
    /**
     * Get the underlying embedding provider for reuse (e.g. semantic history selection).
     */
    getProvider() {
        return this.provider;
    }
    // ─── Cache I/O ──────────────────────────────────────────────────
    async loadCache() {
        if (!this.config.cachePath)
            return null;
        try {
            const raw = await readFile(this.config.cachePath, 'utf-8');
            const data = JSON.parse(raw);
            // Validate provider/model match
            if (data.provider !== (this.config.providerName ?? '') ||
                data.model !== (this.config.modelName ?? '')) {
                logger.info('Cache provider/model mismatch — discarding cache');
                return null;
            }
            if (!data.entries || typeof data.entries !== 'object')
                return null;
            return data;
        }
        catch {
            // File doesn't exist or is corrupt — start fresh
            return null;
        }
    }
    async saveCache(textByName) {
        if (!this.config.cachePath)
            return;
        const cacheEntries = {};
        for (const [name, text] of textByName) {
            const emb = this.toolEmbeddings.get(name);
            if (emb) {
                cacheEntries[text] = embeddingToBase64(emb);
            }
        }
        const data = {
            provider: this.config.providerName ?? '',
            model: this.config.modelName ?? '',
            entries: cacheEntries,
        };
        const tmpPath = this.config.cachePath + '.tmp';
        try {
            await mkdir(dirname(this.config.cachePath), { recursive: true });
            await writeFile(tmpPath, JSON.stringify(data), 'utf-8');
            await rename(tmpPath, this.config.cachePath);
        }
        catch (error) {
            logger.warn('Failed to save embedding cache:', error);
        }
    }
}
//# sourceMappingURL=embedding-tool-selector.js.map