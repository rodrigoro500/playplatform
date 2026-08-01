class PaseRoundEventTypesEvents {
  static PASE_ROUND_EVENT_TYPES_INITIALIZED = "PASE_ROUND_EVENT_TYPES_INITIALIZED";
  static PASE_ROUND_EVENT_TYPES_VALIDATED = "PASE_ROUND_EVENT_TYPES_VALIDATED";

  static createPaseRoundEventTypesInitializedEvent() {
    return {
      type: this.PASE_ROUND_EVENT_TYPES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseRoundEventTypesValidatedEvent() {
    return {
      type: this.PASE_ROUND_EVENT_TYPES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseRoundEventTypesEvents;
