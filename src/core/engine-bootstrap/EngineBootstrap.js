class EngineBootstrap {
  constructor({
    registry = null,
    context = null,
    configurationManager = null,
    lifecycleManager = null,
  } = {}) {
    this.registry = registry;
    this.context = context;
    this.configurationManager = configurationManager;
    this.lifecycleManager = lifecycleManager;
    this.initialized = false;
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

  initialize() {
    if (!this.registry) {
      throw new Error(
        "EngineBootstrap requiere registry."
      );
    }

    if (!this.context) {
      throw new Error(
        "EngineBootstrap requiere context."
      );
    }

    if (!this.configurationManager) {
      throw new Error(
        "EngineBootstrap requiere configurationManager."
      );
    }

    if (!this.lifecycleManager) {
      throw new Error(
        "EngineBootstrap requiere lifecycleManager."
      );
    }

    this.initialized = true;

    return true;
  }

  shutdown() {
    this.initialized = false;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      registry: !!this.registry,
      context: !!this.context,
      configurationManager: !!this.configurationManager,
      lifecycleManager: !!this.lifecycleManager,
    };
  }

  reset() {
    this.registry = null;
    this.context = null;
    this.configurationManager = null;
    this.lifecycleManager = null;
    this.initialized = false;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      status: this.getStatus(),
    };
  }
}

export default EngineBootstrap;
