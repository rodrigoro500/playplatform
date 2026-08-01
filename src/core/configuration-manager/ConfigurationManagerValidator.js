class ConfigurationManagerValidator {
  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateConfiguration(configuration) {
    if (
      configuration === null ||
      typeof configuration !== "object" ||
      Array.isArray(configuration)
    ) {
      throw new Error(
        "La configuracion debe ser un objeto valido."
      );
    }

    ConfigurationManagerValidator.validateText(
      configuration.key,
      "La clave de configuracion debe ser un string no vacio."
    );
    ConfigurationManagerValidator.validateCategory(
      configuration.category
    );
    ConfigurationManagerValidator.validateDescription(
      configuration.description
    );
    ConfigurationManagerValidator.validateMetadata(
      configuration.metadata
    );
    ConfigurationManagerValidator.validateText(
      configuration.createdAt,
      "El createdAt de configuracion debe ser un string no vacio."
    );
    ConfigurationManagerValidator.validateText(
      configuration.updatedAt,
      "El updatedAt de configuracion debe ser un string no vacio."
    );
  }

  static validateConfigurations(configurations) {
    if (!(configurations instanceof Map)) {
      throw new Error(
        "Las configuraciones deben ser una instancia de Map."
      );
    }

    configurations.forEach(configuration =>
      ConfigurationManagerValidator.validateConfiguration(configuration)
    );
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata de configuracion debe ser un objeto valido."
      );
    }
  }

  static validateCategory(category) {
    ConfigurationManagerValidator.validateText(
      category,
      "La categoria de configuracion debe ser un string no vacio."
    );
  }

  static validateDescription(description) {
    if (typeof description !== "string") {
      throw new Error(
        "La descripcion de configuracion debe ser un string."
      );
    }
  }

  static validateConfigurationManager(configurationManager) {
    if (
      configurationManager === null ||
      typeof configurationManager !== "object" ||
      Array.isArray(configurationManager)
    ) {
      throw new Error(
        "El ConfigurationManager debe ser un objeto valido."
      );
    }

    ConfigurationManagerValidator.validateConfigurations(
      configurationManager.configurations
    );
  }
}

export default ConfigurationManagerValidator;
