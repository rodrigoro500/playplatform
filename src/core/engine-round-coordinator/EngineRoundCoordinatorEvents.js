class EngineRoundCoordinatorEvents {
  static ENGINE_ROUND_COORDINATOR_INITIALIZED = "ENGINE_ROUND_COORDINATOR_INITIALIZED";
  static ENGINE_ROUND_STARTED = "ENGINE_ROUND_STARTED";
  static ENGINE_ROUND_FINISHED = "ENGINE_ROUND_FINISHED";
  static ENGINE_ROUND_NEXT_STEP = "ENGINE_ROUND_NEXT_STEP";
  static ENGINE_ROUND_PREVIOUS_STEP = "ENGINE_ROUND_PREVIOUS_STEP";
  static ENGINE_ROUND_COORDINATOR_RESET = "ENGINE_ROUND_COORDINATOR_RESET";

  static createEngineRoundCoordinatorInitializedEvent() {
    return {
      type: this.ENGINE_ROUND_COORDINATOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineRoundStartedEvent() {
    return {
      type: this.ENGINE_ROUND_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineRoundFinishedEvent() {
    return {
      type: this.ENGINE_ROUND_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineRoundNextStepEvent(step) {
    return {
      type: this.ENGINE_ROUND_NEXT_STEP,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createEngineRoundPreviousStepEvent(step) {
    return {
      type: this.ENGINE_ROUND_PREVIOUS_STEP,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createEngineRoundCoordinatorResetEvent() {
    return {
      type: this.ENGINE_ROUND_COORDINATOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineRoundCoordinatorEvents;
