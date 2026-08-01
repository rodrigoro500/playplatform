import EngineMatchExecutor from "./EngineMatchExecutor";
import EngineMatchExecutorEvents from "./EngineMatchExecutorEvents";

class EngineMatchExecutorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createMatchController() {
    let running = false;

    return {
      startMatch() {
        running = true;

        return true;
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
    console.log("===== ENGINE MATCH EXECUTOR SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const matchController =
      this.createMatchController();
    console.log("2. Crear MatchController simulado:");
    console.log({
      running: matchController.isRunning(),
    });

    const executor =
      new EngineMatchExecutor();
    console.log("3. Crear EngineMatchExecutor:");
    console.log(executor.toJSON());

    executor.setManager(manager);
    executor.setMatchController(matchController);
    console.log("4. Configurar manager y matchController:");
    console.log(executor.toJSON());

    const initialized =
      executor.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      executor.isInitialized() === true,
      "EngineMatchExecutor debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: executor.isInitialized(),
    });

    const executed =
      executor.execute();
    this.assert(
      executed === true,
      "execute() debe devolver true."
    );
    this.assert(
      executor.isRunning() === false,
      "execute() debe iniciar y finalizar el match."
    );
    console.log("6. Ejecutar execute():");
    console.log({
      executed,
      running: executor.isRunning(),
    });

    const statusAfterExecute =
      executor.getStatus();
    this.assert(
      statusAfterExecute.initialized === true &&
        statusAfterExecute.running === false,
      "getStatus() debe reflejar el match finalizado tras execute()."
    );
    console.log("7. Verificar isRunning() y getStatus():");
    console.log({
      running: executor.isRunning(),
      status: statusAfterExecute,
    });

    const started =
      executor.start();
    this.assert(
      started === true,
      "start() debe devolver true."
    );
    this.assert(
      executor.isRunning() === true,
      "start() debe dejar el match en ejecucion."
    );
    console.log("8. Ejecutar start():");
    console.log({
      started,
      running: executor.isRunning(),
    });

    const finished =
      executor.finish();
    this.assert(
      finished === true,
      "finish() debe devolver true."
    );
    this.assert(
      executor.isRunning() === false,
      "finish() debe dejar el match detenido."
    );
    console.log("9. Ejecutar finish():");
    console.log({
      finished,
      running: executor.isRunning(),
    });

    const returnedMatchController =
      executor.getMatchController();
    this.assert(
      returnedMatchController === matchController,
      "getMatchController() debe devolver el matchController asignado."
    );
    console.log("10. Ejecutar getMatchController():");
    console.log({
      sameMatchController: returnedMatchController === matchController,
      running: returnedMatchController.isRunning(),
    });

    const executorJSON =
      executor.toJSON();
    console.log("11. Ejecutar toJSON():");
    console.log(executorJSON);

    const events = [
      EngineMatchExecutorEvents.createEngineMatchExecutorInitializedEvent(),
      EngineMatchExecutorEvents.createEngineMatchExecutionStartedEvent(),
      EngineMatchExecutorEvents.createEngineMatchExecutionFinishedEvent(),
      EngineMatchExecutorEvents.createEngineMatchExecutorResetEvent(),
    ];
    console.log("12. Crear todos los eventos:");
    console.log(events);

    const reset =
      executor.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("13. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      executor.toJSON();
    this.assert(
      executor.isInitialized() === false,
      "EngineMatchExecutor debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasMatchController === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("14. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: executor.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      executed,
      statusAfterExecute,
      started,
      finished,
      sameMatchController: returnedMatchController === matchController,
      executorJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE MATCH EXECUTOR SANDBOX OK =====");
  }
}

new EngineMatchExecutorSandbox();

export default EngineMatchExecutorSandbox;
