class PaseBetStatesEvents {
  static PASE_BET_STATES_INITIALIZED = "PASE_BET_STATES_INITIALIZED";
  static PASE_BET_STATES_VALIDATED = "PASE_BET_STATES_VALIDATED";

  static createPaseBetStatesInitializedEvent() {
    return {
      type: this.PASE_BET_STATES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetStatesValidatedEvent() {
    return {
      type: this.PASE_BET_STATES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseBetStatesEvents;
