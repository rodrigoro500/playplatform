import EngineWorkflow from "./EngineWorkflow";
import EngineWorkflowEvents from "./EngineWorkflowEvents";

class EngineWorkflowSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE WORKFLOW SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const workflow = new EngineWorkflow();
    console.log("2. Crear EngineWorkflow:");
    console.log(workflow.toJSON());

    this.assert(workflow.isInitialized() === false, "EngineWorkflow debe iniciar sin inicializar.");
    const initialJSON = workflow.toJSON();
    this.assert(
      initialJSON.initialized === false &&
        initialJSON.workflows === 0 &&
        Object.keys(initialJSON.registry).length === 0,
      "EngineWorkflow debe iniciar sin workflows."
    );
    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: workflow.isInitialized(),
      json: initialJSON,
    });

    workflow.setManager(manager);
    console.log("4. Ejecutar setManager():");
    console.log(workflow.getStatus());

    const initialized = workflow.initialize();
    this.assert(initialized === true, "initialize() debe devolver true.");
    this.assert(workflow.isInitialized() === true, "EngineWorkflow debe quedar inicializado.");
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: workflow.isInitialized(),
    });

    workflow.registerWorkflow("Round", {});
    workflow.registerWorkflow("Settlement", {});
    workflow.registerWorkflow("Statistics", {});
    console.log("6. Ejecutar registerWorkflow():");
    console.log(workflow.getWorkflows());

    const hasRound = workflow.hasWorkflow("Round");
    this.assert(hasRound === true, 'hasWorkflow("Round") debe devolver true.');
    console.log('7. Ejecutar hasWorkflow("Round"):');
    console.log(hasRound);

    const settlementWorkflow = workflow.getWorkflow("Settlement");
    this.assert(settlementWorkflow !== undefined, 'getWorkflow("Settlement") debe devolver un workflow.');
    console.log('8. Ejecutar getWorkflow("Settlement"):');
    console.log(settlementWorkflow);

    const sizeAfterRegister = workflow.size();
    this.assert(sizeAfterRegister === 3, "size() debe devolver 3 despues de registrar workflows.");
    console.log("9. Ejecutar size():");
    console.log(sizeAfterRegister);

    const workflowsAfterRegister = workflow.getWorkflows();
    this.assert(
      Object.keys(workflowsAfterRegister).length === 3,
      "getWorkflows() debe devolver tres workflows."
    );
    console.log("10. Ejecutar getWorkflows():");
    console.log(workflowsAfterRegister);

    const status = workflow.getStatus();
    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const workflowJSON = workflow.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(workflowJSON);

    const removed = workflow.removeWorkflow("Statistics");
    this.assert(removed === true, 'removeWorkflow("Statistics") debe devolver true.');
    this.assert(
      workflow.size() === 2 && !workflow.hasWorkflow("Statistics"),
      "Statistics debe quedar removido."
    );
    const workflowsAfterRemove = workflow.getWorkflows();
    console.log('13. Ejecutar removeWorkflow("Statistics") y verificar size() y getWorkflows():');
    console.log({
      removed,
      size: workflow.size(),
      workflows: workflowsAfterRemove,
    });

    const cleared = workflow.clear();
    this.assert(cleared === true, "clear() debe devolver true.");
    console.log("14. Ejecutar clear():");
    console.log(cleared);

    const sizeAfterClear = workflow.size();
    this.assert(sizeAfterClear === 0, "size() debe devolver 0 despues de clear.");
    console.log("15. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineWorkflowEvents.createEngineWorkflowInitializedEvent(),
      EngineWorkflowEvents.createEngineWorkflowRegisteredEvent("Round"),
      EngineWorkflowEvents.createEngineWorkflowRemovedEvent("Statistics"),
      EngineWorkflowEvents.createEngineWorkflowClearedEvent(),
      EngineWorkflowEvents.createEngineWorkflowResetEvent(),
    ];
    console.log("16. Crear eventos:");
    console.log(events);

    const reset = workflow.reset();
    this.assert(reset === true, "reset() debe devolver true.");
    console.log("17. Ejecutar reset():");
    console.log(reset);

    const resetJSON = workflow.toJSON();
    this.assert(workflow.isInitialized() === false, "EngineWorkflow debe quedar sin inicializar tras reset.");
    this.assert(workflow.size() === 0, "size() debe quedar en 0 tras reset.");
    this.assert(Object.keys(workflow.getWorkflows()).length === 0, "getWorkflows() debe quedar vacio tras reset.");
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.workflows === 0 &&
        Object.keys(resetJSON.registry).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("18. Verificar nuevamente isInitialized(), size(), getWorkflows() y toJSON():");
    console.log({
      initialized: workflow.isInitialized(),
      size: workflow.size(),
      workflows: workflow.getWorkflows(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      hasRound,
      settlementWorkflow,
      sizeAfterRegister,
      workflowsAfterRegister,
      status,
      workflowJSON,
      removed,
      workflowsAfterRemove,
      cleared,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE WORKFLOW SANDBOX OK =====");
  }
}

new EngineWorkflowSandbox();

export default EngineWorkflowSandbox;
