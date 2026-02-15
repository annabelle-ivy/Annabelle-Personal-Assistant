/**
 * Script Library tool schemas and handlers.
 *
 * save_script, get_script, list_scripts, search_scripts, run_script, delete_script
 */
import { z } from 'zod';
import type { ScriptLibrary } from '../scripts/library.js';
export declare const saveScriptSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    language: z.ZodEnum<["python", "node", "bash"]>;
    code: z.ZodString;
    tags: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    packages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    language: "python" | "node" | "bash";
    description: string;
    tags?: string[] | null | undefined;
    packages?: string[] | null | undefined;
}, {
    code: string;
    name: string;
    language: "python" | "node" | "bash";
    description: string;
    tags?: string[] | null | undefined;
    packages?: string[] | null | undefined;
}>;
export type SaveScriptInput = z.infer<typeof saveScriptSchema>;
export declare function handleSaveScript(library: ScriptLibrary): (input: SaveScriptInput) => Promise<import("../scripts/types.js").SaveScriptResult>;
export declare const getScriptSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type GetScriptInput = z.infer<typeof getScriptSchema>;
export declare function handleGetScript(library: ScriptLibrary): (input: GetScriptInput) => Promise<import("../scripts/types.js").GetScriptResult>;
export declare const listScriptsSchema: z.ZodObject<{
    language: z.ZodOptional<z.ZodNullable<z.ZodEnum<["python", "node", "bash"]>>>;
    tag: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    language?: "python" | "node" | "bash" | null | undefined;
    tag?: string | null | undefined;
}, {
    language?: "python" | "node" | "bash" | null | undefined;
    tag?: string | null | undefined;
}>;
export type ListScriptsInput = z.infer<typeof listScriptsSchema>;
export declare function handleListScripts(library: ScriptLibrary): (input: ListScriptsInput) => Promise<{
    scripts: import("../scripts/types.js").ScriptMetadata[];
}>;
export declare const searchScriptsSchema: z.ZodObject<{
    query: z.ZodString;
}, "strip", z.ZodTypeAny, {
    query: string;
}, {
    query: string;
}>;
export type SearchScriptsInput = z.infer<typeof searchScriptsSchema>;
export declare function handleSearchScripts(library: ScriptLibrary): (input: SearchScriptsInput) => Promise<{
    scripts: import("../scripts/types.js").ScriptMetadata[];
}>;
export declare const runScriptSchema: z.ZodObject<{
    name: z.ZodString;
    args: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    timeout_ms: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    working_dir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    args?: string[] | null | undefined;
    timeout_ms?: number | null | undefined;
    working_dir?: string | null | undefined;
}, {
    name: string;
    args?: string[] | null | undefined;
    timeout_ms?: number | null | undefined;
    working_dir?: string | null | undefined;
}>;
export type RunScriptInput = z.infer<typeof runScriptSchema>;
export declare function handleRunScript(library: ScriptLibrary): (input: RunScriptInput) => Promise<import("../scripts/types.js").RunScriptResult>;
export declare const saveAndRunScriptSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    language: z.ZodEnum<["python", "node", "bash"]>;
    code: z.ZodString;
    tags: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    packages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    args: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
    timeout_ms: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    working_dir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    language: "python" | "node" | "bash";
    description: string;
    args?: string[] | null | undefined;
    timeout_ms?: number | null | undefined;
    working_dir?: string | null | undefined;
    tags?: string[] | null | undefined;
    packages?: string[] | null | undefined;
}, {
    code: string;
    name: string;
    language: "python" | "node" | "bash";
    description: string;
    args?: string[] | null | undefined;
    timeout_ms?: number | null | undefined;
    working_dir?: string | null | undefined;
    tags?: string[] | null | undefined;
    packages?: string[] | null | undefined;
}>;
export type SaveAndRunScriptInput = z.infer<typeof saveAndRunScriptSchema>;
export declare function handleSaveAndRunScript(library: ScriptLibrary): (input: SaveAndRunScriptInput) => Promise<{
    saved: import("../scripts/types.js").SaveScriptResult;
    run: import("../scripts/types.js").RunScriptResult;
}>;
export declare const deleteScriptSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type DeleteScriptInput = z.infer<typeof deleteScriptSchema>;
export declare function handleDeleteScript(library: ScriptLibrary): (input: DeleteScriptInput) => Promise<import("../scripts/types.js").DeleteScriptResult>;
//# sourceMappingURL=scripts.d.ts.map