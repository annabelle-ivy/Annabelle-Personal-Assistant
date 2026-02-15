/**
 * Session tool schemas and handlers.
 *
 * start_session, send_to_session, close_session, list_sessions
 */
import { z } from 'zod';
import type { SessionManager } from '../sessions/manager.js';
export declare const startSessionSchema: z.ZodObject<{
    language: z.ZodEnum<["python", "node"]>;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    working_dir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    language: "python" | "node";
    name?: string | null | undefined;
    working_dir?: string | null | undefined;
}, {
    language: "python" | "node";
    name?: string | null | undefined;
    working_dir?: string | null | undefined;
}>;
export type StartSessionInput = z.infer<typeof startSessionSchema>;
export declare function handleStartSession(manager: SessionManager): (input: StartSessionInput) => Promise<import("../sessions/types.js").StartSessionResult>;
export declare const sendToSessionSchema: z.ZodObject<{
    session_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    language: z.ZodOptional<z.ZodNullable<z.ZodEnum<["python", "node"]>>>;
    code: z.ZodString;
    timeout_ms: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    language?: "python" | "node" | null | undefined;
    timeout_ms?: number | null | undefined;
    session_id?: string | null | undefined;
}, {
    code: string;
    language?: "python" | "node" | null | undefined;
    timeout_ms?: number | null | undefined;
    session_id?: string | null | undefined;
}>;
export type SendToSessionInput = z.infer<typeof sendToSessionSchema>;
export declare function handleSendToSession(manager: SessionManager): (input: SendToSessionInput) => Promise<import("../sessions/types.js").SessionExecResult>;
export declare const closeSessionSchema: z.ZodObject<{
    session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    session_id: string;
}, {
    session_id: string;
}>;
export type CloseSessionInput = z.infer<typeof closeSessionSchema>;
export declare function handleCloseSession(manager: SessionManager): (input: CloseSessionInput) => Promise<import("../sessions/types.js").CloseSessionResult>;
export declare const listSessionsSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export type ListSessionsInput = z.infer<typeof listSessionsSchema>;
export declare function handleListSessions(manager: SessionManager): (_input: ListSessionsInput) => Promise<{
    sessions: import("../sessions/types.js").SessionInfo[];
}>;
//# sourceMappingURL=sessions.d.ts.map