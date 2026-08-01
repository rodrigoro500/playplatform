class EngineStateCoordinator {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.states = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineStateCoordinator requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  setState(key, value) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave del estado debe ser un string no vacio."
      );
    }

    this.states.set(
      key,
      value
    );

    return this;
  }

  getState(key) {
    if (!this.states.has(key)) {
      return null;
    }

    return this.states.get(key);
  }

  hasState(key) {
    return this.states.has(key);
  }

  removeState(key) {
    if (!this.states.has(key)) {
      throw new Error(
        "El estado no existe."
      );
    }

    this.states.delete(key);

    return true;
  }

  clear() {
    this.states.clear();

    return true;
  }

  size() {
    return this.states.size;
  }

  getStates() {
    return Object.fromEntries(
      this.states
    );
  }

  getStatus() {
    return {
      initialized: this.initialized,
      states: this.states.size,
    };
  }

  reset() {
    this.manager = null;
    this.states = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      states: this.states.size,
      registry: Object.fromEntries(
        this.states
      ),
    };
  }
}

export default EngineStateCoordinator;
