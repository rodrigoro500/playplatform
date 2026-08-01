class PaseSettlementRuntime {
  constructor({
    manager = null,
    betRuntime = null,
    resolver = null,
    settlementResolver = null,
  } = {}) {
    this.manager = manager;
    this.betRuntime = betRuntime;
    this.resolver = resolver;
    this.settlementResolver = settlementResolver;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setBetRuntime(betRuntime) {
    this.betRuntime = betRuntime;

    return this;
  }

  setResolver(resolver) {
    this.resolver = resolver;

    return this;
  }

  setSettlementResolver(settlementResolver) {
    this.settlementResolver = settlementResolver;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseSettlementRuntime requiere manager."
      );
    }

    if (!this.betRuntime) {
      throw new Error(
        "PaseSettlementRuntime requiere betRuntime."
      );
    }

    if (!this.resolver) {
      throw new Error(
        "PaseSettlementRuntime requiere resolver."
      );
    }

    if (!this.settlementResolver) {
      throw new Error(
        "PaseSettlementRuntime requiere settlementResolver."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  resolveRound(result) {
    return this.resolver.resolve(result);
  }

  settleRound(result) {
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
      bets: this.betRuntime.getBetCount(),
      settlements: this.getResults().length,
    };
  }

  reset() {
    this.manager = null;
    this.betRuntime = null;
    this.resolver = null;
    this.settlementResolver = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasBetRuntime: this.betRuntime !== null,
      hasResolver: this.resolver !== null,
      hasSettlementResolver: this.settlementResolver !== null,
    };
  }
}

export default PaseSettlementRuntime;
