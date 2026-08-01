class PaseBetRuntimeValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseBetRuntime manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseBetRuntime manager debe ser un objeto."
      );
    }
  }

  static validateTableRuntime(tableRuntime) {
    if (tableRuntime === null) {
      throw new Error(
        "PaseBetRuntime tableRuntime no puede ser null."
      );
    }

    if (typeof tableRuntime !== "object") {
      throw new Error(
        "PaseBetRuntime tableRuntime debe ser un objeto."
      );
    }

    if (typeof tableRuntime.getPlayerCount !== "function") {
      throw new Error(
        "PaseBetRuntime tableRuntime debe implementar getPlayerCount()."
      );
    }
  }

  static validateBetManager(betManager) {
    if (betManager === null) {
      throw new Error(
        "PaseBetRuntime betManager no puede ser null."
      );
    }

    if (typeof betManager !== "object") {
      throw new Error(
        "PaseBetRuntime betManager debe ser un objeto."
      );
    }

    if (typeof betManager.placeBet !== "function") {
      throw new Error(
        "PaseBetRuntime betManager debe implementar placeBet()."
      );
    }

    if (typeof betManager.cancelBet !== "function") {
      throw new Error(
        "PaseBetRuntime betManager debe implementar cancelBet()."
      );
    }

    if (typeof betManager.getBet !== "function") {
      throw new Error(
        "PaseBetRuntime betManager debe implementar getBet()."
      );
    }

    if (typeof betManager.getBets !== "function") {
      throw new Error(
        "PaseBetRuntime betManager debe implementar getBets()."
      );
    }

    if (typeof betManager.getBetCount !== "function") {
      throw new Error(
        "PaseBetRuntime betManager debe implementar getBetCount()."
      );
    }
  }

  static validateWallet(wallet) {
    if (wallet === null) {
      throw new Error(
        "PaseBetRuntime wallet no puede ser null."
      );
    }

    if (typeof wallet !== "object") {
      throw new Error(
        "PaseBetRuntime wallet debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseBetRuntime initialized debe ser boolean."
      );
    }
  }

  static validatePaseBetRuntime(paseBetRuntime) {
    if (
      paseBetRuntime === null ||
      typeof paseBetRuntime !== "object"
    ) {
      throw new Error(
        "PaseBetRuntime debe ser un objeto valido."
      );
    }

    PaseBetRuntimeValidator.validateManager(
      paseBetRuntime.manager
    );
    PaseBetRuntimeValidator.validateTableRuntime(
      paseBetRuntime.tableRuntime
    );
    PaseBetRuntimeValidator.validateBetManager(
      paseBetRuntime.betManager
    );
    PaseBetRuntimeValidator.validateWallet(
      paseBetRuntime.wallet
    );
    PaseBetRuntimeValidator.validateInitialized(
      paseBetRuntime.initialized
    );
  }
}

export default PaseBetRuntimeValidator;
