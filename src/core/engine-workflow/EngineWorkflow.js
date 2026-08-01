class EngineWorkflow {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.workflows = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineWorkflow requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  registerWorkflow(name, workflow) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del workflow debe ser un string no vacio."
      );
    }

    if (workflow === undefined) {
      throw new Error(
        "El workflow no puede ser undefined."
      );
    }

    this.workflows.set(
      name,
      workflow
    );

    return this;
  }

  getWorkflow(name) {
    if (!this.workflows.has(name)) {
      throw new Error(
        "El workflow no existe."
      );
    }

    return this.workflows.get(name);
  }

  hasWorkflow(name) {
    return this.workflows.has(name);
  }

  removeWorkflow(name) {
    if (!this.workflows.has(name)) {
      throw new Error(
        "El workflow no existe."
      );
    }

    this.workflows.delete(name);

    return true;
  }

  size() {
    return this.workflows.size;
  }

  getWorkflows() {
    return Object.fromEntries(
      this.workflows
    );
  }

  clear() {
    this.workflows.clear();

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      workflows: this.workflows.size,
    };
  }

  reset() {
    this.manager = null;
    this.workflows = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      workflows: this.workflows.size,
      registry: Object.fromEntries(
        this.workflows
      ),
    };
  }
}

export default EngineWorkflow;
