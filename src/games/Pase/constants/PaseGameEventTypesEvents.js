class PaseGameEventTypesEvents {
  static PASE_GAME_EVENT_TYPES_INITIALIZED = "PASE_GAME_EVENT_TYPES_INITIALIZED";
  static PASE_GAME_EVENT_TYPES_VALIDATED = "PASE_GAME_EVENT_TYPES_VALIDATED";

  static createPaseGameEventTypesInitializedEvent() {
    return {
      type: this.PASE_GAME_EVENT_TYPES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameEventTypesValidatedEvent() {
    return {
      type: this.PASE_GAME_EVENT_TYPES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameEventTypesEvents;
