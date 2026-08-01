import EngineCache from "./EngineCache";
import EngineCacheEvents from "./EngineCacheEvents";

class EngineCacheSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE CACHE SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const cache =
      new EngineCache();

    console.log("2. Crear una instancia de EngineCache:");
    console.log(cache.toJSON());

    this.assert(
      cache.isInitialized() === false,
      "EngineCache debe iniciar sin inicializar."
    );

    const initialJSON =
      cache.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.entries === 0 &&
        Object.keys(initialJSON.cache).length === 0,
      "EngineCache debe iniciar sin entradas."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: cache.isInitialized(),
      json: initialJSON,
    });

    cache.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(cache.getStatus());

    const initialized =
      cache.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      cache.isInitialized() === true,
      "EngineCache debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: cache.isInitialized(),
    });

    cache
      .set("player-1", { chips: 500 })
      .set("table-1", { players: 5 })
      .set("game-state", { running: true });

    console.log("6. Ejecutar set():");
    console.log(cache.toJSON());

    const playerCache =
      cache.get("player-1");
    const tableCache =
      cache.get("table-1");
    const gameStateCache =
      cache.get("game-state");

    this.assert(
      playerCache.chips === 500 &&
        tableCache.players === 5 &&
        gameStateCache.running === true,
      "get() debe devolver los valores registrados."
    );

    console.log("7. Ejecutar get():");
    console.log({
      playerCache,
      tableCache,
      gameStateCache,
    });

    const hasPlayer =
      cache.has("player-1");
    const hasUnknown =
      cache.has("unknown");

    this.assert(
      hasPlayer === true,
      "has(\"player-1\") debe devolver true."
    );
    this.assert(
      hasUnknown === false,
      "has(\"unknown\") debe devolver false."
    );

    console.log("8. Ejecutar has():");
    console.log({
      player: hasPlayer,
      unknown: hasUnknown,
    });

    const sizeAfterSet =
      cache.size();

    this.assert(
      sizeAfterSet === 3,
      "size() debe devolver 3."
    );

    console.log("9. Obtener size():");
    console.log(sizeAfterSet);

    const status =
      cache.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(status);

    const cacheJSON =
      cache.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(cacheJSON);

    const removedCache =
      cache.remove("table-1");

    this.assert(
      removedCache === true,
      "remove() debe devolver true."
    );
    this.assert(
      cache.size() === 2 &&
        cache.has("table-1") === false,
      "table-1 debe quedar removido."
    );

    console.log("12. Ejecutar remove(\"table-1\") y verificar size() y toJSON():");
    console.log({
      removedCache,
      size: cache.size(),
      json: cache.toJSON(),
    });

    const clearedCache =
      cache.clear();

    this.assert(
      clearedCache === true,
      "clear() debe devolver true."
    );
    this.assert(
      cache.size() === 0 &&
        Object.keys(cache.toJSON().cache).length === 0,
      "cache debe quedar vacio tras clear."
    );

    console.log("13. Ejecutar clear() y verificar size() y toJSON():");
    console.log({
      clearedCache,
      size: cache.size(),
      json: cache.toJSON(),
    });

    const events = [
      EngineCacheEvents.createEngineCacheInitializedEvent(),
      EngineCacheEvents.createEngineCacheEntrySetEvent(
        "player-1",
        { chips: 500 }
      ),
      EngineCacheEvents.createEngineCacheEntryRemovedEvent("table-1"),
      EngineCacheEvents.createEngineCacheClearedEvent(),
      EngineCacheEvents.createEngineCacheResetEvent(),
    ];

    console.log("14. Crear eventos utilizando EngineCacheEvents:");
    console.log(events);

    const reset =
      cache.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      cache.toJSON();

    this.assert(
      cache.isInitialized() === false,
      "EngineCache debe quedar sin inicializar tras reset."
    );
    this.assert(
      cache.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.entries === 0 &&
        Object.keys(resetJSON.cache).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("16. Verificar nuevamente isInitialized(), size() y toJSON():");
    console.log({
      initialized: cache.isInitialized(),
      size: cache.size(),
      json: resetJSON,
    });

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      playerCache,
      tableCache,
      gameStateCache,
      hasPlayer,
      hasUnknown,
      sizeAfterSet,
      status,
      cacheJSON,
      removedCache,
      clearedCache,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE CACHE SANDBOX OK =====");
  }
}

new EngineCacheSandbox();

export default EngineCacheSandbox;
