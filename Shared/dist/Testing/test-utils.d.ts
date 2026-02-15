/**
 * Common test utilities shared across MCP packages.
 */
/** Generate a unique test identifier */
export declare function testId(prefix?: string): string;
/** Wait for a specified number of milliseconds */
export declare function wait(ms: number): Promise<void>;
type LogLevel = 'info' | 'success' | 'error' | 'warn' | 'debug';
/** Color-coded log line with timestamp */
export declare function log(message: string, level?: LogLevel): void;
/** Print a section header */
export declare function logSection(title: string): void;
/** Print a test result line */
export declare function logResult(testName: string, passed: boolean, details?: string): void;
/** Extract typed data from an MCPToolCallResult */
export declare function extractData<T>(result: {
    success: boolean;
    data?: unknown;
}): T | null;
export {};
//# sourceMappingURL=test-utils.d.ts.map