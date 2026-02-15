/**
 * PlaybookSeed - Default playbook definitions seeded on first startup.
 * Idempotent: existing playbooks are never overwritten.
 */
import type { OrchestratorClient } from '../orchestrator/client.js';
import type { TraceContext } from '../tracing/types.js';
interface PlaybookSeed {
    name: string;
    description: string;
    trigger_type: 'event';
    trigger_config: {
        keywords: string[];
        priority: number;
    };
    instructions: string;
    required_tools: string[];
    max_steps: number;
    notify_on_completion: boolean;
}
export declare const DEFAULT_PLAYBOOKS: PlaybookSeed[];
/**
 * Seed default playbooks into Memorizer.
 * Creates new playbooks and updates existing ones if instructions have changed.
 */
export declare function seedPlaybooks(orchestrator: OrchestratorClient, agentId: string, trace?: TraceContext): Promise<number>;
export {};
//# sourceMappingURL=playbook-seed.d.ts.map