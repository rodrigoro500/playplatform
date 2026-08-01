class PaseGameRuntimeEvents {
  static PASE_RUNTIME_INITIALIZED = "PASE_RUNTIME_INITIALIZED";
  static PASE_RUNTIME_STARTED = "PASE_RUNTIME_STARTED";
  static PASE_RUNTIME_ROLLED = "PASE_RUNTIME_ROLLED";
  static PASE_RUNTIME_RESOLVED = "PASE_RUNTIME_RESOLVED";
  static PASE_RUNTIME_FINISHED = "PASE_RUNTIME_FINISHED";
  static PASE_RUNTIME_RESET = "PASE_RUNTIME_RESET";

  static createPaseRuntimeInitializedEvent() {
    return {
      type: this.PASE_RUNTIME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRuntimeStartedEvent() {
    return {
      type: this.PASE_RUNTIME_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRuntimeRolledEvent(result) {
    return {
      type: this.PASE_RUNTIME_ROLLED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseRuntimeResolvedEvent(result) {
    return {
      type: this.PASE_RUNTIME_RESOLVED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createPaseRuntimeFinishedEvent() {
    return {
      type: this.PASE_RUNTIME_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRuntimeResetEvent() {
    return {
      type: this.PASE_RUNTIME_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameRuntimeEvents;
