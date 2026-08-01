class EnginePlayFlow {
  constructor({
    manager = null,
    gameSession = null,
    roundCoordinator = null,
    betCoordinator = null,
    settlementCoordinator = null,
  } = {}) {
    this.manager = manager;
    this.gameSession = gameSession;
    this.roundCoordinator = roundCoordinator;
    this.betCoordinator = betCoordinator;
    this.settlementCoordinator = settlementCoordinator;
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
        "EnginePlayFlow requiere manager."
      );
    }

    if (!this.gameSession) {
      throw new Error(
        "EnginePlayFlow requiere gameSession."
      );
    }

    if (!this.roundCoordinator) {
      throw new Error(
        "EnginePlayFlow requiere roundCoordinator."
      );
    }

    if (!this.betCoordinator) {
      throw new Error(
        "EnginePlayFlow requiere betCoordinator."
      );
    }

    if (!this.settlementCoordinator) {
      throw new Error(
        "EnginePlayFlow requiere settlementCoordinator."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  start() {
    this.gameSession.startSession();

    return true;
  }

  openBetting() {
    return true;
  }

  closeBetting() {
    return true;
  }

  resolve(result) {
    return this.settlementCoordinator.settle(result);
  }

  finish() {
    this.gameSession.finishSession();

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      sessionActive: this.gameSession.isActive(),
    };
  }

  reset() {
    this.manager = null;
    this.gameSession = null;
    this.roundCoordinator = null;
    this.betCoordinator = null;
    this.settlementCoordinator = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasGameSession: this.gameSession !== null,
      hasRoundCoordinator: this.roundCoordinator !== null,
      hasBetCoordinator: this.betCoordinator !== null,
      hasSettlementCoordinator: this.settlementCoordinator !== null,
    };
  }
}

export default EnginePlayFlow;
