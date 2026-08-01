class PaseBetRuntimeEvents {
  static PASE_BET_RUNTIME_INITIALIZED = "PASE_BET_RUNTIME_INITIALIZED";
  static PASE_BET_PLACED = "PASE_BET_PLACED";
  static PASE_BET_CANCELLED = "PASE_BET_CANCELLED";
  static PASE_BET_RUNTIME_RESET = "PASE_BET_RUNTIME_RESET";

  static createPaseBetRuntimeInitializedEvent() {
    return {
      type: this.PASE_BET_RUNTIME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetPlacedEvent(bet) {
    return {
      type: this.PASE_BET_PLACED,
      timestamp: new Date().toISOString(),
      payload: {
        bet,
      },
    };
  }

  static createPaseBetCancelledEvent(id) {
    return {
      type: this.PASE_BET_CANCELLED,
      timestamp: new Date().toISOString(),
      payload: {
        id,
      },
    };
  }

  static createPaseBetRuntimeResetEvent() {
    return {
      type: this.PASE_BET_RUNTIME_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseBetRuntimeEvents;
