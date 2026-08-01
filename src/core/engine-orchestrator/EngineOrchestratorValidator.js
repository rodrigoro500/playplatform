class EngineOrchestratorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineOrchestrator manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineOrchestrator manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineOrchestrator initialized debe ser boolean."
      );
    }
  }

  static validateComponentName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del componente debe ser un string no vacio."
      );
    }
  }

  static validateComponent(component) {
    if (component === undefined) {
      throw new Error(
        "El componente no puede ser undefined."
      );
    }
  }

  static validateComponents(components) {
    if (!(components instanceof Map)) {
      throw new Error(
        "components debe ser una instancia de Map."
      );
    }

    components.forEach((component, name) => {
      EngineOrchestratorValidator.validateComponentName(
        name
      );
      EngineOrchestratorValidator.validateComponent(
        component
      );
    });
  }

  static validateEngineOrchestrator(engineOrchestrator) {
    if (
      engineOrchestrator === null ||
      typeof engineOrchestrator !== "object"
    ) {
      throw new Error(
        "EngineOrchestrator debe ser un objeto valido."
      );
    }

    EngineOrchestratorValidator.validateManager(
      engineOrchestrator.manager
    );
    EngineOrchestratorValidator.validateInitialized(
      engineOrchestrator.initialized
    );
    EngineOrchestratorValidator.validateComponents(
      engineOrchestrator.components
    );
  }
}

export default EngineOrchestratorValidator;
