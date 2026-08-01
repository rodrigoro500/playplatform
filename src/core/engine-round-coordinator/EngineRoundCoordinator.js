class EngineRoundCoordinator {
  constructor({
    manager = null,
    gameLoop = null,
    roundEngine = null,
  } = {}) {
    this.manager = manager;
    this.gameLoop = gameLoop;
    this.roundEngine = roundEngine;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setGameLoop(gameLoop) {
    this.gameLoop = gameLoop;

    return this;
  }

  setRoundEngine(roundEngine) {
    this.roundEngine = roundEngine;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineRoundCoordinator requiere manager."
      );
    }

    if (!this.gameLoop) {
      throw new Error(
        "EngineRoundCoordinator requiere gameLoop."
      );
    }

    if (!this.roundEngine) {
      throw new Error(
        "EngineRoundCoordinator requiere roundEngine."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  startRound() {
    return this.roundEngine.startRound();
  }

  finishRound() {
    return this.roundEngine.finishRound();
  }

  nextStep() {
    return this.gameLoop.next();
  }

  previousStep() {
    return this.gameLoop.previous();
  }

  getCurrentStep() {
    return this.gameLoop.current();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      currentStep: this.getCurrentStep(),
    };
  }

  reset() {
    this.manager = null;
    this.gameLoop = null;
    this.roundEngine = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasGameLoop: this.gameLoop !== null,
      hasRoundEngine: this.roundEngine !== null,
    };
  }
}

export default EngineRoundCoordinator;
