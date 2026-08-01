class EngineJobExecutor {
  constructor({
    manager = null,
    queue = null,
  } = {}) {
    this.manager = manager;
    this.queue = queue;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setQueue(queue) {
    this.queue = queue;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineJobExecutor requiere manager."
      );
    }

    if (!this.queue) {
      throw new Error(
        "EngineJobExecutor requiere queue."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  executeNext() {
    if (!this.queue) {
      throw new Error(
        "EngineJobExecutor requiere queue."
      );
    }

    if (!this.queue.hasJobs()) {
      return null;
    }

    const job =
      this.queue.dequeue();

    if (
      job &&
      typeof job.execute === "function"
    ) {
      return job.execute();
    }

    if (typeof job === "function") {
      return job();
    }

    return job;
  }

  executeAll() {
    if (!this.queue) {
      throw new Error(
        "EngineJobExecutor requiere queue."
      );
    }

    const results = [];

    while (this.queue.hasJobs()) {
      results.push(
        this.executeNext()
      );
    }

    return results;
  }

  getQueue() {
    return this.queue;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      hasQueue: this.queue !== null,
    };
  }

  reset() {
    this.manager = null;
    this.queue = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasQueue: this.queue !== null,
    };
  }
}

export default EngineJobExecutor;
