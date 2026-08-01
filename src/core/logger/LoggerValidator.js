class LoggerValidator {
  static LEVELS = [
    "INFO",
    "WARN",
    "ERROR",
    "DEBUG",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateLevel(level) {
    LoggerValidator.validateText(
      level,
      "El nivel del log debe ser un string no vacio."
    );

    if (!LoggerValidator.LEVELS.includes(level)) {
      throw new Error(
        "El nivel del log no es valido."
      );
    }
  }

  static validateMessage(message) {
    LoggerValidator.validateText(
      message,
      "El mensaje del log debe ser un string no vacio."
    );
  }

  static validateContext(context) {
    if (
      context === null ||
      typeof context !== "object" ||
      Array.isArray(context)
    ) {
      throw new Error(
        "El contexto del log debe ser un objeto valido."
      );
    }
  }

  static validateLog(log) {
    if (
      log === null ||
      typeof log !== "object" ||
      Array.isArray(log)
    ) {
      throw new Error(
        "El log debe ser un objeto valido."
      );
    }

    LoggerValidator.validateText(
      log.id,
      "El id del log debe ser un string no vacio."
    );
    LoggerValidator.validateLevel(log.level);
    LoggerValidator.validateMessage(log.message);
    LoggerValidator.validateContext(log.context);
    LoggerValidator.validateText(
      log.timestamp,
      "El timestamp del log debe ser un string no vacio."
    );
  }

  static validateLogs(logs) {
    if (!Array.isArray(logs)) {
      throw new Error(
        "Los logs deben ser un Array."
      );
    }

    logs.forEach(log =>
      LoggerValidator.validateLog(log)
    );
  }
}

export default LoggerValidator;
