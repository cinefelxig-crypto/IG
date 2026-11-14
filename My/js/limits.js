/* ═══════════════════════════════════════════════════════════════
   SWASTIK ENTERPRISE — UNIFIED SYSTEM LIMITS & CONSTANTS
   Single Source of Truth for Fleet Capacities, Rates & Timeouts
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const LIMITS = Object.freeze({
    // Fleet & Account Quota Configuration
    dailyLimitPerAccount: 450,
    totalFleetAccounts: 5,
    get totalFleetCapacity() {
      return this.dailyLimitPerAccount * this.totalFleetAccounts; // 2,250
    },

    // Client & Email Generation Rules
    emailsPerClient: 1,
    defaultBatchSize: 50,
    maxBatchSize: 500,

    // Safe Rate-Limiting Dispatch Rules (Ultra-fast multi-sender round-robin pacing)
    minDispatchDelayMs: 50,
    maxDispatchDelayMs: 100,

    // Real Async Pipeline Durations
    minPipelineDurationMs: 5000,
    maxPipelineDurationMs: 10000,
    minSendDurationMs: 2500,
    maxSendDurationMs: 3800,

    // Rolling Reset Window
    rollingResetHours: 24,

    // Deduplication Safety Constraints
    maxIntraBatchDuplicates: 0,
    allowHistoricalRepeat: false
  });

  // Expose globally to window and CommonJS if present
  if (typeof window !== 'undefined') {
    window.LIMITS = LIMITS;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LIMITS;
  }
})();

