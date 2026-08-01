class EngineResourcePoolValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineResourcePool manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineResourcePool manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineResourcePool initialized debe ser boolean."
      );
    }
  }

  static validateResourceName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del recurso debe ser un string no vacio."
      );
    }
  }

  static validateResource(resource) {
    if (resource === undefined) {
      throw new Error(
        "El recurso del pool no puede ser undefined."
      );
    }
  }

  static validateResourcePool(resources) {
    if (!(resources instanceof Map)) {
      throw new Error(
        "resources debe ser una instancia de Map."
      );
    }

    resources.forEach((resource, name) => {
      EngineResourcePoolValidator.validateResourceName(name);
      EngineResourcePoolValidator.validateResource(resource);
    });
  }

  static validateEngineResourcePool(engineResourcePool) {
    if (
      engineResourcePool === null ||
      typeof engineResourcePool !== "object"
    ) {
      throw new Error(
        "EngineResourcePool debe ser un objeto valido."
      );
    }

    EngineResourcePoolValidator.validateManager(
      engineResourcePool.manager
    );
    EngineResourcePoolValidator.validateInitialized(
      engineResourcePool.initialized
    );
    EngineResourcePoolValidator.validateResourcePool(
      engineResourcePool.resources
    );
  }
}

export default EngineResourcePoolValidator;
