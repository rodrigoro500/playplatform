class EngineIntegrationLayer {
  constructor({
    manager = null,
    orchestrator = null,
  } = {}) {
    this.manager = manager;
    this.orchestrator = orchestrator;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setOrchestrator(orchestrator) {
    this.orchestrator = orchestrator;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineIntegrationLayer requiere manager."
      );
    }

    if (!this.orchestrator) {
      throw new Error(
        "EngineIntegrationLayer requiere orchestrator."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  register(name, component) {
    this.orchestrator.registerComponent(
      name,
      component
    );

    return this;
  }

  resolve(name) {
    return this.orchestrator.getComponent(
      name
    );
  }

  has(name) {
    return this.orchestrator.hasComponent(
      name
    );
  }

  remove(name) {
    return this.orchestrator.removeComponent(
      name
    );
  }

  getComponents() {
    return this.orchestrator.getComponents();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      components: this.orchestrator.size(),
    };
  }

  reset() {
    this.manager = null;
    this.orchestrator = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasOrchestrator: this.orchestrator !== null,
    };
  }
}

export default EngineIntegrationLayer;
