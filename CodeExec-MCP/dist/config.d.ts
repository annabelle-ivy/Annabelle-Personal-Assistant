/**
 * CodeExec MCP Configuration
 *
 * Zod-validated environment config, forbidden path checking,
 * and environment stripping for subprocess sandboxing.
 */
import { z } from 'zod';
declare const configSchema: z.ZodObject<{
    sandboxDir: z.ZodDefault<z.ZodString>;
    defaultTimeoutMs: z.ZodDefault<z.ZodNumber>;
    maxTimeoutMs: z.ZodDefault<z.ZodNumber>;
    maxOutputChars: z.ZodDefault<z.ZodNumber>;
    truncationHead: z.ZodDefault<z.ZodNumber>;
    truncationTail: z.ZodDefault<z.ZodNumber>;
    logDir: z.ZodDefault<z.ZodString>;
    sessionIdleTimeoutMs: z.ZodDefault<z.ZodNumber>;
    maxSessions: z.ZodDefault<z.ZodNumber>;
    scriptsDir: z.ZodDefault<z.ZodString>;
    maxProcesses: z.ZodDefault<z.ZodNumber>;
    maxFileSizeBytes: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sandboxDir: string;
    defaultTimeoutMs: number;
    maxTimeoutMs: number;
    maxOutputChars: number;
    truncationHead: number;
    truncationTail: number;
    logDir: string;
    sessionIdleTimeoutMs: number;
    maxSessions: number;
    scriptsDir: string;
    maxProcesses: number;
    maxFileSizeBytes: number;
}, {
    sandboxDir?: string | undefined;
    defaultTimeoutMs?: number | undefined;
    maxTimeoutMs?: number | undefined;
    maxOutputChars?: number | undefined;
    truncationHead?: number | undefined;
    truncationTail?: number | undefined;
    logDir?: string | undefined;
    sessionIdleTimeoutMs?: number | undefined;
    maxSessions?: number | undefined;
    scriptsDir?: string | undefined;
    maxProcesses?: number | undefined;
    maxFileSizeBytes?: number | undefined;
}>;
export type CodeExecConfig = z.infer<typeof configSchema>;
export declare function expandHome(p: string): string;
export declare function getConfig(): CodeExecConfig;
/** Reset cached config (for testing) */
export declare function resetConfig(): void;
/**
 * Check if an absolute path falls under a forbidden prefix.
 */
export declare function isForbiddenPath(absolutePath: string): boolean;
/**
 * Build a minimal environment for subprocess execution.
 * Only allowlisted vars pass through — no API keys, tokens, or secrets.
 */
export declare function getStrippedEnv(): Record<string, string>;
export {};
//# sourceMappingURL=config.d.ts.map