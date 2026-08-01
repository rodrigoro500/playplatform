class EngineBetCoordinatorEvents {
  static ENGINE_BET_COORDINATOR_INITIALIZED = "ENGINE_BET_COORDINATOR_INITIALIZED";
  static ENGINE_BET_PLACED = "ENGINE_BET_PLACED";
  static ENGINE_BET_CANCELLED = "ENGINE_BET_CANCELLED";
  static ENGINE_BET_COORDINATOR_RESET = "ENGINE_BET_COORDINATOR_RESET";

  static createEngineBetCoordinatorInitializedEvent() {
    return {
      type: this.ENGINE_BET_COORDINATOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineBetPlacedEvent(bet) {
    return {
      type: this.ENGINE_BET_PLACED,
      timestamp: new Date().toISOString(),
      payload: {
        bet,
      },
    };
  }

  static createEngineBetCancelledEvent(id) {
    return {
      type: this.ENGINE_BET_CANCELLED,
      timestamp: new Date().toISOString(),
      payload: {
        id,
      },
    };
  }

  static createEngineBetCoordinatorResetEvent() {
    return {
      type: this.ENGINE_BET_COORDINATOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineBetCoordinatorEvents;
