import EnginePlayFlow from "./EnginePlayFlow";
import EnginePlayFlowEvents from "./EnginePlayFlowEvents";

class EnginePlayFlowSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createGameSession() {
    let active = false;

    return {
      startSession() {
        active = true;

        return true;
      },

      finishSession() {
        active = false;

        return true;
      },

      isActive() {
        return active;
      },
    };
  }

  run() {
    console.log("===== ENGINE PLAY FLOW SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const gameSession =
      this.createGameSession();
    console.log("2. Crear GameSession simulado:");
    console.log({
      active: gameSession.isActive(),
    });

    const roundCoordinator = {
      startRound() {
        return true;
      },

      finishRound() {
        return true;
      },
    };
    console.log("3. Crear RoundCoordinator simulado:");
    console.log(roundCoordinator);

    const betCoordinator = {};
    console.log("4. Crear BetCoordinator simulado:");
    console.log(betCoordinator);

    const settlementCoordinator = {
      settle(result) {
        return {
          resolved: true,
          result,
        };
      },
    };
    console.log("5. Crear SettlementCoordinator simulado:");
    console.log(settlementCoordinator);

    const playFlow =
      new EnginePlayFlow();
    console.log("6. Crear EnginePlayFlow:");
    console.log(playFlow.toJSON());

    playFlow.setManager(manager);
    playFlow.setGameSession(gameSession);
    playFlow.setRoundCoordinator(roundCoordinator);
    playFlow.setBetCoordinator(betCoordinator);
    playFlow.setSettlementCoordinator(settlementCoordinator);
    console.log("7. Configurar manager, gameSession, roundCoordinator, betCoordinator y settlementCoordinator:");
    console.log(playFlow.toJSON());

    const initialized =
      playFlow.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      playFlow.isInitialized() === true,
      "EnginePlayFlow debe quedar inicializado."
    );
    console.log("8. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: playFlow.isInitialized(),
    });

    const started =
      playFlow.start();
    this.assert(
      started === true,
      "start() debe devolver true."
    );
    this.assert(
      gameSession.isActive() === true,
      "start() debe activar la sesion."
    );
    console.log("9. Ejecutar start():");
    console.log({
      started,
      sessionActive: gameSession.isActive(),
    });

    const bettingOpened =
      playFlow.openBetting();
    this.assert(
      bettingOpened === true,
      "openBetting() debe devolver true."
    );
    console.log("10. Ejecutar openBetting():");
    console.log(bettingOpened);

    const bettingClosed =
      playFlow.closeBetting();
    this.assert(
      bettingClosed === true,
      "closeBetting() debe devolver true."
    );
    console.log("11. Ejecutar closeBetting():");
    console.log(bettingClosed);

    const result = {
      total: 7,
      outcome: "PASE",
    };
    const resolved =
      playFlow.resolve(result);
    this.assert(
      resolved.resolved === true &&
        resolved.result === result,
      "resolve() debe delegar en settlementCoordinator.settle()."
    );
    console.log("12. Ejecutar resolve():");
    console.log(resolved);

    const finished =
      playFlow.finish();
    this.assert(
      finished === true,
      "finish() debe devolver true."
    );
    this.assert(
      gameSession.isActive() === false,
      "finish() debe finalizar la sesion."
    );
    console.log("13. Ejecutar finish():");
    console.log({
      finished,
      sessionActive: gameSession.isActive(),
    });

    const status =
      playFlow.getStatus();
    const playFlowJSON =
      playFlow.toJSON();
    console.log("14. Consultar getStatus() y toJSON():");
    console.log({
      status,
      json: playFlowJSON,
    });

    const events = [
      EnginePlayFlowEvents.createEnginePlayFlowInitializedEvent(),
      EnginePlayFlowEvents.createEnginePlayFlowStartedEvent(),
      EnginePlayFlowEvents.createBettingOpenedEvent(),
      EnginePlayFlowEvents.createBettingClosedEvent(),
      EnginePlayFlowEvents.createEnginePlayFlowResolvedEvent(resolved),
      EnginePlayFlowEvents.createEnginePlayFlowFinishedEvent(),
      EnginePlayFlowEvents.createEnginePlayFlowResetEvent(),
    ];
    console.log("15. Crear todos los eventos:");
    console.log(events);

    const reset =
      playFlow.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("16. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      playFlow.toJSON();
    this.assert(
      playFlow.isInitialized() === false,
      "EnginePlayFlow debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasGameSession === false &&
        resetJSON.hasRoundCoordinator === false &&
        resetJSON.hasBetCoordinator === false &&
        resetJSON.hasSettlementCoordinator === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("17. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: playFlow.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      started,
      bettingOpened,
      bettingClosed,
      resolved,
      finished,
      status,
      playFlowJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE PLAY FLOW SANDBOX OK =====");
  }
}

new EnginePlayFlowSandbox();

export default EnginePlayFlowSandbox;
