class EngineMetricsValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineMetrics manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineMetrics manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineMetrics initialized debe ser boolean."
      );
    }
  }

  static validateMetricName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre de la metrica debe ser un string no vacio."
      );
    }
  }

  static validateMetricValue(value) {
    if (value === undefined) {
      throw new Error(
        "El valor de la metrica no puede ser undefined."
      );
    }
  }

  static validateMetrics(metrics) {
    if (!(metrics instanceof Map)) {
      throw new Error(
        "metrics debe ser una instancia de Map."
      );
    }

    metrics.forEach((value, key) => {
      EngineMetricsValidator.validateMetricName(key);
      EngineMetricsValidator.validateMetricValue(value);
    });
  }

  static validateEngineMetrics(engineMetrics) {
    if (
      engineMetrics === null ||
      typeof engineMetrics !== "object"
    ) {
      throw new Error(
        "EngineMetrics debe ser un objeto valido."
      );
    }

    EngineMetricsValidator.validateManager(
      engineMetrics.manager
    );
    EngineMetricsValidator.validateInitialized(
      engineMetrics.initialized
    );
    EngineMetricsValidator.validateMetrics(
      engineMetrics.metrics
    );
  }
}

export default EngineMetricsValidator;
