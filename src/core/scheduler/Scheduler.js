class Scheduler {
  static STATUSES = [
    "PENDING",
    "RUNNING",
    "COMPLETED",
    "CANCELLED",
  ];

  constructor() {
    this.tasks = new Map();
  }

  validateId(id) {
    if (
      typeof id !== "string" ||
      id.trim() === ""
    ) {
      throw new Error(
        "El id de la tarea debe ser un string no vacio."
      );
    }
  }

  validateCallback(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "El callback de la tarea debe ser una funcion."
      );
    }
  }

  validateDelay(delay) {
    if (
      typeof delay !== "number" ||
      !Number.isFinite(delay) ||
      delay < 0
    ) {
      throw new Error(
        "El delay de la tarea debe ser un numero finito mayor o igual a 0."
      );
    }
  }

  validateStatus(status) {
    if (!Scheduler.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la tarea no es valido."
      );
    }
  }

  schedule(
    id,
    callback,
    delay
  ) {
    this.validateId(id);
    this.validateCallback(callback);
    this.validateDelay(delay);

    if (this.hasTask(id)) {
      throw new Error(
        "Ya existe una tarea con ese id."
      );
    }

    const createdAt =
      new Date().toISOString();

    const executeAt =
      new Date(Date.now() + delay).toISOString();

    const task = {
      id,
      callback,
      delay,
      createdAt,
      executeAt,
      status: "PENDING",
      timeoutId: null,
    };

    task.timeoutId = setTimeout(
      () => {
        task.status = "RUNNING";
        callback();
        task.status = "COMPLETED";
        task.timeoutId = null;
      },
      delay
    );

    this.tasks.set(
      id,
      task
    );

    return task;
  }

  cancel(id) {
    const task =
      this.getTask(id);

    if (task.timeoutId !== null) {
      clearTimeout(task.timeoutId);
    }

    task.status = "CANCELLED";
    task.timeoutId = null;

    return task;
  }

  cancelAll() {
    this
      .getPendingTasks()
      .forEach(task => {
        this.cancel(task.id);
      });

    return this.getCancelledTasks();
  }

  hasTask(id) {
    this.validateId(id);

    return this.tasks.has(id);
  }

  getTask(id) {
    this.validateId(id);

    const task =
      this.tasks.get(id);

    if (!task) {
      throw new Error(
        "No existe una tarea con ese id."
      );
    }

    return task;
  }

  getTasks() {
    return Array.from(
      this.tasks.values()
    );
  }

  getTasksByStatus(status) {
    this.validateStatus(status);

    return this
      .getTasks()
      .filter(task =>
        task.status === status
      );
  }

  getPendingTasks() {
    return this.getTasksByStatus("PENDING");
  }

  getCompletedTasks() {
    return this.getTasksByStatus("COMPLETED");
  }

  getCancelledTasks() {
    return this.getTasksByStatus("CANCELLED");
  }

  count() {
    return this.tasks.size;
  }

  clear() {
    this.cancelAll();
    this.tasks.clear();
  }

  toJSON() {
    return {
      tasks: this
        .getTasks()
        .map(task => ({
          id: task.id,
          callback: task.callback,
          delay: task.delay,
          createdAt: task.createdAt,
          executeAt: task.executeAt,
          status: task.status,
        })),
    };
  }
}

export default Scheduler;
