class PaseGameRuntime {
  constructor({
    manager = null,
    playFlow = null,
    paseEngine = null,
  } = {}) {
    this.manager = manager;
    this.playFlow = playFlow;
    this.paseEngine = paseEngine;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setPlayFlow(playFlow) {
    this.playFlow = playFlow;

    return this;
  }

  setPaseEngine(paseEngine) {
    this.paseEngine = paseEngine;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseGameRuntime requiere manager."
      );
    }

    if (!this.playFlow) {
      throw new Error(
        "PaseGameRuntime requiere playFlow."
      );
    }

    if (!this.paseEngine) {
      throw new Error(
        "PaseGameRuntime requiere paseEngine."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  start() {
    this.playFlow.start();

    return true;
  }

  roll() {
    return this.paseEngine.rollDice();
  }

  resolve(result) {
    return this.playFlow.resolve(result);
  }

  finish() {
    this.playFlow.finish();

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      playFlowActive: this.playFlow.getStatus(),
    };
  }

  reset() {
    this.manager = null;
    this.playFlow = null;
    this.paseEngine = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasPlayFlow: this.playFlow !== null,
      hasPaseEngine: this.paseEngine !== null,
    };
  }
}

export default PaseGameRuntime;
