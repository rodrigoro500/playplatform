import EngineContext from "./EngineContext";
import EngineContextEvents from "./EngineContextEvents";

class EngineContextSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE CONTEXT SANDBOX =====");

    const engineContext =
      new EngineContext();

    console.log("1. Crear una instancia de EngineContext:");
    console.log(engineContext.toJSON());

    const engineName =
      engineContext.set(
        "engineName",
        "PlayPlatform",
        {
          scope: "engine",
        }
      );

    const engineVersion =
      engineContext.set(
        "engineVersion",
        "1.0.0",
        {
          scope: "engine",
        }
      );

    const currentGame =
      engineContext.set(
        "currentGame",
        "game1",
        {
          scope: "game",
        }
      );

    const currentTable =
      engineContext.set(
        "currentTable",
        "table1",
        {
          scope: "table",
        }
      );

    const currentRound =
      engineContext.set(
        "currentRound",
        "round1",
        {
          scope: "round",
        }
      );

    const currentPlayer =
      engineContext.set(
        "currentPlayer",
        "player1",
        {
          scope: "player",
        }
      );

    const currentTurn =
      engineContext.set(
        "currentTurn",
        "turn1",
        {
          scope: "turn",
        }
      );

    console.log("2. Registrar las entradas:");
    console.log([
      engineName,
      engineVersion,
      currentGame,
      currentTable,
      currentRound,
      currentPlayer,
      currentTurn,
    ]);

    this.assert(
      engineContext.has("engineName") === true,
      "engineName debe existir."
    );
    this.assert(
      engineContext.get("engineName") === "PlayPlatform",
      "engineName debe ser PlayPlatform."
    );

    console.log("3. Verificar has() y get():");
    console.log({
      hasEngineName: engineContext.has("engineName"),
      engineName: engineContext.get("engineName"),
    });

    const currentGameMetadata =
      engineContext.getMetadata("currentGame");

    console.log("4. Obtener getMetadata():");
    console.log(currentGameMetadata);

    const keys =
      engineContext.getKeys();

    const values =
      engineContext.getValues();

    const entries =
      engineContext.getEntries();

    const context =
      engineContext.getContext();

    console.log("5. Obtener keys, values, entries y context:");
    console.log({
      keys,
      values,
      entries,
      context,
    });

    const updatedCurrentRound =
      engineContext.update(
        "currentRound",
        "round2"
      );

    const updatedCurrentTurn =
      engineContext.update(
        "currentTurn",
        "turn2"
      );

    console.log("6. Actualizar currentRound y currentTurn:");
    console.log({
      updatedCurrentRound,
      updatedCurrentTurn,
    });

    const updatedCurrentGameMetadata =
      engineContext.updateMetadata(
        "currentGame",
        {
          active: true,
        }
      );

    const updatedCurrentTableMetadata =
      engineContext.updateMetadata(
        "currentTable",
        {
          active: true,
        }
      );

    console.log("7. Actualizar metadata:");
    console.log({
      updatedCurrentGameMetadata,
      updatedCurrentTableMetadata,
    });

    this.assert(
      engineContext.get("currentRound") === "round2",
      "currentRound debe actualizarse a round2."
    );
    this.assert(
      engineContext.getMetadata("currentGame").active === true,
      "currentGame metadata debe incluir active."
    );

    console.log("8. Verificar nuevamente get() y getMetadata():");
    console.log({
      currentRound: engineContext.get("currentRound"),
      currentTurn: engineContext.get("currentTurn"),
      currentGameMetadata: engineContext.getMetadata("currentGame"),
      currentTableMetadata: engineContext.getMetadata("currentTable"),
    });

    const count =
      engineContext.count();

    this.assert(
      count === 7,
      "Deben existir siete entradas de contexto."
    );

    console.log("9. Obtener count():");
    console.log(count);

    const engineContextJSON =
      engineContext.toJSON();

    console.log("10. Serializar utilizando toJSON():");
    console.log(engineContextJSON);

    const events = [
      EngineContextEvents.createContextEntryCreatedEvent(engineName),
      EngineContextEvents.createContextEntryUpdatedEvent(updatedCurrentRound),
      EngineContextEvents.createContextEntryRemovedEvent("currentPlayer"),
      EngineContextEvents.createContextMetadataUpdatedEvent(
        "currentGame",
        {
          active: true,
        }
      ),
      EngineContextEvents.createEngineContextClearedEvent(),
    ];

    console.log("11. Crear eventos utilizando EngineContextEvents:");
    console.log(events);

    const removedEntry =
      engineContext.remove("currentPlayer");

    this.assert(
      removedEntry.key === "currentPlayer",
      "currentPlayer debe eliminarse correctamente."
    );

    console.log("12. Eliminar currentPlayer:");
    console.log(removedEntry);

    const countAfterRemove =
      engineContext.count();

    this.assert(
      countAfterRemove === 6,
      "Deben quedar seis entradas de contexto."
    );

    console.log("13. Verificar count():");
    console.log(countAfterRemove);

    engineContext.clear();

    console.log("14. Ejecutar clear():");
    console.log(engineContext.toJSON());

    this.assert(
      engineContext.count() === 0,
      "EngineContext debe quedar sin entradas."
    );

    console.log("15. Verificar que count() sea 0:");
    console.log(engineContext.count());

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      keys,
      values,
      entries,
      context,
      updatedCurrentRound,
      updatedCurrentTurn,
      updatedCurrentGameMetadata,
      updatedCurrentTableMetadata,
      count,
      engineContextJSON,
      events,
      removedEntry,
      countAfterRemove,
      finalCount: engineContext.count(),
    });

    console.log("===== ENGINE CONTEXT SANDBOX OK =====");
  }
}

new EngineContextSandbox();

export default EngineContextSandbox;
