class PaseBetViewModelEvents {
  static PASE_BET_VIEWMODEL_INITIALIZED = "PASE_BET_VIEWMODEL_INITIALIZED";
  static PASE_BET_VIEW_REFRESHED = "PASE_BET_VIEW_REFRESHED";
  static PASE_BET_VIEWMODEL_RESET = "PASE_BET_VIEWMODEL_RESET";

  static createPaseBetViewModelInitializedEvent() {
    return {
      type: this.PASE_BET_VIEWMODEL_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetViewRefreshedEvent() {
    return {
      type: this.PASE_BET_VIEW_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetViewModelResetEvent() {
    return {
      type: this.PASE_BET_VIEWMODEL_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseBetViewModelEvents;
