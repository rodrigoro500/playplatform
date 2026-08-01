class EngineAuditManager {
  constructor({
    manager = null,
    securityManager = null,
  } = {}) {
    this.manager = manager;
    this.securityManager = securityManager;
    this.auditEnabled = true;
    this.auditLogs = [];
    this.lastAudit = null;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setSecurityManager(securityManager) {
    this.securityManager = securityManager;

    return this;
  }

  enable() {
    this.auditEnabled = true;

    return true;
  }

  disable() {
    this.auditEnabled = false;

    return true;
  }

  isEnabled() {
    return this.auditEnabled;
  }

  validateDependencies() {
    if (!this.manager) {
      throw new Error(
        "EngineAuditManager requiere manager."
      );
    }

    if (!this.securityManager) {
      throw new Error(
        "EngineAuditManager requiere securityManager."
      );
    }
  }

  validateAction(action) {
    if (
      typeof action !== "string" ||
      action.trim() === ""
    ) {
      throw new Error(
        "La accion de auditoria debe ser un string no vacio."
      );
    }
  }

  registerAudit(
    action,
    data = {}
  ) {
    this.validateDependencies();
    this.validateAction(action);

    const audit = {
      id: this.auditLogs.length + 1,
      timestamp: new Date().toISOString(),
      action,
      data,
      enabled: this.auditEnabled,
    };

    this.lastAudit = audit;
    this.auditLogs.push(audit);

    return audit;
  }

  getAuditLogs() {
    return this.auditLogs;
  }

  getLastAudit() {
    return this.lastAudit;
  }

  clearAuditLogs() {
    this.auditLogs = [];
    this.lastAudit = null;

    return true;
  }

  getStatus() {
    return {
      enabled: this.auditEnabled,
      manager: !!this.manager,
      securityManager: !!this.securityManager,
      auditCount: this.auditLogs.length,
    };
  }

  reset() {
    this.manager = null;
    this.securityManager = null;
    this.auditEnabled = true;
    this.auditLogs = [];
    this.lastAudit = null;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      lastAudit: this.lastAudit,
      auditLogs: this.auditLogs,
    };
  }
}

export default EngineAuditManager;
