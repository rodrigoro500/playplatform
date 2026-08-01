class PaseDiceViewModelEvents {
  static PASE_DICE_VIEWMODEL_INITIALIZED = "PASE_DICE_VIEWMODEL_INITIALIZED";
  static PASE_DICE_VIEW_REFRESHED = "PASE_DICE_VIEW_REFRESHED";
  static PASE_DICE_VIEWMODEL_RESET = "PASE_DICE_VIEWMODEL_RESET";

  static createPaseDiceViewModelInitializedEvent() {
    return {
      type: this.PASE_DICE_VIEWMODEL_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseDiceViewRefreshedEvent() {
    return {
      type: this.PASE_DICE_VIEW_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseDiceViewModelResetEvent() {
    return {
      type: this.PASE_DICE_VIEWMODEL_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseDiceViewModelEvents;
