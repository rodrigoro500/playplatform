class PaseGameStatesEvents {
  static PASE_GAME_STATES_INITIALIZED = "PASE_GAME_STATES_INITIALIZED";
  static PASE_GAME_STATES_VALIDATED = "PASE_GAME_STATES_VALIDATED";

  static createPaseGameStatesInitializedEvent() {
    return {
      type: this.PASE_GAME_STATES_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseGameStatesValidatedEvent() {
    return {
      type: this.PASE_GAME_STATES_VALIDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseGameStatesEvents;
