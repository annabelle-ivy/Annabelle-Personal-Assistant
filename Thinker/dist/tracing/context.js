import { nanoid } from 'nanoid';
import { TRACE_ID_HEADER } from './types.js';
/**
 * Create a new trace context
 */
export function createTrace(mcp = 'thinker') {
    return {
        traceId: `tr_${nanoid(12)}`,
        startedAt: Date.now(),
        mcp,
    };
}
/**
 * Extract trace context from HTTP headers
 */
export function getTraceFromHeaders(headers, mcp = 'thinker') {
    const traceId = headers[TRACE_ID_HEADER] || headers[TRACE_ID_HEADER.toLowerCase()];
    if (!traceId) {
        return null;
    }
    const id = Array.isArray(traceId) ? traceId[0] : traceId;
    return {
        traceId: id,
        startedAt: Date.now(),
        mcp,
    };
}
/**
 * Create headers object with trace ID for propagation
 */
export function createTraceHeaders(ctx) {
    return {
        [TRACE_ID_HEADER]: ctx.traceId,
    };
}
/**
 * Get or create trace context from headers
 */
export function getOrCreateTrace(headers, mcp = 'thinker') {
    return getTraceFromHeaders(headers, mcp) || createTrace(mcp);
}
/**
 * Calculate duration from trace start
 */
export function getTraceDuration(ctx) {
    return Date.now() - ctx.startedAt;
}
//# sourceMappingURL=context.js.map