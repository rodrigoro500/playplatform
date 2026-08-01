class PaseGameStore {
  constructor({
    manager = null,
    reactAdapter = null,
  } = {}) {
    this.manager = manager;
    this.reactAdapter = reactAdapter;
    this.state = null;
    this.initialized = false;
    this.listeners = new Set();
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setReactAdapter(reactAdapter) {
    this.reactAdapter = reactAdapter;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseGameStore requiere manager."
      );
    }

    if (!this.reactAdapter) {
      throw new Error(
        "PaseGameStore requiere reactAdapter."
      );
    }

    this.state = this.reactAdapter.getGameState();
    this.initialized = true;
    this.listeners = new Set();

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  loadState() {
    this.state = this.reactAdapter.getGameState();

    return this.state;
  }

  refresh() {
    this.state = this.reactAdapter.refresh();

    this.notify();

    return this.state;
  }

  getState() {
    return this.state;
  }

  getTable() {
    return this.state.table;
  }

  getPlayers() {
    return this.state.players;
  }

  getBets() {
    return this.state.bets;
  }

  getDice() {
    return this.state.dice;
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
    return {
      initialized: this.initialized,
      players: this.getPlayers().length,
      bets: this.getBets().length,
    };
  }

  reset() {
    this.manager = null;
    this.reactAdapter = null;
    this.state = null;
    this.initialized = false;
    this.listeners = new Set();

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasState: this.state !== null,
      listeners: this.listeners.size,
    };
  }
}

export default PaseGameStore;
