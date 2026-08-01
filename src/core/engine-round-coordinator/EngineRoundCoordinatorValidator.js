class EngineRoundCoordinatorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineRoundCoordinator manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineRoundCoordinator manager debe ser un objeto."
      );
    }
  }

  static validateGameLoop(gameLoop) {
    if (gameLoop === null) {
      throw new Error(
        "EngineRoundCoordinator gameLoop no puede ser null."
      );
    }

    if (typeof gameLoop !== "object") {
      throw new Error(
        "EngineRoundCoordinator gameLoop debe ser un objeto."
      );
    }

    if (typeof gameLoop.next !== "function") {
      throw new Error(
        "EngineRoundCoordinator gameLoop debe implementar next()."
      );
    }

    if (typeof gameLoop.previous !== "function") {
      throw new Error(
        "EngineRoundCoordinator gameLoop debe implementar previous()."
      );
    }

    if (typeof gameLoop.current !== "function") {
      throw new Error(
        "EngineRoundCoordinator gameLoop debe implementar current()."
      );
    }
  }

  static validateRoundEngine(roundEngine) {
    if (roundEngine === null) {
      throw new Error(
        "EngineRoundCoordinator roundEngine no puede ser null."
      );
    }

    if (typeof roundEngine !== "object") {
      throw new Error(
        "EngineRoundCoordinator roundEngine debe ser un objeto."
      );
    }

    if (typeof roundEngine.startRound !== "function") {
      throw new Error(
        "EngineRoundCoordinator roundEngine debe implementar startRound()."
      );
    }

    if (typeof roundEngine.finishRound !== "function") {
      throw new Error(
        "EngineRoundCoordinator roundEngine debe implementar finishRound()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineRoundCoordinator initialized debe ser boolean."
      );
    }
  }

  static validateEngineRoundCoordinator(engineRoundCoordinator) {
    if (
      engineRoundCoordinator === null ||
      typeof engineRoundCoordinator !== "object"
    ) {
      throw new Error(
        "EngineRoundCoordinator debe ser un objeto valido."
      );
    }

    EngineRoundCoordinatorValidator.validateManager(
      engineRoundCoordinator.manager
    );
    EngineRoundCoordinatorValidator.validateGameLoop(
      engineRoundCoordinator.gameLoop
    );
    EngineRoundCoordinatorValidator.validateRoundEngine(
      engineRoundCoordinator.roundEngine
    );
    EngineRoundCoordinatorValidator.validateInitialized(
      engineRoundCoordinator.initialized
    );
  }
}

export default EngineRoundCoordinatorValidator;
