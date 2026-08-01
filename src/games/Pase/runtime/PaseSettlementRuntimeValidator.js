class PaseSettlementRuntimeValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseSettlementRuntime manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseSettlementRuntime manager debe ser un objeto."
      );
    }
  }

  static validateBetRuntime(betRuntime) {
    if (betRuntime === null) {
      throw new Error(
        "PaseSettlementRuntime betRuntime no puede ser null."
      );
    }

    if (typeof betRuntime !== "object") {
      throw new Error(
        "PaseSettlementRuntime betRuntime debe ser un objeto."
      );
    }

    if (typeof betRuntime.getBetCount !== "function") {
      throw new Error(
        "PaseSettlementRuntime betRuntime debe implementar getBetCount()."
      );
    }
  }

  static validateResolver(resolver) {
    if (resolver === null) {
      throw new Error(
        "PaseSettlementRuntime resolver no puede ser null."
      );
    }

    if (typeof resolver !== "object") {
      throw new Error(
        "PaseSettlementRuntime resolver debe ser un objeto."
      );
    }

    if (typeof resolver.resolve !== "function") {
      throw new Error(
        "PaseSettlementRuntime resolver debe implementar resolve()."
      );
    }
  }

  static validateSettlementResolver(settlementResolver) {
    if (settlementResolver === null) {
      throw new Error(
        "PaseSettlementRuntime settlementResolver no puede ser null."
      );
    }

    if (typeof settlementResolver !== "object") {
      throw new Error(
        "PaseSettlementRuntime settlementResolver debe ser un objeto."
      );
    }

    if (typeof settlementResolver.resolve !== "function") {
      throw new Error(
        "PaseSettlementRuntime settlementResolver debe implementar resolve()."
      );
    }

    if (typeof settlementResolver.getResults !== "function") {
      throw new Error(
        "PaseSettlementRuntime settlementResolver debe implementar getResults()."
      );
    }

    if (typeof settlementResolver.clear !== "function") {
      throw new Error(
        "PaseSettlementRuntime settlementResolver debe implementar clear()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseSettlementRuntime initialized debe ser boolean."
      );
    }
  }

  static validatePaseSettlementRuntime(paseSettlementRuntime) {
    if (
      paseSettlementRuntime === null ||
      typeof paseSettlementRuntime !== "object"
    ) {
      throw new Error(
        "PaseSettlementRuntime debe ser un objeto valido."
      );
    }

    PaseSettlementRuntimeValidator.validateManager(
      paseSettlementRuntime.manager
    );
    PaseSettlementRuntimeValidator.validateBetRuntime(
      paseSettlementRuntime.betRuntime
    );
    PaseSettlementRuntimeValidator.validateResolver(
      paseSettlementRuntime.resolver
    );
    PaseSettlementRuntimeValidator.validateSettlementResolver(
      paseSettlementRuntime.settlementResolver
    );
    PaseSettlementRuntimeValidator.validateInitialized(
      paseSettlementRuntime.initialized
    );
  }
}

export default PaseSettlementRuntimeValidator;
