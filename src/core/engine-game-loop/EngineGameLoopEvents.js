class EngineGameLoopEvents {
  static ENGINE_GAME_LOOP_INITIALIZED = "ENGINE_GAME_LOOP_INITIALIZED";
  static ENGINE_GAME_LOOP_STARTED = "ENGINE_GAME_LOOP_STARTED";
  static ENGINE_GAME_LOOP_STOPPED = "ENGINE_GAME_LOOP_STOPPED";
  static ENGINE_GAME_LOOP_NEXT = "ENGINE_GAME_LOOP_NEXT";
  static ENGINE_GAME_LOOP_PREVIOUS = "ENGINE_GAME_LOOP_PREVIOUS";
  static ENGINE_GAME_LOOP_RESET = "ENGINE_GAME_LOOP_RESET";

  static createEngineGameLoopInitializedEvent() {
    return {
      type: this.ENGINE_GAME_LOOP_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineGameLoopStartedEvent() {
    return {
      type: this.ENGINE_GAME_LOOP_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineGameLoopStoppedEvent() {
    return {
      type: this.ENGINE_GAME_LOOP_STOPPED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineGameLoopNextEvent(step) {
    return {
      type: this.ENGINE_GAME_LOOP_NEXT,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createEngineGameLoopPreviousEvent(step) {
    return {
      type: this.ENGINE_GAME_LOOP_PREVIOUS,
      timestamp: new Date().toISOString(),
      payload: {
        step,
      },
    };
  }

  static createEngineGameLoopResetEvent() {
    return {
      type: this.ENGINE_GAME_LOOP_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineGameLoopEvents;
