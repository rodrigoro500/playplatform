class LifecycleManagerValidator {
  static STATES = [
    "CREATED",
    "INITIALIZED",
    "STARTED",
    "PAUSED",
    "STOPPED",
    "DESTROYED",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateComponent(component) {
    if (
      component === null ||
      typeof component !== "object" ||
      Array.isArray(component)
    ) {
      throw new Error(
        "El componente debe ser un objeto valido."
      );
    }

    LifecycleManagerValidator.validateText(
      component.id,
      "El id del componente debe ser un string no vacio."
    );
    LifecycleManagerValidator.validateState(
      component.state
    );
    LifecycleManagerValidator.validateMetadata(
      component.metadata
    );
    LifecycleManagerValidator.validateText(
      component.createdAt,
      "El createdAt del componente debe ser un string no vacio."
    );
    LifecycleManagerValidator.validateText(
      component.updatedAt,
      "El updatedAt del componente debe ser un string no vacio."
    );
  }

  static validateComponents(components) {
    if (!(components instanceof Map)) {
      throw new Error(
        "Los componentes deben ser una instancia de Map."
      );
    }

    components.forEach(component =>
      LifecycleManagerValidator.validateComponent(component)
    );
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del componente debe ser un objeto valido."
      );
    }
  }

  static validateState(state) {
    if (!LifecycleManagerValidator.STATES.includes(state)) {
      throw new Error(
        "El estado del componente no es valido."
      );
    }
  }

  static validateLifecycleManager(lifecycleManager) {
    if (
      lifecycleManager === null ||
      typeof lifecycleManager !== "object" ||
      Array.isArray(lifecycleManager)
    ) {
      throw new Error(
        "El LifecycleManager debe ser un objeto valido."
      );
    }

    LifecycleManagerValidator.validateComponents(
      lifecycleManager.components
    );
  }
}

export default LifecycleManagerValidator;
