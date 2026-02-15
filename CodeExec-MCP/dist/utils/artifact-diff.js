/**
 * Working directory before/after diff for artifact detection.
 *
 * Shallow snapshot — only top-level files in the directory.
 */
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
/**
 * Take a shallow snapshot of a directory (filenames + size + mtime).
 * Returns empty map if directory doesn't exist or is empty.
 */
export async function snapshotDir(dirPath) {
    const snapshot = new Map();
    let entries;
    try {
        entries = await readdir(dirPath);
    }
    catch {
        return snapshot;
    }
    for (const entry of entries) {
        try {
            const s = await stat(join(dirPath, entry));
            if (s.isFile()) {
                snapshot.set(entry, { size: s.size, mtimeMs: s.mtimeMs });
            }
        }
        catch {
            // Skip files we can't stat
        }
    }
    return snapshot;
}
/**
 * Diff two snapshots to find created, modified, and deleted files.
 */
export function diffSnapshots(before, after) {
    const created = [];
    const modified = [];
    const deleted = [];
    // Files in after but not in before → created
    // Files in both but changed → modified
    for (const [name, afterInfo] of after) {
        const beforeInfo = before.get(name);
        if (!beforeInfo) {
            created.push(name);
        }
        else if (beforeInfo.size !== afterInfo.size ||
            beforeInfo.mtimeMs !== afterInfo.mtimeMs) {
            modified.push(name);
        }
    }
    // Files in before but not in after → deleted
    for (const name of before.keys()) {
        if (!after.has(name)) {
            deleted.push(name);
        }
    }
    return { created, modified, deleted };
}
//# sourceMappingURL=artifact-diff.js.map