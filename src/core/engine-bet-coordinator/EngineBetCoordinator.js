class EngineBetCoordinator {
  constructor({
    manager = null,
    roundCoordinator = null,
    betManager = null,
    wallet = null,
  } = {}) {
    this.manager = manager;
    this.roundCoordinator = roundCoordinator;
    this.betManager = betManager;
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
        "EngineBetCoordinator requiere manager."
      );
    }

    if (!this.roundCoordinator) {
      throw new Error(
        "EngineBetCoordinator requiere roundCoordinator."
      );
    }

    if (!this.betManager) {
      throw new Error(
        "EngineBetCoordinator requiere betManager."
      );
    }

    if (!this.wallet) {
      throw new Error(
        "EngineBetCoordinator requiere wallet."
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

  getStatus() {
    return {
      initialized: this.initialized,
      bets: this.betManager.getBetCount(),
    };
  }

  reset() {
    this.manager = null;
    this.roundCoordinator = null;
    this.betManager = null;
    this.wallet = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasRoundCoordinator: this.roundCoordinator !== null,
      hasBetManager: this.betManager !== null,
      hasWallet: this.wallet !== null,
    };
  }
}

export default EngineBetCoordinator;
