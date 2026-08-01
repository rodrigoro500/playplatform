class EngineTaskSchedulerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineTaskScheduler manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineTaskScheduler manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineTaskScheduler initialized debe ser boolean."
      );
    }
  }

  static validateTask(task) {
    if (task === undefined) {
      throw new Error(
        "La task no puede ser undefined."
      );
    }
  }

  static validateTasks(tasks) {
    if (!Array.isArray(tasks)) {
      throw new Error(
        "tasks debe ser un Array."
      );
    }

    tasks.forEach(task =>
      EngineTaskSchedulerValidator.validateTask(task)
    );
  }

  static validateEngineTaskScheduler(engineTaskScheduler) {
    if (
      engineTaskScheduler === null ||
      typeof engineTaskScheduler !== "object"
    ) {
      throw new Error(
        "EngineTaskScheduler debe ser un objeto valido."
      );
    }

    EngineTaskSchedulerValidator.validateManager(
      engineTaskScheduler.manager
    );
    EngineTaskSchedulerValidator.validateInitialized(
      engineTaskScheduler.initialized
    );
    EngineTaskSchedulerValidator.validateTasks(
      engineTaskScheduler.tasks
    );
  }
}

export default EngineTaskSchedulerValidator;
