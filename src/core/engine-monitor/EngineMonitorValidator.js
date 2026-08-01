class EngineMonitorValidator {
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

  static validateKernel(kernel) {
    EngineMonitorValidator.validateObject(
      kernel,
      "El kernel de EngineMonitor debe ser un objeto valido."
    );
  }

  static validateRuntime(runtime) {
    EngineMonitorValidator.validateObject(
      runtime,
      "El runtime de EngineMonitor debe ser un objeto valido."
    );
  }

  static validateRegistry(registry) {
    EngineMonitorValidator.validateObject(
      registry,
      "El registry de EngineMonitor debe ser un objeto valido."
    );
  }

  static validateContext(context) {
    EngineMonitorValidator.validateObject(
      context,
      "El context de EngineMonitor debe ser un objeto valido."
    );
  }

  static validateTimestamp(
    timestamp,
    fieldName
  ) {
    if (timestamp === null) {
      return;
    }

    if (
      typeof timestamp !== "string" ||
      timestamp.trim() === ""
    ) {
      throw new Error(
        `${fieldName} de EngineMonitor debe ser null o un string no vacio.`
      );
    }

    if (Number.isNaN(new Date(timestamp).getTime())) {
      throw new Error(
        `${fieldName} de EngineMonitor debe representar una fecha valida.`
      );
    }
  }

  static validateEngineMonitor(engineMonitor) {
    EngineMonitorValidator.validateObject(
      engineMonitor,
      "EngineMonitor debe ser un objeto valido."
    );

    EngineMonitorValidator.validateKernel(
      engineMonitor.kernel
    );
    EngineMonitorValidator.validateRuntime(
      engineMonitor.runtime
    );
    EngineMonitorValidator.validateRegistry(
      engineMonitor.registry
    );
    EngineMonitorValidator.validateContext(
      engineMonitor.context
    );

    if (typeof engineMonitor.monitoring !== "boolean") {
      throw new Error(
        "monitoring de EngineMonitor debe ser boolean."
      );
    }

    EngineMonitorValidator.validateTimestamp(
      engineMonitor.startedAt,
      "startedAt"
    );
    EngineMonitorValidator.validateTimestamp(
      engineMonitor.lastCheckAt,
      "lastCheckAt"
    );

    if (
      engineMonitor.monitoring === true &&
      engineMonitor.startedAt === null
    ) {
      throw new Error(
        "EngineMonitor requiere startedAt cuando monitoring es true."
      );
    }

    if (
      engineMonitor.lastCheckAt !== null &&
      engineMonitor.startedAt === null
    ) {
      throw new Error(
        "EngineMonitor requiere startedAt cuando lastCheckAt existe."
      );
    }
  }
}

export default EngineMonitorValidator;
