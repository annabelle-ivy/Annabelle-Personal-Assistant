/**
 * execute_code tool — one-shot sandboxed code execution.
 */
import { z } from 'zod';
import type { ExecutionResult } from '../executor/types.js';
export declare const executeCodeSchema: z.ZodObject<{
    language: z.ZodEnum<["python", "node", "bash"]>;
    code: z.ZodString;
    timeout_ms: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    working_dir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    language: "python" | "node" | "bash";
    timeout_ms?: number | null | undefined;
    working_dir?: string | null | undefined;
}, {
    code: string;
    language: "python" | "node" | "bash";
    timeout_ms?: number | null | undefined;
    working_dir?: string | null | undefined;
}>;
export type ExecuteCodeInput = z.infer<typeof executeCodeSchema>;
export declare function handleExecuteCode(input: ExecuteCodeInput): Promise<ExecutionResult>;
//# sourceMappingURL=execute-code.d.ts.map