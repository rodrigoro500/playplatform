class EngineBetCoordinatorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineBetCoordinator manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineBetCoordinator manager debe ser un objeto."
      );
    }
  }

  static validateRoundCoordinator(roundCoordinator) {
    if (roundCoordinator === null) {
      throw new Error(
        "EngineBetCoordinator roundCoordinator no puede ser null."
      );
    }

    if (typeof roundCoordinator !== "object") {
      throw new Error(
        "EngineBetCoordinator roundCoordinator debe ser un objeto."
      );
    }

    if (typeof roundCoordinator.startRound !== "function") {
      throw new Error(
        "EngineBetCoordinator roundCoordinator debe implementar startRound()."
      );
    }

    if (typeof roundCoordinator.finishRound !== "function") {
      throw new Error(
        "EngineBetCoordinator roundCoordinator debe implementar finishRound()."
      );
    }
  }

  static validateBetManager(betManager) {
    if (betManager === null) {
      throw new Error(
        "EngineBetCoordinator betManager no puede ser null."
      );
    }

    if (typeof betManager !== "object") {
      throw new Error(
        "EngineBetCoordinator betManager debe ser un objeto."
      );
    }

    if (typeof betManager.placeBet !== "function") {
      throw new Error(
        "EngineBetCoordinator betManager debe implementar placeBet()."
      );
    }

    if (typeof betManager.cancelBet !== "function") {
      throw new Error(
        "EngineBetCoordinator betManager debe implementar cancelBet()."
      );
    }

    if (typeof betManager.getBet !== "function") {
      throw new Error(
        "EngineBetCoordinator betManager debe implementar getBet()."
      );
    }

    if (typeof betManager.getBets !== "function") {
      throw new Error(
        "EngineBetCoordinator betManager debe implementar getBets()."
      );
    }

    if (typeof betManager.getBetCount !== "function") {
      throw new Error(
        "EngineBetCoordinator betManager debe implementar getBetCount()."
      );
    }
  }

  static validateWallet(wallet) {
    if (wallet === null) {
      throw new Error(
        "EngineBetCoordinator wallet no puede ser null."
      );
    }

    if (typeof wallet !== "object") {
      throw new Error(
        "EngineBetCoordinator wallet debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineBetCoordinator initialized debe ser boolean."
      );
    }
  }

  static validateEngineBetCoordinator(engineBetCoordinator) {
    if (
      engineBetCoordinator === null ||
      typeof engineBetCoordinator !== "object"
    ) {
      throw new Error(
        "EngineBetCoordinator debe ser un objeto valido."
      );
    }

    EngineBetCoordinatorValidator.validateManager(
      engineBetCoordinator.manager
    );
    EngineBetCoordinatorValidator.validateRoundCoordinator(
      engineBetCoordinator.roundCoordinator
    );
    EngineBetCoordinatorValidator.validateBetManager(
      engineBetCoordinator.betManager
    );
    EngineBetCoordinatorValidator.validateWallet(
      engineBetCoordinator.wallet
    );
    EngineBetCoordinatorValidator.validateInitialized(
      engineBetCoordinator.initialized
    );
  }
}

export default EngineBetCoordinatorValidator;
