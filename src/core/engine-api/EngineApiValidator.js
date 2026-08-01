class EngineApiValidator {
  static validateFacade(facade) {
    if (facade === null) {
      throw new Error(
        "EngineApi facade no puede ser null."
      );
    }

    if (typeof facade !== "object") {
      throw new Error(
        "EngineApi facade debe ser un objeto."
      );
    }

    if (typeof facade.getStatus !== "function") {
      throw new Error(
        "EngineApi facade debe implementar getStatus()."
      );
    }

    if (typeof facade.getHealthStatus !== "function") {
      throw new Error(
        "EngineApi facade debe implementar getHealthStatus()."
      );
    }

    if (typeof facade.recover !== "function") {
      throw new Error(
        "EngineApi facade debe implementar recover()."
      );
    }
  }

  static validateVersionManager(versionManager) {
    if (versionManager === null) {
      throw new Error(
        "EngineApi versionManager no puede ser null."
      );
    }

    if (typeof versionManager !== "object") {
      throw new Error(
        "EngineApi versionManager debe ser un objeto."
      );
    }

    if (typeof versionManager.getCurrentVersion !== "function") {
      throw new Error(
        "EngineApi versionManager debe implementar getCurrentVersion()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineApi initialized debe ser boolean."
      );
    }
  }

  static validateEngineApi(engineApi) {
    if (
      engineApi === null ||
      typeof engineApi !== "object"
    ) {
      throw new Error(
        "EngineApi debe ser un objeto valido."
      );
    }

    EngineApiValidator.validateFacade(engineApi.facade);
    EngineApiValidator.validateVersionManager(engineApi.versionManager);
    EngineApiValidator.validateInitialized(engineApi.initialized);
  }
}

export default EngineApiValidator;
