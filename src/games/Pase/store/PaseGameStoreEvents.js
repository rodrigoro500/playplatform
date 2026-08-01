class PaseGameStoreEvents {
  static PASE_GAME_STORE_INITIALIZED = "PASE_GAME_STORE_INITIALIZED";
  static PASE_GAME_STORE_UPDATED = "PASE_GAME_STORE_UPDATED";
  static PASE_GAME_STORE_REFRESHED = "PASE_GAME_STORE_REFRESHED";
  static PASE_GAME_STORE_RESET = "PASE_GAME_STORE_RESET";

  static createPaseGameStoreInitializedEvent() {
    return {
      type: this.PASE_GAME_STORE_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameStoreUpdatedEvent(state) {
    return {
      type: this.PASE_GAME_STORE_UPDATED,
      timestamp: new Date().toISOString(),
      payload: {
        state,
      },
    };
  }

  static createPaseGameStoreRefreshedEvent() {
    return {
      type: this.PASE_GAME_STORE_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameStoreResetEvent() {
    return {
      type: this.PASE_GAME_STORE_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameStoreEvents;
