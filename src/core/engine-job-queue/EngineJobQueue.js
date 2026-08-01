class EngineJobQueue {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.queue = [];
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineJobQueue requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  enqueue(job) {
    if (job === undefined) {
      throw new Error(
        "El job no puede ser undefined."
      );
    }

    this.queue.push(job);

    return job;
  }

  dequeue() {
    if (this.queue.length === 0) {
      throw new Error(
        "La cola de jobs esta vacia."
      );
    }

    return this.queue.shift();
  }

  peek() {
    if (this.queue.length === 0) {
      return null;
    }

    return this.queue[0];
  }

  hasJobs() {
    return this.queue.length > 0;
  }

  size() {
    return this.queue.length;
  }

  getJobs() {
    return [...this.queue];
  }

  clear() {
    this.queue = [];

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      jobs: this.queue.length,
      hasJobs: this.queue.length > 0,
    };
  }

  reset() {
    this.manager = null;
    this.queue = [];
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      jobs: this.queue.length,
      hasJobs: this.queue.length > 0,
      queue: [...this.queue],
    };
  }
}

export default EngineJobQueue;
