class PaseGameAdapterEvents {
  static PASE_GAME_ADAPTER_INITIALIZED = "PASE_GAME_ADAPTER_INITIALIZED";
  static PASE_GAME_ADAPTER_REFRESHED = "PASE_GAME_ADAPTER_REFRESHED";
  static PASE_GAME_ADAPTER_RESET = "PASE_GAME_ADAPTER_RESET";

  static createPaseGameAdapterInitializedEvent() {
    return {
      type: this.PASE_GAME_ADAPTER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameAdapterRefreshedEvent() {
    return {
      type: this.PASE_GAME_ADAPTER_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameAdapterResetEvent() {
    return {
      type: this.PASE_GAME_ADAPTER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameAdapterEvents;
