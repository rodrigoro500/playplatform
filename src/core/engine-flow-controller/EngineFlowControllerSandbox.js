import EngineFlowController from "./EngineFlowController";
import EngineFlowControllerEvents from "./EngineFlowControllerEvents";

class EngineFlowControllerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE FLOW CONTROLLER SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const controller = new EngineFlowController();
    console.log("2. Crear EngineFlowController:");
    console.log(controller.toJSON());

    this.assert(controller.isInitialized() === false, "EngineFlowController debe iniciar sin inicializar.");
    const initialJSON = controller.toJSON();
    this.assert(
      initialJSON.initialized === false &&
        initialJSON.currentStep === -1 &&
        initialJSON.steps.length === 0,
      "EngineFlowController debe iniciar sin pasos."
    );
    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: controller.isInitialized(),
      json: initialJSON,
    });

    controller.setManager(manager);
    console.log("4. Ejecutar setManager():");
    console.log(controller.getStatus());

    const initialized = controller.initialize();
    this.assert(initialized === true, "initialize() debe devolver true.");
    this.assert(controller.isInitialized() === true, "EngineFlowController debe quedar inicializado.");
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: controller.isInitialized(),
    });

    const waitingStep = controller.addStep("Waiting");
    const bettingStep = controller.addStep("Betting");
    const rollingStep = controller.addStep("Rolling");
    const settlementStep = controller.addStep("Settlement");
    console.log("6. Ejecutar addStep():");
    console.log({
      waitingStep,
      bettingStep,
      rollingStep,
      settlementStep,
    });

    const currentStep = controller.getCurrentStep();
    this.assert(currentStep === "Waiting", "getCurrentStep() debe devolver Waiting.");
    console.log("7. Ejecutar getCurrentStep():");
    console.log(currentStep);

    const nextStepBetting = controller.nextStep();
    this.assert(nextStepBetting === "Betting", "nextStep() debe devolver Betting.");
    console.log("8. Ejecutar nextStep():");
    console.log(nextStepBetting);

    const nextStepRolling = controller.nextStep();
    this.assert(nextStepRolling === "Rolling", "nextStep() debe devolver Rolling.");
    console.log("9. Ejecutar nextStep():");
    console.log(nextStepRolling);

    const previousStepBetting = controller.previousStep();
    this.assert(previousStepBetting === "Betting", "previousStep() debe devolver Betting.");
    console.log("10. Ejecutar previousStep():");
    console.log(previousStepBetting);

    const sizeAfterAdd = controller.size();
    this.assert(sizeAfterAdd === 4, "size() debe devolver 4 despues de addStep.");
    console.log("11. Ejecutar size():");
    console.log(sizeAfterAdd);

    const stepsAfterAdd = controller.getSteps();
    this.assert(stepsAfterAdd.length === 4, "getSteps() debe devolver cuatro pasos.");
    console.log("12. Ejecutar getSteps():");
    console.log(stepsAfterAdd);

    const status = controller.getStatus();
    console.log("13. Ejecutar getStatus():");
    console.log(status);

    const controllerJSON = controller.toJSON();
    console.log("14. Ejecutar toJSON():");
    console.log(controllerJSON);

    const cleared = controller.clear();
    this.assert(cleared === true, "clear() debe devolver true.");
    console.log("15. Ejecutar clear():");
    console.log(cleared);

    const sizeAfterClear = controller.size();
    this.assert(sizeAfterClear === 0, "size() debe devolver 0 despues de clear.");
    console.log("16. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineFlowControllerEvents.createEngineFlowControllerInitializedEvent(),
      EngineFlowControllerEvents.createEngineStepAddedEvent(waitingStep),
      EngineFlowControllerEvents.createNextStepEvent(nextStepBetting),
      EngineFlowControllerEvents.createPreviousStepEvent(previousStepBetting),
      EngineFlowControllerEvents.createEngineFlowControllerClearedEvent(),
      EngineFlowControllerEvents.createEngineFlowControllerResetEvent(),
    ];
    console.log("17. Crear eventos:");
    console.log(events);

    const reset = controller.reset();
    this.assert(reset === true, "reset() debe devolver true.");
    console.log("18. Ejecutar reset():");
    console.log(reset);

    const resetJSON = controller.toJSON();
    this.assert(controller.isInitialized() === false, "EngineFlowController debe quedar sin inicializar tras reset.");
    this.assert(controller.size() === 0, "size() debe quedar en 0 tras reset.");
    this.assert(controller.getSteps().length === 0, "getSteps() debe quedar vacio tras reset.");
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.currentStep === -1 &&
        resetJSON.steps.length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("19. Verificar nuevamente isInitialized(), size(), getSteps() y toJSON():");
    console.log({
      initialized: controller.isInitialized(),
      size: controller.size(),
      steps: controller.getSteps(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      waitingStep,
      bettingStep,
      rollingStep,
      settlementStep,
      currentStep,
      nextStepBetting,
      nextStepRolling,
      previousStepBetting,
      sizeAfterAdd,
      stepsAfterAdd,
      status,
      controllerJSON,
      cleared,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE FLOW CONTROLLER SANDBOX OK =====");
  }
}

new EngineFlowControllerSandbox();

export default EngineFlowControllerSandbox;
