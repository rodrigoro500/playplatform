class EngineGameLoop {
  constructor({
    manager = null,
    integrationLayer = null,
    flowController = null,
  } = {}) {
    this.manager = manager;
    this.integrationLayer = integrationLayer;
    this.flowController = flowController;
    this.running = false;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setIntegrationLayer(integrationLayer) {
    this.integrationLayer = integrationLayer;

    return this;
  }

  setFlowController(flowController) {
    this.flowController = flowController;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineGameLoop requiere manager."
      );
    }

    if (!this.integrationLayer) {
      throw new Error(
        "EngineGameLoop requiere integrationLayer."
      );
    }

    if (!this.flowController) {
      throw new Error(
        "EngineGameLoop requiere flowController."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  start() {
    if (!this.initialized) {
      throw new Error(
        "EngineGameLoop debe estar inicializado."
      );
    }

    this.running = true;

    return true;
  }

  stop() {
    this.running = false;

    return true;
  }

  isRunning() {
    return this.running;
  }

  next() {
    return this.flowController.nextStep();
  }

  previous() {
    return this.flowController.previousStep();
  }

  current() {
    return this.flowController.getCurrentStep();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      running: this.running,
      currentStep: this.current(),
    };
  }

  reset() {
    this.manager = null;
    this.integrationLayer = null;
    this.flowController = null;
    this.running = false;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      running: this.running,
      hasIntegrationLayer: this.integrationLayer !== null,
      hasFlowController: this.flowController !== null,
    };
  }
}

export default EngineGameLoop;
