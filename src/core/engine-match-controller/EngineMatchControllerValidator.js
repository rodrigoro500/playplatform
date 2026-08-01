class EngineMatchControllerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineMatchController manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineMatchController manager debe ser un objeto."
      );
    }
  }

  static validateGameSession(gameSession) {
    if (gameSession === null) {
      throw new Error(
        "EngineMatchController gameSession no puede ser null."
      );
    }

    if (typeof gameSession !== "object") {
      throw new Error(
        "EngineMatchController gameSession debe ser un objeto."
      );
    }

    if (typeof gameSession.startSession !== "function") {
      throw new Error(
        "EngineMatchController gameSession debe implementar startSession()."
      );
    }

    if (typeof gameSession.finishSession !== "function") {
      throw new Error(
        "EngineMatchController gameSession debe implementar finishSession()."
      );
    }

    if (typeof gameSession.isActive !== "function") {
      throw new Error(
        "EngineMatchController gameSession debe implementar isActive()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineMatchController initialized debe ser boolean."
      );
    }
  }

  static validateRunning(running) {
    if (typeof running !== "boolean") {
      throw new Error(
        "EngineMatchController running debe ser boolean."
      );
    }
  }

  static validateEngineMatchController(engineMatchController) {
    if (
      engineMatchController === null ||
      typeof engineMatchController !== "object"
    ) {
      throw new Error(
        "EngineMatchController debe ser un objeto valido."
      );
    }

    EngineMatchControllerValidator.validateManager(
      engineMatchController.manager
    );
    EngineMatchControllerValidator.validateGameSession(
      engineMatchController.gameSession
    );
    EngineMatchControllerValidator.validateInitialized(
      engineMatchController.initialized
    );
    EngineMatchControllerValidator.validateRunning(
      engineMatchController.running
    );
  }
}

export default EngineMatchControllerValidator;
