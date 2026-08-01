class EngineResourcePool {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.resources = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineResourcePool requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  validateName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del recurso debe ser un string no vacio."
      );
    }
  }

  registerResource(
    name,
    resource
  ) {
    this.validateName(name);
    this.resources.set(
      name,
      resource
    );

    return this;
  }

  acquireResource(name) {
    this.validateName(name);

    if (!this.resources.has(name)) {
      throw new Error(
        `El recurso ${name} no existe.`
      );
    }

    return this.resources.get(name);
  }

  releaseResource(name) {
    this.validateName(name);

    if (!this.resources.has(name)) {
      throw new Error(
        `El recurso ${name} no existe.`
      );
    }

    return true;
  }

  hasResource(name) {
    this.validateName(name);

    return this.resources.has(name);
  }

  removeResource(name) {
    this.validateName(name);
    this.resources.delete(name);

    return true;
  }

  clear() {
    this.resources.clear();

    return true;
  }

  size() {
    return this.resources.size;
  }

  getAll() {
    return Object.fromEntries(this.resources);
  }

  getStatus() {
    return {
      initialized: this.initialized,
      resources: this.resources.size,
    };
  }

  reset() {
    this.manager = null;
    this.resources = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      resources: this.resources.size,
      pool: Object.fromEntries(this.resources),
    };
  }
}

export default EngineResourcePool;
