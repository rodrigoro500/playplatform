class EngineMatchController {
  constructor({
    manager = null,
    gameSession = null,
  } = {}) {
    this.manager = manager;
    this.gameSession = gameSession;
    this.running = false;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setGameSession(gameSession) {
    this.gameSession = gameSession;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineMatchController requiere manager."
      );
    }

    if (!this.gameSession) {
      throw new Error(
        "EngineMatchController requiere gameSession."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  startMatch() {
    if (!this.initialized) {
      throw new Error(
        "EngineMatchController debe estar inicializado."
      );
    }

    this.gameSession.startSession();
    this.running = true;

    return true;
  }

  finishMatch() {
    if (this.running) {
      this.gameSession.finishSession();
    }

    this.running = false;

    return true;
  }

  isRunning() {
    return this.running;
  }

  getGameSession() {
    return this.gameSession;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      running: this.running,
    };
  }

  reset() {
    this.manager = null;
    this.gameSession = null;
    this.running = false;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      running: this.running,
      hasGameSession: this.gameSession !== null,
    };
  }
}

export default EngineMatchController;
