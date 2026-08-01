import EnginePipeline from "./EnginePipeline";
import EnginePipelineEvents from "./EnginePipelineEvents";

class EnginePipelineSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE PIPELINE SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const pipeline = new EnginePipeline();
    console.log("2. Crear EnginePipeline:");
    console.log(pipeline.toJSON());

    this.assert(pipeline.isInitialized() === false, "EnginePipeline debe iniciar sin inicializar.");
    const initialJSON = pipeline.toJSON();
    this.assert(
      initialJSON.initialized === false &&
        initialJSON.stages === 0 &&
        initialJSON.hasStages === false &&
        initialJSON.pipeline.length === 0,
      "EnginePipeline debe iniciar sin etapas."
    );
    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: pipeline.isInitialized(),
      json: initialJSON,
    });

    pipeline.setManager(manager);
    console.log("4. Ejecutar setManager():");
    console.log(pipeline.getStatus());

    const initialized = pipeline.initialize();
    this.assert(initialized === true, "initialize() debe devolver true.");
    this.assert(pipeline.isInitialized() === true, "EnginePipeline debe quedar inicializado.");
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: pipeline.isInitialized(),
    });

    const validationStage = pipeline.addStage("Validation");
    const executionStage = pipeline.addStage("Execution");
    const settlementStage = pipeline.addStage("Settlement");
    console.log("6. Ejecutar addStage():");
    console.log({
      validationStage,
      executionStage,
      settlementStage,
    });

    const firstStage = pipeline.getStage(0);
    this.assert(firstStage === "Validation", "getStage(0) debe devolver Validation.");
    console.log("7. Ejecutar getStage(0):");
    console.log(firstStage);

    const sizeAfterAdd = pipeline.size();
    this.assert(sizeAfterAdd === 3, "size() debe devolver 3 despues de addStage.");
    console.log("8. Ejecutar size():");
    console.log(sizeAfterAdd);

    const hasStagesAfterAdd = pipeline.hasStages();
    this.assert(hasStagesAfterAdd === true, "hasStages() debe devolver true con etapas.");
    console.log("9. Ejecutar hasStages():");
    console.log(hasStagesAfterAdd);

    const stagesAfterAdd = pipeline.getStages();
    this.assert(stagesAfterAdd.length === 3, "getStages() debe devolver tres etapas.");
    console.log("10. Ejecutar getStages():");
    console.log(stagesAfterAdd);

    const status = pipeline.getStatus();
    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const pipelineJSON = pipeline.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(pipelineJSON);

    const removed = pipeline.removeStage("Execution");
    this.assert(removed === true, 'removeStage("Execution") debe devolver true.');
    this.assert(
      pipeline.size() === 2 && !pipeline.getStages().includes("Execution"),
      "Execution debe quedar removida."
    );
    const stagesAfterRemove = pipeline.getStages();
    console.log('13. Ejecutar removeStage("Execution") y verificar size() y getStages():');
    console.log({
      removed,
      size: pipeline.size(),
      stages: stagesAfterRemove,
    });

    const cleared = pipeline.clear();
    this.assert(cleared === true, "clear() debe devolver true.");
    console.log("14. Ejecutar clear():");
    console.log(cleared);

    const hasStagesAfterClear = pipeline.hasStages();
    this.assert(hasStagesAfterClear === false, "hasStages() debe devolver false despues de clear.");
    console.log("15. Ejecutar hasStages():");
    console.log(hasStagesAfterClear);

    const sizeAfterClear = pipeline.size();
    this.assert(sizeAfterClear === 0, "size() debe devolver 0 despues de clear.");
    console.log("16. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EnginePipelineEvents.createEnginePipelineInitializedEvent(),
      EnginePipelineEvents.createEngineStageAddedEvent(validationStage),
      EnginePipelineEvents.createEngineStageRemovedEvent("Execution"),
      EnginePipelineEvents.createEnginePipelineClearedEvent(),
      EnginePipelineEvents.createEnginePipelineResetEvent(),
    ];
    console.log("17. Crear eventos:");
    console.log(events);

    const reset = pipeline.reset();
    this.assert(reset === true, "reset() debe devolver true.");
    console.log("18. Ejecutar reset():");
    console.log(reset);

    const resetJSON = pipeline.toJSON();
    this.assert(pipeline.isInitialized() === false, "EnginePipeline debe quedar sin inicializar tras reset.");
    this.assert(pipeline.size() === 0, "size() debe quedar en 0 tras reset.");
    this.assert(pipeline.getStages().length === 0, "getStages() debe quedar vacio tras reset.");
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.stages === 0 &&
        resetJSON.hasStages === false &&
        resetJSON.pipeline.length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("19. Verificar nuevamente isInitialized(), size(), getStages() y toJSON():");
    console.log({
      initialized: pipeline.isInitialized(),
      size: pipeline.size(),
      stages: pipeline.getStages(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      validationStage,
      executionStage,
      settlementStage,
      firstStage,
      sizeAfterAdd,
      hasStagesAfterAdd,
      stagesAfterAdd,
      status,
      pipelineJSON,
      removed,
      stagesAfterRemove,
      cleared,
      hasStagesAfterClear,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE PIPELINE SANDBOX OK =====");
  }
}

new EnginePipelineSandbox();

export default EnginePipelineSandbox;
