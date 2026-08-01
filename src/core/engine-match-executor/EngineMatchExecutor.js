class EngineMatchExecutor {
  constructor({
    manager = null,
    matchController = null,
  } = {}) {
    this.manager = manager;
    this.matchController = matchController;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setMatchController(matchController) {
    this.matchController = matchController;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineMatchExecutor requiere manager."
      );
    }

    if (!this.matchController) {
      throw new Error(
        "EngineMatchExecutor requiere matchController."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  execute() {
    if (!this.initialized) {
      throw new Error(
        "EngineMatchExecutor debe estar inicializado."
      );
    }

    this.start();
    this.finish();

    return true;
  }

  start() {
    return this.matchController.startMatch();
  }

  finish() {
    return this.matchController.finishMatch();
  }

  isRunning() {
    return this.matchController.isRunning();
  }

  getMatchController() {
    return this.matchController;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      running: this.isRunning(),
    };
  }

  reset() {
    this.manager = null;
    this.matchController = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasMatchController: this.matchController !== null,
    };
  }
}

export default EngineMatchExecutor;
