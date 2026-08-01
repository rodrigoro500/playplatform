class EngineDiagnostics {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineDiagnostics requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  runDiagnostics() {
    if (!this.manager) {
      throw new Error(
        "EngineDiagnostics requiere manager."
      );
    }

    return this.manager.getSystemStatus();
  }

  getReport() {
    if (!this.manager) {
      throw new Error(
        "EngineDiagnostics requiere manager."
      );
    }

    return {
      timestamp: new Date().toISOString(),
      diagnostics: this.manager.getSystemStatus(),
    };
  }

  reset() {
    this.manager = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      managerAssigned: this.manager !== null,
    };
  }
}

export default EngineDiagnostics;
