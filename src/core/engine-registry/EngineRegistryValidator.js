class EngineRegistryValidator {
  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateModule(module) {
    if (
      module === null ||
      typeof module !== "object" ||
      Array.isArray(module)
    ) {
      throw new Error(
        "El modulo debe ser un objeto valido."
      );
    }

    EngineRegistryValidator.validateText(
      module.id,
      "El id del modulo debe ser un string no vacio."
    );
    EngineRegistryValidator.validateCategory(
      module.category
    );
    EngineRegistryValidator.validateVersion(
      module.version
    );

    if (typeof module.enabled !== "boolean") {
      throw new Error(
        "enabled del modulo debe ser boolean."
      );
    }

    EngineRegistryValidator.validateMetadata(
      module.metadata
    );
    EngineRegistryValidator.validateText(
      module.createdAt,
      "El createdAt del modulo debe ser un string no vacio."
    );
    EngineRegistryValidator.validateText(
      module.updatedAt,
      "El updatedAt del modulo debe ser un string no vacio."
    );
  }

  static validateModules(modules) {
    if (!(modules instanceof Map)) {
      throw new Error(
        "Los modules deben ser una instancia de Map."
      );
    }

    modules.forEach(module =>
      EngineRegistryValidator.validateModule(module)
    );
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del modulo debe ser un objeto valido."
      );
    }
  }

  static validateCategory(category) {
    EngineRegistryValidator.validateText(
      category,
      "La categoria del modulo debe ser un string no vacio."
    );
  }

  static validateVersion(version) {
    EngineRegistryValidator.validateText(
      version,
      "La version del modulo debe ser un string no vacio."
    );
  }

  static validateEngineRegistry(engineRegistry) {
    if (
      engineRegistry === null ||
      typeof engineRegistry !== "object" ||
      Array.isArray(engineRegistry)
    ) {
      throw new Error(
        "El EngineRegistry debe ser un objeto valido."
      );
    }

    EngineRegistryValidator.validateModules(
      engineRegistry.modules
    );
  }
}

export default EngineRegistryValidator;
