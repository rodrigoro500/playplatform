import EngineGameSession from "./EngineGameSession";
import EngineGameSessionEvents from "./EngineGameSessionEvents";

class EngineGameSessionSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE GAME SESSION SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    let roundStarted = false;
    let roundFinished = false;
    const roundCoordinator = {
      startRound() {
        roundStarted = true;

        return true;
      },

      finishRound() {
        roundFinished = true;

        return true;
      },
    };
    console.log("2. Crear RoundCoordinator simulado:");
    console.log(roundCoordinator);

    const betCoordinator = {};
    console.log("3. Crear BetCoordinator simulado:");
    console.log(betCoordinator);

    const settlementCoordinator = {};
    console.log("4. Crear SettlementCoordinator simulado:");
    console.log(settlementCoordinator);

    const session =
      new EngineGameSession();
    console.log("5. Crear EngineGameSession:");
    console.log(session.toJSON());

    session.setManager(manager);
    session.setRoundCoordinator(roundCoordinator);
    session.setBetCoordinator(betCoordinator);
    session.setSettlementCoordinator(settlementCoordinator);
    console.log("6. Configurar manager, roundCoordinator, betCoordinator y settlementCoordinator:");
    console.log(session.toJSON());

    const initialized =
      session.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      session.isInitialized() === true,
      "EngineGameSession debe quedar inicializado."
    );
    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: session.isInitialized(),
    });

    const started =
      session.startSession();
    this.assert(
      started === true,
      "startSession() debe devolver true."
    );
    this.assert(
      session.isActive() === true,
      "EngineGameSession debe quedar activo."
    );
    this.assert(
      roundStarted === true,
      "startSession() debe delegar en roundCoordinator.startRound()."
    );
    console.log("8. Ejecutar startSession():");
    console.log({
      started,
      roundStarted,
    });

    const statusAfterStart =
      session.getStatus();
    this.assert(
      statusAfterStart.active === true &&
        statusAfterStart.initialized === true,
      "getStatus() debe reflejar la sesion activa."
    );
    console.log("9. Verificar isActive() y getStatus():");
    console.log({
      active: session.isActive(),
      status: statusAfterStart,
    });

    const finished =
      session.finishSession();
    this.assert(
      finished === true,
      "finishSession() debe devolver true."
    );
    this.assert(
      session.isActive() === false,
      "EngineGameSession debe quedar inactivo."
    );
    this.assert(
      roundFinished === true,
      "finishSession() debe delegar en roundCoordinator.finishRound()."
    );
    console.log("10. Ejecutar finishSession():");
    console.log({
      finished,
      roundFinished,
    });

    const statusAfterFinish =
      session.getStatus();
    this.assert(
      statusAfterFinish.active === false &&
        statusAfterFinish.initialized === true,
      "getStatus() debe reflejar la sesion inactiva."
    );
    console.log("11. Verificar isActive() y getStatus():");
    console.log({
      active: session.isActive(),
      status: statusAfterFinish,
    });

    const sessionJSON =
      session.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(sessionJSON);

    const events = [
      EngineGameSessionEvents.createEngineGameSessionInitializedEvent(),
      EngineGameSessionEvents.createEngineGameSessionStartedEvent(),
      EngineGameSessionEvents.createEngineGameSessionFinishedEvent(),
      EngineGameSessionEvents.createEngineGameSessionResetEvent(),
    ];
    console.log("13. Crear todos los eventos:");
    console.log(events);

    const reset =
      session.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      session.toJSON();
    this.assert(
      session.isInitialized() === false,
      "EngineGameSession debe quedar sin inicializar tras reset."
    );
    this.assert(
      session.isActive() === false,
      "EngineGameSession debe quedar inactivo tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.active === false &&
        resetJSON.hasRoundCoordinator === false &&
        resetJSON.hasBetCoordinator === false &&
        resetJSON.hasSettlementCoordinator === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("15. Verificar nuevamente isInitialized(), isActive() y toJSON():");
    console.log({
      initialized: session.isInitialized(),
      active: session.isActive(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      started,
      statusAfterStart,
      finished,
      statusAfterFinish,
      sessionJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE GAME SESSION SANDBOX OK =====");
  }
}

new EngineGameSessionSandbox();

export default EngineGameSessionSandbox;
