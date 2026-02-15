/**
 * Head+tail output truncation.
 *
 * When output exceeds the limit, keeps the first `head` characters and the
 * last `tail` characters with a separator in between. This preserves both
 * the beginning (typically key results) and the end (typically errors/status).
 */
export interface TruncateConfig {
    maxChars: number;
    head: number;
    tail: number;
}
export interface TruncateResult {
    text: string;
    truncated: boolean;
}
export declare function truncateOutput(output: string, config: TruncateConfig): TruncateResult;
//# sourceMappingURL=output-truncate.d.ts.map