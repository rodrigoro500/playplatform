class PaseGameRuntimeValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseGameRuntime manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseGameRuntime manager debe ser un objeto."
      );
    }
  }

  static validatePlayFlow(playFlow) {
    if (playFlow === null) {
      throw new Error(
        "PaseGameRuntime playFlow no puede ser null."
      );
    }

    if (typeof playFlow !== "object") {
      throw new Error(
        "PaseGameRuntime playFlow debe ser un objeto."
      );
    }

    if (typeof playFlow.start !== "function") {
      throw new Error(
        "PaseGameRuntime playFlow debe implementar start()."
      );
    }

    if (typeof playFlow.finish !== "function") {
      throw new Error(
        "PaseGameRuntime playFlow debe implementar finish()."
      );
    }

    if (typeof playFlow.resolve !== "function") {
      throw new Error(
        "PaseGameRuntime playFlow debe implementar resolve()."
      );
    }
  }

  static validatePaseEngine(paseEngine) {
    if (paseEngine === null) {
      throw new Error(
        "PaseGameRuntime paseEngine no puede ser null."
      );
    }

    if (typeof paseEngine !== "object") {
      throw new Error(
        "PaseGameRuntime paseEngine debe ser un objeto."
      );
    }

    if (typeof paseEngine.rollDice !== "function") {
      throw new Error(
        "PaseGameRuntime paseEngine debe implementar rollDice()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseGameRuntime initialized debe ser boolean."
      );
    }
  }

  static validatePaseGameRuntime(paseGameRuntime) {
    if (
      paseGameRuntime === null ||
      typeof paseGameRuntime !== "object"
    ) {
      throw new Error(
        "PaseGameRuntime debe ser un objeto valido."
      );
    }

    PaseGameRuntimeValidator.validateManager(
      paseGameRuntime.manager
    );
    PaseGameRuntimeValidator.validatePlayFlow(
      paseGameRuntime.playFlow
    );
    PaseGameRuntimeValidator.validatePaseEngine(
      paseGameRuntime.paseEngine
    );
    PaseGameRuntimeValidator.validateInitialized(
      paseGameRuntime.initialized
    );
  }
}

export default PaseGameRuntimeValidator;
