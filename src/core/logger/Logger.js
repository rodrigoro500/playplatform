class Logger {
  static LEVELS = [
    "INFO",
    "WARN",
    "ERROR",
    "DEBUG",
  ];

  constructor() {
    this.logs = [];
  }

  validateLevel(level) {
    if (!Logger.LEVELS.includes(level)) {
      throw new Error(
        "El nivel del log no es valido."
      );
    }
  }

  validateMessage(message) {
    if (
      typeof message !== "string" ||
      message.trim() === ""
    ) {
      throw new Error(
        "El mensaje del log debe ser un string no vacio."
      );
    }
  }

  validateContext(context) {
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

  createId() {
    return `log-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;
  }

  log(
    level,
    message,
    context = {}
  ) {
    this.validateLevel(level);
    this.validateMessage(message);
    this.validateContext(context);

    const logEntry = {
      id: this.createId(),
      level,
      message,
      context: {
        ...context,
      },
      timestamp: new Date().toISOString(),
    };

    this.logs.push(logEntry);

    return {
      ...logEntry,
      context: {
        ...logEntry.context,
      },
    };
  }

  info(
    message,
    context = {}
  ) {
    return this.log(
      "INFO",
      message,
      context
    );
  }

  warn(
    message,
    context = {}
  ) {
    return this.log(
      "WARN",
      message,
      context
    );
  }

  error(
    message,
    context = {}
  ) {
    return this.log(
      "ERROR",
      message,
      context
    );
  }

  debug(
    message,
    context = {}
  ) {
    return this.log(
      "DEBUG",
      message,
      context
    );
  }

  getLogs() {
    return this.logs.map(logEntry => ({
      ...logEntry,
      context: {
        ...logEntry.context,
      },
    }));
  }

  getLogsByLevel(level) {
    this.validateLevel(level);

    return this
      .getLogs()
      .filter(logEntry =>
        logEntry.level === level
      );
  }

  getLastLog() {
    if (this.logs.length === 0) {
      return null;
    }

    const logEntry =
      this.logs[this.logs.length - 1];

    return {
      ...logEntry,
      context: {
        ...logEntry.context,
      },
    };
  }

  count() {
    return this.logs.length;
  }

  clear() {
    this.logs = [];
  }

  toJSON() {
    return this.getLogs();
  }
}

export default Logger;
