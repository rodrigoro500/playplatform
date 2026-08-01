class EngineTaskManager {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.tasks = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineTaskManager requiere manager."
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
        "El nombre de la tarea debe ser un string no vacio."
      );
    }
  }

  validateTask(task) {
    if (typeof task !== "function") {
      throw new Error(
        "La tarea debe ser una funcion."
      );
    }
  }

  registerTask(
    name,
    task
  ) {
    this.validateName(name);
    this.validateTask(task);
    this.tasks.set(
      name,
      task
    );

    return this;
  }

  getTask(name) {
    this.validateName(name);

    if (!this.tasks.has(name)) {
      throw new Error(
        `La tarea ${name} no existe.`
      );
    }

    return this.tasks.get(name);
  }

  hasTask(name) {
    this.validateName(name);

    return this.tasks.has(name);
  }

  removeTask(name) {
    this.validateName(name);

    if (!this.tasks.has(name)) {
      throw new Error(
        `La tarea ${name} no existe.`
      );
    }

    this.tasks.delete(name);

    return true;
  }

  executeTask(
    name,
    ...args
  ) {
    const task =
      this.getTask(name);

    return task(...args);
  }

  clear() {
    this.tasks.clear();

    return true;
  }

  size() {
    return this.tasks.size;
  }

  getAll() {
    return Object.fromEntries(this.tasks);
  }

  getStatus() {
    return {
      initialized: this.initialized,
      tasks: this.tasks.size,
    };
  }

  reset() {
    this.manager = null;
    this.tasks = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      tasks: this.tasks.size,
      registry: Object.fromEntries(this.tasks),
    };
  }
}

export default EngineTaskManager;
