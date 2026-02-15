/**
 * Script Library — filesystem-based storage for reusable code scripts.
 *
 * Each script is a directory containing a code file + metadata.json.
 * A consolidated index.json enables fast listing/searching.
 */
import type { ScriptLanguage, ScriptMetadata, SaveScriptResult, GetScriptResult, RunScriptResult, DeleteScriptResult } from './types.js';
export declare class ScriptLibrary {
    private baseDir;
    constructor(baseDir?: string);
    save(opts: {
        name: string;
        description: string;
        language: ScriptLanguage;
        code: string;
        tags?: string[];
        packages?: string[];
    }): Promise<SaveScriptResult>;
    get(name: string): Promise<GetScriptResult>;
    list(filters?: {
        language?: ScriptLanguage;
        tag?: string;
    }): Promise<ScriptMetadata[]>;
    search(query: string): Promise<ScriptMetadata[]>;
    delete(name: string): Promise<DeleteScriptResult>;
    run(opts: {
        name: string;
        args?: string[];
        timeout_ms?: number;
        working_dir?: string;
    }): Promise<RunScriptResult>;
    private injectArgs;
    private get indexPath();
    readIndex(): Promise<ScriptMetadata[]>;
    private writeIndex;
    private updateIndex;
    private removeFromIndex;
    private updateRunStats;
    private rebuildIndex;
    private readMetadata;
    private getScriptDir;
    slugify(name: string): string;
}
//# sourceMappingURL=library.d.ts.map