class EngineHealthManagerValidator {
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

  static validateManager(manager) {
    EngineHealthManagerValidator.validateObject(
      manager,
      "El manager de EngineHealthManager debe ser un objeto valido."
    );
  }

  static validateMonitor(monitor) {
    EngineHealthManagerValidator.validateObject(
      monitor,
      "El monitor de EngineHealthManager debe ser un objeto valido."
    );
  }

  static validateKernel(kernel) {
    EngineHealthManagerValidator.validateObject(
      kernel,
      "El kernel de EngineHealthManager debe ser un objeto valido."
    );
  }

  static validateRuntime(runtime) {
    EngineHealthManagerValidator.validateObject(
      runtime,
      "El runtime de EngineHealthManager debe ser un objeto valido."
    );
  }

  static validateRegistry(registry) {
    EngineHealthManagerValidator.validateObject(
      registry,
      "El registry de EngineHealthManager debe ser un objeto valido."
    );
  }

  static validateContext(context) {
    EngineHealthManagerValidator.validateObject(
      context,
      "El context de EngineHealthManager debe ser un objeto valido."
    );
  }

  static validateBoolean(value, fieldName) {
    if (typeof value !== "boolean") {
      throw new Error(
        `${fieldName} del health report debe ser boolean.`
      );
    }
  }

  static validateHealthReport(report) {
    if (report === null) {
      return;
    }

    EngineHealthManagerValidator.validateObject(
      report,
      "El health report debe ser un objeto valido."
    );

    EngineHealthManagerValidator.validateBoolean(
      report.healthy,
      "healthy"
    );

    if (
      typeof report.timestamp !== "string" ||
      report.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp del health report debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(report.timestamp).getTime())) {
      throw new Error(
        "El timestamp del health report debe representar una fecha valida."
      );
    }

    EngineHealthManagerValidator.validateBoolean(
      report.manager,
      "manager"
    );
    EngineHealthManagerValidator.validateBoolean(
      report.monitor,
      "monitor"
    );
    EngineHealthManagerValidator.validateBoolean(
      report.kernel,
      "kernel"
    );
    EngineHealthManagerValidator.validateBoolean(
      report.runtime,
      "runtime"
    );
    EngineHealthManagerValidator.validateBoolean(
      report.registry,
      "registry"
    );
    EngineHealthManagerValidator.validateBoolean(
      report.context,
      "context"
    );
  }

  static validateEngineHealthManager(engineHealthManager) {
    EngineHealthManagerValidator.validateObject(
      engineHealthManager,
      "EngineHealthManager debe ser un objeto valido."
    );

    EngineHealthManagerValidator.validateManager(
      engineHealthManager.manager
    );
    EngineHealthManagerValidator.validateMonitor(
      engineHealthManager.monitor
    );
    EngineHealthManagerValidator.validateKernel(
      engineHealthManager.kernel
    );
    EngineHealthManagerValidator.validateRuntime(
      engineHealthManager.runtime
    );
    EngineHealthManagerValidator.validateRegistry(
      engineHealthManager.registry
    );
    EngineHealthManagerValidator.validateContext(
      engineHealthManager.context
    );
    EngineHealthManagerValidator.validateHealthReport(
      engineHealthManager.lastHealthReport
    );
  }
}

export default EngineHealthManagerValidator;
