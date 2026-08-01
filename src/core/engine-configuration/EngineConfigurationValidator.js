class EngineConfigurationValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineConfiguration manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineConfiguration manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineConfiguration initialized debe ser boolean."
      );
    }
  }

  static validateConfigurationKey(key) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave de configuracion debe ser un string no vacio."
      );
    }
  }

  static validateConfigurationValue(value) {
    if (value === undefined) {
      throw new Error(
        "El valor de configuracion no puede ser undefined."
      );
    }
  }

  static validateConfiguration(configuration) {
    if (!(configuration instanceof Map)) {
      throw new Error(
        "configuration debe ser una instancia de Map."
      );
    }

    configuration.forEach((value, key) => {
      EngineConfigurationValidator.validateConfigurationKey(key);
      EngineConfigurationValidator.validateConfigurationValue(value);
    });
  }

  static validateEngineConfiguration(engineConfiguration) {
    if (
      engineConfiguration === null ||
      typeof engineConfiguration !== "object"
    ) {
      throw new Error(
        "EngineConfiguration debe ser un objeto valido."
      );
    }

    EngineConfigurationValidator.validateManager(
      engineConfiguration.manager
    );
    EngineConfigurationValidator.validateInitialized(
      engineConfiguration.initialized
    );
    EngineConfigurationValidator.validateConfiguration(
      engineConfiguration.configuration
    );
  }
}

export default EngineConfigurationValidator;
