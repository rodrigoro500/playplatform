import EngineMatchController from "./EngineMatchController";
import EngineMatchControllerEvents from "./EngineMatchControllerEvents";

class EngineMatchControllerSandbox {
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
    console.log("===== ENGINE MATCH CONTROLLER SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const gameSession =
      this.createGameSession();
    console.log("2. Crear GameSession simulado:");
    console.log({
      active: gameSession.isActive(),
    });

    const controller =
      new EngineMatchController();
    console.log("3. Crear EngineMatchController:");
    console.log(controller.toJSON());

    controller.setManager(manager);
    controller.setGameSession(gameSession);
    console.log("4. Configurar manager y gameSession:");
    console.log(controller.toJSON());

    const initialized =
      controller.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      controller.isInitialized() === true,
      "EngineMatchController debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: controller.isInitialized(),
    });

    const started =
      controller.startMatch();
    this.assert(
      started === true,
      "startMatch() debe devolver true."
    );
    this.assert(
      controller.isRunning() === true,
      "EngineMatchController debe quedar en ejecucion."
    );
    this.assert(
      gameSession.isActive() === true,
      "startMatch() debe delegar en gameSession.startSession()."
    );
    console.log("6. Ejecutar startMatch():");
    console.log({
      started,
      sessionActive: gameSession.isActive(),
    });

    const statusAfterStart =
      controller.getStatus();
    this.assert(
      statusAfterStart.initialized === true &&
        statusAfterStart.running === true,
      "getStatus() debe reflejar el match en ejecucion."
    );
    console.log("7. Verificar isRunning() y getStatus():");
    console.log({
      running: controller.isRunning(),
      status: statusAfterStart,
    });

    const finished =
      controller.finishMatch();
    this.assert(
      finished === true,
      "finishMatch() debe devolver true."
    );
    this.assert(
      controller.isRunning() === false,
      "EngineMatchController debe quedar detenido."
    );
    this.assert(
      gameSession.isActive() === false,
      "finishMatch() debe delegar en gameSession.finishSession()."
    );
    console.log("8. Ejecutar finishMatch():");
    console.log({
      finished,
      sessionActive: gameSession.isActive(),
    });

    const statusAfterFinish =
      controller.getStatus();
    this.assert(
      statusAfterFinish.initialized === true &&
        statusAfterFinish.running === false,
      "getStatus() debe reflejar el match detenido."
    );
    console.log("9. Verificar isRunning() y getStatus():");
    console.log({
      running: controller.isRunning(),
      status: statusAfterFinish,
    });

    const returnedGameSession =
      controller.getGameSession();
    this.assert(
      returnedGameSession === gameSession,
      "getGameSession() debe devolver la gameSession asignada."
    );
    console.log("10. Ejecutar getGameSession():");
    console.log({
      sameGameSession: returnedGameSession === gameSession,
      active: returnedGameSession.isActive(),
    });

    const controllerJSON =
      controller.toJSON();
    console.log("11. Ejecutar toJSON():");
    console.log(controllerJSON);

    const events = [
      EngineMatchControllerEvents.createEngineMatchControllerInitializedEvent(),
      EngineMatchControllerEvents.createEngineMatchStartedEvent(),
      EngineMatchControllerEvents.createEngineMatchFinishedEvent(),
      EngineMatchControllerEvents.createEngineMatchControllerResetEvent(),
    ];
    console.log("12. Crear todos los eventos:");
    console.log(events);

    const reset =
      controller.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("13. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      controller.toJSON();
    this.assert(
      controller.isInitialized() === false,
      "EngineMatchController debe quedar sin inicializar tras reset."
    );
    this.assert(
      controller.isRunning() === false,
      "EngineMatchController debe quedar detenido tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.running === false &&
        resetJSON.hasGameSession === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("14. Verificar nuevamente isInitialized(), isRunning() y toJSON():");
    console.log({
      initialized: controller.isInitialized(),
      running: controller.isRunning(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      started,
      statusAfterStart,
      finished,
      statusAfterFinish,
      sameGameSession: returnedGameSession === gameSession,
      controllerJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE MATCH CONTROLLER SANDBOX OK =====");
  }
}

new EngineMatchControllerSandbox();

export default EngineMatchControllerSandbox;
