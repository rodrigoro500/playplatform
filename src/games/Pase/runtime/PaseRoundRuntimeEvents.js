class PaseRoundRuntimeEvents {
  static PASE_ROUND_RUNTIME_INITIALIZED = "PASE_ROUND_RUNTIME_INITIALIZED";
  static PASE_ROUND_STARTED = "PASE_ROUND_STARTED";
  static PASE_DICE_ROLLED = "PASE_DICE_ROLLED";
  static PASE_RESULT_RESOLVED = "PASE_RESULT_RESOLVED";
  static PASE_SETTLEMENT_COMPLETED = "PASE_SETTLEMENT_COMPLETED";
  static PASE_ROUND_FINISHED = "PASE_ROUND_FINISHED";
  static PASE_ROUND_RUNTIME_RESET = "PASE_ROUND_RUNTIME_RESET";

  static createPaseRoundRuntimeInitializedEvent() {
    return {
      type: this.PASE_ROUND_RUNTIME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRoundStartedEvent() {
    return {
      type: this.PASE_ROUND_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseDiceRolledEvent(result) {
    return {
      type: this.PASE_DICE_ROLLED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseResultResolvedEvent(result) {
    return {
      type: this.PASE_RESULT_RESOLVED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseSettlementCompletedEvent(result) {
    return {
      type: this.PASE_SETTLEMENT_COMPLETED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseRoundFinishedEvent() {
    return {
      type: this.PASE_ROUND_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRoundRuntimeResetEvent() {
    return {
      type: this.PASE_ROUND_RUNTIME_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseRoundRuntimeEvents;
