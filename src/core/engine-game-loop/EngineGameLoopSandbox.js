import EngineGameLoop from "./EngineGameLoop";
import EngineGameLoopEvents from "./EngineGameLoopEvents";
import EngineFlowController from "../engine-flow-controller/EngineFlowController";

class EngineGameLoopSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createIntegrationLayer() {
    return {
      register() {
        return this;
      },

      resolve() {
        return null;
      },

      has() {
        return false;
      },

      remove() {
        return true;
      },
    };
  }

  run() {
    console.log("===== ENGINE GAME LOOP SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const integrationLayer =
      this.createIntegrationLayer();
    console.log("2. Crear EngineIntegrationLayer simulado:");
    console.log(integrationLayer);

    const flowController =
      new EngineFlowController();
    flowController.setManager(manager);
    flowController.initialize();
    console.log("3. Crear EngineFlowController:");
    console.log(flowController.toJSON());

    const waitingStep =
      flowController.addStep("Waiting");
    const bettingStep =
      flowController.addStep("Betting");
    const rollingStep =
      flowController.addStep("Rolling");
    const settlementStep =
      flowController.addStep("Settlement");
    console.log("4. Agregar pasos:");
    console.log({
      waitingStep,
      bettingStep,
      rollingStep,
      settlementStep,
      steps: flowController.getSteps(),
    });

    const gameLoop =
      new EngineGameLoop();
    console.log("5. Crear EngineGameLoop:");
    console.log(gameLoop.toJSON());

    gameLoop.setManager(manager);
    gameLoop.setIntegrationLayer(integrationLayer);
    gameLoop.setFlowController(flowController);
    console.log("6. Configurar manager, integrationLayer y flowController:");
    console.log(gameLoop.toJSON());

    const initialized =
      gameLoop.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      gameLoop.isInitialized() === true,
      "EngineGameLoop debe quedar inicializado."
    );
    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: gameLoop.isInitialized(),
    });

    const started =
      gameLoop.start();
    this.assert(
      started === true,
      "start() debe devolver true."
    );
    this.assert(
      gameLoop.isRunning() === true,
      "EngineGameLoop debe quedar corriendo."
    );
    console.log("8. Ejecutar start():");
    console.log({
      started,
      running: gameLoop.isRunning(),
    });

    const currentStep =
      gameLoop.current();
    this.assert(
      currentStep === "Waiting",
      "current() debe devolver Waiting."
    );
    console.log("9. Ejecutar current():");
    console.log(currentStep);

    const nextBetting =
      gameLoop.next();
    this.assert(
      nextBetting === "Betting",
      "next() debe devolver Betting."
    );
    console.log("10. Ejecutar next():");
    console.log(nextBetting);

    const nextRolling =
      gameLoop.next();
    this.assert(
      nextRolling === "Rolling",
      "next() debe devolver Rolling."
    );
    console.log("11. Ejecutar next():");
    console.log(nextRolling);

    const previousBetting =
      gameLoop.previous();
    this.assert(
      previousBetting === "Betting",
      "previous() debe devolver Betting."
    );
    console.log("12. Ejecutar previous():");
    console.log(previousBetting);

    const status =
      gameLoop.getStatus();
    console.log("13. Ejecutar getStatus():");
    console.log(status);

    const gameLoopJSON =
      gameLoop.toJSON();
    console.log("14. Ejecutar toJSON():");
    console.log(gameLoopJSON);

    const events = [
      EngineGameLoopEvents.createEngineGameLoopInitializedEvent(),
      EngineGameLoopEvents.createEngineGameLoopStartedEvent(),
      EngineGameLoopEvents.createEngineGameLoopNextEvent(nextBetting),
      EngineGameLoopEvents.createEngineGameLoopNextEvent(nextRolling),
      EngineGameLoopEvents.createEngineGameLoopPreviousEvent(previousBetting),
      EngineGameLoopEvents.createEngineGameLoopStoppedEvent(),
      EngineGameLoopEvents.createEngineGameLoopResetEvent(),
    ];
    console.log("15. Crear todos los eventos:");
    console.log(events);

    const stopped =
      gameLoop.stop();
    this.assert(
      stopped === true,
      "stop() debe devolver true."
    );
    this.assert(
      gameLoop.isRunning() === false,
      "EngineGameLoop debe quedar detenido."
    );
    console.log("16. Ejecutar stop():");
    console.log({
      stopped,
      running: gameLoop.isRunning(),
    });

    const reset =
      gameLoop.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("17. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      gameLoop.toJSON();
    this.assert(
      gameLoop.isRunning() === false,
      "isRunning() debe devolver false tras reset."
    );
    this.assert(
      gameLoop.isInitialized() === false,
      "isInitialized() debe devolver false tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.running === false &&
        resetJSON.hasIntegrationLayer === false &&
        resetJSON.hasFlowController === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("18. Verificar nuevamente isRunning(), isInitialized() y toJSON():");
    console.log({
      running: gameLoop.isRunning(),
      initialized: gameLoop.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      started,
      currentStep,
      nextBetting,
      nextRolling,
      previousBetting,
      status,
      gameLoopJSON,
      events,
      stopped,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE GAME LOOP SANDBOX OK =====");
  }
}

new EngineGameLoopSandbox();

export default EngineGameLoopSandbox;
