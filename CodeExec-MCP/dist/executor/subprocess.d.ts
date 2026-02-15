/**
 * Subprocess sandbox executor.
 *
 * Spawns a child process to run code with:
 * - Stripped environment (no API keys/tokens)
 * - Timeout enforcement (SIGTERM → 5s grace → SIGKILL)
 * - Output capture and truncation
 * - Artifact detection via directory diff
 */
import type { ExecutionRequest, ExecutionResult } from './types.js';
export declare function executeInSubprocess(request: ExecutionRequest): Promise<ExecutionResult>;
//# sourceMappingURL=subprocess.d.ts.map