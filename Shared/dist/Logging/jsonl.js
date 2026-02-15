/**
 * Generic JSONL (JSON Lines) audit logger
 * Used for structured logging to JSONL files
 */
import { appendFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
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
export class JsonlLogger {
    logPath;
    initialized = false;
    constructor(logPath) {
        this.logPath = logPath;
    }
    /**
     * Ensure the log directory exists
     */
    async ensureDir() {
        if (this.initialized)
            return;
        const dir = dirname(this.logPath);
        if (!existsSync(dir)) {
            await mkdir(dir, { recursive: true });
        }
        this.initialized = true;
    }
    /**
     * Write an entry to the audit log
     */
    async write(entry) {
        await this.ensureDir();
        const line = JSON.stringify(entry) + '\n';
        await appendFile(this.logPath, line, 'utf-8');
    }
    /**
     * Read entries from the audit log with optional filtering
     */
    async read(options = {}) {
        await this.ensureDir();
        if (!existsSync(this.logPath)) {
            return [];
        }
        const content = await readFile(this.logPath, 'utf-8');
        const lines = content.trim().split('\n').filter(Boolean);
        let entries = lines
            .map((line) => {
            try {
                return JSON.parse(line);
            }
            catch {
                return null;
            }
        })
            .filter((e) => e !== null);
        // Apply filter if provided
        if (options.filter) {
            entries = entries.filter(options.filter);
        }
        // Sort by timestamp (default: descending)
        const sortDescending = options.sortDescending ?? true;
        entries.sort((a, b) => {
            const timeA = new Date(a.timestamp).getTime();
            const timeB = new Date(b.timestamp).getTime();
            return sortDescending ? timeB - timeA : timeA - timeB;
        });
        // Apply limit
        const limit = options.limit ?? 100;
        return entries.slice(0, limit);
    }
    /**
     * Get the log file path
     */
    getPath() {
        return this.logPath;
    }
}
/**
 * Create a timestamped audit entry
 * Helper to ensure consistent timestamp format
 */
export function createTimestamp() {
    return new Date().toISOString();
}
//# sourceMappingURL=jsonl.js.map