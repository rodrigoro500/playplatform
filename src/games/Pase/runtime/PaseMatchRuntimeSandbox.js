import PaseMatchRuntime from "./PaseMatchRuntime";
import PaseMatchRuntimeEvents from "./PaseMatchRuntimeEvents";

class PaseMatchRuntimeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE MATCH RUNTIME SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const roundRuntime = {
      startRound() {
        return true;
      },

      rollDice() {
        return {
          dice: [5, 2],
          total: 7,
          outcome: "PASE",
        };
      },

      resolve(result) {
        return {
          resolved: true,
          result,
        };
      },

      settle(result) {
        return {
          settled: true,
          result,
        };
      },

      finishRound() {
        return true;
      },
    };
    console.log("2. Crear RoundRuntime simulado:");
    console.log(roundRuntime.rollDice());

    const runtime =
      new PaseMatchRuntime();
    console.log("3. Crear PaseMatchRuntime:");
    console.log(runtime.toJSON());

    runtime.setManager(manager);
    runtime.setRoundRuntime(roundRuntime);
    console.log("4. Configurar manager y roundRuntime:");
    console.log(runtime.toJSON());

    const initialized =
      runtime.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      runtime.isInitialized() === true,
      "PaseMatchRuntime debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: runtime.isInitialized(),
    });

    const started =
      runtime.startMatch();
    this.assert(
      started === true,
      "startMatch() debe devolver true."
    );
    this.assert(
      runtime.isRunning() === true,
      "PaseMatchRuntime debe quedar en ejecucion."
    );
    this.assert(
      runtime.getCurrentRound() === 1,
      "startMatch() debe establecer currentRound en 1."
    );
    console.log("6. Ejecutar startMatch():");
    console.log({
      started,
      running: runtime.isRunning(),
      currentRound: runtime.getCurrentRound(),
    });

    const roundResult =
      runtime.playRound();
    this.assert(
      roundResult.total === 7 &&
        roundResult.outcome === "PASE",
      "playRound() debe devolver el resultado de rollDice()."
    );
    console.log("7. Ejecutar playRound():");
    console.log(roundResult);

    const currentRound =
      runtime.getCurrentRound();
    const running =
      runtime.isRunning();
    const status =
      runtime.getStatus();
    const runtimeJSON =
      runtime.toJSON();
    this.assert(
      currentRound === 1 &&
        running === true &&
        status.initialized === true &&
        status.running === true,
      "El estado debe reflejar el match en ejecucion."
    );
    console.log("8. Consultar getCurrentRound(), isRunning(), getStatus() y toJSON():");
    console.log({
      currentRound,
      running,
      status,
      json: runtimeJSON,
    });

    const events = [
      PaseMatchRuntimeEvents.createPaseMatchRuntimeInitializedEvent(),
      PaseMatchRuntimeEvents.createPaseMatchStartedEvent(),
      PaseMatchRuntimeEvents.createPaseMatchRoundPlayedEvent(roundResult),
      PaseMatchRuntimeEvents.createPaseMatchFinishedEvent(),
      PaseMatchRuntimeEvents.createPaseMatchRuntimeResetEvent(),
    ];
    console.log("9. Crear todos los eventos:");
    console.log(events);

    const finished =
      runtime.finishMatch();
    this.assert(
      finished === true,
      "finishMatch() debe devolver true."
    );
    this.assert(
      runtime.isRunning() === false,
      "finishMatch() debe detener el match."
    );
    console.log("10. Ejecutar finishMatch():");
    console.log({
      finished,
      running: runtime.isRunning(),
    });

    const reset =
      runtime.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("11. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      runtime.toJSON();
    this.assert(
      runtime.isInitialized() === false,
      "PaseMatchRuntime debe quedar sin inicializar tras reset."
    );
    this.assert(
      runtime.isRunning() === false,
      "PaseMatchRuntime debe quedar detenido tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.running === false &&
        resetJSON.currentRound === 0 &&
        resetJSON.hasRoundRuntime === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("12. Verificar nuevamente isInitialized(), isRunning() y toJSON():");
    console.log({
      initialized: runtime.isInitialized(),
      running: runtime.isRunning(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      started,
      roundResult,
      currentRound,
      running,
      status,
      runtimeJSON,
      events,
      finished,
      reset,
      resetJSON,
    });

    console.log("===== PASE MATCH RUNTIME SANDBOX OK =====");
  }
}

new PaseMatchRuntimeSandbox();

export default PaseMatchRuntimeSandbox;
