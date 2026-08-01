class EngineJobExecutorEvents {
  static ENGINE_JOB_EXECUTOR_INITIALIZED = "ENGINE_JOB_EXECUTOR_INITIALIZED";
  static ENGINE_JOB_EXECUTED = "ENGINE_JOB_EXECUTED";
  static ENGINE_ALL_JOBS_EXECUTED = "ENGINE_ALL_JOBS_EXECUTED";
  static ENGINE_JOB_EXECUTOR_RESET = "ENGINE_JOB_EXECUTOR_RESET";

  static createEngineJobExecutorInitializedEvent() {
    return {
      type: this.ENGINE_JOB_EXECUTOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineJobExecutedEvent(result) {
    return {
      type: this.ENGINE_JOB_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createAllJobsExecutedEvent(results) {
    return {
      type: this.ENGINE_ALL_JOBS_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: {
        results,
      },
    };
  }

  static createEngineJobExecutorResetEvent() {
    return {
      type: this.ENGINE_JOB_EXECUTOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineJobExecutorEvents;
