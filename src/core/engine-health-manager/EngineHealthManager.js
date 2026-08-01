class EngineHealthManager {
  constructor({
    manager = null,
    monitor = null,
    kernel = null,
    runtime = null,
    registry = null,
    context = null,
  } = {}) {
    this.manager = manager;
    this.monitor = monitor;
    this.kernel = kernel;
    this.runtime = runtime;
    this.registry = registry;
    this.context = context;
    this.lastHealthReport = null;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setMonitor(monitor) {
    this.monitor = monitor;

    return this;
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
    if (!this.manager) {
      throw new Error(
        "EngineHealthManager requiere manager."
      );
    }

    if (!this.monitor) {
      throw new Error(
        "EngineHealthManager requiere monitor."
      );
    }

    if (!this.kernel) {
      throw new Error(
        "EngineHealthManager requiere kernel."
      );
    }

    if (!this.runtime) {
      throw new Error(
        "EngineHealthManager requiere runtime."
      );
    }

    if (!this.registry) {
      throw new Error(
        "EngineHealthManager requiere registry."
      );
    }

    if (!this.context) {
      throw new Error(
        "EngineHealthManager requiere context."
      );
    }
  }

  runHealthCheck() {
    this.validateDependencies();

    const report = {
      healthy: true,
      timestamp: new Date().toISOString(),
      manager: !!this.manager,
      monitor: !!this.monitor,
      kernel: !!this.kernel,
      runtime: !!this.runtime,
      registry: !!this.registry,
      context: !!this.context,
    };

    this.lastHealthReport = report;

    return report;
  }

  isHealthy() {
    if (!this.lastHealthReport) {
      return false;
    }

    return this.lastHealthReport.healthy;
  }

  getLastHealthReport() {
    return this.lastHealthReport;
  }

  getStatus() {
    return {
      manager: !!this.manager,
      monitor: !!this.monitor,
      kernel: !!this.kernel,
      runtime: !!this.runtime,
      registry: !!this.registry,
      context: !!this.context,
      hasReport: this.lastHealthReport !== null,
      healthy: this.isHealthy(),
    };
  }

  reset() {
    this.manager = null;
    this.monitor = null;
    this.kernel = null;
    this.runtime = null;
    this.registry = null;
    this.context = null;
    this.lastHealthReport = null;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      lastHealthReport: this.lastHealthReport,
    };
  }
}

export default EngineHealthManager;
