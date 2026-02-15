/**
 * Generic JSONL (JSON Lines) audit logger
 * Used for structured logging to JSONL files
 */
/**
 * Base interface for audit entries
 * All audit entries must have a timestamp
 */
export interface BaseAuditEntry {
    timestamp: string;
    [key: string]: unknown;
}
/**
 * Query options for reading audit logs
 */
export interface AuditReadOptions<T> {
    /** Maximum number of entries to return (default: 100) */
    limit?: number;
    /** Filter function to include/exclude entries */
    filter?: (entry: T) => boolean;
    /** Sort by timestamp descending (most recent first) - default: true */
    sortDescending?: boolean;
}
/**
 * Generic JSONL logger for audit trails
 *
 * @example
 * ```typescript
 * interface FileAuditEntry extends BaseAuditEntry {
 *   operation: string;
 *   path: string;
 *   success: boolean;
 * }
 *
 * const auditLog = new JsonlLogger<FileAuditEntry>('/var/log/audit.jsonl');
 * await auditLog.write({
 *   timestamp: new Date().toISOString(),
 *   operation: 'read',
 *   path: '/tmp/file.txt',
 *   success: true,
 * });
 * ```
 */
export declare class JsonlLogger<T extends BaseAuditEntry> {
    private logPath;
    private initialized;
    constructor(logPath: string);
    /**
     * Ensure the log directory exists
     */
    private ensureDir;
    /**
     * Write an entry to the audit log
     */
    write(entry: T): Promise<void>;
    /**
     * Read entries from the audit log with optional filtering
     */
    read(options?: AuditReadOptions<T>): Promise<T[]>;
    /**
     * Get the log file path
     */
    getPath(): string;
}
/**
 * Create a timestamped audit entry
 * Helper to ensure consistent timestamp format
 */
export declare function createTimestamp(): string;
//# sourceMappingURL=jsonl.d.ts.map