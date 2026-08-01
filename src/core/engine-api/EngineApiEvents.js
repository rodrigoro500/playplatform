class EngineApiEvents {
  static ENGINE_API_INITIALIZED = "ENGINE_API_INITIALIZED";
  static ENGINE_API_RESET = "ENGINE_API_RESET";
  static ENGINE_API_STATUS_REQUESTED = "ENGINE_API_STATUS_REQUESTED";
  static ENGINE_API_HEALTH_REQUESTED = "ENGINE_API_HEALTH_REQUESTED";
  static ENGINE_API_VERSION_REQUESTED = "ENGINE_API_VERSION_REQUESTED";
  static ENGINE_API_RECOVERY_REQUESTED = "ENGINE_API_RECOVERY_REQUESTED";

  static createEngineApiInitializedEvent() {
    return {
      type: this.ENGINE_API_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineApiResetEvent() {
    return {
      type: this.ENGINE_API_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineApiStatusRequestedEvent() {
    return {
      type: this.ENGINE_API_STATUS_REQUESTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineApiHealthRequestedEvent() {
    return {
      type: this.ENGINE_API_HEALTH_REQUESTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineApiVersionRequestedEvent() {
    return {
      type: this.ENGINE_API_VERSION_REQUESTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineApiRecoveryRequestedEvent() {
    return {
      type: this.ENGINE_API_RECOVERY_REQUESTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineApiEvents;
