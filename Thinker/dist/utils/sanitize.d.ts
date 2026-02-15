/**
 * Response sanitization utilities
 *
 * Removes leaked function call syntax, thinking tags, and other technical
 * artifacts that should never appear in user-facing responses.
 */
/**
 * Sanitize LLM response text by removing any leaked function call syntax
 * or internal reasoning that should not be shown to users.
 *
 * @param text - Raw response text from the LLM
 * @returns Cleaned text safe for user display
 */
export declare function sanitizeResponseText(text: string): string;
//# sourceMappingURL=sanitize.d.ts.map