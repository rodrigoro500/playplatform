import EngineRoundCoordinator from "./EngineRoundCoordinator";
import EngineRoundCoordinatorEvents from "./EngineRoundCoordinatorEvents";

class EngineRoundCoordinatorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createGameLoop() {
    const steps = [
      "Waiting",
      "Betting",
      "Rolling",
    ];
    let currentStep = 0;

    return {
      next() {
        if (currentStep < steps.length - 1) {
          currentStep += 1;
        }

        return steps[currentStep];
      },

      previous() {
        if (currentStep > 0) {
          currentStep -= 1;
        }

        return steps[currentStep];
      },

      current() {
        return steps[currentStep];
      },
    };
  }

  createRoundEngine() {
    return {
      startRound() {
        return "ROUND_STARTED";
      },

      finishRound() {
        return "ROUND_FINISHED";
      },
    };
  }

  run() {
    console.log("===== ENGINE ROUND COORDINATOR SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const gameLoop =
      this.createGameLoop();
    console.log("2. Crear GameLoop simulado:");
    console.log({
      currentStep: gameLoop.current(),
    });

    const roundEngine =
      this.createRoundEngine();
    console.log("3. Crear RoundEngine simulado:");
    console.log(roundEngine);

    const coordinator =
      new EngineRoundCoordinator();
    console.log("4. Crear EngineRoundCoordinator:");
    console.log(coordinator.toJSON());

    coordinator.setManager(manager);
    coordinator.setGameLoop(gameLoop);
    coordinator.setRoundEngine(roundEngine);
    console.log("5. Configurar manager, gameLoop y roundEngine:");
    console.log(coordinator.toJSON());

    const initialized =
      coordinator.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      coordinator.isInitialized() === true,
      "EngineRoundCoordinator debe quedar inicializado."
    );
    console.log("6. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: coordinator.isInitialized(),
    });

    const startRoundResult =
      coordinator.startRound();
    this.assert(
      startRoundResult === "ROUND_STARTED",
      "startRound() debe delegar en roundEngine.startRound()."
    );
    console.log("7. Ejecutar startRound():");
    console.log(startRoundResult);

    const nextStep =
      coordinator.nextStep();
    this.assert(
      nextStep === "Betting",
      "nextStep() debe devolver Betting."
    );
    console.log("8. Ejecutar nextStep():");
    console.log(nextStep);

    const previousStep =
      coordinator.previousStep();
    this.assert(
      previousStep === "Waiting",
      "previousStep() debe devolver Waiting."
    );
    console.log("9. Ejecutar previousStep():");
    console.log(previousStep);

    const currentStep =
      coordinator.getCurrentStep();
    this.assert(
      currentStep === "Waiting",
      "getCurrentStep() debe devolver Waiting."
    );
    console.log("10. Ejecutar getCurrentStep():");
    console.log(currentStep);

    const finishRoundResult =
      coordinator.finishRound();
    this.assert(
      finishRoundResult === "ROUND_FINISHED",
      "finishRound() debe delegar en roundEngine.finishRound()."
    );
    console.log("11. Ejecutar finishRound():");
    console.log(finishRoundResult);

    const status =
      coordinator.getStatus();
    console.log("12. Ejecutar getStatus():");
    console.log(status);

    const coordinatorJSON =
      coordinator.toJSON();
    console.log("13. Ejecutar toJSON():");
    console.log(coordinatorJSON);

    const events = [
      EngineRoundCoordinatorEvents.createEngineRoundCoordinatorInitializedEvent(),
      EngineRoundCoordinatorEvents.createEngineRoundStartedEvent(),
      EngineRoundCoordinatorEvents.createEngineRoundNextStepEvent(nextStep),
      EngineRoundCoordinatorEvents.createEngineRoundPreviousStepEvent(previousStep),
      EngineRoundCoordinatorEvents.createEngineRoundFinishedEvent(),
      EngineRoundCoordinatorEvents.createEngineRoundCoordinatorResetEvent(),
    ];
    console.log("14. Crear todos los eventos:");
    console.log(events);

    const reset =
      coordinator.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      coordinator.toJSON();
    this.assert(
      coordinator.isInitialized() === false,
      "EngineRoundCoordinator debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasGameLoop === false &&
        resetJSON.hasRoundEngine === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("16. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: coordinator.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      startRoundResult,
      nextStep,
      previousStep,
      currentStep,
      finishRoundResult,
      status,
      coordinatorJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE ROUND COORDINATOR SANDBOX OK =====");
  }
}

new EngineRoundCoordinatorSandbox();

export default EngineRoundCoordinatorSandbox;
