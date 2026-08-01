class EngineMatchExecutorEvents {
  static ENGINE_MATCH_EXECUTOR_INITIALIZED = "ENGINE_MATCH_EXECUTOR_INITIALIZED";
  static ENGINE_MATCH_EXECUTION_STARTED = "ENGINE_MATCH_EXECUTION_STARTED";
  static ENGINE_MATCH_EXECUTION_FINISHED = "ENGINE_MATCH_EXECUTION_FINISHED";
  static ENGINE_MATCH_EXECUTOR_RESET = "ENGINE_MATCH_EXECUTOR_RESET";

  static createEngineMatchExecutorInitializedEvent() {
    return {
      type: this.ENGINE_MATCH_EXECUTOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMatchExecutionStartedEvent() {
    return {
      type: this.ENGINE_MATCH_EXECUTION_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMatchExecutionFinishedEvent() {
    return {
      type: this.ENGINE_MATCH_EXECUTION_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMatchExecutorResetEvent() {
    return {
      type: this.ENGINE_MATCH_EXECUTOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineMatchExecutorEvents;
