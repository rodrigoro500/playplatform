import PaseSettlementRuntime from "./PaseSettlementRuntime";
import PaseSettlementRuntimeEvents from "./PaseSettlementRuntimeEvents";

class PaseSettlementRuntimeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE SETTLEMENT RUNTIME SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const betRuntime = {
      getBetCount() {
        return 3;
      },
    };
    console.log("2. Crear BetRuntime simulado:");
    console.log({
      bets: betRuntime.getBetCount(),
    });

    const resolver = {
      resolve(result) {
        return {
          resolved: true,
          result,
        };
      },
    };
    console.log("3. Crear Resolver simulado:");
    console.log(resolver.resolve({
      total: 7,
      outcome: "PASE",
    }));

    const results = [];
    const settlementResolver = {
      resolve(result) {
        const settlement = {
          settled: true,
          result,
        };

        results.push(settlement);

        return settlement;
      },

      getResults() {
        return [...results];
      },

      clear() {
        results.length = 0;

        return true;
      },
    };
    console.log("4. Crear SettlementResolver simulado:");
    console.log({
      results: settlementResolver.getResults(),
    });

    const runtime =
      new PaseSettlementRuntime();
    console.log("5. Crear PaseSettlementRuntime:");
    console.log(runtime.toJSON());

    runtime.setManager(manager);
    runtime.setBetRuntime(betRuntime);
    runtime.setResolver(resolver);
    runtime.setSettlementResolver(settlementResolver);
    console.log("6. Configurar manager, betRuntime, resolver y settlementResolver:");
    console.log(runtime.toJSON());

    const initialized =
      runtime.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      runtime.isInitialized() === true,
      "PaseSettlementRuntime debe quedar inicializado."
    );
    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: runtime.isInitialized(),
    });

    const roundResult = {
      dice: [4, 3],
      total: 7,
      outcome: "PASE",
    };
    const resolved =
      runtime.resolveRound(roundResult);
    this.assert(
      resolved.resolved === true &&
        resolved.result === roundResult,
      "resolveRound() debe delegar en resolver.resolve()."
    );
    console.log("8. Ejecutar resolveRound():");
    console.log(resolved);

    const settled =
      runtime.settleRound(resolved);
    this.assert(
      settled.settled === true &&
        settled.result === resolved,
      "settleRound() debe delegar en settlementResolver.resolve()."
    );
    console.log("9. Ejecutar settleRound():");
    console.log(settled);

    const settlementResults =
      runtime.getResults();
    const status =
      runtime.getStatus();
    this.assert(
      settlementResults.length === 1 &&
        status.initialized === true &&
        status.bets === 3 &&
        status.settlements === 1,
      "getResults() y getStatus() deben reflejar la liquidacion."
    );
    console.log("10. Consultar getResults() y getStatus():");
    console.log({
      results: settlementResults,
      status,
    });

    const cleared =
      runtime.clearResults();
    this.assert(
      cleared === true,
      "clearResults() debe devolver true."
    );
    this.assert(
      runtime.getResults().length === 0,
      "clearResults() debe limpiar los resultados."
    );
    console.log("11. Ejecutar clearResults():");
    console.log(cleared);

    const resultsAfterClear =
      runtime.getResults();
    const statusAfterClear =
      runtime.getStatus();
    const runtimeJSON =
      runtime.toJSON();
    this.assert(
      resultsAfterClear.length === 0 &&
        statusAfterClear.settlements === 0 &&
        runtimeJSON.initialized === true,
      "El estado debe reflejar resultados limpiados."
    );
    console.log("12. Consultar nuevamente getResults(), getStatus() y toJSON():");
    console.log({
      results: resultsAfterClear,
      status: statusAfterClear,
      json: runtimeJSON,
    });

    const events = [
      PaseSettlementRuntimeEvents.createPaseSettlementRuntimeInitializedEvent(),
      PaseSettlementRuntimeEvents.createPaseRoundResolvedEvent(resolved),
      PaseSettlementRuntimeEvents.createPaseRoundSettledEvent(settled),
      PaseSettlementRuntimeEvents.createPaseSettlementResultsClearedEvent(),
      PaseSettlementRuntimeEvents.createPaseSettlementRuntimeResetEvent(),
    ];
    console.log("13. Crear todos los eventos:");
    console.log(events);

    const reset =
      runtime.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      runtime.toJSON();
    this.assert(
      runtime.isInitialized() === false,
      "PaseSettlementRuntime debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasBetRuntime === false &&
        resetJSON.hasResolver === false &&
        resetJSON.hasSettlementResolver === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("15. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: runtime.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      resolved,
      settled,
      settlementResults,
      status,
      cleared,
      resultsAfterClear,
      statusAfterClear,
      runtimeJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE SETTLEMENT RUNTIME SANDBOX OK =====");
  }
}

new PaseSettlementRuntimeSandbox();

export default PaseSettlementRuntimeSandbox;
