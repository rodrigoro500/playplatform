import EngineHealthManager from "./EngineHealthManager";
import EngineHealthManagerEvents from "./EngineHealthManagerEvents";

class EngineHealthManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE HEALTH MANAGER SANDBOX =====");

    const manager = {};
    const monitor = {};
    const kernel = {};
    const runtime = {};
    const registry = {};
    const context = {};

    console.log("1. Crear instancias simuladas:");
    console.log({
      manager,
      monitor,
      kernel,
      runtime,
      registry,
      context,
    });

    const engineHealthManager =
      new EngineHealthManager();

    console.log("2. Crear una instancia de EngineHealthManager:");
    console.log(engineHealthManager.toJSON());

    this.assert(
      engineHealthManager.isHealthy() === false,
      "EngineHealthManager debe iniciar sin reporte saludable."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      healthy: engineHealthManager.isHealthy(),
      status: engineHealthManager.getStatus(),
    });

    engineHealthManager
      .setManager(manager)
      .setMonitor(monitor)
      .setKernel(kernel)
      .setRuntime(runtime)
      .setRegistry(registry)
      .setContext(context);

    console.log("4. Asignar dependencias:");
    console.log(engineHealthManager.getStatus());

    const statusWithDependencies =
      engineHealthManager.getStatus();

    this.assert(
      statusWithDependencies.manager === true &&
        statusWithDependencies.monitor === true &&
        statusWithDependencies.kernel === true &&
        statusWithDependencies.runtime === true &&
        statusWithDependencies.registry === true &&
        statusWithDependencies.context === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const healthReport =
      engineHealthManager.runHealthCheck();

    this.assert(
      healthReport.healthy === true,
      "runHealthCheck() debe devolver healthy true."
    );

    console.log("6. Ejecutar runHealthCheck():");
    console.log(healthReport);

    this.assert(
      engineHealthManager.isHealthy() === true,
      "EngineHealthManager debe quedar healthy."
    );
    this.assert(
      engineHealthManager.getLastHealthReport() === healthReport,
      "Debe devolver el ultimo reporte generado."
    );

    console.log("7. Verificar isHealthy() y getLastHealthReport():");
    console.log({
      healthy: engineHealthManager.isHealthy(),
      lastHealthReport: engineHealthManager.getLastHealthReport(),
    });

    const statusAfterHealthCheck =
      engineHealthManager.getStatus();

    console.log("8. Obtener getStatus():");
    console.log(statusAfterHealthCheck);

    const engineHealthManagerJSON =
      engineHealthManager.toJSON();

    console.log("9. Serializar utilizando toJSON():");
    console.log(engineHealthManagerJSON);

    const events = [
      EngineHealthManagerEvents.createEngineHealthCheckCompletedEvent(
        healthReport
      ),
      EngineHealthManagerEvents.createEngineHealthManagerResetEvent(),
      EngineHealthManagerEvents.createEngineHealthManagerReportUpdatedEvent(
        healthReport
      ),
    ];

    console.log("10. Crear eventos utilizando EngineHealthManagerEvents:");
    console.log(events);

    const reset =
      engineHealthManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("11. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      engineHealthManager.getStatus();

    this.assert(
      engineHealthManager.isHealthy() === false,
      "EngineHealthManager debe quedar no saludable tras reset."
    );
    this.assert(
      engineHealthManager.getLastHealthReport() === null,
      "lastHealthReport debe quedar null tras reset."
    );

    console.log("12. Verificar nuevamente isHealthy(), getStatus() y getLastHealthReport():");
    console.log({
      healthy: engineHealthManager.isHealthy(),
      status: resetStatus,
      lastHealthReport: engineHealthManager.getLastHealthReport(),
    });

    console.log("13. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      healthReport,
      statusAfterHealthCheck,
      engineHealthManagerJSON,
      events,
      resetStatus,
    });

    console.log("===== ENGINE HEALTH MANAGER SANDBOX OK =====");
  }
}

new EngineHealthManagerSandbox();

export default EngineHealthManagerSandbox;
