class EngineRuntime {
  constructor({
    kernel = null,
    context = null,
    scheduler = null,
    eventBus = null,
    logger = null,
  } = {}) {
    this.kernel = kernel;
    this.context = context;
    this.scheduler = scheduler;
    this.eventBus = eventBus;
    this.logger = logger;
    this.running = false;
    this.paused = false;
    this.startedAt = null;
    this.stoppedAt = null;
  }

  setKernel(kernel) {
    this.kernel = kernel;

    return this;
  }

  setContext(context) {
    this.context = context;

    return this;
  }

  setScheduler(scheduler) {
    this.scheduler = scheduler;

    return this;
  }

  setEventBus(eventBus) {
    this.eventBus = eventBus;

    return this;
  }

  setLogger(logger) {
    this.logger = logger;

    return this;
  }

  validateDependencies() {
    if (!this.kernel) {
      throw new Error(
        "EngineRuntime requiere kernel."
      );
    }

    if (!this.context) {
      throw new Error(
        "EngineRuntime requiere context."
      );
    }

    if (!this.scheduler) {
      throw new Error(
        "EngineRuntime requiere scheduler."
      );
    }

    if (!this.eventBus) {
      throw new Error(
        "EngineRuntime requiere eventBus."
      );
    }

    if (!this.logger) {
      throw new Error(
        "EngineRuntime requiere logger."
      );
    }
  }

  start() {
    this.validateDependencies();

    if (this.running) {
      throw new Error(
        "EngineRuntime ya esta ejecutandose."
      );
    }

    this.running = true;
    this.paused = false;
    this.startedAt = new Date().toISOString();
    this.stoppedAt = null;

    return true;
  }

  stop() {
    if (!this.running) {
      throw new Error(
        "EngineRuntime no esta ejecutandose."
      );
    }

    this.running = false;
    this.paused = false;
    this.stoppedAt = new Date().toISOString();

    return true;
  }

  pause() {
    if (!this.running) {
      throw new Error(
        "EngineRuntime no esta ejecutandose."
      );
    }

    if (this.paused) {
      throw new Error(
        "EngineRuntime ya esta pausado."
      );
    }

    this.paused = true;

    return true;
  }

  resume() {
    if (!this.running) {
      throw new Error(
        "EngineRuntime no esta ejecutandose."
      );
    }

    if (!this.paused) {
      throw new Error(
        "EngineRuntime no esta pausado."
      );
    }

    this.paused = false;

    return true;
  }

  restart() {
    if (this.running) {
      this.stop();
    }

    this.start();

    return true;
  }

  isRunning() {
    return this.running;
  }

  isPaused() {
    return this.paused;
  }

  getUptime() {
    if (!this.startedAt) {
      return 0;
    }

    const startedAt =
      new Date(this.startedAt).getTime();

    if (this.running) {
      return Date.now() - startedAt;
    }

    if (this.stoppedAt) {
      return new Date(this.stoppedAt).getTime() - startedAt;
    }

    return 0;
  }

  getStatus() {
    return {
      running: this.running,
      paused: this.paused,
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      uptime: this.getUptime(),
      kernel: !!this.kernel,
      context: !!this.context,
      scheduler: !!this.scheduler,
      eventBus: !!this.eventBus,
      logger: !!this.logger,
    };
  }

  reset() {
    if (this.running) {
      this.running = false;
    }

    this.kernel = null;
    this.context = null;
    this.scheduler = null;
    this.eventBus = null;
    this.logger = null;
    this.running = false;
    this.paused = false;
    this.startedAt = null;
    this.stoppedAt = null;

    return true;
  }

  toJSON() {
    return {
      running: this.running,
      paused: this.paused,
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      uptime: this.getUptime(),
      status: this.getStatus(),
    };
  }
}

export default EngineRuntime;
