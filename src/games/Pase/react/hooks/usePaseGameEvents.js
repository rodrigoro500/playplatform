class UsePaseGameEvents {
  static USE_PASE_GAME_INITIALIZED = "USE_PASE_GAME_INITIALIZED";
  static USE_PASE_GAME_REFRESHED = "USE_PASE_GAME_REFRESHED";
  static USE_PASE_GAME_STATE_READ = "USE_PASE_GAME_STATE_READ";

  static createUsePaseGameInitializedEvent() {
    return {
      type: this.USE_PASE_GAME_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createUsePaseGameRefreshedEvent() {
    return {
      type: this.USE_PASE_GAME_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createUsePaseGameStateReadEvent() {
    return {
      type: this.USE_PASE_GAME_STATE_READ,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default UsePaseGameEvents;
