class EngineJobQueueValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineJobQueue manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineJobQueue manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineJobQueue initialized debe ser boolean."
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

  static validateQueue(queue) {
    if (!Array.isArray(queue)) {
      throw new Error(
        "queue debe ser un Array."
      );
    }

    queue.forEach(job =>
      EngineJobQueueValidator.validateJob(job)
    );
  }

  static validateEngineJobQueue(engineJobQueue) {
    if (
      engineJobQueue === null ||
      typeof engineJobQueue !== "object"
    ) {
      throw new Error(
        "EngineJobQueue debe ser un objeto valido."
      );
    }

    EngineJobQueueValidator.validateManager(
      engineJobQueue.manager
    );
    EngineJobQueueValidator.validateInitialized(
      engineJobQueue.initialized
    );
    EngineJobQueueValidator.validateQueue(
      engineJobQueue.queue
    );
  }
}

export default EngineJobQueueValidator;
