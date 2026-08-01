class EngineBootstrapEvents {
  static ENGINE_BOOTSTRAP_INITIALIZED = "ENGINE_BOOTSTRAP_INITIALIZED";

  static ENGINE_BOOTSTRAP_SHUTDOWN = "ENGINE_BOOTSTRAP_SHUTDOWN";

  static ENGINE_BOOTSTRAP_RESET = "ENGINE_BOOTSTRAP_RESET";

  static ENGINE_BOOTSTRAP_DEPENDENCY_SET = "ENGINE_BOOTSTRAP_DEPENDENCY_SET";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineBootstrapInitializedEvent(status) {
    return EngineBootstrapEvents.createEvent(
      EngineBootstrapEvents.ENGINE_BOOTSTRAP_INITIALIZED,
      {
        status,
      }
    );
  }

  static createEngineBootstrapShutdownEvent() {
    return EngineBootstrapEvents.createEvent(
      EngineBootstrapEvents.ENGINE_BOOTSTRAP_SHUTDOWN,
      {}
    );
  }

  static createEngineBootstrapResetEvent() {
    return EngineBootstrapEvents.createEvent(
      EngineBootstrapEvents.ENGINE_BOOTSTRAP_RESET,
      {}
    );
  }

  static createEngineBootstrapDependencySetEvent(
    dependency,
    value
  ) {
    return EngineBootstrapEvents.createEvent(
      EngineBootstrapEvents.ENGINE_BOOTSTRAP_DEPENDENCY_SET,
      {
        dependency,
        value,
      }
    );
  }
}

export default EngineBootstrapEvents;
