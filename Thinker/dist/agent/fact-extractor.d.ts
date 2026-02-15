import { type LanguageModelV1 } from 'ai';
import { z } from 'zod';
/**
 * Schema for a single extracted fact
 */
declare const ExtractedFactSchema: z.ZodObject<{
    fact: z.ZodString;
    category: z.ZodEnum<["preference", "background", "contact", "project", "decision", "pattern"]>;
    confidence: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    fact: string;
    category: "preference" | "background" | "pattern" | "project" | "contact" | "decision";
    confidence: number;
}, {
    fact: string;
    category: "preference" | "background" | "pattern" | "project" | "contact" | "decision";
    confidence: number;
}>;
export interface ExtractedFact {
    fact: string;
    category: z.infer<typeof ExtractedFactSchema>['category'];
    confidence: number;
}
/**
 * Load the extraction prompt template from a file.
 * Called once at startup from Agent.initialize().
 * Template should contain {{KNOWN_FACTS}} and {{CONVERSATION}} placeholders.
 */
export declare function loadExtractionPromptTemplate(filePath?: string): Promise<void>;
export interface UserIdentity {
    name?: string;
    email?: string;
}
/**
 * Extract facts from a recent conversation using a cheap LLM model.
 *
 * This is a post-conversation extraction step that reviews multiple turns
 * with awareness of already-known facts, complementing the per-turn
 * extraction in Memorizer-MCP's store_conversation.
 *
 * @param model - Cheap LLM model (e.g. Groq Llama 8B) from ModelFactory.getCompactionModel()
 * @param recentMessages - Recent conversation turns to analyze
 * @param knownFacts - Already-known fact strings for deduplication
 * @param confidenceThreshold - Minimum confidence to include a fact (default 0.7)
 * @param userIdentity - Optional user name/email to avoid extracting "meeting with self" facts
 * @returns Extracted facts, or empty array on any error
 */
export declare function extractFactsFromConversation(model: LanguageModelV1, recentMessages: Array<{
    role: string;
    content: string;
}>, knownFacts: string[], confidenceThreshold?: number, userIdentity?: UserIdentity): Promise<ExtractedFact[]>;
export {};
//# sourceMappingURL=fact-extractor.d.ts.map