class EngineWorkflowExecutorValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineWorkflowExecutor manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineWorkflowExecutor manager debe ser un objeto."
      );
    }
  }

  static validateWorkflowManager(workflowManager) {
    if (workflowManager === null) {
      throw new Error(
        "EngineWorkflowExecutor workflowManager no puede ser null."
      );
    }

    if (typeof workflowManager !== "object") {
      throw new Error(
        "EngineWorkflowExecutor workflowManager debe ser un objeto."
      );
    }

    if (typeof workflowManager.getWorkflow !== "function") {
      throw new Error(
        "EngineWorkflowExecutor workflowManager debe implementar getWorkflow()."
      );
    }

    if (typeof workflowManager.hasWorkflow !== "function") {
      throw new Error(
        "EngineWorkflowExecutor workflowManager debe implementar hasWorkflow()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineWorkflowExecutor initialized debe ser boolean."
      );
    }
  }

  static validateEngineWorkflowExecutor(engineWorkflowExecutor) {
    if (
      engineWorkflowExecutor === null ||
      typeof engineWorkflowExecutor !== "object"
    ) {
      throw new Error(
        "EngineWorkflowExecutor debe ser un objeto valido."
      );
    }

    EngineWorkflowExecutorValidator.validateManager(
      engineWorkflowExecutor.manager
    );
    EngineWorkflowExecutorValidator.validateWorkflowManager(
      engineWorkflowExecutor.workflowManager
    );
    EngineWorkflowExecutorValidator.validateInitialized(
      engineWorkflowExecutor.initialized
    );
  }
}

export default EngineWorkflowExecutorValidator;
