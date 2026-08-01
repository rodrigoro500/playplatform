class EngineKernel {
  constructor({
    bootstrap = null,
    registry = null,
    context = null,
    configurationManager = null,
    lifecycleManager = null,
  } = {}) {
    this.bootstrap = bootstrap;
    this.registry = registry;
    this.context = context;
    this.configurationManager = configurationManager;
    this.lifecycleManager = lifecycleManager;
    this.running = false;
  }

  setBootstrap(bootstrap) {
    this.bootstrap = bootstrap;

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

  setConfigurationManager(configurationManager) {
    this.configurationManager =
      configurationManager;

    return this;
  }

  setLifecycleManager(lifecycleManager) {
    this.lifecycleManager =
      lifecycleManager;

    return this;
  }

  start() {
    if (!this.bootstrap) {
      throw new Error(
        "EngineKernel requiere bootstrap."
      );
    }

    if (!this.registry) {
      throw new Error(
        "EngineKernel requiere registry."
      );
    }

    if (!this.context) {
      throw new Error(
        "EngineKernel requiere context."
      );
    }

    if (!this.configurationManager) {
      throw new Error(
        "EngineKernel requiere configurationManager."
      );
    }

    if (!this.lifecycleManager) {
      throw new Error(
        "EngineKernel requiere lifecycleManager."
      );
    }

    this.running = true;

    return true;
  }

  stop() {
    this.running = false;

    return true;
  }

  restart() {
    this.stop();
    this.start();

    return true;
  }

  isRunning() {
    return this.running;
  }

  getStatus() {
    return {
      running: this.running,
      bootstrap: !!this.bootstrap,
      registry: !!this.registry,
      context: !!this.context,
      configurationManager: !!this.configurationManager,
      lifecycleManager: !!this.lifecycleManager,
    };
  }

  reset() {
    this.bootstrap = null;
    this.registry = null;
    this.context = null;
    this.configurationManager = null;
    this.lifecycleManager = null;
    this.running = false;
  }

  toJSON() {
    return {
      running: this.running,
      status: this.getStatus(),
    };
  }
}

export default EngineKernel;
