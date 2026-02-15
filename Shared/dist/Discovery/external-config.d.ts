/**
 * Schema and types for external MCP configuration.
 *
 * External MCPs are declared in ~/.annabelle/external-mcps.json and merged
 * into the Orchestrator's stdio MCP config alongside auto-discovered internal MCPs.
 */
import { z } from 'zod';
export declare const ExternalMCPConfigSchema: z.ZodObject<{
    command: z.ZodString;
    args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    timeout: z.ZodDefault<z.ZodNumber>;
    sensitive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        toolGroup: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        guardianScan: z.ZodOptional<z.ZodObject<{
            input: z.ZodOptional<z.ZodBoolean>;
            output: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            input?: boolean | undefined;
            output?: boolean | undefined;
        }, {
            input?: boolean | undefined;
            output?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    }, {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    command: string;
    timeout: number;
    sensitive: boolean;
    args?: string[] | undefined;
    env?: Record<string, string> | undefined;
    description?: string | undefined;
    metadata?: {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    } | undefined;
}, {
    command: string;
    args?: string[] | undefined;
    env?: Record<string, string> | undefined;
    timeout?: number | undefined;
    sensitive?: boolean | undefined;
    description?: string | undefined;
    metadata?: {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    } | undefined;
}>;
export type ExternalMCPConfig = z.infer<typeof ExternalMCPConfigSchema>;
export declare const ExternalMCPsFileSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    command: z.ZodString;
    args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    timeout: z.ZodDefault<z.ZodNumber>;
    sensitive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        toolGroup: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        guardianScan: z.ZodOptional<z.ZodObject<{
            input: z.ZodOptional<z.ZodBoolean>;
            output: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            input?: boolean | undefined;
            output?: boolean | undefined;
        }, {
            input?: boolean | undefined;
            output?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    }, {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    command: string;
    timeout: number;
    sensitive: boolean;
    args?: string[] | undefined;
    env?: Record<string, string> | undefined;
    description?: string | undefined;
    metadata?: {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    } | undefined;
}, {
    command: string;
    args?: string[] | undefined;
    env?: Record<string, string> | undefined;
    timeout?: number | undefined;
    sensitive?: boolean | undefined;
    description?: string | undefined;
    metadata?: {
        label?: string | undefined;
        toolGroup?: string | undefined;
        keywords?: string[] | undefined;
        guardianScan?: {
            input?: boolean | undefined;
            output?: boolean | undefined;
        } | undefined;
    } | undefined;
}>>;
export type ExternalMCPsFile = z.infer<typeof ExternalMCPsFileSchema>;
//# sourceMappingURL=external-config.d.ts.map