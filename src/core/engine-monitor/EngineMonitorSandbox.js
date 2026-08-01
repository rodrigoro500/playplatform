import EngineMonitor from "./EngineMonitor";
import EngineMonitorEvents from "./EngineMonitorEvents";

class EngineMonitorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE MONITOR SANDBOX =====");

    const kernel = {};
    const runtime = {};
    const registry = {};
    const context = {};

    console.log("1. Crear instancias simuladas:");
    console.log({
      kernel,
      runtime,
      registry,
      context,
    });

    const engineMonitor =
      new EngineMonitor();

    console.log("2. Crear una instancia de EngineMonitor:");
    console.log(engineMonitor.toJSON());

    this.assert(
      engineMonitor.isMonitoring() === false,
      "EngineMonitor debe iniciar sin monitorear."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      monitoring: engineMonitor.isMonitoring(),
      status: engineMonitor.getStatus(),
    });

    engineMonitor
      .setKernel(kernel)
      .setRuntime(runtime)
      .setRegistry(registry)
      .setContext(context);

    console.log("4. Asignar dependencias:");
    console.log(engineMonitor.getStatus());

    const statusWithDependencies =
      engineMonitor.getStatus();

    this.assert(
      statusWithDependencies.kernel === true &&
        statusWithDependencies.runtime === true &&
        statusWithDependencies.registry === true &&
        statusWithDependencies.context === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const started =
      engineMonitor.startMonitoring();

    this.assert(
      started === true,
      "startMonitoring() debe devolver true."
    );

    console.log("6. Ejecutar startMonitoring():");
    console.log(started);

    const startedStatus =
      engineMonitor.getStatus();

    this.assert(
      engineMonitor.isMonitoring() === true,
      "EngineMonitor debe quedar monitoreando."
    );

    console.log("7. Verificar isMonitoring() y getStatus():");
    console.log({
      monitoring: engineMonitor.isMonitoring(),
      status: startedStatus,
    });

    const health =
      engineMonitor.healthCheck();

    this.assert(
      health.healthy === true,
      "healthCheck() debe devolver healthy true."
    );

    console.log("8. Ejecutar healthCheck():");
    console.log(health);

    const report =
      engineMonitor.getReport();

    this.assert(
      report.health.healthy === true,
      "getReport() debe incluir health saludable."
    );

    console.log("9. Verificar getReport():");
    console.log(report);

    const engineMonitorJSON =
      engineMonitor.toJSON();

    console.log("10. Serializar utilizando toJSON():");
    console.log(engineMonitorJSON);

    const events = [
      EngineMonitorEvents.createEngineMonitorStartedEvent(startedStatus),
      EngineMonitorEvents.createEngineMonitorStoppedEvent({
        monitoring: false,
      }),
      EngineMonitorEvents.createEngineHealthCheckCompletedEvent(health),
      EngineMonitorEvents.createEngineMonitorResetEvent(),
    ];

    console.log("11. Crear eventos utilizando EngineMonitorEvents:");
    console.log(events);

    const stopped =
      engineMonitor.stopMonitoring();

    this.assert(
      stopped === true,
      "stopMonitoring() debe devolver true."
    );

    console.log("12. Ejecutar stopMonitoring():");
    console.log(stopped);

    this.assert(
      engineMonitor.isMonitoring() === false,
      "EngineMonitor debe quedar detenido."
    );

    console.log("13. Verificar isMonitoring():");
    console.log(engineMonitor.isMonitoring());

    engineMonitor.reset();

    console.log("14. Ejecutar reset():");
    console.log(engineMonitor.toJSON());

    const resetStatus =
      engineMonitor.getStatus();

    this.assert(
      engineMonitor.isMonitoring() === false,
      "EngineMonitor debe quedar sin monitorear tras reset."
    );
    this.assert(
      resetStatus.kernel === false &&
        resetStatus.runtime === false &&
        resetStatus.registry === false &&
        resetStatus.context === false,
      "Las dependencias deben quedar limpias tras reset."
    );

    console.log("15. Verificar nuevamente getStatus() e isMonitoring():");
    console.log({
      status: resetStatus,
      monitoring: engineMonitor.isMonitoring(),
    });

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      startedStatus,
      health,
      report,
      engineMonitorJSON,
      events,
      stopped,
      resetStatus,
    });

    console.log("===== ENGINE MONITOR SANDBOX OK =====");
  }
}

new EngineMonitorSandbox();

export default EngineMonitorSandbox;
