/**
 * CostMonitor — Sliding-window anomaly detector for LLM token consumption.
 *
 * Maintains a 60-bucket ring buffer (one bucket per minute, covering 1 hour).
 * After each LLM call, tokens are recorded and two checks run:
 *
 *   1. Spike detection — compares the short-window rate (last N minutes)
 *      against the baseline rate (remaining history). A spike is declared
 *      when short > baseline × spikeMultiplier AND the baseline has enough
 *      data (minimumBaselineTokens) to be meaningful.
 *
 *   2. Hard cap — total tokens in the full 60-minute window must not
 *      exceed hardCapTokensPerHour.
 *
 * When either threshold triggers, the monitor enters a "paused" state.
 * The owning Agent checks this flag and stops processing new messages.
 */
import type { CostControlConfig, CostStatus } from './types.js';
export declare class CostMonitor {
    private buckets;
    private config;
    private _paused;
    private _pauseReason;
    private _pausedAt;
    constructor(config: CostControlConfig);
    /**
     * Record token usage from a single generateText() call.
     * Advances the window if the minute has changed, then checks thresholds.
     */
    recordUsage(promptTokens: number, completionTokens: number): void;
    get paused(): boolean;
    get pauseReason(): string | null;
    /**
     * Resume processing. Optionally resets the entire window
     * (useful if the spike was caused by a one-off event and you
     * don't want the old data to immediately re-trigger).
     */
    resume(resetWindow?: boolean): void;
    /**
     * Snapshot of current state for the /cost-status HTTP endpoint.
     */
    getStatus(): CostStatus;
    /**
     * Slide the window forward so the last bucket corresponds to the current minute.
     * Any buckets that have fallen out of the 60-minute window are zeroed and recycled.
     */
    private advanceWindow;
    /**
     * Compute the short-window and baseline rates (tokens per minute).
     *
     * Baseline rate is computed over *active* buckets only (those with at least
     * one LLM call). This prevents empty buckets from diluting the rate and
     * causing false spikes during ramp-up or idle periods.
     */
    private computeRates;
    /**
     * Check both spike detection and hard cap.
     */
    private checkThresholds;
    private totalTokensInWindow;
    private countActiveBuckets;
}
//# sourceMappingURL=monitor.d.ts.map