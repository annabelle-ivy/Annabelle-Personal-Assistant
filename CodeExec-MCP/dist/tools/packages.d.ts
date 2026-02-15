/**
 * Package management tool schema and handler.
 *
 * install_package — pip/npm install into a session or globally.
 */
import { z } from 'zod';
import type { SessionManager } from '../sessions/manager.js';
export declare const installPackageSchema: z.ZodObject<{
    language: z.ZodEnum<["python", "node"]>;
    package: z.ZodString;
    session_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    language: "python" | "node";
    package: string;
    session_id?: string | null | undefined;
}, {
    language: "python" | "node";
    package: string;
    session_id?: string | null | undefined;
}>;
export type InstallPackageInput = z.infer<typeof installPackageSchema>;
export declare function handleInstallPackage(manager: SessionManager): (input: InstallPackageInput) => Promise<import("../sessions/types.js").PackageInstallResult>;
//# sourceMappingURL=packages.d.ts.map