class EngineKernelValidator {
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

  static validateBootstrap(bootstrap) {
    EngineKernelValidator.validateObject(
      bootstrap,
      "El bootstrap de EngineKernel debe ser un objeto valido."
    );
  }

  static validateRegistry(registry) {
    EngineKernelValidator.validateObject(
      registry,
      "El registry de EngineKernel debe ser un objeto valido."
    );
  }

  static validateContext(context) {
    EngineKernelValidator.validateObject(
      context,
      "El context de EngineKernel debe ser un objeto valido."
    );
  }

  static validateConfigurationManager(configurationManager) {
    EngineKernelValidator.validateObject(
      configurationManager,
      "El configurationManager de EngineKernel debe ser un objeto valido."
    );
  }

  static validateLifecycleManager(lifecycleManager) {
    EngineKernelValidator.validateObject(
      lifecycleManager,
      "El lifecycleManager de EngineKernel debe ser un objeto valido."
    );
  }

  static validateEngineKernel(engineKernel) {
    EngineKernelValidator.validateObject(
      engineKernel,
      "EngineKernel debe ser un objeto valido."
    );

    EngineKernelValidator.validateBootstrap(
      engineKernel.bootstrap
    );
    EngineKernelValidator.validateRegistry(
      engineKernel.registry
    );
    EngineKernelValidator.validateContext(
      engineKernel.context
    );
    EngineKernelValidator.validateConfigurationManager(
      engineKernel.configurationManager
    );
    EngineKernelValidator.validateLifecycleManager(
      engineKernel.lifecycleManager
    );

    if (typeof engineKernel.running !== "boolean") {
      throw new Error(
        "running de EngineKernel debe ser boolean."
      );
    }
  }
}

export default EngineKernelValidator;
