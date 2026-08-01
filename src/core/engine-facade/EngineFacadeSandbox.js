import EngineFacade from "./EngineFacade";
import EngineFacadeEvents from "./EngineFacadeEvents";

class EngineFacadeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE FACADE SANDBOX =====");

    const manager = {};
    const healthManager = {
      getStatus() {
        return {
          healthy: true,
          manager: true,
        };
      },
    };
    const recoveryManager = {
      recover() {
        return {
          success: true,
          timestamp: new Date().toISOString(),
        };
      },
    };

    console.log("1. Crear objetos simulados:");
    console.log({
      manager,
      healthManager,
      recoveryManager,
    });

    const engineFacade =
      new EngineFacade();

    console.log("2. Crear una instancia de EngineFacade:");
    console.log(engineFacade.toJSON());

    this.assert(
      engineFacade.isInitialized() === false,
      "EngineFacade debe iniciar sin inicializar."
    );

    const initialStatus =
      engineFacade.getStatus();

    this.assert(
      initialStatus.manager === false &&
        initialStatus.healthManager === false &&
        initialStatus.recoveryManager === false,
      "EngineFacade debe iniciar sin dependencias."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: engineFacade.isInitialized(),
      status: initialStatus,
    });

    engineFacade
      .setManager(manager)
      .setHealthManager(healthManager)
      .setRecoveryManager(recoveryManager);

    const statusWithDependencies =
      engineFacade.getStatus();

    this.assert(
      statusWithDependencies.manager === true &&
        statusWithDependencies.healthManager === true &&
        statusWithDependencies.recoveryManager === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("4. Asignar dependencias:");
    console.log(statusWithDependencies);

    const initialized =
      engineFacade.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );

    console.log("5. Ejecutar initialize():");
    console.log(initialized);

    this.assert(
      engineFacade.isInitialized() === true,
      "EngineFacade debe quedar inicializado."
    );

    console.log("6. Verificar isInitialized():");
    console.log(engineFacade.isInitialized());

    const facadeDependencies = {
      manager: engineFacade.getManager(),
      healthManager: engineFacade.getHealthManager(),
      recoveryManager: engineFacade.getRecoveryManager(),
    };

    this.assert(
      facadeDependencies.manager === manager &&
        facadeDependencies.healthManager === healthManager &&
        facadeDependencies.recoveryManager === recoveryManager,
      "Los getters deben devolver las dependencias asignadas."
    );

    console.log("7. Obtener dependencias:");
    console.log(facadeDependencies);

    const healthStatus =
      engineFacade.getHealthStatus();

    this.assert(
      healthStatus.healthy === true &&
        healthStatus.manager === true,
      "getHealthStatus() debe devolver el estado del HealthManager."
    );

    console.log("8. Ejecutar getHealthStatus():");
    console.log(healthStatus);

    const recovery =
      engineFacade.recover();

    this.assert(
      recovery.success === true,
      "recover() debe devolver el resultado del RecoveryManager."
    );

    console.log("9. Ejecutar recover():");
    console.log(recovery);

    const initializedStatus =
      engineFacade.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(initializedStatus);

    const engineFacadeJSON =
      engineFacade.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(engineFacadeJSON);

    const events = [
      EngineFacadeEvents.createEngineFacadeInitializedEvent(),
      EngineFacadeEvents.createEngineFacadeResetEvent(),
      EngineFacadeEvents.createEngineFacadeHealthRequestedEvent(healthStatus),
      EngineFacadeEvents.createEngineFacadeRecoveryRequestedEvent(recovery),
    ];

    console.log("12. Crear eventos utilizando EngineFacadeEvents:");
    console.log(events);

    const reset =
      engineFacade.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("13. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      engineFacade.getStatus();

    this.assert(
      engineFacade.isInitialized() === false,
      "EngineFacade debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetStatus.manager === false &&
        resetStatus.healthManager === false &&
        resetStatus.recoveryManager === false,
      "Las dependencias deben quedar limpias tras reset."
    );

    console.log("14. Verificar nuevamente isInitialized() y getStatus():");
    console.log({
      initialized: engineFacade.isInitialized(),
      status: resetStatus,
    });

    console.log("15. Mostrar todos los resultados por consola:");
    console.log({
      initialStatus,
      statusWithDependencies,
      initialized,
      facadeDependencies,
      healthStatus,
      recovery,
      initializedStatus,
      engineFacadeJSON,
      events,
      reset,
      resetStatus,
    });

    console.log("===== ENGINE FACADE SANDBOX OK =====");
  }
}

new EngineFacadeSandbox();

export default EngineFacadeSandbox;
