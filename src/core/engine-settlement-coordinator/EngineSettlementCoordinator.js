class EngineSettlementCoordinator {
  constructor({
    manager = null,
    roundCoordinator = null,
    settlementResolver = null,
    wallet = null,
  } = {}) {
    this.manager = manager;
    this.roundCoordinator = roundCoordinator;
    this.settlementResolver = settlementResolver;
    this.wallet = wallet;
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

  setSettlementResolver(settlementResolver) {
    this.settlementResolver = settlementResolver;

    return this;
  }

  setWallet(wallet) {
    this.wallet = wallet;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineSettlementCoordinator requiere manager."
      );
    }

    if (!this.roundCoordinator) {
      throw new Error(
        "EngineSettlementCoordinator requiere roundCoordinator."
      );
    }

    if (!this.settlementResolver) {
      throw new Error(
        "EngineSettlementCoordinator requiere settlementResolver."
      );
    }

    if (!this.wallet) {
      throw new Error(
        "EngineSettlementCoordinator requiere wallet."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  settle(result) {
    return this.settlementResolver.resolve(result);
  }

  getResults() {
    return this.settlementResolver.getResults();
  }

  clearResults() {
    this.settlementResolver.clear();

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      settlements: this.settlementResolver.getResults().length,
    };
  }

  reset() {
    this.manager = null;
    this.roundCoordinator = null;
    this.settlementResolver = null;
    this.wallet = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasRoundCoordinator: this.roundCoordinator !== null,
      hasSettlementResolver: this.settlementResolver !== null,
      hasWallet: this.wallet !== null,
    };
  }
}

export default EngineSettlementCoordinator;
