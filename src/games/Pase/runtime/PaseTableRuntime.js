class PaseTableRuntime {
  constructor({
    manager = null,
    table = null,
    matchRuntime = null,
  } = {}) {
    this.manager = manager;
    this.table = table;
    this.matchRuntime = matchRuntime;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setTable(table) {
    this.table = table;

    return this;
  }

  setMatchRuntime(matchRuntime) {
    this.matchRuntime = matchRuntime;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseTableRuntime requiere manager."
      );
    }

    if (!this.table) {
      throw new Error(
        "PaseTableRuntime requiere table."
      );
    }

    if (!this.matchRuntime) {
      throw new Error(
        "PaseTableRuntime requiere matchRuntime."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  startTable() {
    this.matchRuntime.startMatch();

    return true;
  }

  play() {
    return this.matchRuntime.playRound();
  }

  finishTable() {
    this.matchRuntime.finishMatch();

    return true;
  }

  getPlayers() {
    return this.table.getPlayers();
  }

  getPlayerCount() {
    return this.table.getPlayers().length;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      players: this.getPlayerCount(),
      running: this.matchRuntime.isRunning(),
    };
  }

  reset() {
    this.manager = null;
    this.table = null;
    this.matchRuntime = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasTable: this.table !== null,
      hasMatchRuntime: this.matchRuntime !== null,
    };
  }
}

export default PaseTableRuntime;
