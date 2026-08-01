class EngineFlowControllerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineFlowController manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineFlowController manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineFlowController initialized debe ser boolean."
      );
    }
  }

  static validateStep(step) {
    if (step === undefined) {
      throw new Error(
        "El paso no puede ser undefined."
      );
    }
  }

  static validateSteps(steps) {
    if (!Array.isArray(steps)) {
      throw new Error(
        "steps debe ser un Array."
      );
    }

    steps.forEach(step =>
      EngineFlowControllerValidator.validateStep(step)
    );
  }

  static validateCurrentStep(currentStep) {
    if (typeof currentStep !== "number") {
      throw new Error(
        "currentStep debe ser un numero."
      );
    }

    if (!Number.isInteger(currentStep)) {
      throw new Error(
        "currentStep debe ser un entero."
      );
    }

    if (currentStep < -1) {
      throw new Error(
        "currentStep debe ser -1 o un entero mayor."
      );
    }
  }

  static validateEngineFlowController(engineFlowController) {
    if (
      engineFlowController === null ||
      typeof engineFlowController !== "object"
    ) {
      throw new Error(
        "EngineFlowController debe ser un objeto valido."
      );
    }

    EngineFlowControllerValidator.validateManager(
      engineFlowController.manager
    );
    EngineFlowControllerValidator.validateInitialized(
      engineFlowController.initialized
    );
    EngineFlowControllerValidator.validateSteps(
      engineFlowController.steps
    );
    EngineFlowControllerValidator.validateCurrentStep(
      engineFlowController.currentStep
    );
  }
}

export default EngineFlowControllerValidator;
