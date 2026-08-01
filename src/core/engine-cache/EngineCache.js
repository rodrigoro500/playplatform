class EngineCache {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.cache = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineCache requiere manager."
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
        "La clave de cache debe ser un string no vacio."
      );
    }
  }

  set(
    key,
    value
  ) {
    this.validateKey(key);
    this.cache.set(
      key,
      value
    );

    return this;
  }

  get(key) {
    this.validateKey(key);

    if (!this.cache.has(key)) {
      return null;
    }

    return this.cache.get(key);
  }

  has(key) {
    this.validateKey(key);

    return this.cache.has(key);
  }

  remove(key) {
    this.validateKey(key);
    this.cache.delete(key);

    return true;
  }

  clear() {
    this.cache.clear();

    return true;
  }

  size() {
    return this.cache.size;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      entries: this.cache.size,
    };
  }

  reset() {
    this.manager = null;
    this.cache = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      entries: this.cache.size,
      cache: Object.fromEntries(this.cache),
    };
  }
}

export default EngineCache;
