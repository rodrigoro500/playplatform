class EngineRegistryManager {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.registry = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineRegistryManager requiere manager."
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

  register(
    name,
    resource
  ) {
    this.validateName(name);
    this.registry.set(
      name,
      resource
    );

    return this;
  }

  get(name) {
    this.validateName(name);

    if (!this.registry.has(name)) {
      return null;
    }

    return this.registry.get(name);
  }

  has(name) {
    this.validateName(name);

    return this.registry.has(name);
  }

  unregister(name) {
    this.validateName(name);
    this.registry.delete(name);

    return true;
  }

  clear() {
    this.registry.clear();

    return true;
  }

  size() {
    return this.registry.size;
  }

  getAll() {
    return Object.fromEntries(this.registry);
  }

  getStatus() {
    return {
      initialized: this.initialized,
      resources: this.registry.size,
    };
  }

  reset() {
    this.manager = null;
    this.registry = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      resources: this.registry.size,
      registry: Object.fromEntries(this.registry),
    };
  }
}

export default EngineRegistryManager;
