class PaseRoundStatesEvents {
  static PASE_ROUND_STATES_INITIALIZED = "PASE_ROUND_STATES_INITIALIZED";
  static PASE_ROUND_STATES_VALIDATED = "PASE_ROUND_STATES_VALIDATED";

  static createPaseRoundStatesInitializedEvent() {
    return {
      type: this.PASE_ROUND_STATES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRoundStatesValidatedEvent() {
    return {
      type: this.PASE_ROUND_STATES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseRoundStatesEvents;
