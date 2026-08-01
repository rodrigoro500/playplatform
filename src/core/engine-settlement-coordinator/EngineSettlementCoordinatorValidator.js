class EngineSettlementCoordinatorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineSettlementCoordinator manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineSettlementCoordinator manager debe ser un objeto."
      );
    }
  }

  static validateRoundCoordinator(roundCoordinator) {
    if (roundCoordinator === null) {
      throw new Error(
        "EngineSettlementCoordinator roundCoordinator no puede ser null."
      );
    }

    if (typeof roundCoordinator !== "object") {
      throw new Error(
        "EngineSettlementCoordinator roundCoordinator debe ser un objeto."
      );
    }

    if (typeof roundCoordinator.startRound !== "function") {
      throw new Error(
        "EngineSettlementCoordinator roundCoordinator debe implementar startRound()."
      );
    }

    if (typeof roundCoordinator.finishRound !== "function") {
      throw new Error(
        "EngineSettlementCoordinator roundCoordinator debe implementar finishRound()."
      );
    }
  }

  static validateSettlementResolver(settlementResolver) {
    if (settlementResolver === null) {
      throw new Error(
        "EngineSettlementCoordinator settlementResolver no puede ser null."
      );
    }

    if (typeof settlementResolver !== "object") {
      throw new Error(
        "EngineSettlementCoordinator settlementResolver debe ser un objeto."
      );
    }

    if (typeof settlementResolver.resolve !== "function") {
      throw new Error(
        "EngineSettlementCoordinator settlementResolver debe implementar resolve()."
      );
    }

    if (typeof settlementResolver.getResults !== "function") {
      throw new Error(
        "EngineSettlementCoordinator settlementResolver debe implementar getResults()."
      );
    }

    if (typeof settlementResolver.clear !== "function") {
      throw new Error(
        "EngineSettlementCoordinator settlementResolver debe implementar clear()."
      );
    }
  }

  static validateWallet(wallet) {
    if (wallet === null) {
      throw new Error(
        "EngineSettlementCoordinator wallet no puede ser null."
      );
    }

    if (typeof wallet !== "object") {
      throw new Error(
        "EngineSettlementCoordinator wallet debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineSettlementCoordinator initialized debe ser boolean."
      );
    }
  }

  static validateEngineSettlementCoordinator(engineSettlementCoordinator) {
    if (
      engineSettlementCoordinator === null ||
      typeof engineSettlementCoordinator !== "object"
    ) {
      throw new Error(
        "EngineSettlementCoordinator debe ser un objeto valido."
      );
    }

    EngineSettlementCoordinatorValidator.validateManager(
      engineSettlementCoordinator.manager
    );
    EngineSettlementCoordinatorValidator.validateRoundCoordinator(
      engineSettlementCoordinator.roundCoordinator
    );
    EngineSettlementCoordinatorValidator.validateSettlementResolver(
      engineSettlementCoordinator.settlementResolver
    );
    EngineSettlementCoordinatorValidator.validateWallet(
      engineSettlementCoordinator.wallet
    );
    EngineSettlementCoordinatorValidator.validateInitialized(
      engineSettlementCoordinator.initialized
    );
  }
}

export default EngineSettlementCoordinatorValidator;
