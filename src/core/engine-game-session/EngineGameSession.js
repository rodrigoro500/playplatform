class EngineGameSession {
  constructor({
    manager = null,
    roundCoordinator = null,
    betCoordinator = null,
    settlementCoordinator = null,
  } = {}) {
    this.manager = manager;
    this.roundCoordinator = roundCoordinator;
    this.betCoordinator = betCoordinator;
    this.settlementCoordinator = settlementCoordinator;
    this.active = false;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setRoundCoordinator(roundCoordinator) {
    this.roundCoordinator = roundCoordinator;

    return this;
  }

  setBetCoordinator(betCoordinator) {
    this.betCoordinator = betCoordinator;

    return this;
  }

  setSettlementCoordinator(settlementCoordinator) {
    this.settlementCoordinator = settlementCoordinator;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineGameSession requiere manager."
      );
    }

    if (!this.roundCoordinator) {
      throw new Error(
        "EngineGameSession requiere roundCoordinator."
      );
    }

    if (!this.betCoordinator) {
      throw new Error(
        "EngineGameSession requiere betCoordinator."
      );
    }

    if (!this.settlementCoordinator) {
      throw new Error(
        "EngineGameSession requiere settlementCoordinator."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  startSession() {
    if (!this.initialized) {
      throw new Error(
        "EngineGameSession debe estar inicializado."
      );
    }

    this.active = true;
    this.roundCoordinator.startRound();

    return true;
  }

  finishSession() {
    if (this.active) {
      this.roundCoordinator.finishRound();
    }

    this.active = false;

    return true;
  }

  isActive() {
    return this.active;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      active: this.active,
    };
  }

  reset() {
    this.manager = null;
    this.roundCoordinator = null;
    this.betCoordinator = null;
    this.settlementCoordinator = null;
    this.active = false;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      active: this.active,
      hasRoundCoordinator: this.roundCoordinator !== null,
      hasBetCoordinator: this.betCoordinator !== null,
      hasSettlementCoordinator: this.settlementCoordinator !== null,
    };
  }
}

export default EngineGameSession;
