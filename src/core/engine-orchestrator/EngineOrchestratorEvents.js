class EngineOrchestratorEvents {
  static ENGINE_ORCHESTRATOR_INITIALIZED = "ENGINE_ORCHESTRATOR_INITIALIZED";
  static ENGINE_COMPONENT_REGISTERED = "ENGINE_COMPONENT_REGISTERED";
  static ENGINE_COMPONENT_REMOVED = "ENGINE_COMPONENT_REMOVED";
  static ENGINE_ORCHESTRATOR_CLEARED = "ENGINE_ORCHESTRATOR_CLEARED";
  static ENGINE_ORCHESTRATOR_RESET = "ENGINE_ORCHESTRATOR_RESET";

  static createEngineOrchestratorInitializedEvent() {
    return {
      type: this.ENGINE_ORCHESTRATOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineComponentRegisteredEvent(name) {
    return {
      type: this.ENGINE_COMPONENT_REGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineComponentRemovedEvent(name) {
    return {
      type: this.ENGINE_COMPONENT_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineOrchestratorClearedEvent() {
    return {
      type: this.ENGINE_ORCHESTRATOR_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineOrchestratorResetEvent() {
    return {
      type: this.ENGINE_ORCHESTRATOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineOrchestratorEvents;
