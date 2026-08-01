import EngineManager from "./EngineManager";
import EngineManagerEvents from "./EngineManagerEvents";

class EngineManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE MANAGER SANDBOX =====");

    const bootstrap = {};
    const kernel = {};
    const runtime = {};
    const monitor = {};
    const registry = {};
    const context = {};

    console.log("1. Crear instancias simuladas:");
    console.log({
      bootstrap,
      kernel,
      runtime,
      monitor,
      registry,
      context,
    });

    const engineManager =
      new EngineManager();

    console.log("2. Crear una instancia de EngineManager:");
    console.log(engineManager.toJSON());

    this.assert(
      engineManager.isInitialized() === false,
      "EngineManager debe iniciar sin inicializar."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: engineManager.isInitialized(),
      status: engineManager.getStatus(),
    });

    engineManager
      .setBootstrap(bootstrap)
      .setKernel(kernel)
      .setRuntime(runtime)
      .setMonitor(monitor)
      .setRegistry(registry)
      .setContext(context);

    console.log("4. Asignar dependencias:");
    console.log(engineManager.getStatus());

    const statusWithDependencies =
      engineManager.getStatus();

    this.assert(
      statusWithDependencies.bootstrap === true &&
        statusWithDependencies.kernel === true &&
        statusWithDependencies.runtime === true &&
        statusWithDependencies.monitor === true &&
        statusWithDependencies.registry === true &&
        statusWithDependencies.context === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const initialized =
      engineManager.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );

    console.log("6. Ejecutar initialize():");
    console.log(initialized);

    const initializedStatus =
      engineManager.getStatus();

    this.assert(
      engineManager.isInitialized() === true,
      "EngineManager debe quedar inicializado."
    );

    console.log("7. Verificar isInitialized() y getStatus():");
    console.log({
      initialized: engineManager.isInitialized(),
      status: initializedStatus,
    });

    const restarted =
      engineManager.restart();

    this.assert(
      restarted === true,
      "restart() debe devolver true."
    );

    console.log("8. Ejecutar restart():");
    console.log(restarted);

    const restartedStatus =
      engineManager.getStatus();

    this.assert(
      engineManager.isInitialized() === true,
      "EngineManager debe seguir inicializado tras restart."
    );

    console.log("9. Verificar isInitialized() y getStatus():");
    console.log({
      initialized: engineManager.isInitialized(),
      status: restartedStatus,
    });

    const engineManagerJSON =
      engineManager.toJSON();

    console.log("10. Serializar utilizando toJSON():");
    console.log(engineManagerJSON);

    const events = [
      EngineManagerEvents.createEngineManagerInitializedEvent(initializedStatus),
      EngineManagerEvents.createEngineManagerShutdownEvent({
        initialized: false,
      }),
      EngineManagerEvents.createEngineManagerRestartedEvent(restartedStatus),
      EngineManagerEvents.createEngineManagerResetEvent(),
    ];

    console.log("11. Crear eventos utilizando EngineManagerEvents:");
    console.log(events);

    const shutdown =
      engineManager.shutdown();

    this.assert(
      shutdown === true,
      "shutdown() debe devolver true."
    );

    console.log("12. Ejecutar shutdown():");
    console.log(shutdown);

    this.assert(
      engineManager.isInitialized() === false,
      "EngineManager debe quedar sin inicializar."
    );

    console.log("13. Verificar isInitialized():");
    console.log(engineManager.isInitialized());

    engineManager.reset();

    console.log("14. Ejecutar reset():");
    console.log(engineManager.toJSON());

    const resetStatus =
      engineManager.getStatus();

    this.assert(
      engineManager.isInitialized() === false,
      "EngineManager debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetStatus.bootstrap === false &&
        resetStatus.kernel === false &&
        resetStatus.runtime === false &&
        resetStatus.monitor === false &&
        resetStatus.registry === false &&
        resetStatus.context === false,
      "Las dependencias deben quedar limpias tras reset."
    );

    console.log("15. Verificar nuevamente getStatus() e isInitialized():");
    console.log({
      status: resetStatus,
      initialized: engineManager.isInitialized(),
    });

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      initializedStatus,
      restartedStatus,
      engineManagerJSON,
      events,
      shutdown,
      resetStatus,
    });

    console.log("===== ENGINE MANAGER SANDBOX OK =====");
  }
}

new EngineManagerSandbox();

export default EngineManagerSandbox;
