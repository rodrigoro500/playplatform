class EngineRegistryManagerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineRegistryManager manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineRegistryManager manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineRegistryManager initialized debe ser boolean."
      );
    }
  }

  static validateRegistryName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del registro debe ser un string no vacio."
      );
    }
  }

  static validateResource(resource) {
    if (resource === undefined) {
      throw new Error(
        "El recurso del registro no puede ser undefined."
      );
    }
  }

  static validateRegistry(registry) {
    if (!(registry instanceof Map)) {
      throw new Error(
        "registry debe ser una instancia de Map."
      );
    }

    registry.forEach((resource, name) => {
      EngineRegistryManagerValidator.validateRegistryName(name);
      EngineRegistryManagerValidator.validateResource(resource);
    });
  }

  static validateEngineRegistryManager(engineRegistryManager) {
    if (
      engineRegistryManager === null ||
      typeof engineRegistryManager !== "object"
    ) {
      throw new Error(
        "EngineRegistryManager debe ser un objeto valido."
      );
    }

    EngineRegistryManagerValidator.validateManager(
      engineRegistryManager.manager
    );
    EngineRegistryManagerValidator.validateInitialized(
      engineRegistryManager.initialized
    );
    EngineRegistryManagerValidator.validateRegistry(
      engineRegistryManager.registry
    );
  }
}

export default EngineRegistryManagerValidator;
