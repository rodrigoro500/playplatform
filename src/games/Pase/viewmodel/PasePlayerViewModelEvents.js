class PasePlayerViewModelEvents {
  static PASE_PLAYER_VIEWMODEL_INITIALIZED = "PASE_PLAYER_VIEWMODEL_INITIALIZED";
  static PASE_PLAYER_VIEW_REFRESHED = "PASE_PLAYER_VIEW_REFRESHED";
  static PASE_PLAYER_VIEWMODEL_RESET = "PASE_PLAYER_VIEWMODEL_RESET";

  static createPasePlayerViewModelInitializedEvent() {
    return {
      type: this.PASE_PLAYER_VIEWMODEL_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPasePlayerViewRefreshedEvent() {
    return {
      type: this.PASE_PLAYER_VIEW_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPasePlayerViewModelResetEvent() {
    return {
      type: this.PASE_PLAYER_VIEWMODEL_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PasePlayerViewModelEvents;
