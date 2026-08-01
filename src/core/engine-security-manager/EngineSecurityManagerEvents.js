class EngineSecurityManagerEvents {
  static ENGINE_SECURITY_CHECK_STARTED = "ENGINE_SECURITY_CHECK_STARTED";
  static ENGINE_SECURITY_CHECK_COMPLETED = "ENGINE_SECURITY_CHECK_COMPLETED";
  static ENGINE_SECURITY_CHECK_FAILED = "ENGINE_SECURITY_CHECK_FAILED";
  static ENGINE_SECURITY_ENABLED = "ENGINE_SECURITY_ENABLED";
  static ENGINE_SECURITY_DISABLED = "ENGINE_SECURITY_DISABLED";
  static ENGINE_SECURITY_MANAGER_RESET = "ENGINE_SECURITY_MANAGER_RESET";
  static ENGINE_SECURITY_HISTORY_CLEARED = "ENGINE_SECURITY_HISTORY_CLEARED";

  static createEngineSecurityCheckStartedEvent() {
    return {
      type: this.ENGINE_SECURITY_CHECK_STARTED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSecurityCheckCompletedEvent(check) {
    return {
      type: this.ENGINE_SECURITY_CHECK_COMPLETED,
      timestamp: new Date().toISOString(),
      payload: {
        check,
      },
    };
  }

  static createEngineSecurityCheckFailedEvent(error) {
    return {
      type: this.ENGINE_SECURITY_CHECK_FAILED,
      timestamp: new Date().toISOString(),
      payload: {
        error,
      },
    };
  }

  static createEngineSecurityEnabledEvent() {
    return {
      type: this.ENGINE_SECURITY_ENABLED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSecurityDisabledEvent() {
    return {
      type: this.ENGINE_SECURITY_DISABLED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSecurityManagerResetEvent() {
    return {
      type: this.ENGINE_SECURITY_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSecurityHistoryClearedEvent() {
    return {
      type: this.ENGINE_SECURITY_HISTORY_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineSecurityManagerEvents;
