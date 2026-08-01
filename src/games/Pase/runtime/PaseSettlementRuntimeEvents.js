class PaseSettlementRuntimeEvents {
  static PASE_SETTLEMENT_RUNTIME_INITIALIZED = "PASE_SETTLEMENT_RUNTIME_INITIALIZED";
  static PASE_ROUND_RESOLVED = "PASE_ROUND_RESOLVED";
  static PASE_ROUND_SETTLED = "PASE_ROUND_SETTLED";
  static PASE_SETTLEMENT_RESULTS_CLEARED = "PASE_SETTLEMENT_RESULTS_CLEARED";
  static PASE_SETTLEMENT_RUNTIME_RESET = "PASE_SETTLEMENT_RUNTIME_RESET";

  static createPaseSettlementRuntimeInitializedEvent() {
    return {
      type: this.PASE_SETTLEMENT_RUNTIME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRoundResolvedEvent(result) {
    return {
      type: this.PASE_ROUND_RESOLVED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseRoundSettledEvent(result) {
    return {
      type: this.PASE_ROUND_SETTLED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseSettlementResultsClearedEvent() {
    return {
      type: this.PASE_SETTLEMENT_RESULTS_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseSettlementRuntimeResetEvent() {
    return {
      type: this.PASE_SETTLEMENT_RUNTIME_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseSettlementRuntimeEvents;
