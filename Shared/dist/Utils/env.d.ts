/**
 * Safely load .env from the package root. Prevents dotenv v17 from writing
 * debug output to stdout, which corrupts MCP stdio transport.
 *
 * @param importMetaUrl - pass `import.meta.url` from the entry point
 * @param levelsUp - directories up from compiled file to package root (default: 1 for src/index.ts)
 */
export declare function loadEnvSafely(importMetaUrl: string, levelsUp?: number): void;
//# sourceMappingURL=env.d.ts.map