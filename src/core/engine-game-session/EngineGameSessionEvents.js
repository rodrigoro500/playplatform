class EngineGameSessionEvents {
  static ENGINE_GAME_SESSION_INITIALIZED = "ENGINE_GAME_SESSION_INITIALIZED";
  static ENGINE_GAME_SESSION_STARTED = "ENGINE_GAME_SESSION_STARTED";
  static ENGINE_GAME_SESSION_FINISHED = "ENGINE_GAME_SESSION_FINISHED";
  static ENGINE_GAME_SESSION_RESET = "ENGINE_GAME_SESSION_RESET";

  static createEngineGameSessionInitializedEvent() {
    return {
      type: this.ENGINE_GAME_SESSION_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineGameSessionStartedEvent() {
    return {
      type: this.ENGINE_GAME_SESSION_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineGameSessionFinishedEvent() {
    return {
      type: this.ENGINE_GAME_SESSION_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineGameSessionResetEvent() {
    return {
      type: this.ENGINE_GAME_SESSION_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineGameSessionEvents;
