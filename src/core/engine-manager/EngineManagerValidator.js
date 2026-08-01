class EngineManagerValidator {
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
    EngineManagerValidator.validateObject(
      bootstrap,
      "El bootstrap de EngineManager debe ser un objeto valido."
    );
  }

  static validateKernel(kernel) {
    EngineManagerValidator.validateObject(
      kernel,
      "El kernel de EngineManager debe ser un objeto valido."
    );
  }

  static validateRuntime(runtime) {
    EngineManagerValidator.validateObject(
      runtime,
      "El runtime de EngineManager debe ser un objeto valido."
    );
  }

  static validateMonitor(monitor) {
    EngineManagerValidator.validateObject(
      monitor,
      "El monitor de EngineManager debe ser un objeto valido."
    );
  }

  static validateRegistry(registry) {
    EngineManagerValidator.validateObject(
      registry,
      "El registry de EngineManager debe ser un objeto valido."
    );
  }

  static validateContext(context) {
    EngineManagerValidator.validateObject(
      context,
      "El context de EngineManager debe ser un objeto valido."
    );
  }

  static validateEngineManager(engineManager) {
    EngineManagerValidator.validateObject(
      engineManager,
      "EngineManager debe ser un objeto valido."
    );

    EngineManagerValidator.validateBootstrap(
      engineManager.bootstrap
    );
    EngineManagerValidator.validateKernel(
      engineManager.kernel
    );
    EngineManagerValidator.validateRuntime(
      engineManager.runtime
    );
    EngineManagerValidator.validateMonitor(
      engineManager.monitor
    );
    EngineManagerValidator.validateRegistry(
      engineManager.registry
    );
    EngineManagerValidator.validateContext(
      engineManager.context
    );

    if (typeof engineManager.initialized !== "boolean") {
      throw new Error(
        "initialized de EngineManager debe ser boolean."
      );
    }
  }
}

export default EngineManagerValidator;
