class Timer {
  static STATUSES = [
    "IDLE",
    "RUNNING",
    "PAUSED",
    "COMPLETED",
    "CANCELLED",
  ];

  constructor() {
    this.timers = new Map();
  }

  validateId(id) {
    if (
      typeof id !== "string" ||
      id.trim() === ""
    ) {
      throw new Error(
        "El id del timer debe ser un string no vacio."
      );
    }
  }

  validateDuration(duration) {
    if (
      typeof duration !== "number" ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      throw new Error(
        "La duracion del timer debe ser un numero positivo finito."
      );
    }
  }

  validateCallback(callback) {
    if (
      callback !== null &&
      typeof callback !== "function"
    ) {
      throw new Error(
        "El callback del timer debe ser una funcion o null."
      );
    }
  }

  validateStatus(status) {
    if (!Timer.STATUSES.includes(status)) {
      throw new Error(
        "El estado del timer no es valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  createTimer(
    id,
    duration,
    callback = null
  ) {
    this.validateId(id);
    this.validateDuration(duration);
    this.validateCallback(callback);

    if (this.hasTimer(id)) {
      throw new Error(
        "Ya existe un timer con ese id."
      );
    }

    const timer = {
      id,
      duration,
      remaining: duration,
      status: "IDLE",
      startedAt: null,
      finishedAt: null,
      callback,
    };

    this.timers.set(
      id,
      timer
    );

    return timer;
  }

  startTimer(id) {
    const timer =
      this.getTimer(id);

    timer.status = "RUNNING";
    timer.startedAt = this.createTimestamp();

    return timer;
  }

  pauseTimer(id) {
    const timer =
      this.getTimer(id);

    if (timer.status !== "RUNNING") {
      throw new Error(
        "Solo se puede pausar un timer en estado RUNNING."
      );
    }

    timer.status = "PAUSED";

    return timer;
  }

  resumeTimer(id) {
    const timer =
      this.getTimer(id);

    if (timer.status !== "PAUSED") {
      throw new Error(
        "Solo se puede reanudar un timer en estado PAUSED."
      );
    }

    timer.status = "RUNNING";

    return timer;
  }

  cancelTimer(id) {
    const timer =
      this.getTimer(id);

    timer.status = "CANCELLED";
    timer.finishedAt = this.createTimestamp();

    return timer;
  }

  completeTimer(id) {
    const timer =
      this.getTimer(id);

    timer.status = "COMPLETED";
    timer.remaining = 0;
    timer.finishedAt = this.createTimestamp();

    if (timer.callback) {
      timer.callback(timer);
    }

    return timer;
  }

  getTimer(id) {
    this.validateId(id);

    const timer =
      this.timers.get(id);

    if (!timer) {
      throw new Error(
        "No existe un timer con ese id."
      );
    }

    return timer;
  }

  hasTimer(id) {
    this.validateId(id);

    return this.timers.has(id);
  }

  removeTimer(id) {
    this.validateId(id);

    if (!this.hasTimer(id)) {
      throw new Error(
        "No existe un timer para eliminar."
      );
    }

    return this.timers.delete(id);
  }

  getTimers() {
    return Array.from(
      this.timers.values()
    );
  }

  getTimersByStatus(status) {
    this.validateStatus(status);

    return this
      .getTimers()
      .filter(timer =>
        timer.status === status
      );
  }

  count() {
    return this.timers.size;
  }

  clear() {
    this.timers.clear();
  }

  toJSON() {
    return this
      .getTimers()
      .map(timer => ({
        id: timer.id,
        duration: timer.duration,
        remaining: timer.remaining,
        status: timer.status,
        startedAt: timer.startedAt,
        finishedAt: timer.finishedAt,
        callback: timer.callback,
      }));
  }
}

export default Timer;
