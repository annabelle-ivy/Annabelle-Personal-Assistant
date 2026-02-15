/**
 * Head+tail output truncation.
 *
 * When output exceeds the limit, keeps the first `head` characters and the
 * last `tail` characters with a separator in between. This preserves both
 * the beginning (typically key results) and the end (typically errors/status).
 */
export function truncateOutput(output, config) {
    if (output.length <= config.maxChars) {
        return { text: output, truncated: false };
    }
    const dropped = output.length - config.head - config.tail;
    const separator = `\n\n[... truncated ${dropped} characters ...]\n\n`;
    const text = output.slice(0, config.head) + separator + output.slice(-config.tail);
    return { text, truncated: true };
}
//# sourceMappingURL=output-truncate.js.map