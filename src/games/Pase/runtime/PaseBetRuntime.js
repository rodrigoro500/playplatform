class PaseBetRuntime {
  constructor({
    manager = null,
    tableRuntime = null,
    betManager = null,
    wallet = null,
  } = {}) {
    this.manager = manager;
    this.tableRuntime = tableRuntime;
    this.betManager = betManager;
    this.wallet = wallet;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setTableRuntime(tableRuntime) {
    this.tableRuntime = tableRuntime;

    return this;
  }

  setBetManager(betManager) {
    this.betManager = betManager;

    return this;
  }

  setWallet(wallet) {
    this.wallet = wallet;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseBetRuntime requiere manager."
      );
    }

    if (!this.tableRuntime) {
      throw new Error(
        "PaseBetRuntime requiere tableRuntime."
      );
    }

    if (!this.betManager) {
      throw new Error(
        "PaseBetRuntime requiere betManager."
      );
    }

    if (!this.wallet) {
      throw new Error(
        "PaseBetRuntime requiere wallet."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  placeBet(bet) {
    return this.betManager.placeBet(bet);
  }

  cancelBet(id) {
    return this.betManager.cancelBet(id);
  }

  getBet(id) {
    return this.betManager.getBet(id);
  }

  getBets() {
    return this.betManager.getBets();
  }

  getBetCount() {
    return this.betManager.getBetCount();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      players: this.tableRuntime.getPlayerCount(),
      bets: this.getBetCount(),
    };
  }

  reset() {
    this.manager = null;
    this.tableRuntime = null;
    this.betManager = null;
    this.wallet = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasTableRuntime: this.tableRuntime !== null,
      hasBetManager: this.betManager !== null,
      hasWallet: this.wallet !== null,
    };
  }
}

export default PaseBetRuntime;
