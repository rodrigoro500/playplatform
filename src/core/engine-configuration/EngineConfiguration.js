class EngineConfiguration {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.configuration = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineConfiguration requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  validateKey(key) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave de configuracion debe ser un string no vacio."
      );
    }
  }

  set(
    key,
    value
  ) {
    this.validateKey(key);
    this.configuration.set(
      key,
      value
    );

    return this;
  }

  get(key) {
    this.validateKey(key);

    if (!this.configuration.has(key)) {
      return null;
    }

    return this.configuration.get(key);
  }

  has(key) {
    this.validateKey(key);

    return this.configuration.has(key);
  }

  remove(key) {
    this.validateKey(key);
    this.configuration.delete(key);

    return true;
  }

  clear() {
    this.configuration.clear();

    return true;
  }

  getAll() {
    return Object.fromEntries(this.configuration);
  }

  getStatus() {
    return {
      initialized: this.initialized,
      entries: this.configuration.size,
    };
  }

  reset() {
    this.manager = null;
    this.configuration = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      configuration: Object.fromEntries(this.configuration),
    };
  }
}

export default EngineConfiguration;
