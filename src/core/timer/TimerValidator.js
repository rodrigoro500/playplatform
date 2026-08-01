class TimerValidator {
  static STATUSES = [
    "IDLE",
    "RUNNING",
    "PAUSED",
    "COMPLETED",
    "CANCELLED",
  ];

  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id del timer debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id del timer no puede estar vacio."
      );
    }
  }

  static validateDuration(duration) {
    if (typeof duration !== "number") {
      throw new Error(
        "La duracion del timer debe ser un numero."
      );
    }

    if (!Number.isFinite(duration)) {
      throw new Error(
        "La duracion del timer debe ser finita."
      );
    }

    if (duration <= 0) {
      throw new Error(
        "La duracion del timer debe ser mayor que 0."
      );
    }
  }

  static validateRemaining(remaining) {
    if (typeof remaining !== "number") {
      throw new Error(
        "El remaining del timer debe ser un numero."
      );
    }

    if (!Number.isFinite(remaining)) {
      throw new Error(
        "El remaining del timer debe ser finito."
      );
    }

    if (remaining < 0) {
      throw new Error(
        "El remaining del timer debe ser mayor o igual a 0."
      );
    }
  }

  static validateStatus(status) {
    if (!TimerValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del timer no es valido."
      );
    }
  }

  static validateCallback(callback) {
    if (
      callback !== null &&
      typeof callback !== "function"
    ) {
      throw new Error(
        "El callback del timer debe ser una funcion o null."
      );
    }
  }

  static validateOptionalTimestamp(
    timestamp,
    fieldName
  ) {
    if (
      timestamp !== null &&
      typeof timestamp !== "string"
    ) {
      throw new Error(
        `${fieldName} del timer debe ser null o string.`
      );
    }
  }

  static validateTimer(timer) {
    if (
      timer === null ||
      typeof timer !== "object" ||
      Array.isArray(timer)
    ) {
      throw new Error(
        "El timer debe ser un objeto valido."
      );
    }

    TimerValidator.validateId(timer.id);
    TimerValidator.validateDuration(timer.duration);
    TimerValidator.validateRemaining(timer.remaining);
    TimerValidator.validateStatus(timer.status);
    TimerValidator.validateOptionalTimestamp(
      timer.startedAt,
      "startedAt"
    );
    TimerValidator.validateOptionalTimestamp(
      timer.finishedAt,
      "finishedAt"
    );
    TimerValidator.validateCallback(timer.callback);
  }

  static validateTimers(timers) {
    if (!(timers instanceof Map)) {
      throw new Error(
        "Los timers deben ser una instancia de Map."
      );
    }

    timers.forEach(timer =>
      TimerValidator.validateTimer(timer)
    );
  }
}

export default TimerValidator;
