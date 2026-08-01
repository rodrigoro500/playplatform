import PaseRoundRuntime from "./PaseRoundRuntime";
import PaseRoundRuntimeEvents from "./PaseRoundRuntimeEvents";

class PaseRoundRuntimeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE ROUND RUNTIME SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const playFlow = {
      start() {
        return true;
      },

      finish() {
        return true;
      },
    };
    console.log("2. Crear PlayFlow simulado:");
    console.log(playFlow);

    const paseEngine = {};
    console.log("3. Crear PaseEngine simulado:");
    console.log(paseEngine);

    const table = {
      getPlayers() {
        return [
          { id: "P1" },
          { id: "P2" },
          { id: "P3" },
        ];
      },
    };
    console.log("4. Crear Table simulada:");
    console.log(table.getPlayers());

    const turnManager = {};
    console.log("5. Crear TurnManager simulado:");
    console.log(turnManager);

    const diceEngine = {
      rollDice() {
        return {
          dice: [4, 3],
          total: 7,
          outcome: "PASE",
        };
      },
    };
    console.log("6. Crear DiceEngine simulado:");
    console.log(diceEngine.rollDice());

    const resolver = {
      resolve(result) {
        return {
          resolved: true,
          result,
        };
      },
    };
    console.log("7. Crear Resolver simulado:");
    console.log(resolver);

    const settlementResolver = {
      resolve(result) {
        return {
          settled: true,
          result,
        };
      },
    };
    console.log("8. Crear SettlementResolver simulado:");
    console.log(settlementResolver);

    const runtime =
      new PaseRoundRuntime();
    console.log("9. Crear PaseRoundRuntime:");
    console.log(runtime.toJSON());

    runtime.setManager(manager);
    runtime.setPlayFlow(playFlow);
    runtime.setPaseEngine(paseEngine);
    runtime.setTable(table);
    runtime.setTurnManager(turnManager);
    runtime.setDiceEngine(diceEngine);
    runtime.setResolver(resolver);
    runtime.setSettlementResolver(settlementResolver);
    console.log("10. Configurar todos los componentes:");
    console.log(runtime.toJSON());

    const initialized =
      runtime.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      runtime.isInitialized() === true,
      "PaseRoundRuntime debe quedar inicializado."
    );
    console.log("11. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: runtime.isInitialized(),
    });

    const roundStarted =
      runtime.startRound();
    this.assert(
      roundStarted === true,
      "startRound() debe delegar en playFlow.start()."
    );
    console.log("12. Ejecutar startRound():");
    console.log(roundStarted);

    const rollResult =
      runtime.rollDice();
    this.assert(
      rollResult.total === 7 &&
        rollResult.outcome === "PASE",
      "rollDice() debe devolver el resultado simulado."
    );
    console.log("13. Ejecutar rollDice():");
    console.log(rollResult);

    const resolvedResult =
      runtime.resolve(rollResult);
    this.assert(
      resolvedResult.resolved === true &&
        resolvedResult.result === rollResult,
      "resolve() debe delegar en resolver.resolve()."
    );
    console.log("14. Ejecutar resolve(resultado):");
    console.log(resolvedResult);

    const settledResult =
      runtime.settle(resolvedResult);
    this.assert(
      settledResult.settled === true &&
        settledResult.result === resolvedResult,
      "settle() debe delegar en settlementResolver.resolve()."
    );
    console.log("15. Ejecutar settle(resultado):");
    console.log(settledResult);

    const roundFinished =
      runtime.finishRound();
    this.assert(
      roundFinished === true,
      "finishRound() debe delegar en playFlow.finish()."
    );
    console.log("16. Ejecutar finishRound():");
    console.log(roundFinished);

    const status =
      runtime.getStatus();
    const runtimeJSON =
      runtime.toJSON();
    this.assert(
      status.initialized === true &&
        status.players === 3,
      "getStatus() debe reflejar tres jugadores."
    );
    console.log("17. Consultar getStatus() y toJSON():");
    console.log({
      status,
      json: runtimeJSON,
    });

    const events = [
      PaseRoundRuntimeEvents.createPaseRoundRuntimeInitializedEvent(),
      PaseRoundRuntimeEvents.createPaseRoundStartedEvent(),
      PaseRoundRuntimeEvents.createPaseDiceRolledEvent(rollResult),
      PaseRoundRuntimeEvents.createPaseResultResolvedEvent(resolvedResult),
      PaseRoundRuntimeEvents.createPaseSettlementCompletedEvent(settledResult),
      PaseRoundRuntimeEvents.createPaseRoundFinishedEvent(),
      PaseRoundRuntimeEvents.createPaseRoundRuntimeResetEvent(),
    ];
    console.log("18. Crear todos los eventos:");
    console.log(events);

    const reset =
      runtime.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("19. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      runtime.toJSON();
    this.assert(
      runtime.isInitialized() === false,
      "PaseRoundRuntime debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasTable === false &&
        resetJSON.hasDiceEngine === false &&
        resetJSON.hasResolver === false &&
        resetJSON.hasSettlementResolver === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("20. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: runtime.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      roundStarted,
      rollResult,
      resolvedResult,
      settledResult,
      roundFinished,
      status,
      runtimeJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE ROUND RUNTIME SANDBOX OK =====");
  }
}

new PaseRoundRuntimeSandbox();

export default PaseRoundRuntimeSandbox;
