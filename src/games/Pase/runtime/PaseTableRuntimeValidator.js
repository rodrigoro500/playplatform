class PaseTableRuntimeValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseTableRuntime manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseTableRuntime manager debe ser un objeto."
      );
    }
  }

  static validateTable(table) {
    if (table === null) {
      throw new Error(
        "PaseTableRuntime table no puede ser null."
      );
    }

    if (typeof table !== "object") {
      throw new Error(
        "PaseTableRuntime table debe ser un objeto."
      );
    }

    if (typeof table.getPlayers !== "function") {
      throw new Error(
        "PaseTableRuntime table debe implementar getPlayers()."
      );
    }
  }

  static validateMatchRuntime(matchRuntime) {
    if (matchRuntime === null) {
      throw new Error(
        "PaseTableRuntime matchRuntime no puede ser null."
      );
    }

    if (typeof matchRuntime !== "object") {
      throw new Error(
        "PaseTableRuntime matchRuntime debe ser un objeto."
      );
    }

    if (typeof matchRuntime.startMatch !== "function") {
      throw new Error(
        "PaseTableRuntime matchRuntime debe implementar startMatch()."
      );
    }

    if (typeof matchRuntime.playRound !== "function") {
      throw new Error(
        "PaseTableRuntime matchRuntime debe implementar playRound()."
      );
    }

    if (typeof matchRuntime.finishMatch !== "function") {
      throw new Error(
        "PaseTableRuntime matchRuntime debe implementar finishMatch()."
      );
    }

    if (typeof matchRuntime.isRunning !== "function") {
      throw new Error(
        "PaseTableRuntime matchRuntime debe implementar isRunning()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseTableRuntime initialized debe ser boolean."
      );
    }
  }

  static validatePaseTableRuntime(paseTableRuntime) {
    if (
      paseTableRuntime === null ||
      typeof paseTableRuntime !== "object"
    ) {
      throw new Error(
        "PaseTableRuntime debe ser un objeto valido."
      );
    }

    PaseTableRuntimeValidator.validateManager(
      paseTableRuntime.manager
    );
    PaseTableRuntimeValidator.validateTable(
      paseTableRuntime.table
    );
    PaseTableRuntimeValidator.validateMatchRuntime(
      paseTableRuntime.matchRuntime
    );
    PaseTableRuntimeValidator.validateInitialized(
      paseTableRuntime.initialized
    );
  }
}

export default PaseTableRuntimeValidator;
