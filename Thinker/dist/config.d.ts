import { z } from 'zod';
/**
 * LLM Provider types supported by Thinker
 */
export declare const LLMProviderSchema: z.ZodEnum<["groq", "lmstudio", "ollama"]>;
export type LLMProvider = z.infer<typeof LLMProviderSchema>;
/**
 * Cost control configuration schema (parsed from env vars set by Orchestrator)
 */
export declare const CostControlSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    shortWindowMinutes: z.ZodDefault<z.ZodNumber>;
    spikeMultiplier: z.ZodDefault<z.ZodNumber>;
    hardCapTokensPerHour: z.ZodDefault<z.ZodNumber>;
    minimumBaselineTokens: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    shortWindowMinutes: number;
    spikeMultiplier: number;
    hardCapTokensPerHour: number;
    minimumBaselineTokens: number;
}, {
    enabled: boolean;
    shortWindowMinutes?: number | undefined;
    spikeMultiplier?: number | undefined;
    hardCapTokensPerHour?: number | undefined;
    minimumBaselineTokens?: number | undefined;
}>;
/**
 * Log level options
 */
export declare const LogLevelSchema: z.ZodEnum<["debug", "info", "warn", "error"]>;
export type LogLevel = z.infer<typeof LogLevelSchema>;
/**
 * Post-conversation fact extraction configuration schema
 */
export declare const FactExtractionConfigSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    idleMs: z.ZodDefault<z.ZodNumber>;
    maxTurns: z.ZodDefault<z.ZodNumber>;
    confidenceThreshold: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    idleMs: number;
    maxTurns: number;
    confidenceThreshold: number;
}, {
    enabled?: boolean | undefined;
    idleMs?: number | undefined;
    maxTurns?: number | undefined;
    confidenceThreshold?: number | undefined;
}>;
/**
 * Session persistence configuration schema
 */
export declare const SessionConfigSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    compactionEnabled: z.ZodDefault<z.ZodBoolean>;
    compactionThresholdChars: z.ZodDefault<z.ZodNumber>;
    compactionKeepRecentTurns: z.ZodDefault<z.ZodNumber>;
    compactionCooldownMs: z.ZodDefault<z.ZodNumber>;
    compactionMinTurns: z.ZodDefault<z.ZodNumber>;
    maxAgeDays: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    compactionEnabled: boolean;
    compactionThresholdChars: number;
    compactionKeepRecentTurns: number;
    compactionCooldownMs: number;
    compactionMinTurns: number;
    maxAgeDays: number;
}, {
    enabled?: boolean | undefined;
    compactionEnabled?: boolean | undefined;
    compactionThresholdChars?: number | undefined;
    compactionKeepRecentTurns?: number | undefined;
    compactionCooldownMs?: number | undefined;
    compactionMinTurns?: number | undefined;
    maxAgeDays?: number | undefined;
}>;
/**
 * Configuration schema with Zod validation
 */
