/**
 * Session tool schemas and handlers.
 *
 * start_session, send_to_session, close_session, list_sessions
 */
import { z } from 'zod';
// ── start_session ───────────────────────────────────────────────────────────
export const startSessionSchema = z.object({
    language: z
        .enum(['python', 'node'])
        .describe('Language for the REPL session'),
    name: z.string().nullish().describe('Optional human-readable session name'),
    working_dir: z
        .string()
        .nullish()
        .describe('Working directory (default: sandbox temp dir)'),
});
export function handleStartSession(manager) {
    return async (input) => {
        return manager.startSession({
            language: input.language,
            name: input.name ?? undefined,
            working_dir: input.working_dir ?? undefined,
        });
    };
}
// ── send_to_session ─────────────────────────────────────────────────────────
export const sendToSessionSchema = z.object({
    session_id: z
        .string()
        .nullish()
        .describe('Session ID from a previous start_session call. If omitted, a new session is created automatically (requires language).'),
    language: z
        .enum(['python', 'node'])
        .nullish()
        .describe('Language for auto-created session. Required when session_id is omitted. Ignored when session_id is provided.'),
    code: z.string().min(1).describe('Code to execute in the session'),
    timeout_ms: z
        .number()
        .int()
        .positive()
        .nullish()
        .describe('Per-execution timeout in ms (default: 30000)'),
});
export function handleSendToSession(manager) {
    return async (input) => {
        return manager.sendToSession({
            sessionId: input.session_id ?? undefined,
            language: input.language ?? undefined,
            code: input.code,
            timeoutMs: input.timeout_ms ?? undefined,
        });
    };
}
// ── close_session ───────────────────────────────────────────────────────────
export const closeSessionSchema = z.object({
    session_id: z.string().min(1).describe('Session ID to close'),
});
export function handleCloseSession(manager) {
    return async (input) => {
        return manager.closeSession(input.session_id, 'manual');
    };
}
// ── list_sessions ───────────────────────────────────────────────────────────
export const listSessionsSchema = z.object({});
export function handleListSessions(manager) {
    return async (_input) => {
        return { sessions: await manager.listSessions() };
    };
}
//# sourceMappingURL=sessions.js.map