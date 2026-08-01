class EngineMatchExecutorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineMatchExecutor manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineMatchExecutor manager debe ser un objeto."
      );
    }
  }

  static validateMatchController(matchController) {
    if (matchController === null) {
      throw new Error(
        "EngineMatchExecutor matchController no puede ser null."
      );
    }

    if (typeof matchController !== "object") {
      throw new Error(
        "EngineMatchExecutor matchController debe ser un objeto."
      );
    }

    if (typeof matchController.startMatch !== "function") {
      throw new Error(
        "EngineMatchExecutor matchController debe implementar startMatch()."
      );
    }

    if (typeof matchController.finishMatch !== "function") {
      throw new Error(
        "EngineMatchExecutor matchController debe implementar finishMatch()."
      );
    }

    if (typeof matchController.isRunning !== "function") {
      throw new Error(
        "EngineMatchExecutor matchController debe implementar isRunning()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineMatchExecutor initialized debe ser boolean."
      );
    }
  }

  static validateEngineMatchExecutor(engineMatchExecutor) {
    if (
      engineMatchExecutor === null ||
      typeof engineMatchExecutor !== "object"
    ) {
      throw new Error(
        "EngineMatchExecutor debe ser un objeto valido."
      );
    }

    EngineMatchExecutorValidator.validateManager(
      engineMatchExecutor.manager
    );
    EngineMatchExecutorValidator.validateMatchController(
      engineMatchExecutor.matchController
    );
    EngineMatchExecutorValidator.validateInitialized(
      engineMatchExecutor.initialized
    );
  }
}

export default EngineMatchExecutorValidator;
