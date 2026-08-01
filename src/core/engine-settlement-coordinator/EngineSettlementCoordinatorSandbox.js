import EngineSettlementCoordinator from "./EngineSettlementCoordinator";
import EngineSettlementCoordinatorEvents from "./EngineSettlementCoordinatorEvents";

class EngineSettlementCoordinatorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createSettlementResolver() {
    const results = [];

    return {
      resolve(result) {
        results.push(result);

        return result;
      },

      getResults() {
        return [...results];
      },

      clear() {
        results.length = 0;

        return true;
      },
    };
  }

  run() {
    console.log("===== ENGINE SETTLEMENT COORDINATOR SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const roundCoordinator = {
      startRound() {
        return true;
      },

      finishRound() {
        return true;
      },
    };
    console.log("2. Crear RoundCoordinator simulado:");
    console.log(roundCoordinator);

    const wallet = {};
    console.log("3. Crear Wallet simulado:");
    console.log(wallet);

    const settlementResolver =
      this.createSettlementResolver();
    console.log("4. Crear SettlementResolver simulado:");
    console.log({
      results: settlementResolver.getResults(),
    });

    const coordinator =
      new EngineSettlementCoordinator();
    console.log("5. Crear EngineSettlementCoordinator:");
    console.log(coordinator.toJSON());

    coordinator.setManager(manager);
    coordinator.setRoundCoordinator(roundCoordinator);
    coordinator.setSettlementResolver(settlementResolver);
    coordinator.setWallet(wallet);
    console.log("6. Configurar manager, roundCoordinator, settlementResolver y wallet:");
    console.log(coordinator.toJSON());

    const initialized =
      coordinator.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      coordinator.isInitialized() === true,
      "EngineSettlementCoordinator debe quedar inicializado."
    );
    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: coordinator.isInitialized(),
    });

    const firstSettlement =
      coordinator.settle({
        id: "settlement-1",
        playerId: "player-1",
        amount: 200,
      });
    const secondSettlement =
      coordinator.settle({
        id: "settlement-2",
        playerId: "player-2",
        amount: 500,
      });
    this.assert(
      coordinator.getResults().length === 2,
      "Deben registrarse dos liquidaciones."
    );
    console.log("8. Ejecutar dos liquidaciones:");
    console.log({
      firstSettlement,
      secondSettlement,
    });

    const resultsAfterSettle =
      coordinator.getResults();
    const statusAfterSettle =
      coordinator.getStatus();
    this.assert(
      resultsAfterSettle.length === 2 &&
        statusAfterSettle.settlements === 2,
      "getResults() y getStatus() deben reflejar dos liquidaciones."
    );
    console.log("9. Consultar getResults() y getStatus():");
    console.log({
      results: resultsAfterSettle,
      status: statusAfterSettle,
    });

    const cleared =
      coordinator.clearResults();
    this.assert(
      cleared === true,
      "clearResults() debe devolver true."
    );
    console.log("10. Limpiar resultados:");
    console.log(cleared);

    const resultsAfterClear =
      coordinator.getResults();
    const statusAfterClear =
      coordinator.getStatus();
    this.assert(
      resultsAfterClear.length === 0 &&
        statusAfterClear.settlements === 0,
      "getResults() y getStatus() deben quedar sin liquidaciones."
    );
    console.log("11. Consultar nuevamente getResults() y getStatus():");
    console.log({
      results: resultsAfterClear,
      status: statusAfterClear,
    });

    const coordinatorJSON =
      coordinator.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(coordinatorJSON);

    const events = [
      EngineSettlementCoordinatorEvents.createEngineSettlementCoordinatorInitializedEvent(),
      EngineSettlementCoordinatorEvents.createEngineSettlementExecutedEvent(firstSettlement),
      EngineSettlementCoordinatorEvents.createEngineSettlementExecutedEvent(secondSettlement),
      EngineSettlementCoordinatorEvents.createEngineSettlementResultsClearedEvent(),
      EngineSettlementCoordinatorEvents.createEngineSettlementCoordinatorResetEvent(),
    ];
    console.log("13. Crear todos los eventos:");
    console.log(events);

    const reset =
      coordinator.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      coordinator.toJSON();
    this.assert(
      coordinator.isInitialized() === false,
      "EngineSettlementCoordinator debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasRoundCoordinator === false &&
        resetJSON.hasSettlementResolver === false &&
        resetJSON.hasWallet === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("15. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: coordinator.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      firstSettlement,
      secondSettlement,
      resultsAfterSettle,
      statusAfterSettle,
      cleared,
      resultsAfterClear,
      statusAfterClear,
      coordinatorJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE SETTLEMENT COORDINATOR SANDBOX OK =====");
  }
}

new EngineSettlementCoordinatorSandbox();

export default EngineSettlementCoordinatorSandbox;
