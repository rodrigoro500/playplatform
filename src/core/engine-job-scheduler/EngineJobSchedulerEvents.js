class EngineJobSchedulerEvents {
  static ENGINE_JOB_SCHEDULER_INITIALIZED = "ENGINE_JOB_SCHEDULER_INITIALIZED";
  static ENGINE_JOB_SCHEDULED = "ENGINE_JOB_SCHEDULED";
  static ENGINE_NEXT_JOB_SELECTED = "ENGINE_NEXT_JOB_SELECTED";
  static ENGINE_JOB_SCHEDULER_CLEARED = "ENGINE_JOB_SCHEDULER_CLEARED";
  static ENGINE_JOB_SCHEDULER_RESET = "ENGINE_JOB_SCHEDULER_RESET";

  static createEngineJobSchedulerInitializedEvent() {
    return {
      type: this.ENGINE_JOB_SCHEDULER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineJobScheduledEvent(job) {
    return {
      type: this.ENGINE_JOB_SCHEDULED,
      timestamp: new Date().toISOString(),
      payload: {
        job,
      },
    };
  }

  static createNextJobSelectedEvent(job) {
    return {
      type: this.ENGINE_NEXT_JOB_SELECTED,
      timestamp: new Date().toISOString(),
      payload: {
        job,
      },
    };
  }

  static createEngineJobSchedulerClearedEvent() {
    return {
      type: this.ENGINE_JOB_SCHEDULER_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineJobSchedulerResetEvent() {
    return {
      type: this.ENGINE_JOB_SCHEDULER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineJobSchedulerEvents;
