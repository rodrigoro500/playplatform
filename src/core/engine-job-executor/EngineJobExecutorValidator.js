class EngineJobExecutorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineJobExecutor manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineJobExecutor manager debe ser un objeto."
      );
    }
  }

  static validateQueue(queue) {
    if (queue === null) {
      throw new Error(
        "EngineJobExecutor queue no puede ser null."
      );
    }

    if (typeof queue !== "object") {
      throw new Error(
        "EngineJobExecutor queue debe ser un objeto."
      );
    }

    if (typeof queue.dequeue !== "function") {
      throw new Error(
        "EngineJobExecutor queue debe implementar dequeue()."
      );
    }

    if (typeof queue.hasJobs !== "function") {
      throw new Error(
        "EngineJobExecutor queue debe implementar hasJobs()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineJobExecutor initialized debe ser boolean."
      );
    }
  }

  static validateEngineJobExecutor(engineJobExecutor) {
    if (
      engineJobExecutor === null ||
      typeof engineJobExecutor !== "object"
    ) {
      throw new Error(
        "EngineJobExecutor debe ser un objeto valido."
      );
    }

    EngineJobExecutorValidator.validateManager(
      engineJobExecutor.manager
    );
    EngineJobExecutorValidator.validateQueue(
      engineJobExecutor.queue
    );
    EngineJobExecutorValidator.validateInitialized(
      engineJobExecutor.initialized
    );
  }
}

export default EngineJobExecutorValidator;
