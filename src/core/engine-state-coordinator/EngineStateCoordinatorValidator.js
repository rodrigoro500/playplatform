class EngineStateCoordinatorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineStateCoordinator manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineStateCoordinator manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineStateCoordinator initialized debe ser boolean."
      );
    }
  }

  static validateStateKey(key) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave del estado debe ser un string no vacio."
      );
    }
  }

  static validateState(value) {
    if (value === undefined) {
      throw new Error(
        "El estado no puede ser undefined."
      );
    }
  }

  static validateStates(states) {
    if (!(states instanceof Map)) {
      throw new Error(
        "states debe ser una instancia de Map."
      );
    }

    states.forEach((value, key) => {
      EngineStateCoordinatorValidator.validateStateKey(
        key
      );
      EngineStateCoordinatorValidator.validateState(
        value
      );
    });
  }

  static validateEngineStateCoordinator(engineStateCoordinator) {
    if (
      engineStateCoordinator === null ||
      typeof engineStateCoordinator !== "object"
    ) {
      throw new Error(
        "EngineStateCoordinator debe ser un objeto valido."
      );
    }

    EngineStateCoordinatorValidator.validateManager(
      engineStateCoordinator.manager
    );
    EngineStateCoordinatorValidator.validateInitialized(
      engineStateCoordinator.initialized
    );
    EngineStateCoordinatorValidator.validateStates(
      engineStateCoordinator.states
    );
  }
}

export default EngineStateCoordinatorValidator;
