class EngineManager {
  constructor({
    bootstrap = null,
    kernel = null,
    runtime = null,
    monitor = null,
    registry = null,
    context = null,
  } = {}) {
    this.bootstrap = bootstrap;
    this.kernel = kernel;
    this.runtime = runtime;
    this.monitor = monitor;
    this.registry = registry;
    this.context = context;
    this.initialized = false;
  }

  setBootstrap(bootstrap) {
    this.bootstrap = bootstrap;

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

  setMonitor(monitor) {
    this.monitor = monitor;

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
    if (!this.bootstrap) {
      throw new Error(
        "EngineManager requiere bootstrap."
      );
    }

    if (!this.kernel) {
      throw new Error(
        "EngineManager requiere kernel."
      );
    }

    if (!this.runtime) {
      throw new Error(
        "EngineManager requiere runtime."
      );
    }

    if (!this.monitor) {
      throw new Error(
        "EngineManager requiere monitor."
      );
    }

    if (!this.registry) {
      throw new Error(
        "EngineManager requiere registry."
      );
    }

    if (!this.context) {
      throw new Error(
        "EngineManager requiere context."
      );
    }
  }

  initialize() {
    this.validateDependencies();

    if (this.initialized) {
      throw new Error(
        "EngineManager ya esta inicializado."
      );
    }

    this.initialized = true;

    return true;
  }

  shutdown() {
    if (!this.initialized) {
      throw new Error(
        "EngineManager no esta inicializado."
      );
    }

    this.initialized = false;

    return true;
  }

  restart() {
    if (this.initialized) {
      this.shutdown();
    }

    this.initialize();

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      bootstrap: !!this.bootstrap,
      kernel: !!this.kernel,
      runtime: !!this.runtime,
      monitor: !!this.monitor,
      registry: !!this.registry,
      context: !!this.context,
    };
  }

  reset() {
    this.bootstrap = null;
    this.kernel = null;
    this.runtime = null;
    this.monitor = null;
    this.registry = null;
    this.context = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      status: this.getStatus(),
    };
  }
}

export default EngineManager;
