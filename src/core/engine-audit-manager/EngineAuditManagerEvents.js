class EngineAuditManagerEvents {
  static ENGINE_AUDIT_REGISTERED = "ENGINE_AUDIT_REGISTERED";
  static ENGINE_AUDIT_ENABLED = "ENGINE_AUDIT_ENABLED";
  static ENGINE_AUDIT_DISABLED = "ENGINE_AUDIT_DISABLED";
  static ENGINE_AUDIT_LOGS_CLEARED = "ENGINE_AUDIT_LOGS_CLEARED";
  static ENGINE_AUDIT_MANAGER_RESET = "ENGINE_AUDIT_MANAGER_RESET";

  static createEngineAuditRegisteredEvent(audit) {
    return {
      type: this.ENGINE_AUDIT_REGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        audit,
      },
    };
  }

  static createEngineAuditEnabledEvent() {
    return {
      type: this.ENGINE_AUDIT_ENABLED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineAuditDisabledEvent() {
    return {
      type: this.ENGINE_AUDIT_DISABLED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineAuditLogsClearedEvent() {
    return {
      type: this.ENGINE_AUDIT_LOGS_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineAuditManagerResetEvent() {
    return {
      type: this.ENGINE_AUDIT_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineAuditManagerEvents;
