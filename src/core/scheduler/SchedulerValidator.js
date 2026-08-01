class SchedulerValidator {
  static STATUSES = [
    "PENDING",
    "RUNNING",
    "COMPLETED",
    "CANCELLED",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateTask(task) {
    if (
      task === null ||
      typeof task !== "object" ||
      Array.isArray(task)
    ) {
      throw new Error(
        "La tarea debe ser un objeto valido."
      );
    }

    SchedulerValidator.validateText(
      task.id,
      "El id de la tarea debe ser un string no vacio."
    );

    if (typeof task.callback !== "function") {
      throw new Error(
        "El callback de la tarea debe ser una funcion."
      );
    }

    if (
      typeof task.delay !== "number" ||
      !Number.isFinite(task.delay) ||
      task.delay < 0
    ) {
      throw new Error(
        "El delay de la tarea debe ser un numero finito mayor o igual a 0."
      );
    }

    SchedulerValidator.validateText(
      task.createdAt,
      "El createdAt de la tarea debe ser un string no vacio."
    );
    SchedulerValidator.validateText(
      task.executeAt,
      "El executeAt de la tarea debe ser un string no vacio."
    );

    if (!SchedulerValidator.STATUSES.includes(task.status)) {
      throw new Error(
        "El estado de la tarea no es valido."
      );
    }
  }

  static validateTasks(tasks) {
    if (!(tasks instanceof Map)) {
      throw new Error(
        "Las tareas deben ser una instancia de Map."
      );
    }

    tasks.forEach(task =>
      SchedulerValidator.validateTask(task)
    );
  }

  static validateScheduler(scheduler) {
    if (
      scheduler === null ||
      typeof scheduler !== "object" ||
      Array.isArray(scheduler)
    ) {
      throw new Error(
        "El scheduler debe ser un objeto valido."
      );
    }

    SchedulerValidator.validateTasks(
      scheduler.tasks
    );
  }
}

export default SchedulerValidator;
