class PaseMatchRuntimeValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseMatchRuntime manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseMatchRuntime manager debe ser un objeto."
      );
    }
  }

  static validateRoundRuntime(roundRuntime) {
    if (roundRuntime === null) {
      throw new Error(
        "PaseMatchRuntime roundRuntime no puede ser null."
      );
    }

    if (typeof roundRuntime !== "object") {
      throw new Error(
        "PaseMatchRuntime roundRuntime debe ser un objeto."
      );
    }

    if (typeof roundRuntime.startRound !== "function") {
      throw new Error(
        "PaseMatchRuntime roundRuntime debe implementar startRound()."
      );
    }

    if (typeof roundRuntime.rollDice !== "function") {
      throw new Error(
        "PaseMatchRuntime roundRuntime debe implementar rollDice()."
      );
    }

    if (typeof roundRuntime.resolve !== "function") {
      throw new Error(
        "PaseMatchRuntime roundRuntime debe implementar resolve()."
      );
    }

    if (typeof roundRuntime.settle !== "function") {
      throw new Error(
        "PaseMatchRuntime roundRuntime debe implementar settle()."
      );
    }

    if (typeof roundRuntime.finishRound !== "function") {
      throw new Error(
        "PaseMatchRuntime roundRuntime debe implementar finishRound()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseMatchRuntime initialized debe ser boolean."
      );
    }
  }

  static validateRunning(running) {
    if (typeof running !== "boolean") {
      throw new Error(
        "PaseMatchRuntime running debe ser boolean."
      );
    }
  }

  static validateCurrentRound(currentRound) {
    if (typeof currentRound !== "number") {
      throw new Error(
        "PaseMatchRuntime currentRound debe ser un numero."
      );
    }

    if (!Number.isInteger(currentRound)) {
      throw new Error(
        "PaseMatchRuntime currentRound debe ser un entero."
      );
    }

    if (currentRound < 0) {
      throw new Error(
        "PaseMatchRuntime currentRound no puede ser negativo."
      );
    }
  }

  static validatePaseMatchRuntime(paseMatchRuntime) {
    if (
      paseMatchRuntime === null ||
      typeof paseMatchRuntime !== "object"
    ) {
      throw new Error(
        "PaseMatchRuntime debe ser un objeto valido."
      );
    }

    PaseMatchRuntimeValidator.validateManager(
      paseMatchRuntime.manager
    );
    PaseMatchRuntimeValidator.validateRoundRuntime(
      paseMatchRuntime.roundRuntime
    );
    PaseMatchRuntimeValidator.validateInitialized(
      paseMatchRuntime.initialized
    );
    PaseMatchRuntimeValidator.validateRunning(
      paseMatchRuntime.running
    );
    PaseMatchRuntimeValidator.validateCurrentRound(
      paseMatchRuntime.currentRound
    );
  }
}

export default PaseMatchRuntimeValidator;
