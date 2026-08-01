class EngineFacade {
  constructor({
    manager = null,
    healthManager = null,
    recoveryManager = null,
  } = {}) {
    this.manager = manager;
    this.healthManager = healthManager;
    this.recoveryManager = recoveryManager;
    this.initialized = false;
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

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineFacade requiere manager."
      );
    }

    if (!this.healthManager) {
      throw new Error(
        "EngineFacade requiere healthManager."
      );
    }

    if (!this.recoveryManager) {
      throw new Error(
        "EngineFacade requiere recoveryManager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getManager() {
    return this.manager;
  }

  getHealthManager() {
    return this.healthManager;
  }

  getRecoveryManager() {
    return this.recoveryManager;
  }

  getHealthStatus() {
    if (!this.healthManager) {
      throw new Error(
        "EngineFacade requiere healthManager."
      );
    }

    return this.healthManager.getStatus();
  }

  recover() {
    if (!this.recoveryManager) {
      throw new Error(
        "EngineFacade requiere recoveryManager."
      );
    }

    return this.recoveryManager.recover();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      manager: !!this.manager,
      healthManager: !!this.healthManager,
      recoveryManager: !!this.recoveryManager,
    };
  }

  reset() {
    this.manager = null;
    this.healthManager = null;
    this.recoveryManager = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
    };
  }
}

export default EngineFacade;
