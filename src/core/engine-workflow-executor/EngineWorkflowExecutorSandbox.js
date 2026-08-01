import EngineWorkflowExecutor from "./EngineWorkflowExecutor";
import EngineWorkflowExecutorEvents from "./EngineWorkflowExecutorEvents";

class EngineWorkflowExecutorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createWorkflowManager() {
    const workflows = new Map();

    return {
      registerWorkflow(name, workflow) {
        workflows.set(
          name,
          workflow
        );

        return this;
      },

      getWorkflow(name) {
        if (!workflows.has(name)) {
          throw new Error(
            "El workflow no existe."
          );
        }

        return workflows.get(name);
      },

      hasWorkflow(name) {
        return workflows.has(name);
      },

      getWorkflows() {
        return Object.fromEntries(
          workflows
        );
      },
    };
  }

  run() {
    console.log("===== ENGINE WORKFLOW EXECUTOR SANDBOX =====");

    const manager = {};

    console.log("1. Crear manager simulado:");
    console.log(manager);

    const workflowManager =
      this.createWorkflowManager();

    console.log("2. Crear workflowManager simulado:");
    console.log(workflowManager.getWorkflows());

    workflowManager.registerWorkflow(
      "Workflow A",
      () => "Workflow A"
    );
    workflowManager.registerWorkflow(
      "Workflow B",
      name => `Hola ${name}`
    );
    workflowManager.registerWorkflow(
      "Workflow C",
      {
        execute() {
          return "Workflow C";
        },
      }
    );

    console.log("3. Registrar workflows:");
    console.log(workflowManager.getWorkflows());

    const executor =
      new EngineWorkflowExecutor();

    console.log("4. Crear EngineWorkflowExecutor:");
    console.log(executor.toJSON());

    this.assert(
      executor.isInitialized() === false,
      "EngineWorkflowExecutor debe iniciar sin inicializar."
    );

    const initialJSON =
      executor.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.hasWorkflowManager === false,
      "EngineWorkflowExecutor debe iniciar sin workflowManager."
    );

    console.log("5. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: executor.isInitialized(),
      json: initialJSON,
    });

    executor.setManager(manager);

    console.log("6. Ejecutar setManager():");
    console.log(executor.getStatus());

    executor.setWorkflowManager(workflowManager);

    console.log("7. Ejecutar setWorkflowManager():");
    console.log(executor.getStatus());

    const initialized =
      executor.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      executor.isInitialized() === true,
      "EngineWorkflowExecutor debe quedar inicializado."
    );

    console.log("8. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: executor.isInitialized(),
    });

    const workflowAResult =
      executor.executeWorkflow("Workflow A");

    this.assert(
      workflowAResult === "Workflow A",
      'executeWorkflow("Workflow A") debe devolver Workflow A.'
    );

    console.log('9. Ejecutar executeWorkflow("Workflow A"):');
    console.log(workflowAResult);

    const workflowBResult =
      executor.executeWorkflow(
        "Workflow B",
        "ORION"
      );

    this.assert(
      workflowBResult === "Hola ORION",
      'executeWorkflow("Workflow B", "ORION") debe devolver Hola ORION.'
    );

    console.log('10. Ejecutar executeWorkflow("Workflow B", "ORION"):');
    console.log(workflowBResult);

    const workflowCResult =
      executor.executeWorkflow("Workflow C");

    this.assert(
      workflowCResult === "Workflow C",
      'executeWorkflow("Workflow C") debe devolver Workflow C.'
    );

    console.log('11. Ejecutar executeWorkflow("Workflow C"):');
    console.log(workflowCResult);

    const hasWorkflowA =
      executor.hasWorkflow("Workflow A");

    this.assert(
      hasWorkflowA === true,
      'hasWorkflow("Workflow A") debe devolver true.'
    );

    console.log('12. Ejecutar hasWorkflow("Workflow A"):');
    console.log(hasWorkflowA);

    const returnedWorkflowManager =
      executor.getWorkflowManager();

    this.assert(
      returnedWorkflowManager === workflowManager,
      "getWorkflowManager() debe devolver el workflowManager asignado."
    );

    console.log("13. Ejecutar getWorkflowManager():");
    console.log({
      sameWorkflowManager: returnedWorkflowManager === workflowManager,
      workflows: returnedWorkflowManager.getWorkflows(),
    });

    const status =
      executor.getStatus();

    console.log("14. Ejecutar getStatus():");
    console.log(status);

    const executorJSON =
      executor.toJSON();

    console.log("15. Ejecutar toJSON():");
    console.log(executorJSON);

    const events = [
      EngineWorkflowExecutorEvents.createEngineWorkflowExecutorInitializedEvent(),
      EngineWorkflowExecutorEvents.createEngineWorkflowExecutedEvent(
        "Workflow A",
        workflowAResult
      ),
      EngineWorkflowExecutorEvents.createEngineWorkflowExecutorResetEvent(),
    ];

    console.log("16. Crear eventos:");
    console.log(events);

    const reset =
      executor.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("17. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      executor.getStatus();
    const resetJSON =
      executor.toJSON();

    this.assert(
      executor.isInitialized() === false,
      "EngineWorkflowExecutor debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetStatus.hasWorkflowManager === false &&
        resetJSON.hasWorkflowManager === false,
      "EngineWorkflowExecutor debe limpiar workflowManager tras reset."
    );

    console.log("18. Verificar nuevamente isInitialized(), getStatus() y toJSON():");
    console.log({
      initialized: executor.isInitialized(),
      status: resetStatus,
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      workflowAResult,
      workflowBResult,
      workflowCResult,
      hasWorkflowA,
      status,
      executorJSON,
      events,
      reset,
      resetStatus,
      resetJSON,
    });

    console.log("===== ENGINE WORKFLOW EXECUTOR SANDBOX OK =====");
  }
}

new EngineWorkflowExecutorSandbox();

export default EngineWorkflowExecutorSandbox;
