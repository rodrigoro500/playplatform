class EngineFlowControllerEvents {
  static ENGINE_FLOW_CONTROLLER_INITIALIZED = "ENGINE_FLOW_CONTROLLER_INITIALIZED";
  static ENGINE_STEP_ADDED = "ENGINE_STEP_ADDED";
  static ENGINE_NEXT_STEP = "ENGINE_NEXT_STEP";
  static ENGINE_PREVIOUS_STEP = "ENGINE_PREVIOUS_STEP";
  static ENGINE_FLOW_CONTROLLER_CLEARED = "ENGINE_FLOW_CONTROLLER_CLEARED";
  static ENGINE_FLOW_CONTROLLER_RESET = "ENGINE_FLOW_CONTROLLER_RESET";

  static createEngineFlowControllerInitializedEvent() {
    return {
      type: this.ENGINE_FLOW_CONTROLLER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineStepAddedEvent(step) {
    return {
      type: this.ENGINE_STEP_ADDED,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createNextStepEvent(step) {
    return {
      type: this.ENGINE_NEXT_STEP,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createPreviousStepEvent(step) {
    return {
      type: this.ENGINE_PREVIOUS_STEP,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createEngineFlowControllerClearedEvent() {
    return {
      type: this.ENGINE_FLOW_CONTROLLER_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineFlowControllerResetEvent() {
    return {
      type: this.ENGINE_FLOW_CONTROLLER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineFlowControllerEvents;
