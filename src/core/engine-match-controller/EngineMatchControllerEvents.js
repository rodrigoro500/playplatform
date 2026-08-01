class EngineMatchControllerEvents {
  static ENGINE_MATCH_CONTROLLER_INITIALIZED = "ENGINE_MATCH_CONTROLLER_INITIALIZED";
  static ENGINE_MATCH_STARTED = "ENGINE_MATCH_STARTED";
  static ENGINE_MATCH_FINISHED = "ENGINE_MATCH_FINISHED";
  static ENGINE_MATCH_CONTROLLER_RESET = "ENGINE_MATCH_CONTROLLER_RESET";

  static createEngineMatchControllerInitializedEvent() {
    return {
      type: this.ENGINE_MATCH_CONTROLLER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMatchStartedEvent() {
    return {
      type: this.ENGINE_MATCH_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMatchFinishedEvent() {
    return {
      type: this.ENGINE_MATCH_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMatchControllerResetEvent() {
    return {
      type: this.ENGINE_MATCH_CONTROLLER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineMatchControllerEvents;