export declare const ConfigSchema: z.ZodObject<{
    thinkerEnabled: z.ZodDefault<z.ZodBoolean>;
    llmProvider: z.ZodDefault<z.ZodEnum<["groq", "lmstudio", "ollama"]>>;
    groqApiKey: z.ZodOptional<z.ZodString>;
    groqModel: z.ZodDefault<z.ZodString>;
    lmstudioBaseUrl: z.ZodDefault<z.ZodString>;
    lmstudioModel: z.ZodOptional<z.ZodString>;
    ollamaBaseUrl: z.ZodDefault<z.ZodString>;
    ollamaModel: z.ZodDefault<z.ZodString>;
    temperature: z.ZodDefault<z.ZodNumber>;
    orchestratorUrl: z.ZodDefault<z.ZodString>;
    orchestratorTimeout: z.ZodDefault<z.ZodNumber>;
    thinkerPort: z.ZodDefault<z.ZodNumber>;
    sendResponseDirectly: z.ZodDefault<z.ZodBoolean>;
    thinkerAgentId: z.ZodDefault<z.ZodString>;
    systemPromptPath: z.ZodOptional<z.ZodString>;
    defaultSystemPromptPath: z.ZodOptional<z.ZodString>;
    personaDir: z.ZodDefault<z.ZodString>;
    skillsDir: z.ZodDefault<z.ZodString>;
    proactiveTasksEnabled: z.ZodDefault<z.ZodBoolean>;
    defaultNotifyChatId: z.ZodOptional<z.ZodString>;
    userTimezone: z.ZodDefault<z.ZodString>;
    userName: z.ZodOptional<z.ZodString>;
    userEmail: z.ZodOptional<z.ZodString>;
    logLevel: z.ZodDefault<z.ZodEnum<["debug", "info", "warn", "error"]>>;
    traceLogPath: z.ZodDefault<z.ZodString>;
    sessionsDir: z.ZodDefault<z.ZodString>;
    sessionConfig: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        compactionEnabled: z.ZodDefault<z.ZodBoolean>;
        compactionThresholdChars: z.ZodDefault<z.ZodNumber>;
        compactionKeepRecentTurns: z.ZodDefault<z.ZodNumber>;
        compactionCooldownMs: z.ZodDefault<z.ZodNumber>;
        compactionMinTurns: z.ZodDefault<z.ZodNumber>;
        maxAgeDays: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        compactionEnabled: boolean;
        compactionThresholdChars: number;
        compactionKeepRecentTurns: number;
        compactionCooldownMs: number;
        compactionMinTurns: number;
        maxAgeDays: number;
    }, {
        enabled?: boolean | undefined;
        compactionEnabled?: boolean | undefined;
        compactionThresholdChars?: number | undefined;
        compactionKeepRecentTurns?: number | undefined;
        compactionCooldownMs?: number | undefined;
        compactionMinTurns?: number | undefined;
        maxAgeDays?: number | undefined;
    }>>;
    compactionProvider: z.ZodDefault<z.ZodEnum<["groq", "lmstudio", "ollama"]>>;
    compactionModel: z.ZodDefault<z.ZodString>;
    factExtraction: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        idleMs: z.ZodDefault<z.ZodNumber>;
        maxTurns: z.ZodDefault<z.ZodNumber>;
        confidenceThreshold: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        idleMs: number;
        maxTurns: number;
        confidenceThreshold: number;
    }, {
        enabled?: boolean | undefined;
        idleMs?: number | undefined;
        maxTurns?: number | undefined;
        confidenceThreshold?: number | undefined;
    }>>;
    factExtractionPromptPath: z.ZodOptional<z.ZodString>;
    embeddingCacheDir: z.ZodDefault<z.ZodString>;
    costControl: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        shortWindowMinutes: z.ZodDefault<z.ZodNumber>;
        spikeMultiplier: z.ZodDefault<z.ZodNumber>;
        hardCapTokensPerHour: z.ZodDefault<z.ZodNumber>;
        minimumBaselineTokens: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        shortWindowMinutes: number;
        spikeMultiplier: number;
        hardCapTokensPerHour: number;
        minimumBaselineTokens: number;
    }, {
        enabled: boolean;
        shortWindowMinutes?: number | undefined;
        spikeMultiplier?: number | undefined;
        hardCapTokensPerHour?: number | undefined;
        minimumBaselineTokens?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    thinkerEnabled: boolean;
    llmProvider: "groq" | "lmstudio" | "ollama";
    groqModel: string;
    lmstudioBaseUrl: string;
    ollamaBaseUrl: string;
    ollamaModel: string;
    temperature: number;
    orchestratorUrl: string;
    orchestratorTimeout: number;
    thinkerPort: number;
    sendResponseDirectly: boolean;
    thinkerAgentId: string;
    personaDir: string;
    skillsDir: string;
    proactiveTasksEnabled: boolean;
    userTimezone: string;
    logLevel: "debug" | "info" | "warn" | "error";
    traceLogPath: string;
    sessionsDir: string;
    sessionConfig: {
        enabled: boolean;
        compactionEnabled: boolean;
        compactionThresholdChars: number;
        compactionKeepRecentTurns: number;
        compactionCooldownMs: number;
        compactionMinTurns: number;
        maxAgeDays: number;
    };
    compactionProvider: "groq" | "lmstudio" | "ollama";
    compactionModel: string;
    factExtraction: {
        enabled: boolean;
        idleMs: number;
        maxTurns: number;
        confidenceThreshold: number;
    };
    embeddingCacheDir: string;
    groqApiKey?: string | undefined;
    lmstudioModel?: string | undefined;
    systemPromptPath?: string | undefined;
    defaultSystemPromptPath?: string | undefined;
    defaultNotifyChatId?: string | undefined;
    userName?: string | undefined;
    userEmail?: string | undefined;
    factExtractionPromptPath?: string | undefined;
    costControl?: {
        enabled: boolean;
        shortWindowMinutes: number;
        spikeMultiplier: number;
        hardCapTokensPerHour: number;
        minimumBaselineTokens: number;
    } | undefined;
}, {
    thinkerEnabled?: boolean | undefined;
    llmProvider?: "groq" | "lmstudio" | "ollama" | undefined;
    groqApiKey?: string | undefined;
    groqModel?: string | undefined;
    lmstudioBaseUrl?: string | undefined;
    lmstudioModel?: string | undefined;
    ollamaBaseUrl?: string | undefined;
    ollamaModel?: string | undefined;
    temperature?: number | undefined;
    orchestratorUrl?: string | undefined;
    orchestratorTimeout?: number | undefined;
    thinkerPort?: number | undefined;
    sendResponseDirectly?: boolean | undefined;
    thinkerAgentId?: string | undefined;
    systemPromptPath?: string | undefined;
    defaultSystemPromptPath?: string | undefined;
    personaDir?: string | undefined;
    skillsDir?: string | undefined;
    proactiveTasksEnabled?: boolean | undefined;
    defaultNotifyChatId?: string | undefined;
    userTimezone?: string | undefined;
    userName?: string | undefined;
    userEmail?: string | undefined;
    logLevel?: "debug" | "info" | "warn" | "error" | undefined;
    traceLogPath?: string | undefined;
    sessionsDir?: string | undefined;
    sessionConfig?: {
        enabled?: boolean | undefined;
        compactionEnabled?: boolean | undefined;
        compactionThresholdChars?: number | undefined;
        compactionKeepRecentTurns?: number | undefined;
        compactionCooldownMs?: number | undefined;
        compactionMinTurns?: number | undefined;
        maxAgeDays?: number | undefined;
    } | undefined;
    compactionProvider?: "groq" | "lmstudio" | "ollama" | undefined;
    compactionModel?: string | undefined;
    factExtraction?: {
        enabled?: boolean | undefined;
        idleMs?: number | undefined;
        maxTurns?: number | undefined;
        confidenceThreshold?: number | undefined;
    } | undefined;
    factExtractionPromptPath?: string | undefined;
    embeddingCacheDir?: string | undefined;
    costControl?: {
        enabled: boolean;
        shortWindowMinutes?: number | undefined;
        spikeMultiplier?: number | undefined;
        hardCapTokensPerHour?: number | undefined;
        minimumBaselineTokens?: number | undefined;
    } | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
/**
 * Load configuration from environment variables
 */
export declare function loadConfig(): Config;
/**
 * Validate that required config for selected provider is present
 */
export declare function validateProviderConfig(config: Config): void;
//# sourceMappingURL=config.d.ts.map