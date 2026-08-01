class EngineIntegrationLayerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineIntegrationLayer manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineIntegrationLayer manager debe ser un objeto."
      );
    }
  }

  static validateOrchestrator(orchestrator) {
    if (orchestrator === null) {
      throw new Error(
        "EngineIntegrationLayer orchestrator no puede ser null."
      );
    }

    if (typeof orchestrator !== "object") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe ser un objeto."
      );
    }

    if (typeof orchestrator.registerComponent !== "function") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe implementar registerComponent()."
      );
    }

    if (typeof orchestrator.getComponent !== "function") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe implementar getComponent()."
      );
    }

    if (typeof orchestrator.hasComponent !== "function") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe implementar hasComponent()."
      );
    }

    if (typeof orchestrator.removeComponent !== "function") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe implementar removeComponent()."
      );
    }

    if (typeof orchestrator.size !== "function") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe implementar size()."
      );
    }

    if (typeof orchestrator.getComponents !== "function") {
      throw new Error(
        "EngineIntegrationLayer orchestrator debe implementar getComponents()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineIntegrationLayer initialized debe ser boolean."
      );
    }
  }

  static validateEngineIntegrationLayer(engineIntegrationLayer) {
    if (
      engineIntegrationLayer === null ||
      typeof engineIntegrationLayer !== "object"
    ) {
      throw new Error(
        "EngineIntegrationLayer debe ser un objeto valido."
      );
    }

    EngineIntegrationLayerValidator.validateManager(
      engineIntegrationLayer.manager
    );
    EngineIntegrationLayerValidator.validateOrchestrator(
      engineIntegrationLayer.orchestrator
    );
    EngineIntegrationLayerValidator.validateInitialized(
      engineIntegrationLayer.initialized
    );
  }
}

export default EngineIntegrationLayerValidator;
