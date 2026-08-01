class EngineWorkflowValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineWorkflow manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineWorkflow manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineWorkflow initialized debe ser boolean."
      );
    }
  }

  static validateWorkflowName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del workflow debe ser un string no vacio."
      );
    }
  }

  static validateWorkflow(workflow) {
    if (workflow === undefined) {
      throw new Error(
        "El workflow no puede ser undefined."
      );
    }
  }

  static validateWorkflowRegistry(workflows) {
    if (!(workflows instanceof Map)) {
      throw new Error(
        "workflows debe ser una instancia de Map."
      );
    }

    workflows.forEach((workflow, name) => {
      EngineWorkflowValidator.validateWorkflowName(
        name
      );
      EngineWorkflowValidator.validateWorkflow(
        workflow
      );
    });
  }

  static validateEngineWorkflow(engineWorkflow) {
    if (
      engineWorkflow === null ||
      typeof engineWorkflow !== "object"
    ) {
      throw new Error(
        "EngineWorkflow debe ser un objeto valido."
      );
    }

    EngineWorkflowValidator.validateManager(
      engineWorkflow.manager
    );
    EngineWorkflowValidator.validateInitialized(
      engineWorkflow.initialized
    );
    EngineWorkflowValidator.validateWorkflowRegistry(
      engineWorkflow.workflows
    );
  }
}

export default EngineWorkflowValidator;
