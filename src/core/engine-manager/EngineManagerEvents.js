class EngineManagerEvents {
  static ENGINE_MANAGER_INITIALIZED = "ENGINE_MANAGER_INITIALIZED";

  static ENGINE_MANAGER_SHUTDOWN = "ENGINE_MANAGER_SHUTDOWN";

  static ENGINE_MANAGER_RESTARTED = "ENGINE_MANAGER_RESTARTED";

  static ENGINE_MANAGER_RESET = "ENGINE_MANAGER_RESET";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineManagerInitializedEvent(status) {
    return EngineManagerEvents.createEvent(
      EngineManagerEvents.ENGINE_MANAGER_INITIALIZED,
      {
        status,
      }
    );
  }

  static createEngineManagerShutdownEvent(status) {
    return EngineManagerEvents.createEvent(
      EngineManagerEvents.ENGINE_MANAGER_SHUTDOWN,
      {
        status,
      }
    );
  }

  static createEngineManagerRestartedEvent(status) {
    return EngineManagerEvents.createEvent(
      EngineManagerEvents.ENGINE_MANAGER_RESTARTED,
      {
        status,
      }
    );
  }

  static createEngineManagerResetEvent() {
    return EngineManagerEvents.createEvent(
      EngineManagerEvents.ENGINE_MANAGER_RESET,
      {}
    );
  }
}

export default EngineManagerEvents;
