class PaseMatchRuntimeEvents {
  static PASE_MATCH_RUNTIME_INITIALIZED = "PASE_MATCH_RUNTIME_INITIALIZED";
  static PASE_MATCH_STARTED = "PASE_MATCH_STARTED";
  static PASE_MATCH_ROUND_PLAYED = "PASE_MATCH_ROUND_PLAYED";
  static PASE_MATCH_FINISHED = "PASE_MATCH_FINISHED";
  static PASE_MATCH_RUNTIME_RESET = "PASE_MATCH_RUNTIME_RESET";

  static createPaseMatchRuntimeInitializedEvent() {
    return {
      type: this.PASE_MATCH_RUNTIME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseMatchStartedEvent() {
    return {
      type: this.PASE_MATCH_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseMatchRoundPlayedEvent(result) {
    return {
      type: this.PASE_MATCH_ROUND_PLAYED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseMatchFinishedEvent() {
    return {
      type: this.PASE_MATCH_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseMatchRuntimeResetEvent() {
    return {
      type: this.PASE_MATCH_RUNTIME_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseMatchRuntimeEvents;
