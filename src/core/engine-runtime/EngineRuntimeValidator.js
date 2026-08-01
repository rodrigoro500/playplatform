class EngineRuntimeValidator {
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
    EngineRuntimeValidator.validateObject(
      kernel,
      "El kernel de EngineRuntime debe ser un objeto valido."
    );
  }

  static validateContext(context) {
    EngineRuntimeValidator.validateObject(
      context,
      "El context de EngineRuntime debe ser un objeto valido."
    );
  }

  static validateScheduler(scheduler) {
    EngineRuntimeValidator.validateObject(
      scheduler,
      "El scheduler de EngineRuntime debe ser un objeto valido."
    );
  }

  static validateEventBus(eventBus) {
    EngineRuntimeValidator.validateObject(
      eventBus,
      "El eventBus de EngineRuntime debe ser un objeto valido."
    );
  }

  static validateLogger(logger) {
    EngineRuntimeValidator.validateObject(
      logger,
      "El logger de EngineRuntime debe ser un objeto valido."
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
        `${fieldName} de EngineRuntime debe ser null o un string no vacio.`
      );
    }

    if (Number.isNaN(new Date(timestamp).getTime())) {
      throw new Error(
        `${fieldName} de EngineRuntime debe representar una fecha valida.`
      );
    }
  }

  static validateEngineRuntime(engineRuntime) {
    EngineRuntimeValidator.validateObject(
      engineRuntime,
      "EngineRuntime debe ser un objeto valido."
    );

    EngineRuntimeValidator.validateKernel(
      engineRuntime.kernel
    );
    EngineRuntimeValidator.validateContext(
      engineRuntime.context
    );
    EngineRuntimeValidator.validateScheduler(
      engineRuntime.scheduler
    );
    EngineRuntimeValidator.validateEventBus(
      engineRuntime.eventBus
    );
    EngineRuntimeValidator.validateLogger(
      engineRuntime.logger
    );

    if (typeof engineRuntime.running !== "boolean") {
      throw new Error(
        "running de EngineRuntime debe ser boolean."
      );
    }

    if (typeof engineRuntime.paused !== "boolean") {
      throw new Error(
        "paused de EngineRuntime debe ser boolean."
      );
    }

    EngineRuntimeValidator.validateTimestamp(
      engineRuntime.startedAt,
      "startedAt"
    );
    EngineRuntimeValidator.validateTimestamp(
      engineRuntime.stoppedAt,
      "stoppedAt"
    );

    if (
      engineRuntime.paused === true &&
      engineRuntime.running !== true
    ) {
      throw new Error(
        "EngineRuntime no puede estar paused si running no es true."
      );
    }

    if (
      engineRuntime.running === true &&
      engineRuntime.startedAt === null
    ) {
      throw new Error(
        "EngineRuntime requiere startedAt cuando running es true."
      );
    }

    if (
      engineRuntime.stoppedAt !== null &&
      engineRuntime.startedAt === null
    ) {
      throw new Error(
        "EngineRuntime requiere startedAt cuando stoppedAt existe."
      );
    }
  }
}

export default EngineRuntimeValidator;
