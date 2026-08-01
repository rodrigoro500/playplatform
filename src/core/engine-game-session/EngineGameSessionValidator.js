class EngineGameSessionValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineGameSession manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineGameSession manager debe ser un objeto."
      );
    }
  }

  static validateRoundCoordinator(roundCoordinator) {
    if (roundCoordinator === null) {
      throw new Error(
        "EngineGameSession roundCoordinator no puede ser null."
      );
    }

    if (typeof roundCoordinator !== "object") {
      throw new Error(
        "EngineGameSession roundCoordinator debe ser un objeto."
      );
    }

    if (typeof roundCoordinator.startRound !== "function") {
      throw new Error(
        "EngineGameSession roundCoordinator debe implementar startRound()."
      );
    }

    if (typeof roundCoordinator.finishRound !== "function") {
      throw new Error(
        "EngineGameSession roundCoordinator debe implementar finishRound()."
      );
    }
  }

  static validateBetCoordinator(betCoordinator) {
    if (betCoordinator === null) {
      throw new Error(
        "EngineGameSession betCoordinator no puede ser null."
      );
    }

    if (typeof betCoordinator !== "object") {
      throw new Error(
        "EngineGameSession betCoordinator debe ser un objeto."
      );
    }
  }

  static validateSettlementCoordinator(settlementCoordinator) {
    if (settlementCoordinator === null) {
      throw new Error(
        "EngineGameSession settlementCoordinator no puede ser null."
      );
    }

    if (typeof settlementCoordinator !== "object") {
      throw new Error(
        "EngineGameSession settlementCoordinator debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineGameSession initialized debe ser boolean."
      );
    }
  }

  static validateActive(active) {
    if (typeof active !== "boolean") {
      throw new Error(
        "EngineGameSession active debe ser boolean."
      );
    }
  }

  static validateEngineGameSession(engineGameSession) {
    if (
      engineGameSession === null ||
      typeof engineGameSession !== "object"
    ) {
      throw new Error(
        "EngineGameSession debe ser un objeto valido."
      );
    }

    EngineGameSessionValidator.validateManager(
      engineGameSession.manager
    );
    EngineGameSessionValidator.validateRoundCoordinator(
      engineGameSession.roundCoordinator
    );
    EngineGameSessionValidator.validateBetCoordinator(
      engineGameSession.betCoordinator
    );
    EngineGameSessionValidator.validateSettlementCoordinator(
      engineGameSession.settlementCoordinator
    );
    EngineGameSessionValidator.validateInitialized(
      engineGameSession.initialized
    );
    EngineGameSessionValidator.validateActive(
      engineGameSession.active
    );
  }
}

export default EngineGameSessionValidator;
