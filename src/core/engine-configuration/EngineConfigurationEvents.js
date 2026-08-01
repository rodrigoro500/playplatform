class EngineConfigurationEvents {
  static ENGINE_CONFIGURATION_INITIALIZED = "ENGINE_CONFIGURATION_INITIALIZED";
  static ENGINE_CONFIGURATION_SET = "ENGINE_CONFIGURATION_SET";
  static ENGINE_CONFIGURATION_REMOVED = "ENGINE_CONFIGURATION_REMOVED";
  static ENGINE_CONFIGURATION_CLEARED = "ENGINE_CONFIGURATION_CLEARED";
  static ENGINE_CONFIGURATION_RESET = "ENGINE_CONFIGURATION_RESET";

  static createEngineConfigurationInitializedEvent() {
    return {
      type: this.ENGINE_CONFIGURATION_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineConfigurationSetEvent(
    key,
    value
  ) {
    return {
      type: this.ENGINE_CONFIGURATION_SET,
      timestamp: new Date().toISOString(),
      payload: {
        key,
        value,
      },
    };
  }

  static createEngineConfigurationRemovedEvent(key) {
    return {
      type: this.ENGINE_CONFIGURATION_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        key,
      },
    };
  }

  static createEngineConfigurationClearedEvent() {
    return {
      type: this.ENGINE_CONFIGURATION_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineConfigurationResetEvent() {
    return {
      type: this.ENGINE_CONFIGURATION_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineConfigurationEvents;
