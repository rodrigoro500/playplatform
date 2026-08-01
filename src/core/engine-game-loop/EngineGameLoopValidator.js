class EngineGameLoopValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineGameLoop manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineGameLoop manager debe ser un objeto."
      );
    }
  }

  static validateIntegrationLayer(integrationLayer) {
    if (integrationLayer === null) {
      throw new Error(
        "EngineGameLoop integrationLayer no puede ser null."
      );
    }

    if (typeof integrationLayer !== "object") {
      throw new Error(
        "EngineGameLoop integrationLayer debe ser un objeto."
      );
    }

    if (typeof integrationLayer.register !== "function") {
      throw new Error(
        "EngineGameLoop integrationLayer debe implementar register()."
      );
    }

    if (typeof integrationLayer.resolve !== "function") {
      throw new Error(
        "EngineGameLoop integrationLayer debe implementar resolve()."
      );
    }

    if (typeof integrationLayer.has !== "function") {
      throw new Error(
        "EngineGameLoop integrationLayer debe implementar has()."
      );
    }

    if (typeof integrationLayer.remove !== "function") {
      throw new Error(
        "EngineGameLoop integrationLayer debe implementar remove()."
      );
    }
  }

  static validateFlowController(flowController) {
    if (flowController === null) {
      throw new Error(
        "EngineGameLoop flowController no puede ser null."
      );
    }

    if (typeof flowController !== "object") {
      throw new Error(
        "EngineGameLoop flowController debe ser un objeto."
      );
    }

    if (typeof flowController.nextStep !== "function") {
      throw new Error(
        "EngineGameLoop flowController debe implementar nextStep()."
      );
    }

    if (typeof flowController.previousStep !== "function") {
      throw new Error(
        "EngineGameLoop flowController debe implementar previousStep()."
      );
    }

    if (typeof flowController.getCurrentStep !== "function") {
      throw new Error(
        "EngineGameLoop flowController debe implementar getCurrentStep()."
      );
    }
  }

  static validateRunning(running) {
    if (typeof running !== "boolean") {
      throw new Error(
        "EngineGameLoop running debe ser boolean."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineGameLoop initialized debe ser boolean."
      );
    }
  }

  static validateEngineGameLoop(engineGameLoop) {
    if (
      engineGameLoop === null ||
      typeof engineGameLoop !== "object"
    ) {
      throw new Error(
        "EngineGameLoop debe ser un objeto valido."
      );
    }

    EngineGameLoopValidator.validateManager(
      engineGameLoop.manager
    );
    EngineGameLoopValidator.validateIntegrationLayer(
      engineGameLoop.integrationLayer
    );
    EngineGameLoopValidator.validateFlowController(
      engineGameLoop.flowController
    );
    EngineGameLoopValidator.validateRunning(
      engineGameLoop.running
    );
    EngineGameLoopValidator.validateInitialized(
      engineGameLoop.initialized
    );
  }
}

export default EngineGameLoopValidator;
