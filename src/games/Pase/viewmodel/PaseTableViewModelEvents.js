class PaseTableViewModelEvents {
  static PASE_TABLE_VIEWMODEL_INITIALIZED = "PASE_TABLE_VIEWMODEL_INITIALIZED";
  static PASE_TABLE_VIEW_REFRESHED = "PASE_TABLE_VIEW_REFRESHED";
  static PASE_TABLE_VIEWMODEL_RESET = "PASE_TABLE_VIEWMODEL_RESET";

  static createPaseTableViewModelInitializedEvent() {
    return {
      type: this.PASE_TABLE_VIEWMODEL_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableViewRefreshedEvent() {
    return {
      type: this.PASE_TABLE_VIEW_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableViewModelResetEvent() {
    return {
      type: this.PASE_TABLE_VIEWMODEL_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseTableViewModelEvents;
