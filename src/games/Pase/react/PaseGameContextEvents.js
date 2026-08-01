class PaseGameContextEvents {
  static PASE_GAME_CONTEXT_INITIALIZED = "PASE_GAME_CONTEXT_INITIALIZED";
  static PASE_GAME_CONTEXT_UPDATED = "PASE_GAME_CONTEXT_UPDATED";
  static PASE_GAME_CONTEXT_UNMOUNTED = "PASE_GAME_CONTEXT_UNMOUNTED";

  static createPaseGameContextInitializedEvent() {
    return {
      type: this.PASE_GAME_CONTEXT_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameContextUpdatedEvent() {
    return {
      type: this.PASE_GAME_CONTEXT_UPDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameContextUnmountedEvent() {
    return {
      type: this.PASE_GAME_CONTEXT_UNMOUNTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameContextEvents;
