class PasePlayerViewModel {
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
        "PasePlayerViewModel requiere manager."
      );
    }

    if (!this.tableRuntime) {
      throw new Error(
        "PasePlayerViewModel requiere tableRuntime."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getPlayers() {
    return this.tableRuntime.getPlayers().map((player) => ({
      id: player.id ?? null,
      name: player.name ?? null,
      seat: player.seat ?? null,
      connected: player.connected ?? null,
      wallet: player.wallet ?? null,
    }));
  }

  getPlayer(playerId) {
    return this.getPlayers().find((player) => player.id === playerId) || null;
  }

  hasPlayer(playerId) {
    return this.getPlayer(playerId) !== null;
  }

  getPlayerCount() {
    return this.tableRuntime.getPlayerCount();
  }

  refresh() {
    return this.getPlayers();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      players: this.getPlayerCount(),
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
      players: this.tableRuntime !== null ? this.getPlayerCount() : 0,
      hasRuntime: this.tableRuntime !== null,
    };
  }
}

export default PasePlayerViewModel;
