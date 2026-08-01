class EngineWorkflowExecutor {
  constructor({
    manager = null,
    workflowManager = null,
  } = {}) {
    this.manager = manager;
    this.workflowManager = workflowManager;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setWorkflowManager(workflowManager) {
    this.workflowManager = workflowManager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineWorkflowExecutor requiere manager."
      );
    }

    if (!this.workflowManager) {
      throw new Error(
        "EngineWorkflowExecutor requiere workflowManager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  executeWorkflow(name, ...args) {
    if (!this.workflowManager) {
      throw new Error(
        "EngineWorkflowExecutor requiere workflowManager."
      );
    }

    const workflow =
      this.workflowManager.getWorkflow(name);

    if (typeof workflow === "function") {
      return workflow(...args);
    }

    if (
      workflow &&
      typeof workflow.execute === "function"
    ) {
      return workflow.execute(...args);
    }

    return workflow;
  }

  hasWorkflow(name) {
    if (!this.workflowManager) {
      throw new Error(
        "EngineWorkflowExecutor requiere workflowManager."
      );
    }

    return this.workflowManager.hasWorkflow(name);
  }

  getWorkflowManager() {
    return this.workflowManager;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      hasWorkflowManager: this.workflowManager !== null,
    };
  }

  reset() {
    this.manager = null;
    this.workflowManager = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasWorkflowManager: this.workflowManager !== null,
    };
  }
}

export default EngineWorkflowExecutor;
