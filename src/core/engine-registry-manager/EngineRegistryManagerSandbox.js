import EngineRegistryManager from "./EngineRegistryManager";
import EngineRegistryManagerEvents from "./EngineRegistryManagerEvents";

class EngineRegistryManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE REGISTRY MANAGER SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const registryManager =
      new EngineRegistryManager();

    console.log("2. Crear una instancia de EngineRegistryManager:");
    console.log(registryManager.toJSON());

    this.assert(
      registryManager.isInitialized() === false,
      "EngineRegistryManager debe iniciar sin inicializar."
    );

    const initialJSON =
      registryManager.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.resources === 0 &&
        Object.keys(initialJSON.registry).length === 0,
      "EngineRegistryManager debe iniciar sin recursos."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: registryManager.isInitialized(),
      json: initialJSON,
    });

    registryManager.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(registryManager.getStatus());

    const initialized =
      registryManager.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      registryManager.isInitialized() === true,
      "EngineRegistryManager debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: registryManager.isInitialized(),
    });

    registryManager
      .register("wallet", { id: 1 })
      .register("table", { id: 2 })
      .register("player", { id: 3 });

    console.log("6. Ejecutar register():");
    console.log(registryManager.getAll());

    const wallet =
      registryManager.get("wallet");
    const table =
      registryManager.get("table");
    const player =
      registryManager.get("player");

    this.assert(
      wallet.id === 1 &&
        table.id === 2 &&
        player.id === 3,
      "get() debe devolver los recursos registrados."
    );

    console.log("7. Ejecutar get():");
    console.log({
      wallet,
      table,
      player,
    });

    const hasWallet =
      registryManager.has("wallet");
    const hasUnknown =
      registryManager.has("unknown");

    this.assert(
      hasWallet === true,
      "has(\"wallet\") debe devolver true."
    );
    this.assert(
      hasUnknown === false,
      "has(\"unknown\") debe devolver false."
    );

    console.log("8. Ejecutar has():");
    console.log({
      wallet: hasWallet,
      unknown: hasUnknown,
    });

    const sizeAfterRegister =
      registryManager.size();

    this.assert(
      sizeAfterRegister === 3,
      "size() debe devolver 3."
    );

    console.log("9. Obtener size():");
    console.log(sizeAfterRegister);

    const allResources =
      registryManager.getAll();

    console.log("10. Obtener getAll():");
    console.log(allResources);

    const status =
      registryManager.getStatus();

    console.log("11. Obtener getStatus():");
    console.log(status);

    const registryManagerJSON =
      registryManager.toJSON();

    console.log("12. Serializar utilizando toJSON():");
    console.log(registryManagerJSON);

    const unregistered =
      registryManager.unregister("table");

    this.assert(
      unregistered === true,
      "unregister() debe devolver true."
    );
    this.assert(
      registryManager.size() === 2 &&
        registryManager.has("table") === false,
      "table debe quedar removido del registro."
    );

    console.log("13. Ejecutar unregister(\"table\") y verificar size() y getAll():");
    console.log({
      unregistered,
      size: registryManager.size(),
      registry: registryManager.getAll(),
    });

    const cleared =
      registryManager.clear();

    this.assert(
      cleared === true,
      "clear() debe devolver true."
    );
    this.assert(
      registryManager.size() === 0 &&
        Object.keys(registryManager.getAll()).length === 0,
      "registry debe quedar vacio tras clear."
    );

    console.log("14. Ejecutar clear() y verificar size() y getAll():");
    console.log({
      cleared,
      size: registryManager.size(),
      registry: registryManager.getAll(),
    });

    const events = [
      EngineRegistryManagerEvents.createEngineRegistryManagerInitializedEvent(),
      EngineRegistryManagerEvents.createEngineResourceRegisteredEvent(
        "wallet",
        { id: 1 }
      ),
      EngineRegistryManagerEvents.createEngineResourceUnregisteredEvent("table"),
      EngineRegistryManagerEvents.createEngineRegistryClearedEvent(),
      EngineRegistryManagerEvents.createEngineRegistryManagerResetEvent(),
    ];

    console.log("15. Crear eventos utilizando EngineRegistryManagerEvents:");
    console.log(events);

    const reset =
      registryManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("16. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      registryManager.toJSON();

    this.assert(
      registryManager.isInitialized() === false,
      "EngineRegistryManager debe quedar sin inicializar tras reset."
    );
    this.assert(
      registryManager.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      Object.keys(registryManager.getAll()).length === 0,
      "getAll() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.resources === 0 &&
        Object.keys(resetJSON.registry).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("17. Verificar nuevamente isInitialized(), size(), getAll() y toJSON():");
    console.log({
      initialized: registryManager.isInitialized(),
      size: registryManager.size(),
      registry: registryManager.getAll(),
      json: resetJSON,
    });

    console.log("18. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      wallet,
      table,
      player,
      hasWallet,
      hasUnknown,
      sizeAfterRegister,
      allResources,
      status,
      registryManagerJSON,
      unregistered,
      cleared,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE REGISTRY MANAGER SANDBOX OK =====");
  }
}

new EngineRegistryManagerSandbox();

export default EngineRegistryManagerSandbox;
