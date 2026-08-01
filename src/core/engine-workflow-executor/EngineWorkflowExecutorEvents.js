class EngineWorkflowExecutorEvents {
  static ENGINE_WORKFLOW_EXECUTOR_INITIALIZED = "ENGINE_WORKFLOW_EXECUTOR_INITIALIZED";
  static ENGINE_WORKFLOW_EXECUTED = "ENGINE_WORKFLOW_EXECUTED";
  static ENGINE_WORKFLOW_EXECUTOR_RESET = "ENGINE_WORKFLOW_EXECUTOR_RESET";

  static createEngineWorkflowExecutorInitializedEvent() {
    return {
      type: this.ENGINE_WORKFLOW_EXECUTOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineWorkflowExecutedEvent(name, result) {
    return {
      type: this.ENGINE_WORKFLOW_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
        result,
      },
    };
  }

  static createEngineWorkflowExecutorResetEvent() {
    return {
      type: this.ENGINE_WORKFLOW_EXECUTOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineWorkflowExecutorEvents;
