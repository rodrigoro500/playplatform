class EngineOrchestrator {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.components = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineOrchestrator requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  registerComponent(name, component) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del componente debe ser un string no vacio."
      );
    }

    if (component === undefined) {
      throw new Error(
        "El componente no puede ser undefined."
      );
    }

    this.components.set(
      name,
      component
    );

    return this;
  }

  getComponent(name) {
    if (!this.components.has(name)) {
      throw new Error(
        "El componente no existe."
      );
    }

    return this.components.get(name);
  }

  hasComponent(name) {
    return this.components.has(name);
  }

  removeComponent(name) {
    if (!this.components.has(name)) {
      throw new Error(
        "El componente no existe."
      );
    }

    this.components.delete(name);

    return true;
  }

  size() {
    return this.components.size;
  }

  getComponents() {
    return Object.fromEntries(
      this.components
    );
  }

  clear() {
    this.components.clear();

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      components: this.components.size,
    };
  }

  reset() {
    this.manager = null;
    this.components = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      components: this.components.size,
      registry: Object.fromEntries(
        this.components
      ),
    };
  }
}

export default EngineOrchestrator;
