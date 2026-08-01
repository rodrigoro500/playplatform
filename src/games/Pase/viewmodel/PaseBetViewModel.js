class PaseBetViewModel {
  constructor({
    manager = null,
    betRuntime = null,
  } = {}) {
    this.manager = manager;
    this.betRuntime = betRuntime;
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

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseBetViewModel requiere manager."
      );
    }

    if (!this.betRuntime) {
      throw new Error(
        "PaseBetViewModel requiere betRuntime."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getBets() {
    return this.betRuntime.getBets().map((bet) => ({
      id: bet.id ?? null,
      playerId: bet.playerId ?? null,
      type: bet.type ?? null,
      amount: bet.amount ?? null,
      status: bet.status ?? null,
    }));
  }

  getBet(id) {
    return this.betRuntime.getBet(id) || null;
  }

  hasBet(id) {
    return this.getBet(id) !== null;
  }

  getBetCount() {
    return this.betRuntime.getBetCount();
  }

  refresh() {
    return this.getBets();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      bets: this.getBetCount(),
    };
  }

  reset() {
    this.manager = null;
    this.betRuntime = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      bets: this.betRuntime !== null ? this.getBetCount() : 0,
      hasRuntime: this.betRuntime !== null,
    };
  }
}

export default PaseBetViewModel;
