class EngineMonitor {
  constructor({
    kernel = null,
    runtime = null,
    registry = null,
    context = null,
  } = {}) {
    this.kernel = kernel;
    this.runtime = runtime;
    this.registry = registry;
    this.context = context;
    this.monitoring = false;
    this.startedAt = null;
    this.lastCheckAt = null;
  }

  setKernel(kernel) {
    this.kernel = kernel;

    return this;
  }

  setRuntime(runtime) {
    this.runtime = runtime;

    return this;
  }

  setRegistry(registry) {
    this.registry = registry;

    return this;
  }

  setContext(context) {
    this.context = context;

    return this;
  }

  validateDependencies() {
    if (!this.kernel) {
      throw new Error(
        "EngineMonitor requiere kernel."
      );
    }

    if (!this.runtime) {
      throw new Error(
        "EngineMonitor requiere runtime."
      );
    }

    if (!this.registry) {
      throw new Error(
        "EngineMonitor requiere registry."
      );
    }

    if (!this.context) {
      throw new Error(
        "EngineMonitor requiere context."
      );
    }
  }

  startMonitoring() {
    this.validateDependencies();

    if (this.monitoring) {
      throw new Error(
        "EngineMonitor ya esta monitoreando."
      );
    }

    this.monitoring = true;
    this.startedAt = new Date().toISOString();
    this.lastCheckAt = this.startedAt;

    return true;
  }

  stopMonitoring() {
    if (!this.monitoring) {
      throw new Error(
        "EngineMonitor no esta monitoreando."
      );
    }

    this.monitoring = false;

    return true;
  }

  isMonitoring() {
    return this.monitoring;
  }

  healthCheck() {
    if (!this.monitoring) {
      throw new Error(
        "EngineMonitor no esta monitoreando."
      );
    }

    this.lastCheckAt = new Date().toISOString();

    return {
      healthy: true,
      timestamp: this.lastCheckAt,
      kernel: !!this.kernel,
      runtime: !!this.runtime,
      registry: !!this.registry,
      context: !!this.context,
    };
  }

  getStatus() {
    return {
      monitoring: this.monitoring,
      startedAt: this.startedAt,
      lastCheckAt: this.lastCheckAt,
      kernel: !!this.kernel,
      runtime: !!this.runtime,
      registry: !!this.registry,
      context: !!this.context,
    };
  }

  getReport() {
    return {
      status: this.getStatus(),
      health: this.monitoring
        ? this.healthCheck()
        : null,
    };
  }

  reset() {
    this.kernel = null;
    this.runtime = null;
    this.registry = null;
    this.context = null;
    this.monitoring = false;
    this.startedAt = null;
    this.lastCheckAt = null;

    return true;
  }

  toJSON() {
    return {
      monitoring: this.monitoring,
      startedAt: this.startedAt,
      lastCheckAt: this.lastCheckAt,
      status: this.getStatus(),
    };
  }
}

export default EngineMonitor;
