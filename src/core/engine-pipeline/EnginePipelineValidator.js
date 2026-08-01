class EnginePipelineValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EnginePipeline manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EnginePipeline manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EnginePipeline initialized debe ser boolean."
      );
    }
  }

  static validateStage(stage) {
    if (stage === undefined) {
      throw new Error(
        "La etapa no puede ser undefined."
      );
    }
  }

  static validateStages(stages) {
    if (!Array.isArray(stages)) {
      throw new Error(
        "stages debe ser un Array."
      );
    }

    stages.forEach(stage =>
      EnginePipelineValidator.validateStage(stage)
    );
  }

  static validateEnginePipeline(enginePipeline) {
    if (
      enginePipeline === null ||
      typeof enginePipeline !== "object"
    ) {
      throw new Error(
        "EnginePipeline debe ser un objeto valido."
      );
    }

    EnginePipelineValidator.validateManager(
      enginePipeline.manager
    );
    EnginePipelineValidator.validateInitialized(
      enginePipeline.initialized
    );
    EnginePipelineValidator.validateStages(
      enginePipeline.stages
    );
  }
}

export default EnginePipelineValidator;
