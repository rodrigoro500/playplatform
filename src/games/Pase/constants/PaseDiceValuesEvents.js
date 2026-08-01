class PaseDiceValuesEvents {
  static PASE_DICE_VALUES_INITIALIZED = "PASE_DICE_VALUES_INITIALIZED";
  static PASE_DICE_VALUES_VALIDATED = "PASE_DICE_VALUES_VALIDATED";

  static createPaseDiceValuesInitializedEvent() {
    return {
      type: this.PASE_DICE_VALUES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseDiceValuesValidatedEvent() {
    return {
      type: this.PASE_DICE_VALUES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseDiceValuesEvents;
