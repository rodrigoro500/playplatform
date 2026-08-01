class EngineBootstrapValidator {
  static validateObject(
    value,
    message
  ) {
    if (
      value === null ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      throw new Error(message);
    }
  }

  static validateRegistry(registry) {
    EngineBootstrapValidator.validateObject(
      registry,
      "El registry de EngineBootstrap debe ser un objeto valido."
    );
  }

  static validateContext(context) {
    EngineBootstrapValidator.validateObject(
      context,
      "El context de EngineBootstrap debe ser un objeto valido."
    );
  }

  static validateConfigurationManager(configurationManager) {
    EngineBootstrapValidator.validateObject(
      configurationManager,
      "El configurationManager de EngineBootstrap debe ser un objeto valido."
    );
  }

  static validateLifecycleManager(lifecycleManager) {
    EngineBootstrapValidator.validateObject(
      lifecycleManager,
      "El lifecycleManager de EngineBootstrap debe ser un objeto valido."
    );
  }

  static validateEngineBootstrap(engineBootstrap) {
    EngineBootstrapValidator.validateObject(
      engineBootstrap,
      "EngineBootstrap debe ser un objeto valido."
    );

    EngineBootstrapValidator.validateRegistry(
      engineBootstrap.registry
    );
    EngineBootstrapValidator.validateContext(
      engineBootstrap.context
    );
    EngineBootstrapValidator.validateConfigurationManager(
      engineBootstrap.configurationManager
    );
    EngineBootstrapValidator.validateLifecycleManager(
      engineBootstrap.lifecycleManager
    );

    if (typeof engineBootstrap.initialized !== "boolean") {
      throw new Error(
        "initialized de EngineBootstrap debe ser boolean."
      );
    }
  }
}

export default EngineBootstrapValidator;
