import EngineConfiguration from "./EngineConfiguration";
import EngineConfigurationEvents from "./EngineConfigurationEvents";

class EngineConfigurationSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE CONFIGURATION SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const configuration =
      new EngineConfiguration();

    console.log("2. Crear una instancia de EngineConfiguration:");
    console.log(configuration.toJSON());

    this.assert(
      configuration.isInitialized() === false,
      "EngineConfiguration debe iniciar sin inicializar."
    );

    const initialJSON =
      configuration.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        Object.keys(initialJSON.configuration).length === 0,
      "EngineConfiguration debe iniciar sin configuraciones."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: configuration.isInitialized(),
      json: initialJSON,
    });

    configuration.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(configuration.getStatus());

    const initialized =
      configuration.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      configuration.isInitialized() === true,
      "EngineConfiguration debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: configuration.isInitialized(),
    });

    configuration
      .set("maxPlayers", 8)
      .set("minPlayers", 2)
      .set("environment", "development");

    console.log("6. Ejecutar set():");
    console.log(configuration.getAll());

    const maxPlayers =
      configuration.get("maxPlayers");
    const minPlayers =
      configuration.get("minPlayers");
    const environment =
      configuration.get("environment");

    this.assert(
      maxPlayers === 8 &&
        minPlayers === 2 &&
        environment === "development",
      "get() debe devolver los valores registrados."
    );

    console.log("7. Ejecutar get():");
    console.log({
      maxPlayers,
      minPlayers,
      environment,
    });

    const hasMaxPlayers =
      configuration.has("maxPlayers");
    const hasUnknown =
      configuration.has("unknown");

    this.assert(
      hasMaxPlayers === true,
      "has(\"maxPlayers\") debe devolver true."
    );
    this.assert(
      hasUnknown === false,
      "has(\"unknown\") debe devolver false."
    );

    console.log("8. Ejecutar has():");
    console.log({
      maxPlayers: hasMaxPlayers,
      unknown: hasUnknown,
    });

    const allConfiguration =
      configuration.getAll();

    console.log("9. Obtener getAll():");
    console.log(allConfiguration);

    const status =
      configuration.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(status);

    const configurationJSON =
      configuration.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(configurationJSON);

    const removedConfiguration =
      configuration.remove("minPlayers");

    this.assert(
      removedConfiguration === true,
      "remove() debe devolver true."
    );
    this.assert(
      configuration.has("minPlayers") === false,
      "minPlayers debe quedar removido."
    );

    console.log("12. Ejecutar remove(\"minPlayers\") y verificar getAll():");
    console.log({
      removedConfiguration,
      configuration: configuration.getAll(),
    });

    const clearedConfiguration =
      configuration.clear();

    this.assert(
      clearedConfiguration === true,
      "clear() debe devolver true."
    );
    this.assert(
      Object.keys(configuration.getAll()).length === 0,
      "getAll() debe quedar vacio tras clear."
    );

    console.log("13. Ejecutar clear() y verificar getAll():");
    console.log({
      clearedConfiguration,
      configuration: configuration.getAll(),
    });

    const events = [
      EngineConfigurationEvents.createEngineConfigurationInitializedEvent(),
      EngineConfigurationEvents.createEngineConfigurationSetEvent("maxPlayers", 8),
      EngineConfigurationEvents.createEngineConfigurationRemovedEvent("minPlayers"),
      EngineConfigurationEvents.createEngineConfigurationClearedEvent(),
      EngineConfigurationEvents.createEngineConfigurationResetEvent(),
    ];

    console.log("14. Crear eventos utilizando EngineConfigurationEvents:");
    console.log(events);

    const reset =
      configuration.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      configuration.toJSON();

    this.assert(
      configuration.isInitialized() === false,
      "EngineConfiguration debe quedar sin inicializar tras reset."
    );
    this.assert(
      Object.keys(configuration.getAll()).length === 0,
      "getAll() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        Object.keys(resetJSON.configuration).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("16. Verificar nuevamente isInitialized(), getAll() y toJSON():");
    console.log({
      initialized: configuration.isInitialized(),
      configuration: configuration.getAll(),
      json: resetJSON,
    });

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      maxPlayers,
      minPlayers,
      environment,
      hasMaxPlayers,
      hasUnknown,
      allConfiguration,
      status,
      configurationJSON,
      removedConfiguration,
      clearedConfiguration,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE CONFIGURATION SANDBOX OK =====");
  }
}

new EngineConfigurationSandbox();

export default EngineConfigurationSandbox;
