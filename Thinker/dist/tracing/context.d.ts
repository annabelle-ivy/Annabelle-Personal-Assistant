import type { TraceContext } from './types.js';
/**
 * Create a new trace context
 */
export declare function createTrace(mcp?: string): TraceContext;
/**
 * Extract trace context from HTTP headers
 */
export declare function getTraceFromHeaders(headers: Record<string, string | string[] | undefined>, mcp?: string): TraceContext | null;
/**
 * Create headers object with trace ID for propagation
 */
export declare function createTraceHeaders(ctx: TraceContext): Record<string, string>;
/**
 * Get or create trace context from headers
 */
export declare function getOrCreateTrace(headers: Record<string, string | string[] | undefined>, mcp?: string): TraceContext;
/**
 * Calculate duration from trace start
 */
export declare function getTraceDuration(ctx: TraceContext): number;
//# sourceMappingURL=context.d.ts.map