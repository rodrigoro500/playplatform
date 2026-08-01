import EngineKernel from "./EngineKernel";
import EngineKernelEvents from "./EngineKernelEvents";

class EngineKernelSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE KERNEL SANDBOX =====");

    const bootstrap = {};
    const registry = {};
    const context = {};
    const configurationManager = {};
    const lifecycleManager = {};

    console.log("1. Crear instancias simuladas:");
    console.log({
      bootstrap,
      registry,
      context,
      configurationManager,
      lifecycleManager,
    });

    const engineKernel =
      new EngineKernel();

    console.log("2. Crear una instancia de EngineKernel:");
    console.log(engineKernel.toJSON());

    this.assert(
      engineKernel.isRunning() === false,
      "EngineKernel debe iniciar sin ejecutar."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      running: engineKernel.isRunning(),
      status: engineKernel.getStatus(),
    });

    engineKernel
      .setBootstrap(bootstrap)
      .setRegistry(registry)
      .setContext(context)
      .setConfigurationManager(configurationManager)
      .setLifecycleManager(lifecycleManager);

    console.log("4. Asignar dependencias:");
    console.log(engineKernel.getStatus());

    const statusWithDependencies =
      engineKernel.getStatus();

    this.assert(
      statusWithDependencies.bootstrap === true &&
        statusWithDependencies.registry === true &&
        statusWithDependencies.context === true &&
        statusWithDependencies.configurationManager === true &&
        statusWithDependencies.lifecycleManager === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const started =
      engineKernel.start();

    this.assert(
      started === true,
      "start() debe devolver true."
    );

    console.log("6. Ejecutar start():");
    console.log(started);

    this.assert(
      engineKernel.isRunning() === true,
      "EngineKernel debe quedar running."
    );

    const startedStatus =
      engineKernel.getStatus();

    console.log("7. Verificar isRunning() y getStatus():");
    console.log({
      running: engineKernel.isRunning(),
      status: startedStatus,
    });

    const restarted =
      engineKernel.restart();

    this.assert(
      restarted === true,
      "restart() debe devolver true."
    );

    console.log("8. Ejecutar restart():");
    console.log(restarted);

    const restartedStatus =
      engineKernel.getStatus();

    this.assert(
      engineKernel.isRunning() === true,
      "EngineKernel debe seguir running tras restart."
    );

    console.log("9. Verificar isRunning() y getStatus():");
    console.log({
      running: engineKernel.isRunning(),
      status: restartedStatus,
    });

    const engineKernelJSON =
      engineKernel.toJSON();

    console.log("10. Serializar utilizando toJSON():");
    console.log(engineKernelJSON);

    const events = [
      EngineKernelEvents.createEngineKernelStartedEvent(startedStatus),
      EngineKernelEvents.createEngineKernelStoppedEvent(),
      EngineKernelEvents.createEngineKernelRestartedEvent(restartedStatus),
      EngineKernelEvents.createEngineKernelResetEvent(),
      EngineKernelEvents.createEngineKernelDependencySetEvent(
        "bootstrap",
        true
      ),
    ];

    console.log("11. Crear eventos utilizando EngineKernelEvents:");
    console.log(events);

    const stopped =
      engineKernel.stop();

    this.assert(
      stopped === true,
      "stop() debe devolver true."
    );

    console.log("12. Ejecutar stop():");
    console.log(stopped);

    this.assert(
      engineKernel.isRunning() === false,
      "EngineKernel debe quedar detenido."
    );

    console.log("13. Verificar isRunning():");
    console.log(engineKernel.isRunning());

    engineKernel.reset();

    console.log("14. Ejecutar reset():");
    console.log(engineKernel.toJSON());

    const resetStatus =
      engineKernel.getStatus();

    this.assert(
      engineKernel.isRunning() === false,
      "EngineKernel debe quedar sin ejecutar tras reset."
    );
    this.assert(
      resetStatus.bootstrap === false &&
        resetStatus.registry === false &&
        resetStatus.context === false &&
        resetStatus.configurationManager === false &&
        resetStatus.lifecycleManager === false,
      "Las dependencias deben quedar limpias tras reset."
    );

    console.log("15. Verificar nuevamente getStatus() e isRunning():");
    console.log({
      status: resetStatus,
      running: engineKernel.isRunning(),
    });

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      startedStatus,
      restartedStatus,
      engineKernelJSON,
      events,
      stopped,
      resetStatus,
    });

    console.log("===== ENGINE KERNEL SANDBOX OK =====");
  }
}

new EngineKernelSandbox();

export default EngineKernelSandbox;
