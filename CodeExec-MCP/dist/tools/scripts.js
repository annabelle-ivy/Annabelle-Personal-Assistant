/**
 * Script Library tool schemas and handlers.
 *
 * save_script, get_script, list_scripts, search_scripts, run_script, delete_script
 */
import { z } from 'zod';
// ── save_script ────────────────────────────────────────────────────────────
export const saveScriptSchema = z.object({
    name: z.string().min(1).describe('Script name (will be slugified for storage)'),
    description: z.string().min(1).describe('What this script does'),
    language: z.enum(['python', 'node', 'bash']).describe('Programming language'),
    code: z.string().min(1).describe('The script code'),
    tags: z
        .array(z.string())
        .nullish()
        .describe('Tags for categorization (e.g., ["data", "csv"])'),
    packages: z
        .array(z.string())
        .nullish()
        .describe('Required packages (e.g., ["pandas", "openpyxl"])'),
});
export function handleSaveScript(library) {
    return async (input) => {
        return library.save({
            name: input.name,
            description: input.description,
            language: input.language,
            code: input.code,
            tags: input.tags ?? undefined,
            packages: input.packages ?? undefined,
        });
    };
}
// ── get_script ─────────────────────────────────────────────────────────────
export const getScriptSchema = z.object({
    name: z.string().min(1).describe('Script name to retrieve'),
});
export function handleGetScript(library) {
    return async (input) => {
        return library.get(input.name);
    };
}
// ── list_scripts ───────────────────────────────────────────────────────────
export const listScriptsSchema = z.object({
    language: z
        .enum(['python', 'node', 'bash'])
        .nullish()
        .describe('Filter by language'),
    tag: z.string().nullish().describe('Filter by tag'),
});
export function handleListScripts(library) {
    return async (input) => {
        const scripts = await library.list({
            language: input.language ?? undefined,
            tag: input.tag ?? undefined,
        });
        return { scripts };
    };
}
// ── search_scripts ─────────────────────────────────────────────────────────
export const searchScriptsSchema = z.object({
    query: z.string().min(1).describe('Search query (matches name, description, tags)'),
});
export function handleSearchScripts(library) {
    return async (input) => {
        const scripts = await library.search(input.query);
        return { scripts };
    };
}
// ── run_script ─────────────────────────────────────────────────────────────
export const runScriptSchema = z.object({
    name: z.string().min(1).describe('Script name to run'),
    args: z
        .array(z.string())
        .nullish()
        .describe('Arguments passed to the script (available via sys.argv / process.argv / $@)'),
    timeout_ms: z
        .number()
        .int()
        .positive()
        .nullish()
        .describe('Timeout in ms (default: 30000, max: 300000)'),
    working_dir: z
        .string()
        .nullish()
        .describe('Working directory for script execution'),
});
export function handleRunScript(library) {
    return async (input) => {
        return library.run({
            name: input.name,
            args: input.args ?? undefined,
            timeout_ms: input.timeout_ms ?? undefined,
            working_dir: input.working_dir ?? undefined,
        });
    };
}
// ── save_and_run_script ────────────────────────────────────────────────────
export const saveAndRunScriptSchema = z.object({
    name: z.string().min(1).describe('Script name (will be slugified for storage)'),
    description: z.string().min(1).describe('What this script does'),
    language: z.enum(['python', 'node', 'bash']).describe('Programming language'),
    code: z.string().min(1).describe('The script code'),
    tags: z
        .array(z.string())
        .nullish()
        .describe('Tags for categorization'),
    packages: z
        .array(z.string())
        .nullish()
        .describe('Required packages'),
    args: z
        .array(z.string())
        .nullish()
        .describe('Arguments passed to the script'),
    timeout_ms: z
        .number()
        .int()
        .positive()
        .nullish()
        .describe('Timeout in ms (default: 30000, max: 300000)'),
    working_dir: z
        .string()
        .nullish()
        .describe('Working directory for script execution'),
});
export function handleSaveAndRunScript(library) {
    return async (input) => {
        const saved = await library.save({
            name: input.name,
            description: input.description,
            language: input.language,
            code: input.code,
            tags: input.tags ?? undefined,
            packages: input.packages ?? undefined,
        });
        const run = await library.run({
            name: saved.name,
            args: input.args ?? undefined,
            timeout_ms: input.timeout_ms ?? undefined,
            working_dir: input.working_dir ?? undefined,
        });
        return { saved, run };
    };
}
// ── delete_script ──────────────────────────────────────────────────────────
export const deleteScriptSchema = z.object({
    name: z.string().min(1).describe('Script name to delete'),
});
export function handleDeleteScript(library) {
    return async (input) => {
        return library.delete(input.name);
    };
}
//# sourceMappingURL=scripts.js.map