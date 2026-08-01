class EngineStateCoordinatorEvents {
  static ENGINE_STATE_COORDINATOR_INITIALIZED = "ENGINE_STATE_COORDINATOR_INITIALIZED";
  static ENGINE_STATE_SET = "ENGINE_STATE_SET";
  static ENGINE_STATE_REMOVED = "ENGINE_STATE_REMOVED";
  static ENGINE_STATE_COORDINATOR_CLEARED = "ENGINE_STATE_COORDINATOR_CLEARED";
  static ENGINE_STATE_COORDINATOR_RESET = "ENGINE_STATE_COORDINATOR_RESET";

  static createEngineStateCoordinatorInitializedEvent() {
    return {
      type: this.ENGINE_STATE_COORDINATOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineStateSetEvent(key, value) {
    return {
      type: this.ENGINE_STATE_SET,
      timestamp: new Date().toISOString(),
      payload: {
        key,
        value,
      },
    };
  }

  static createEngineStateRemovedEvent(key) {
    return {
      type: this.ENGINE_STATE_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        key,
      },
    };
  }

  static createEngineStateCoordinatorClearedEvent() {
    return {
      type: this.ENGINE_STATE_COORDINATOR_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineStateCoordinatorResetEvent() {
    return {
      type: this.ENGINE_STATE_COORDINATOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineStateCoordinatorEvents;
