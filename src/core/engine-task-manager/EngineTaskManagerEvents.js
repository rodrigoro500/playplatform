class EngineTaskManagerEvents {
  static ENGINE_TASK_MANAGER_INITIALIZED = "ENGINE_TASK_MANAGER_INITIALIZED";
  static ENGINE_TASK_REGISTERED = "ENGINE_TASK_REGISTERED";
  static ENGINE_TASK_EXECUTED = "ENGINE_TASK_EXECUTED";
  static ENGINE_TASK_REMOVED = "ENGINE_TASK_REMOVED";
  static ENGINE_TASK_MANAGER_CLEARED = "ENGINE_TASK_MANAGER_CLEARED";
  static ENGINE_TASK_MANAGER_RESET = "ENGINE_TASK_MANAGER_RESET";

  static createEngineTaskManagerInitializedEvent() {
    return {
      type: this.ENGINE_TASK_MANAGER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineTaskRegisteredEvent(name) {
    return {
      type: this.ENGINE_TASK_REGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineTaskExecutedEvent(
    name,
    result
  ) {
    return {
      type: this.ENGINE_TASK_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
        result,
      },
    };
  }

  static createEngineTaskRemovedEvent(name) {
    return {
      type: this.ENGINE_TASK_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineTaskManagerClearedEvent() {
    return {
      type: this.ENGINE_TASK_MANAGER_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineTaskManagerResetEvent() {
    return {
      type: this.ENGINE_TASK_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineTaskManagerEvents;
