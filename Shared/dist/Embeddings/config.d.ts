import { z } from 'zod';
export declare const EmbeddingConfigSchema: z.ZodObject<{
    provider: z.ZodDefault<z.ZodEnum<["ollama", "lmstudio", "huggingface", "none"]>>;
    ollamaBaseUrl: z.ZodDefault<z.ZodString>;
    ollamaModel: z.ZodDefault<z.ZodString>;
    lmstudioBaseUrl: z.ZodDefault<z.ZodString>;
    lmstudioModel: z.ZodDefault<z.ZodString>;
    huggingfaceApiKey: z.ZodOptional<z.ZodString>;
    huggingfaceModel: z.ZodDefault<z.ZodString>;
    dimensions: z.ZodDefault<z.ZodNumber>;
    vectorWeight: z.ZodDefault<z.ZodNumber>;
    textWeight: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    provider: "ollama" | "lmstudio" | "huggingface" | "none";
    ollamaBaseUrl: string;
    ollamaModel: string;
    lmstudioBaseUrl: string;
    lmstudioModel: string;
    huggingfaceModel: string;
    dimensions: number;
    vectorWeight: number;
    textWeight: number;
    huggingfaceApiKey?: string | undefined;
}, {
    provider?: "ollama" | "lmstudio" | "huggingface" | "none" | undefined;
    ollamaBaseUrl?: string | undefined;
    ollamaModel?: string | undefined;
    lmstudioBaseUrl?: string | undefined;
    lmstudioModel?: string | undefined;
    huggingfaceApiKey?: string | undefined;
    huggingfaceModel?: string | undefined;
    dimensions?: number | undefined;
    vectorWeight?: number | undefined;
    textWeight?: number | undefined;
}>;
export type EmbeddingConfig = z.infer<typeof EmbeddingConfigSchema>;
//# sourceMappingURL=config.d.ts.map