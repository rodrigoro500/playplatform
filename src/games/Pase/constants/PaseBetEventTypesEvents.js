class PaseBetEventTypesEvents {
  static PASE_BET_EVENT_TYPES_INITIALIZED = "PASE_BET_EVENT_TYPES_INITIALIZED";
  static PASE_BET_EVENT_TYPES_VALIDATED = "PASE_BET_EVENT_TYPES_VALIDATED";

  static createPaseBetEventTypesInitializedEvent() {
    return {
      type: this.PASE_BET_EVENT_TYPES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetEventTypesValidatedEvent() {
    return {
      type: this.PASE_BET_EVENT_TYPES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseBetEventTypesEvents;
