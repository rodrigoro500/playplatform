class LoggerEvents {
  static LOG_CREATED = "LOG_CREATED";

  static LOGGER_CLEARED = "LOGGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createLogCreatedEvent(log) {
    return LoggerEvents.createEvent(
      LoggerEvents.LOG_CREATED,
      {
        log,
      }
    );
  }

  static createLoggerClearedEvent() {
    return LoggerEvents.createEvent(
      LoggerEvents.LOGGER_CLEARED,
      {}
    );
  }
}

export default LoggerEvents;
