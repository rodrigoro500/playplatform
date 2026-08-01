class PaseRoundRuntimeValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseRoundRuntime manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseRoundRuntime manager debe ser un objeto."
      );
    }
  }

  static validatePlayFlow(playFlow) {
    if (playFlow === null) {
      throw new Error(
        "PaseRoundRuntime playFlow no puede ser null."
      );
    }

    if (typeof playFlow !== "object") {
      throw new Error(
        "PaseRoundRuntime playFlow debe ser un objeto."
      );
    }

    if (typeof playFlow.start !== "function") {
      throw new Error(
        "PaseRoundRuntime playFlow debe implementar start()."
      );
    }

    if (typeof playFlow.finish !== "function") {
      throw new Error(
        "PaseRoundRuntime playFlow debe implementar finish()."
      );
    }
  }

  static validatePaseEngine(paseEngine) {
    if (paseEngine === null) {
      throw new Error(
        "PaseRoundRuntime paseEngine no puede ser null."
      );
    }

    if (typeof paseEngine !== "object") {
      throw new Error(
        "PaseRoundRuntime paseEngine debe ser un objeto."
      );
    }
  }

  static validateTable(table) {
    if (table === null) {
      throw new Error(
        "PaseRoundRuntime table no puede ser null."
      );
    }

    if (typeof table !== "object") {
      throw new Error(
        "PaseRoundRuntime table debe ser un objeto."
      );
    }

    if (typeof table.getPlayers !== "function") {
      throw new Error(
        "PaseRoundRuntime table debe implementar getPlayers()."
      );
    }
  }

  static validateTurnManager(turnManager) {
    if (turnManager === null) {
      throw new Error(
        "PaseRoundRuntime turnManager no puede ser null."
      );
    }

    if (typeof turnManager !== "object") {
      throw new Error(
        "PaseRoundRuntime turnManager debe ser un objeto."
      );
    }
  }

  static validateDiceEngine(diceEngine) {
    if (diceEngine === null) {
      throw new Error(
        "PaseRoundRuntime diceEngine no puede ser null."
      );
    }

    if (typeof diceEngine !== "object") {
      throw new Error(
        "PaseRoundRuntime diceEngine debe ser un objeto."
      );
    }

    if (typeof diceEngine.rollDice !== "function") {
      throw new Error(
        "PaseRoundRuntime diceEngine debe implementar rollDice()."
      );
    }
  }

  static validateResolver(resolver) {
    if (resolver === null) {
      throw new Error(
        "PaseRoundRuntime resolver no puede ser null."
      );
    }

    if (typeof resolver !== "object") {
      throw new Error(
        "PaseRoundRuntime resolver debe ser un objeto."
      );
    }

    if (typeof resolver.resolve !== "function") {
      throw new Error(
        "PaseRoundRuntime resolver debe implementar resolve()."
      );
    }
  }

  static validateSettlementResolver(settlementResolver) {
    if (settlementResolver === null) {
      throw new Error(
        "PaseRoundRuntime settlementResolver no puede ser null."
      );
    }

    if (typeof settlementResolver !== "object") {
      throw new Error(
        "PaseRoundRuntime settlementResolver debe ser un objeto."
      );
    }

    if (typeof settlementResolver.resolve !== "function") {
      throw new Error(
        "PaseRoundRuntime settlementResolver debe implementar resolve()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseRoundRuntime initialized debe ser boolean."
      );
    }
  }

  static validatePaseRoundRuntime(paseRoundRuntime) {
    if (
      paseRoundRuntime === null ||
      typeof paseRoundRuntime !== "object"
    ) {
      throw new Error(
        "PaseRoundRuntime debe ser un objeto valido."
      );
    }

    PaseRoundRuntimeValidator.validateManager(
      paseRoundRuntime.manager
    );
    PaseRoundRuntimeValidator.validatePlayFlow(
      paseRoundRuntime.playFlow
    );
    PaseRoundRuntimeValidator.validatePaseEngine(
      paseRoundRuntime.paseEngine
    );
    PaseRoundRuntimeValidator.validateTable(
      paseRoundRuntime.table
    );
    PaseRoundRuntimeValidator.validateTurnManager(
      paseRoundRuntime.turnManager
    );
    PaseRoundRuntimeValidator.validateDiceEngine(
      paseRoundRuntime.diceEngine
    );
    PaseRoundRuntimeValidator.validateResolver(
      paseRoundRuntime.resolver
    );
    PaseRoundRuntimeValidator.validateSettlementResolver(
      paseRoundRuntime.settlementResolver
    );
    PaseRoundRuntimeValidator.validateInitialized(
      paseRoundRuntime.initialized
    );
  }
}

export default PaseRoundRuntimeValidator;
