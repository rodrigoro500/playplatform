class EngineSecurityManager {
  constructor({
    manager = null,
    healthManager = null,
    recoveryManager = null,
  } = {}) {
    this.manager = manager;
    this.healthManager = healthManager;
    this.recoveryManager = recoveryManager;
    this.securityEnabled = true;
    this.securityChecks = [];
    this.lastSecurityCheck = null;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setHealthManager(healthManager) {
    this.healthManager = healthManager;

    return this;
  }

  setRecoveryManager(recoveryManager) {
    this.recoveryManager = recoveryManager;

    return this;
  }

  enable() {
    this.securityEnabled = true;

    return true;
  }

  disable() {
    this.securityEnabled = false;

    return true;
  }

  isEnabled() {
    return this.securityEnabled;
  }

  validateDependencies() {
    if (!this.manager) {
      throw new Error(
        "EngineSecurityManager requiere manager."
      );
    }

    if (!this.healthManager) {
      throw new Error(
        "EngineSecurityManager requiere healthManager."
      );
    }

    if (!this.recoveryManager) {
      throw new Error(
        "EngineSecurityManager requiere recoveryManager."
      );
    }
  }

  runSecurityCheck() {
    this.validateDependencies();

    const report = {
      id: this.securityChecks.length + 1,
      timestamp: new Date().toISOString(),
      enabled: this.securityEnabled,
      passed: this.securityEnabled,
      manager: !!this.manager,
      healthManager: !!this.healthManager,
      recoveryManager: !!this.recoveryManager,
    };

    this.lastSecurityCheck = report;
    this.securityChecks.push(report);

    return report;
  }

  getLastSecurityCheck() {
    return this.lastSecurityCheck;
  }

  getSecurityChecks() {
    return this.securityChecks;
  }

  clearSecurityChecks() {
    this.securityChecks = [];
    this.lastSecurityCheck = null;

    return true;
  }

  getStatus() {
    return {
      enabled: this.securityEnabled,
      manager: !!this.manager,
      healthManager: !!this.healthManager,
      recoveryManager: !!this.recoveryManager,
      securityChecks: this.securityChecks.length,
    };
  }

  reset() {
    this.manager = null;
    this.healthManager = null;
    this.recoveryManager = null;
    this.securityEnabled = true;
    this.securityChecks = [];
    this.lastSecurityCheck = null;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      lastSecurityCheck: this.lastSecurityCheck,
      securityChecks: this.securityChecks,
    };
  }
}

export default EngineSecurityManager;
