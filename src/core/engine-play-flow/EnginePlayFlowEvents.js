class EnginePlayFlowEvents {
  static ENGINE_PLAY_FLOW_INITIALIZED = "ENGINE_PLAY_FLOW_INITIALIZED";
  static ENGINE_PLAY_FLOW_STARTED = "ENGINE_PLAY_FLOW_STARTED";
  static ENGINE_BETTING_OPENED = "ENGINE_BETTING_OPENED";
  static ENGINE_BETTING_CLOSED = "ENGINE_BETTING_CLOSED";
  static ENGINE_PLAY_FLOW_RESOLVED = "ENGINE_PLAY_FLOW_RESOLVED";
  static ENGINE_PLAY_FLOW_FINISHED = "ENGINE_PLAY_FLOW_FINISHED";
  static ENGINE_PLAY_FLOW_RESET = "ENGINE_PLAY_FLOW_RESET";

  static createEnginePlayFlowInitializedEvent() {
    return {
      type: this.ENGINE_PLAY_FLOW_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEnginePlayFlowStartedEvent() {
    return {
      type: this.ENGINE_PLAY_FLOW_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createBettingOpenedEvent() {
    return {
      type: this.ENGINE_BETTING_OPENED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createBettingClosedEvent() {
    return {
      type: this.ENGINE_BETTING_CLOSED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEnginePlayFlowResolvedEvent(result) {
    return {
      type: this.ENGINE_PLAY_FLOW_RESOLVED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createEnginePlayFlowFinishedEvent() {
    return {
      type: this.ENGINE_PLAY_FLOW_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEnginePlayFlowResetEvent() {
    return {
      type: this.ENGINE_PLAY_FLOW_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EnginePlayFlowEvents;
