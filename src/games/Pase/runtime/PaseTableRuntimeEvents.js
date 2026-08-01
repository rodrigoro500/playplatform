class PaseTableRuntimeEvents {
  static PASE_TABLE_RUNTIME_INITIALIZED = "PASE_TABLE_RUNTIME_INITIALIZED";
  static PASE_TABLE_STARTED = "PASE_TABLE_STARTED";
  static PASE_TABLE_ROUND_PLAYED = "PASE_TABLE_ROUND_PLAYED";
  static PASE_TABLE_FINISHED = "PASE_TABLE_FINISHED";
  static PASE_TABLE_RUNTIME_RESET = "PASE_TABLE_RUNTIME_RESET";

  static createPaseTableRuntimeInitializedEvent() {
    return {
      type: this.PASE_TABLE_RUNTIME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableStartedEvent() {
    return {
      type: this.PASE_TABLE_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableRoundPlayedEvent(result) {
    return {
      type: this.PASE_TABLE_ROUND_PLAYED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseTableFinishedEvent() {
    return {
      type: this.PASE_TABLE_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableRuntimeResetEvent() {
    return {
      type: this.PASE_TABLE_RUNTIME_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseTableRuntimeEvents;
