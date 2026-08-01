class PaseGameAdapter {
  constructor({
    manager = null,
    gameViewModel = null,
  } = {}) {
    this.manager = manager;
    this.gameViewModel = gameViewModel;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setGameViewModel(gameViewModel) {
    this.gameViewModel = gameViewModel;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseGameAdapter requiere manager."
      );
    }

    if (!this.gameViewModel) {
      throw new Error(
        "PaseGameAdapter requiere gameViewModel."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getState() {
    return this.gameViewModel.getGameState();
  }

  getTable() {
    return this.gameViewModel.getTable();
  }

  getPlayers() {
    return this.gameViewModel.getPlayers();
  }

  getBets() {
    return this.gameViewModel.getBets();
  }

  getDice() {
    return this.gameViewModel.getDice();
  }

  refresh() {
    return this.gameViewModel.refresh();
  }

  getStatus() {
    return this.gameViewModel.getStatus();
  }

  reset() {
    this.manager = null;
    this.gameViewModel = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasGameViewModel: this.gameViewModel !== null,
    };
  }
}

export default PaseGameAdapter;
