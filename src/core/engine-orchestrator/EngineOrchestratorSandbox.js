import EngineOrchestrator from "./EngineOrchestrator";
import EngineOrchestratorEvents from "./EngineOrchestratorEvents";

class EngineOrchestratorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE ORCHESTRATOR SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const orchestrator = new EngineOrchestrator();
    console.log("2. Crear EngineOrchestrator:");
    console.log(orchestrator.toJSON());

    this.assert(orchestrator.isInitialized() === false, "EngineOrchestrator debe iniciar sin inicializar.");
    const initialJSON = orchestrator.toJSON();
    this.assert(
      initialJSON.initialized === false &&
        initialJSON.components === 0 &&
        Object.keys(initialJSON.registry).length === 0,
      "EngineOrchestrator debe iniciar sin componentes."
    );
    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: orchestrator.isInitialized(),
      json: initialJSON,
    });

    orchestrator.setManager(manager);
    console.log("4. Ejecutar setManager():");
    console.log(orchestrator.getStatus());

    const initialized = orchestrator.initialize();
    this.assert(initialized === true, "initialize() debe devolver true.");
    this.assert(orchestrator.isInitialized() === true, "EngineOrchestrator debe quedar inicializado.");
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: orchestrator.isInitialized(),
    });

    orchestrator.registerComponent("Workflow", {});
    orchestrator.registerComponent("Pipeline", {});
    orchestrator.registerComponent("Scheduler", {});
    console.log("6. Ejecutar registerComponent():");
    console.log(orchestrator.getComponents());

    const hasWorkflow = orchestrator.hasComponent("Workflow");
    this.assert(hasWorkflow === true, 'hasComponent("Workflow") debe devolver true.');
    console.log('7. Ejecutar hasComponent("Workflow"):');
    console.log(hasWorkflow);

    const pipelineComponent = orchestrator.getComponent("Pipeline");
    this.assert(pipelineComponent !== undefined, 'getComponent("Pipeline") debe devolver un componente.');
    console.log('8. Ejecutar getComponent("Pipeline"):');
    console.log(pipelineComponent);

    const sizeAfterRegister = orchestrator.size();
    this.assert(sizeAfterRegister === 3, "size() debe devolver 3 despues de registrar componentes.");
    console.log("9. Ejecutar size():");
    console.log(sizeAfterRegister);

    const componentsAfterRegister = orchestrator.getComponents();
    this.assert(
      Object.keys(componentsAfterRegister).length === 3,
      "getComponents() debe devolver tres componentes."
    );
    console.log("10. Ejecutar getComponents():");
    console.log(componentsAfterRegister);

    const status = orchestrator.getStatus();
    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const orchestratorJSON = orchestrator.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(orchestratorJSON);

    const removed = orchestrator.removeComponent("Scheduler");
    this.assert(removed === true, 'removeComponent("Scheduler") debe devolver true.');
    this.assert(
      orchestrator.size() === 2 && !orchestrator.hasComponent("Scheduler"),
      "Scheduler debe quedar removido."
    );
    const componentsAfterRemove = orchestrator.getComponents();
    console.log('13. Ejecutar removeComponent("Scheduler") y verificar size() y getComponents():');
    console.log({
      removed,
      size: orchestrator.size(),
      components: componentsAfterRemove,
    });

    const cleared = orchestrator.clear();
    this.assert(cleared === true, "clear() debe devolver true.");
    console.log("14. Ejecutar clear():");
    console.log(cleared);

    const sizeAfterClear = orchestrator.size();
    this.assert(sizeAfterClear === 0, "size() debe devolver 0 despues de clear.");
    console.log("15. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineOrchestratorEvents.createEngineOrchestratorInitializedEvent(),
      EngineOrchestratorEvents.createEngineComponentRegisteredEvent("Workflow"),
      EngineOrchestratorEvents.createEngineComponentRemovedEvent("Scheduler"),
      EngineOrchestratorEvents.createEngineOrchestratorClearedEvent(),
      EngineOrchestratorEvents.createEngineOrchestratorResetEvent(),
    ];
    console.log("16. Crear eventos:");
    console.log(events);

    const reset = orchestrator.reset();
    this.assert(reset === true, "reset() debe devolver true.");
    console.log("17. Ejecutar reset():");
    console.log(reset);

    const resetJSON = orchestrator.toJSON();
    this.assert(orchestrator.isInitialized() === false, "EngineOrchestrator debe quedar sin inicializar tras reset.");
    this.assert(orchestrator.size() === 0, "size() debe quedar en 0 tras reset.");
    this.assert(Object.keys(orchestrator.getComponents()).length === 0, "getComponents() debe quedar vacio tras reset.");
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.components === 0 &&
        Object.keys(resetJSON.registry).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("18. Verificar nuevamente isInitialized(), size(), getComponents() y toJSON():");
    console.log({
      initialized: orchestrator.isInitialized(),
      size: orchestrator.size(),
      components: orchestrator.getComponents(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      hasWorkflow,
      pipelineComponent,
      sizeAfterRegister,
      componentsAfterRegister,
      status,
      orchestratorJSON,
      removed,
      componentsAfterRemove,
      cleared,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE ORCHESTRATOR SANDBOX OK =====");
  }
}

new EngineOrchestratorSandbox();

export default EngineOrchestratorSandbox;
