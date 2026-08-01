class EnginePlayFlowValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EnginePlayFlow manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EnginePlayFlow manager debe ser un objeto."
      );
    }
  }

  static validateGameSession(gameSession) {
    if (gameSession === null) {
      throw new Error(
        "EnginePlayFlow gameSession no puede ser null."
      );
    }

    if (typeof gameSession !== "object") {
      throw new Error(
        "EnginePlayFlow gameSession debe ser un objeto."
      );
    }

    if (typeof gameSession.startSession !== "function") {
      throw new Error(
        "EnginePlayFlow gameSession debe implementar startSession()."
      );
    }

    if (typeof gameSession.finishSession !== "function") {
      throw new Error(
        "EnginePlayFlow gameSession debe implementar finishSession()."
      );
    }

    if (typeof gameSession.isActive !== "function") {
      throw new Error(
        "EnginePlayFlow gameSession debe implementar isActive()."
      );
    }
  }

  static validateRoundCoordinator(roundCoordinator) {
    if (roundCoordinator === null) {
      throw new Error(
        "EnginePlayFlow roundCoordinator no puede ser null."
      );
    }

    if (typeof roundCoordinator !== "object") {
      throw new Error(
        "EnginePlayFlow roundCoordinator debe ser un objeto."
      );
    }

    if (typeof roundCoordinator.startRound !== "function") {
      throw new Error(
        "EnginePlayFlow roundCoordinator debe implementar startRound()."
      );
    }

    if (typeof roundCoordinator.finishRound !== "function") {
      throw new Error(
        "EnginePlayFlow roundCoordinator debe implementar finishRound()."
      );
    }
  }

  static validateBetCoordinator(betCoordinator) {
    if (betCoordinator === null) {
      throw new Error(
        "EnginePlayFlow betCoordinator no puede ser null."
      );
    }

    if (typeof betCoordinator !== "object") {
      throw new Error(
        "EnginePlayFlow betCoordinator debe ser un objeto."
      );
    }
  }

  static validateSettlementCoordinator(settlementCoordinator) {
    if (settlementCoordinator === null) {
      throw new Error(
        "EnginePlayFlow settlementCoordinator no puede ser null."
      );
    }

    if (typeof settlementCoordinator !== "object") {
      throw new Error(
        "EnginePlayFlow settlementCoordinator debe ser un objeto."
      );
    }

    if (typeof settlementCoordinator.settle !== "function") {
      throw new Error(
        "EnginePlayFlow settlementCoordinator debe implementar settle()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EnginePlayFlow initialized debe ser boolean."
      );
    }
  }

  static validateEnginePlayFlow(enginePlayFlow) {
    if (
      enginePlayFlow === null ||
      typeof enginePlayFlow !== "object"
    ) {
      throw new Error(
        "EnginePlayFlow debe ser un objeto valido."
      );
    }

    EnginePlayFlowValidator.validateManager(
      enginePlayFlow.manager
    );
    EnginePlayFlowValidator.validateGameSession(
      enginePlayFlow.gameSession
    );
    EnginePlayFlowValidator.validateRoundCoordinator(
      enginePlayFlow.roundCoordinator
    );
    EnginePlayFlowValidator.validateBetCoordinator(
      enginePlayFlow.betCoordinator
    );
    EnginePlayFlowValidator.validateSettlementCoordinator(
      enginePlayFlow.settlementCoordinator
    );
    EnginePlayFlowValidator.validateInitialized(
      enginePlayFlow.initialized
    );
  }
}

export default EnginePlayFlowValidator;
