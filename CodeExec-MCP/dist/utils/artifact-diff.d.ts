/**
 * Working directory before/after diff for artifact detection.
 *
 * Shallow snapshot — only top-level files in the directory.
 */
export interface FileInfo {
    size: number;
    mtimeMs: number;
}
export type DirSnapshot = Map<string, FileInfo>;
/**
 * Take a shallow snapshot of a directory (filenames + size + mtime).
 * Returns empty map if directory doesn't exist or is empty.
 */
export declare function snapshotDir(dirPath: string): Promise<DirSnapshot>;
export interface ArtifactDiff {
    created: string[];
    modified: string[];
    deleted: string[];
}
/**
 * Diff two snapshots to find created, modified, and deleted files.
 */
export declare function diffSnapshots(before: DirSnapshot, after: DirSnapshot): ArtifactDiff;
//# sourceMappingURL=artifact-diff.d.ts.map