class PaseGameViewModel {
  constructor({
    manager = null,
    tableViewModel = null,
    playerViewModel = null,
    betViewModel = null,
    diceViewModel = null,
  } = {}) {
    this.manager = manager;
    this.tableViewModel = tableViewModel;
    this.playerViewModel = playerViewModel;
    this.betViewModel = betViewModel;
    this.diceViewModel = diceViewModel;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setTableViewModel(tableViewModel) {
    this.tableViewModel = tableViewModel;

    return this;
  }

  setPlayerViewModel(playerViewModel) {
    this.playerViewModel = playerViewModel;

    return this;
  }

  setBetViewModel(betViewModel) {
    this.betViewModel = betViewModel;

    return this;
  }

  setDiceViewModel(diceViewModel) {
    this.diceViewModel = diceViewModel;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseGameViewModel requiere manager."
      );
    }

    if (!this.tableViewModel) {
      throw new Error(
        "PaseGameViewModel requiere tableViewModel."
      );
    }

    if (!this.playerViewModel) {
      throw new Error(
        "PaseGameViewModel requiere playerViewModel."
      );
    }

    if (!this.betViewModel) {
      throw new Error(
        "PaseGameViewModel requiere betViewModel."
      );
    }

    if (!this.diceViewModel) {
      throw new Error(
        "PaseGameViewModel requiere diceViewModel."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getTable() {
    return this.tableViewModel.getTableState();
  }

  getPlayers() {
    return this.playerViewModel.getPlayers();
  }

  getBets() {
    return this.betViewModel.getBets();
  }

  getDice() {
    return this.diceViewModel.getDice();
  }

  refresh() {
    return {
      table: this.getTable(),
      players: this.getPlayers(),
      bets: this.getBets(),
      dice: this.getDice(),
    };
  }

  getGameState() {
    return {
      table: this.getTable(),
      players: this.getPlayers(),
      bets: this.getBets(),
      dice: {
        values: this.getDice(),
        total: this.diceViewModel.getTotal(),
        outcome: this.diceViewModel.getOutcome(),
      },
    };
  }

  getStatus() {
    return {
      initialized: this.initialized,
      players: this.playerViewModel.getPlayerCount(),
      bets: this.betViewModel.getBetCount(),
      running: this.tableViewModel.isRunning(),
    };
  }

  reset() {
    this.manager = null;
    this.tableViewModel = null;
    this.playerViewModel = null;
    this.betViewModel = null;
    this.diceViewModel = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasTableViewModel: this.tableViewModel !== null,
      hasPlayerViewModel: this.playerViewModel !== null,
      hasBetViewModel: this.betViewModel !== null,
      hasDiceViewModel: this.diceViewModel !== null,
    };
  }
}

export default PaseGameViewModel;
