import Statistics from "./Statistics";

class StatisticsValidator {
  static validateKey(key) {
    if (typeof key !== "string") {
      throw new Error(
        "La clave de la estadistica debe ser un string."
      );
    }

    if (key.trim() === "") {
      throw new Error(
        "La clave de la estadistica no puede estar vacia."
      );
    }
  }

  static validateValue(value) {
    if (typeof value !== "number") {
      throw new Error(
        "El valor de la estadistica debe ser un numero."
      );
    }

    if (!Number.isFinite(value)) {
      throw new Error(
        "El valor de la estadistica debe ser finito."
      );
    }
  }

  static validateAmount(amount) {
    if (typeof amount !== "number") {
      throw new Error(
        "El monto de la estadistica debe ser un numero."
      );
    }

    if (!Number.isFinite(amount)) {
      throw new Error(
        "El monto de la estadistica debe ser finito."
      );
    }
  }

  static validateCounters(counters) {
    if (!(counters instanceof Map)) {
      throw new Error(
        "Los counters de estadisticas deben ser una instancia de Map."
      );
    }

    counters.forEach((value, key) => {
      StatisticsValidator.validateKey(key);
      StatisticsValidator.validateValue(value);
    });
  }

  static validateStatistics(statistics) {
    if (!(statistics instanceof Statistics)) {
      throw new Error(
        "Las estadisticas deben ser una instancia de Statistics."
      );
    }
  }
}

export default StatisticsValidator;
