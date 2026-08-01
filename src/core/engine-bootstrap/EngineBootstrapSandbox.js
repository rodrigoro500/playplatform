import EngineBootstrap from "./EngineBootstrap";
import EngineBootstrapEvents from "./EngineBootstrapEvents";

class EngineBootstrapSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE BOOTSTRAP SANDBOX =====");

    const registry = {};
    const context = {};
    const configurationManager = {};
    const lifecycleManager = {};

    console.log("1. Crear instancias simuladas:");
    console.log({
      registry,
      context,
      configurationManager,
      lifecycleManager,
    });

    const engineBootstrap =
      new EngineBootstrap();

    console.log("2. Crear una instancia de EngineBootstrap:");
    console.log(engineBootstrap.toJSON());

    this.assert(
      engineBootstrap.isInitialized() === false,
      "EngineBootstrap debe iniciar sin inicializar."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: engineBootstrap.isInitialized(),
      status: engineBootstrap.getStatus(),
    });

    engineBootstrap
      .setRegistry(registry)
      .setContext(context)
      .setConfigurationManager(configurationManager)
      .setLifecycleManager(lifecycleManager);

    console.log("4. Asignar dependencias:");
    console.log(engineBootstrap.getStatus());

    const statusWithDependencies =
      engineBootstrap.getStatus();

    this.assert(
      statusWithDependencies.registry === true &&
        statusWithDependencies.context === true &&
        statusWithDependencies.configurationManager === true &&
        statusWithDependencies.lifecycleManager === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const initialized =
      engineBootstrap.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );

    console.log("6. Ejecutar initialize():");
    console.log(initialized);

    this.assert(
      engineBootstrap.isInitialized() === true,
      "EngineBootstrap debe quedar inicializado."
    );

    const initializedStatus =
      engineBootstrap.getStatus();

    console.log("7. Verificar isInitialized() y getStatus():");
    console.log({
      initialized: engineBootstrap.isInitialized(),
      status: initializedStatus,
    });

    const engineBootstrapJSON =
      engineBootstrap.toJSON();

    console.log("8. Serializar utilizando toJSON():");
    console.log(engineBootstrapJSON);

    const events = [
      EngineBootstrapEvents.createEngineBootstrapInitializedEvent(
        initializedStatus
      ),
      EngineBootstrapEvents.createEngineBootstrapShutdownEvent(),
      EngineBootstrapEvents.createEngineBootstrapResetEvent(),
      EngineBootstrapEvents.createEngineBootstrapDependencySetEvent(
        "registry",
        true
      ),
    ];

    console.log("9. Crear eventos utilizando EngineBootstrapEvents:");
    console.log(events);

    const shutdown =
      engineBootstrap.shutdown();

    this.assert(
      shutdown === true,
      "shutdown() debe devolver true."
    );

    console.log("10. Ejecutar shutdown():");
    console.log(shutdown);

    this.assert(
      engineBootstrap.isInitialized() === false,
      "EngineBootstrap debe quedar apagado."
    );

    console.log("11. Verificar isInitialized():");
    console.log(engineBootstrap.isInitialized());

    engineBootstrap.reset();

    console.log("12. Ejecutar reset():");
    console.log(engineBootstrap.toJSON());

    const resetStatus =
      engineBootstrap.getStatus();

    this.assert(
      engineBootstrap.isInitialized() === false,
      "EngineBootstrap debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetStatus.registry === false &&
        resetStatus.context === false &&
        resetStatus.configurationManager === false &&
        resetStatus.lifecycleManager === false,
      "Las dependencias deben quedar limpias tras reset."
    );

    console.log("13. Verificar nuevamente getStatus() e isInitialized():");
    console.log({
      status: resetStatus,
      initialized: engineBootstrap.isInitialized(),
    });

    console.log("14. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      initializedStatus,
      engineBootstrapJSON,
      events,
      shutdown,
      resetStatus,
    });

    console.log("===== ENGINE BOOTSTRAP SANDBOX OK =====");
  }
}

new EngineBootstrapSandbox();

export default EngineBootstrapSandbox;
