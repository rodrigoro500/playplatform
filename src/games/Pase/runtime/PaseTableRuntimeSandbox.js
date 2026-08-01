import PaseTableRuntime from "./PaseTableRuntime";
import PaseTableRuntimeEvents from "./PaseTableRuntimeEvents";

class PaseTableRuntimeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createTable() {
    return {
      getPlayers() {
        return [
          { id: "P1" },
          { id: "P2" },
          { id: "P3" },
          { id: "P4" },
        ];
      },
    };
  }

  createMatchRuntime() {
    let running = false;

    return {
      startMatch() {
        running = true;

        return true;
      },

      playRound() {
        return {
          dice: [6, 1],
          total: 7,
          outcome: "PASE",
        };
      },

      finishMatch() {
        running = false;

        return true;
      },

      isRunning() {
        return running;
      },
    };
  }

  run() {
    console.log("===== PASE TABLE RUNTIME SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const table =
      this.createTable();
    console.log("2. Crear PaseTable simulada:");
    console.log(table.getPlayers());

    const matchRuntime =
      this.createMatchRuntime();
    console.log("3. Crear MatchRuntime simulado:");
    console.log({
      running: matchRuntime.isRunning(),
      sampleRound: matchRuntime.playRound(),
    });

    const runtime =
      new PaseTableRuntime();
    console.log("4. Crear PaseTableRuntime:");
    console.log(runtime.toJSON());

    runtime.setManager(manager);
    runtime.setTable(table);
    runtime.setMatchRuntime(matchRuntime);
    console.log("5. Configurar manager, table y matchRuntime:");
    console.log(runtime.toJSON());

    const initialized =
      runtime.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      runtime.isInitialized() === true,
      "PaseTableRuntime debe quedar inicializado."
    );
    console.log("6. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: runtime.isInitialized(),
    });

    const tableStarted =
      runtime.startTable();
    this.assert(
      tableStarted === true,
      "startTable() debe devolver true."
    );
    this.assert(
      matchRuntime.isRunning() === true,
      "startTable() debe iniciar el matchRuntime."
    );
    console.log("7. Ejecutar startTable():");
    console.log({
      tableStarted,
      running: matchRuntime.isRunning(),
    });

    const roundResult =
      runtime.play();
    this.assert(
      roundResult.total === 7 &&
        roundResult.outcome === "PASE",
      "play() debe devolver el resultado de matchRuntime.playRound()."
    );
    console.log("8. Ejecutar play():");
    console.log(roundResult);

    const players =
      runtime.getPlayers();
    const playerCount =
      runtime.getPlayerCount();
    const status =
      runtime.getStatus();
    const runtimeJSON =
      runtime.toJSON();
    this.assert(
      players.length === 4 &&
        playerCount === 4,
      "La mesa debe tener cuatro jugadores."
    );
    this.assert(
      status.initialized === true &&
        status.players === 4 &&
        status.running === true,
      "getStatus() debe reflejar mesa inicializada y match activo."
    );
    console.log("9. Consultar getPlayers(), getPlayerCount(), getStatus() y toJSON():");
    console.log({
      players,
      playerCount,
      status,
      json: runtimeJSON,
    });

    const events = [
      PaseTableRuntimeEvents.createPaseTableRuntimeInitializedEvent(),
      PaseTableRuntimeEvents.createPaseTableStartedEvent(),
      PaseTableRuntimeEvents.createPaseTableRoundPlayedEvent(roundResult),
      PaseTableRuntimeEvents.createPaseTableFinishedEvent(),
      PaseTableRuntimeEvents.createPaseTableRuntimeResetEvent(),
    ];
    console.log("10. Crear todos los eventos:");
    console.log(events);

    const tableFinished =
      runtime.finishTable();
    this.assert(
      tableFinished === true,
      "finishTable() debe devolver true."
    );
    this.assert(
      matchRuntime.isRunning() === false,
      "finishTable() debe detener el matchRuntime."
    );
    console.log("11. Ejecutar finishTable():");
    console.log({
      tableFinished,
      running: matchRuntime.isRunning(),
    });

    const reset =
      runtime.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("12. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      runtime.toJSON();
    this.assert(
      runtime.isInitialized() === false,
      "PaseTableRuntime debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasTable === false &&
        resetJSON.hasMatchRuntime === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("13. Verificar nuevamente isInitialized(), getPlayerCount() si corresponde y toJSON():");
    console.log({
      initialized: runtime.isInitialized(),
      playerCount: runtime.table ? runtime.getPlayerCount() : null,
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      tableStarted,
      roundResult,
      players,
      playerCount,
      status,
      runtimeJSON,
      events,
      tableFinished,
      reset,
      resetJSON,
    });

    console.log("===== PASE TABLE RUNTIME SANDBOX OK =====");
  }
}

new PaseTableRuntimeSandbox();

export default PaseTableRuntimeSandbox;
