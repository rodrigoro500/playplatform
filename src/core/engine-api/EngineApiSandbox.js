import EngineApi from "./EngineApi";
import EngineApiEvents from "./EngineApiEvents";

class EngineApiSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE API SANDBOX =====");

    const facade = {
      getStatus() {
        return {
          initialized: true,
          manager: true,
          healthManager: true,
          recoveryManager: true,
        };
      },

      getHealthStatus() {
        return {
          healthy: true,
          manager: true,
        };
      },

      recover() {
        return {
          success: true,
          timestamp: new Date().toISOString(),
        };
      },
    };

    console.log("1. Crear un EngineFacade simulado:");
    console.log(facade);

    const versionManager = {
      getCurrentVersion() {
        return "1.0.0";
      },
    };

    console.log("2. Crear un EngineVersionManager simulado:");
    console.log(versionManager);

    const api =
      new EngineApi();

    console.log("3. Crear una instancia de EngineApi:");
    console.log(api.toJSON());

    this.assert(
      api.isInitialized() === false,
      "EngineApi debe iniciar sin inicializar."
    );

    const initialJSON =
      api.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.status === null &&
        initialJSON.version === null,
      "EngineApi debe iniciar sin facade ni versionManager."
    );

    console.log("4. Verificar estado inicial:");
    console.log({
      initialized: api.isInitialized(),
      json: initialJSON,
    });

    api.setFacade(facade);

    console.log("5. Ejecutar setFacade():");
    console.log(api.toJSON());

    api.setVersionManager(versionManager);

    console.log("6. Ejecutar setVersionManager():");
    console.log(api.toJSON());

    const initialized =
      api.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      api.isInitialized() === true,
      "EngineApi debe quedar inicializado."
    );

    console.log("7. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: api.isInitialized(),
    });

    const status =
      api.getStatus();

    this.assert(
      status.initialized === true &&
        status.manager === true,
      "getStatus() debe delegar en facade.getStatus()."
    );

    console.log("8. Ejecutar getStatus():");
    console.log(status);

    const health =
      api.getHealth();

    this.assert(
      health.healthy === true,
      "getHealth() debe delegar en facade.getHealthStatus()."
    );

    console.log("9. Ejecutar getHealth():");
    console.log(health);

    const recovery =
      api.recover();

    this.assert(
      recovery.success === true,
      "recover() debe delegar en facade.recover()."
    );

    console.log("10. Ejecutar recover():");
    console.log(recovery);

    const version =
      api.getVersion();

    this.assert(
      version === "1.0.0",
      "getVersion() debe devolver 1.0.0."
    );

    console.log("11. Ejecutar getVersion():");
    console.log(version);

    const finalStatus =
      api.getStatus();

    console.log("12. Obtener getStatus():");
    console.log(finalStatus);

    const apiJSON =
      api.toJSON();

    console.log("13. Serializar utilizando toJSON():");
    console.log(apiJSON);

    const events = [
      EngineApiEvents.createEngineApiInitializedEvent(),
      EngineApiEvents.createEngineApiResetEvent(),
      EngineApiEvents.createEngineApiStatusRequestedEvent(),
      EngineApiEvents.createEngineApiHealthRequestedEvent(),
      EngineApiEvents.createEngineApiVersionRequestedEvent(),
      EngineApiEvents.createEngineApiRecoveryRequestedEvent(),
    ];

    console.log("14. Crear eventos utilizando EngineApiEvents:");
    console.log(events);

    const reset =
      api.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      api.toJSON();

    this.assert(
      api.isInitialized() === false,
      "EngineApi debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.status === null &&
        resetJSON.version === null,
      "EngineApi debe limpiar facade y versionManager tras reset."
    );

    console.log("16. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: api.isInitialized(),
      json: resetJSON,
    });

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      status,
      health,
      recovery,
      version,
      finalStatus,
      apiJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE API SANDBOX OK =====");
  }
}

new EngineApiSandbox();

export default EngineApiSandbox;
