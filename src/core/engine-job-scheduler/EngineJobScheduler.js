class EngineJobScheduler {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.schedule = [];
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineJobScheduler requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  scheduleJob(job) {
    if (job === undefined) {
      throw new Error(
        "El job no puede ser undefined."
      );
    }

    this.schedule.push(job);

    return job;
  }

  nextJob() {
    if (this.schedule.length === 0) {
      return null;
    }

    return this.schedule.shift();
  }

  peek() {
    if (this.schedule.length === 0) {
      return null;
    }

    return this.schedule[0];
  }

  hasJobs() {
    return this.schedule.length > 0;
  }

  size() {
    return this.schedule.length;
  }

  getSchedule() {
    return [...this.schedule];
  }

  clear() {
    this.schedule = [];

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      jobs: this.schedule.length,
      hasJobs: this.schedule.length > 0,
    };
  }

  reset() {
    this.manager = null;
    this.schedule = [];
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      jobs: this.schedule.length,
      hasJobs: this.schedule.length > 0,
      schedule: [...this.schedule],
    };
  }
}

export default EngineJobScheduler;
