class PaseGameViewModelEvents {
  static PASE_GAME_VIEWMODEL_INITIALIZED = "PASE_GAME_VIEWMODEL_INITIALIZED";
  static PASE_GAME_VIEW_REFRESHED = "PASE_GAME_VIEW_REFRESHED";
  static PASE_GAME_STATE_UPDATED = "PASE_GAME_STATE_UPDATED";
  static PASE_GAME_VIEWMODEL_RESET = "PASE_GAME_VIEWMODEL_RESET";

  static createPaseGameViewModelInitializedEvent() {
    return {
      type: this.PASE_GAME_VIEWMODEL_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameViewRefreshedEvent() {
    return {
      type: this.PASE_GAME_VIEW_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameStateUpdatedEvent(state) {
    return {
      type: this.PASE_GAME_STATE_UPDATED,
      timestamp: new Date().toISOString(),
      payload: {
        state,
      },
    };
  }

  static createPaseGameViewModelResetEvent() {
    return {
      type: this.PASE_GAME_VIEWMODEL_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameViewModelEvents;
