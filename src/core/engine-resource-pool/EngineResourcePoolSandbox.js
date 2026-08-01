import EngineResourcePool from "./EngineResourcePool";
import EngineResourcePoolEvents from "./EngineResourcePoolEvents";

class EngineResourcePoolSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE RESOURCE POOL SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const resourcePool =
      new EngineResourcePool();

    console.log("2. Crear una instancia de EngineResourcePool:");
    console.log(resourcePool.toJSON());

    this.assert(
      resourcePool.isInitialized() === false,
      "EngineResourcePool debe iniciar sin inicializar."
    );

    const initialJSON =
      resourcePool.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.resources === 0 &&
        Object.keys(initialJSON.pool).length === 0,
      "EngineResourcePool debe iniciar sin recursos."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: resourcePool.isInitialized(),
      json: initialJSON,
    });

    resourcePool.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(resourcePool.getStatus());

    const initialized =
      resourcePool.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      resourcePool.isInitialized() === true,
      "EngineResourcePool debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: resourcePool.isInitialized(),
    });

    resourcePool
      .registerResource("wallet", { id: 1 })
      .registerResource("table", { id: 2 })
      .registerResource("player", { id: 3 });

    console.log("6. Ejecutar registerResource():");
    console.log(resourcePool.getAll());

    const wallet =
      resourcePool.acquireResource("wallet");
    const table =
      resourcePool.acquireResource("table");
    const player =
      resourcePool.acquireResource("player");

    this.assert(
      wallet.id === 1 &&
        table.id === 2 &&
        player.id === 3,
      "acquireResource() debe devolver los recursos registrados."
    );

    console.log("7. Ejecutar acquireResource():");
    console.log({
      wallet,
      table,
      player,
    });

    const hasWallet =
      resourcePool.hasResource("wallet");
    const hasUnknown =
      resourcePool.hasResource("unknown");

    this.assert(
      hasWallet === true,
      "hasResource(\"wallet\") debe devolver true."
    );
    this.assert(
      hasUnknown === false,
      "hasResource(\"unknown\") debe devolver false."
    );

    console.log("8. Ejecutar hasResource():");
    console.log({
      wallet: hasWallet,
      unknown: hasUnknown,
    });

    const sizeAfterRegister =
      resourcePool.size();

    this.assert(
      sizeAfterRegister === 3,
      "size() debe devolver 3."
    );

    console.log("9. Obtener size():");
    console.log(sizeAfterRegister);

    const allResources =
      resourcePool.getAll();

    console.log("10. Obtener getAll():");
    console.log(allResources);

    const status =
      resourcePool.getStatus();

    console.log("11. Obtener getStatus():");
    console.log(status);

    const resourcePoolJSON =
      resourcePool.toJSON();

    console.log("12. Serializar utilizando toJSON():");
    console.log(resourcePoolJSON);

    const released =
      resourcePool.releaseResource("wallet");

    this.assert(
      released === true,
      "releaseResource(\"wallet\") debe devolver true."
    );

    console.log("13. Ejecutar releaseResource(\"wallet\"):");
    console.log(released);

    const removed =
      resourcePool.removeResource("table");

    this.assert(
      removed === true,
      "removeResource(\"table\") debe devolver true."
    );
    this.assert(
      resourcePool.size() === 2 &&
        resourcePool.hasResource("table") === false,
      "table debe quedar removido del pool."
    );

    console.log("14. Ejecutar removeResource(\"table\") y verificar size() y getAll():");
    console.log({
      removed,
      size: resourcePool.size(),
      resources: resourcePool.getAll(),
    });

    const cleared =
      resourcePool.clear();

    this.assert(
      cleared === true,
      "clear() debe devolver true."
    );
    this.assert(
      resourcePool.size() === 0 &&
        Object.keys(resourcePool.getAll()).length === 0,
      "resources debe quedar vacio tras clear."
    );

    console.log("15. Ejecutar clear() y verificar size() y getAll():");
    console.log({
      cleared,
      size: resourcePool.size(),
      resources: resourcePool.getAll(),
    });

    const events = [
      EngineResourcePoolEvents.createEngineResourcePoolInitializedEvent(),
      EngineResourcePoolEvents.createEngineResourceRegisteredEvent(
        "wallet",
        { id: 1 }
      ),
      EngineResourcePoolEvents.createEngineResourceAcquiredEvent(
        "wallet",
        wallet
      ),
      EngineResourcePoolEvents.createEngineResourceReleasedEvent("wallet"),
      EngineResourcePoolEvents.createEngineResourceRemovedEvent("table"),
      EngineResourcePoolEvents.createEngineResourcePoolClearedEvent(),
      EngineResourcePoolEvents.createEngineResourcePoolResetEvent(),
    ];

    console.log("16. Crear eventos utilizando EngineResourcePoolEvents:");
    console.log(events);

    const reset =
      resourcePool.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("17. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      resourcePool.toJSON();

    this.assert(
      resourcePool.isInitialized() === false,
      "EngineResourcePool debe quedar sin inicializar tras reset."
    );
    this.assert(
      resourcePool.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      Object.keys(resourcePool.getAll()).length === 0,
      "getAll() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.resources === 0 &&
        Object.keys(resetJSON.pool).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("18. Verificar nuevamente isInitialized(), size(), getAll() y toJSON():");
    console.log({
      initialized: resourcePool.isInitialized(),
      size: resourcePool.size(),
      resources: resourcePool.getAll(),
      json: resetJSON,
    });

    console.log("19. Mostrar todos los resultados por consola:");
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
      resourcePoolJSON,
      released,
      removed,
      cleared,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE RESOURCE POOL SANDBOX OK =====");
  }
}

new EngineResourcePoolSandbox();

export default EngineResourcePoolSandbox;
