class PaseTableViewModel {
  constructor({
    manager = null,
    tableRuntime = null,
  } = {}) {
    this.manager = manager;
    this.tableRuntime = tableRuntime;
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

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseTableViewModel requiere manager."
      );
    }

    if (!this.tableRuntime) {
      throw new Error(
        "PaseTableViewModel requiere tableRuntime."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getTableState() {
    return this.tableRuntime.getStatus();
  }

  getPlayers() {
    return this.tableRuntime.getPlayers();
  }

  getPlayerCount() {
    return this.tableRuntime.getPlayerCount();
  }

  isRunning() {
    return this.tableRuntime.getStatus().running;
  }

  refresh() {
    return this.getTableState();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      players: this.getPlayerCount(),
      running: this.isRunning(),
    };
  }

  reset() {
    this.manager = null;
    this.tableRuntime = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasTableRuntime: this.tableRuntime !== null,
    };
  }
}

export default PaseTableViewModel;
