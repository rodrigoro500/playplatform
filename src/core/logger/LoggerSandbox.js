import Logger from "./Logger";
import LoggerEvents from "./LoggerEvents";

class LoggerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== LOGGER SANDBOX =====");

    const logger =
      new Logger();

    console.log("1. Crear una instancia de Logger:");
    console.log(logger.toJSON());

    const infoLog =
      logger.info(
        "Mensaje INFO",
        {
          step: 2,
        }
      );

    console.log("2. Registrar un log INFO:");
    console.log(infoLog);

    const warnLog =
      logger.warn(
        "Mensaje WARN",
        {
          step: 3,
        }
      );

    console.log("3. Registrar un log WARN:");
    console.log(warnLog);

    const errorLog =
      logger.error(
        "Mensaje ERROR",
        {
          step: 4,
        }
      );

    console.log("4. Registrar un log ERROR:");
    console.log(errorLog);

    const debugLog =
      logger.debug(
        "Mensaje DEBUG",
        {
          step: 5,
        }
      );

    console.log("5. Registrar un log DEBUG:");
    console.log(debugLog);

    const logs =
      logger.getLogs();

    this.assert(
      logs.length === 4,
      "Deben existir cuatro logs."
    );

    console.log("6. Obtener todos los logs:");
    console.log(logs);

    const infoLogs =
      logger.getLogsByLevel("INFO");

    this.assert(
      infoLogs.length === 1,
      "Debe existir un log INFO."
    );

    console.log("7. Obtener logs por nivel INFO:");
    console.log(infoLogs);

    const warnLogs =
      logger.getLogsByLevel("WARN");

    this.assert(
      warnLogs.length === 1,
      "Debe existir un log WARN."
    );

    console.log("8. Obtener logs por nivel WARN:");
    console.log(warnLogs);

    const errorLogs =
      logger.getLogsByLevel("ERROR");

    this.assert(
      errorLogs.length === 1,
      "Debe existir un log ERROR."
    );

    console.log("9. Obtener logs por nivel ERROR:");
    console.log(errorLogs);

    const debugLogs =
      logger.getLogsByLevel("DEBUG");

    this.assert(
      debugLogs.length === 1,
      "Debe existir un log DEBUG."
    );

    console.log("10. Obtener logs por nivel DEBUG:");
    console.log(debugLogs);

    const lastLog =
      logger.getLastLog();

    this.assert(
      lastLog.id === debugLog.id,
      "El ultimo log debe ser DEBUG."
    );

    console.log("11. Obtener el ultimo log:");
    console.log(lastLog);

    const logCount =
      logger.count();

    this.assert(
      logCount === 4,
      "El Logger debe tener cuatro logs."
    );

    console.log("12. Contar la cantidad total de logs:");
    console.log(logCount);

    const loggerJSON =
      logger.toJSON();

    console.log("13. Serializar el Logger utilizando toJSON():");
    console.log(loggerJSON);

    const events = [
      LoggerEvents.createLogCreatedEvent(infoLog),
      LoggerEvents.createLogCreatedEvent(warnLog),
      LoggerEvents.createLogCreatedEvent(errorLog),
      LoggerEvents.createLogCreatedEvent(debugLog),
      LoggerEvents.createLoggerClearedEvent(),
    ];

    console.log("14. Crear eventos utilizando LoggerEvents:");
    console.log(events);

    logger.clear();

    console.log("15. Limpiar completamente el Logger:");
    console.log(logger.toJSON());

    this.assert(
      logger.count() === 0,
      "El Logger debe quedar sin logs."
    );

    console.log("16. Verificar que count() sea 0:");
    console.log(logger.count());

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      logs,
      infoLogs,
      warnLogs,
      errorLogs,
      debugLogs,
      lastLog,
      logCount,
      loggerJSON,
      events,
      finalCount: logger.count(),
    });

    console.log("===== LOGGER SANDBOX OK =====");
  }
}

new LoggerSandbox();

export default LoggerSandbox;
