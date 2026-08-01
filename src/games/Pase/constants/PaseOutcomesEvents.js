class PaseOutcomesEvents {
  static PASE_OUTCOMES_INITIALIZED = "PASE_OUTCOMES_INITIALIZED";
  static PASE_OUTCOMES_VALIDATED = "PASE_OUTCOMES_VALIDATED";

  static createPaseOutcomesInitializedEvent() {
    return {
      type: this.PASE_OUTCOMES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseOutcomesValidatedEvent() {
    return {
      type: this.PASE_OUTCOMES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseOutcomesEvents;
