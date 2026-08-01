class EngineRuntimeEvents {
  static ENGINE_RUNTIME_STARTED = "ENGINE_RUNTIME_STARTED";

  static ENGINE_RUNTIME_STOPPED = "ENGINE_RUNTIME_STOPPED";

  static ENGINE_RUNTIME_PAUSED = "ENGINE_RUNTIME_PAUSED";

  static ENGINE_RUNTIME_RESUMED = "ENGINE_RUNTIME_RESUMED";

  static ENGINE_RUNTIME_RESTARTED = "ENGINE_RUNTIME_RESTARTED";

  static ENGINE_RUNTIME_RESET = "ENGINE_RUNTIME_RESET";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineRuntimeStartedEvent(status) {
    return EngineRuntimeEvents.createEvent(
      EngineRuntimeEvents.ENGINE_RUNTIME_STARTED,
      {
        status,
      }
    );
  }

  static createEngineRuntimeStoppedEvent(status) {
    return EngineRuntimeEvents.createEvent(
      EngineRuntimeEvents.ENGINE_RUNTIME_STOPPED,
      {
        status,
      }
    );
  }

  static createEngineRuntimePausedEvent(status) {
    return EngineRuntimeEvents.createEvent(
      EngineRuntimeEvents.ENGINE_RUNTIME_PAUSED,
      {
        status,
      }
    );
  }

  static createEngineRuntimeResumedEvent(status) {
    return EngineRuntimeEvents.createEvent(
      EngineRuntimeEvents.ENGINE_RUNTIME_RESUMED,
      {
        status,
      }
    );
  }

  static createEngineRuntimeRestartedEvent(status) {
    return EngineRuntimeEvents.createEvent(
      EngineRuntimeEvents.ENGINE_RUNTIME_RESTARTED,
      {
        status,
      }
    );
  }

  static createEngineRuntimeResetEvent() {
    return EngineRuntimeEvents.createEvent(
      EngineRuntimeEvents.ENGINE_RUNTIME_RESET,
      {}
    );
  }
}

export default EngineRuntimeEvents;
