class EngineWorkflowEvents {
  static ENGINE_WORKFLOW_INITIALIZED = "ENGINE_WORKFLOW_INITIALIZED";
  static ENGINE_WORKFLOW_REGISTERED = "ENGINE_WORKFLOW_REGISTERED";
  static ENGINE_WORKFLOW_REMOVED = "ENGINE_WORKFLOW_REMOVED";
  static ENGINE_WORKFLOW_CLEARED = "ENGINE_WORKFLOW_CLEARED";
  static ENGINE_WORKFLOW_RESET = "ENGINE_WORKFLOW_RESET";

  static createEngineWorkflowInitializedEvent() {
    return {
      type: this.ENGINE_WORKFLOW_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineWorkflowRegisteredEvent(name) {
    return {
      type: this.ENGINE_WORKFLOW_REGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineWorkflowRemovedEvent(name) {
    return {
      type: this.ENGINE_WORKFLOW_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineWorkflowClearedEvent() {
    return {
      type: this.ENGINE_WORKFLOW_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineWorkflowResetEvent() {
    return {
      type: this.ENGINE_WORKFLOW_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineWorkflowEvents;
