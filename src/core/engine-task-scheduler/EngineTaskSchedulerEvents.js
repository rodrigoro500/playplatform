class EngineTaskSchedulerEvents {
  static ENGINE_TASK_SCHEDULER_INITIALIZED = "ENGINE_TASK_SCHEDULER_INITIALIZED";
  static ENGINE_TASK_SCHEDULED = "ENGINE_TASK_SCHEDULED";
  static ENGINE_NEXT_TASK_SELECTED = "ENGINE_NEXT_TASK_SELECTED";
  static ENGINE_TASK_SCHEDULER_CLEARED = "ENGINE_TASK_SCHEDULER_CLEARED";
  static ENGINE_TASK_SCHEDULER_RESET = "ENGINE_TASK_SCHEDULER_RESET";

  static createEngineTaskSchedulerInitializedEvent() {
    return {
      type: this.ENGINE_TASK_SCHEDULER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineTaskScheduledEvent(task) {
    return {
      type: this.ENGINE_TASK_SCHEDULED,
      timestamp: new Date().toISOString(),
      payload: {
        task,
      },
    };
  }

  static createNextTaskSelectedEvent(task) {
    return {
      type: this.ENGINE_NEXT_TASK_SELECTED,
      timestamp: new Date().toISOString(),
      payload: {
        task,
      },
    };
  }

  static createEngineTaskSchedulerClearedEvent() {
    return {
      type: this.ENGINE_TASK_SCHEDULER_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineTaskSchedulerResetEvent() {
    return {
      type: this.ENGINE_TASK_SCHEDULER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineTaskSchedulerEvents;
