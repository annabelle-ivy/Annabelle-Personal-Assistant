/**
 * Common test utilities shared across MCP packages.
 */
/** Generate a unique test identifier */
export function testId(prefix = 'TEST') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
/** Wait for a specified number of milliseconds */
export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// ─── Logging ──────────────────────────────────────────────────────
const COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};
function timestamp() {
    return new Date().toISOString().split('T')[1].slice(0, 12);
}
const LOG_COLORS = {
    info: COLORS.blue,
    success: COLORS.green,
    error: COLORS.red,
    warn: COLORS.yellow,
    debug: COLORS.dim,
};
const LOG_ICONS = {
    info: 'ℹ',
    success: '✓',
    error: '✗',
    warn: '⚠',
    debug: '→',
};
/** Color-coded log line with timestamp */
export function log(message, level = 'info') {
    const ts = timestamp();
    console.log(`${COLORS.dim}[${ts}]${COLORS.reset} ${LOG_COLORS[level]}${LOG_ICONS[level]} ${message}${COLORS.reset}`);
}
/** Print a section header */
export function logSection(title) {
    console.log(`\n${COLORS.bright}${COLORS.cyan}━━━ ${title} ━━━${COLORS.reset}\n`);
}
/** Print a test result line */
export function logResult(testName, passed, details) {
    const icon = passed ? `${COLORS.green}✓` : `${COLORS.red}✗`;
    const status = passed ? 'PASS' : 'FAIL';
    console.log(`  ${icon} ${COLORS.bright}${testName}${COLORS.reset} [${status}]`);
    if (details) {
        console.log(`    ${COLORS.dim}${details}${COLORS.reset}`);
    }
}
/** Extract typed data from an MCPToolCallResult */
export function extractData(result) {
    if (!result.success || !result.data)
        return null;
    return result.data;
}
//# sourceMappingURL=test-utils.js.map