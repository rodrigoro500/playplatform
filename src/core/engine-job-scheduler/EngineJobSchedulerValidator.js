class EngineJobSchedulerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineJobScheduler manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineJobScheduler manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineJobScheduler initialized debe ser boolean."
      );
    }
  }

  static validateJob(job) {
    if (job === undefined) {
      throw new Error(
        "El job no puede ser undefined."
      );
    }
  }

  static validateSchedule(schedule) {
    if (!Array.isArray(schedule)) {
      throw new Error(
        "schedule debe ser un Array."
      );
    }

    schedule.forEach(job =>
      EngineJobSchedulerValidator.validateJob(job)
    );
  }

  static validateEngineJobScheduler(engineJobScheduler) {
    if (
      engineJobScheduler === null ||
      typeof engineJobScheduler !== "object"
    ) {
      throw new Error(
        "EngineJobScheduler debe ser un objeto valido."
      );
    }

    EngineJobSchedulerValidator.validateManager(
      engineJobScheduler.manager
    );
    EngineJobSchedulerValidator.validateInitialized(
      engineJobScheduler.initialized
    );
    EngineJobSchedulerValidator.validateSchedule(
      engineJobScheduler.schedule
    );
  }
}

export default EngineJobSchedulerValidator;
