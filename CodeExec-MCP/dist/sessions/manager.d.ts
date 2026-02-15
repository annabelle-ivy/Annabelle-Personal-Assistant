/**
 * Session Manager — lifecycle for persistent REPL sessions.
 *
 * Manages long-lived Python/Node REPL processes using wrapper scripts
 * that implement a boundary/sentinel protocol for clean output detection.
 */
import type { SessionLanguage, SessionInfo, SessionExecResult, StartSessionResult, CloseSessionResult, PackageInstallResult } from './types.js';
export declare class SessionManager {
    private sessions;
    startSession(opts: {
        language: SessionLanguage;
        name?: string;
        working_dir?: string;
    }): Promise<StartSessionResult>;
    sendToSession(opts: {
        sessionId?: string;
        language?: SessionLanguage;
        code: string;
        timeoutMs?: number;
    }): Promise<SessionExecResult>;
    sendToSession(sessionId: string, code: string, timeoutMs?: number): Promise<SessionExecResult>;
    private doSend;
    private collectUntilSentinel;
    closeSession(sessionId: string, reason?: 'manual' | 'idle_timeout' | 'process_exit'): Promise<CloseSessionResult>;
    listSessions(): Promise<SessionInfo[]>;
    installPackage(opts: {
        language: SessionLanguage;
        packageName: string;
        sessionId?: string;
    }): Promise<PackageInstallResult>;
    shutdownAll(): Promise<void>;
    private getSession;
    private resetIdleTimer;
    private clearIdleTimer;
    private getMemoryMb;
    private runInstallCommand;
    private parseVersionFromOutput;
}
//# sourceMappingURL=manager.d.ts.map