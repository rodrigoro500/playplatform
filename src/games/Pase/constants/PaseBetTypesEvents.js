class PaseBetTypesEvents {
  static PASE_BET_TYPES_INITIALIZED = "PASE_BET_TYPES_INITIALIZED";
  static PASE_BET_TYPES_VALIDATED = "PASE_BET_TYPES_VALIDATED";

  static createPaseBetTypesInitializedEvent() {
    return {
      type: this.PASE_BET_TYPES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetTypesValidatedEvent() {
    return {
      type: this.PASE_BET_TYPES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseBetTypesEvents;
