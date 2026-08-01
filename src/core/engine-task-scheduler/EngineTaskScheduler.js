class EngineTaskScheduler {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.tasks = [];
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineTaskScheduler requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  scheduleTask(task) {
    if (task === undefined) {
      throw new Error(
        "La task no puede ser undefined."
      );
    }

    this.tasks.push(task);

    return task;
  }

  nextTask() {
    if (this.tasks.length === 0) {
      return null;
    }

    return this.tasks.shift();
  }

  peek() {
    if (this.tasks.length === 0) {
      return null;
    }

    return this.tasks[0];
  }

  hasTasks() {
    return this.tasks.length > 0;
  }

  size() {
    return this.tasks.length;
  }

  getTasks() {
    return [...this.tasks];
  }

  clear() {
    this.tasks = [];

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      tasks: this.tasks.length,
      hasTasks: this.tasks.length > 0,
    };
  }

  reset() {
    this.manager = null;
    this.tasks = [];
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      tasks: this.tasks.length,
      hasTasks: this.tasks.length > 0,
      tasksList: [...this.tasks],
    };
  }
}

export default EngineTaskScheduler;
