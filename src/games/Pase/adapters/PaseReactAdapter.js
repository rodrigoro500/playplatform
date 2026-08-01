class PaseReactAdapter {
  constructor({
    manager = null,
    gameAdapter = null,
  } = {}) {
    this.manager = manager;
    this.gameAdapter = gameAdapter;
    this.initialized = false;
    this.listeners = new Set();
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setGameAdapter(gameAdapter) {
    this.gameAdapter = gameAdapter;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseReactAdapter requiere manager."
      );
    }

    if (!this.gameAdapter) {
      throw new Error(
        "PaseReactAdapter requiere gameAdapter."
      );
    }

    this.initialized = true;
    this.listeners = new Set();

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getGameState() {
    return this.gameAdapter.getState();
  }

  getTable() {
    return this.gameAdapter.getTable();
  }

  getPlayers() {
    return this.gameAdapter.getPlayers();
  }

  getBets() {
    return this.gameAdapter.getBets();
  }

  getDice() {
    return this.gameAdapter.getDice();
  }

  refresh() {
    const result =
      this.gameAdapter.refresh();

    this.notify();

    return result;
  }

  subscribe(listener) {
    this.listeners.add(listener);

    return true;
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);

    return true;
  }

  notify() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  getStatus() {
    return this.gameAdapter.getStatus();
  }

  reset() {
    this.manager = null;
    this.gameAdapter = null;
    this.initialized = false;
    this.listeners = new Set();

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      listeners: this.listeners.size,
      hasGameAdapter: this.gameAdapter !== null,
    };
  }
}

export default PaseReactAdapter;
