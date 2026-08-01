class EngineMonitorEvents {
  static ENGINE_MONITOR_STARTED = "ENGINE_MONITOR_STARTED";

  static ENGINE_MONITOR_STOPPED = "ENGINE_MONITOR_STOPPED";

  static ENGINE_HEALTH_CHECK_COMPLETED = "ENGINE_HEALTH_CHECK_COMPLETED";

  static ENGINE_MONITOR_RESET = "ENGINE_MONITOR_RESET";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineMonitorStartedEvent(status) {
    return EngineMonitorEvents.createEvent(
      EngineMonitorEvents.ENGINE_MONITOR_STARTED,
      {
        status,
      }
    );
  }

  static createEngineMonitorStoppedEvent(status) {
    return EngineMonitorEvents.createEvent(
      EngineMonitorEvents.ENGINE_MONITOR_STOPPED,
      {
        status,
      }
    );
  }

  static createEngineHealthCheckCompletedEvent(health) {
    return EngineMonitorEvents.createEvent(
      EngineMonitorEvents.ENGINE_HEALTH_CHECK_COMPLETED,
      {
        health,
      }
    );
  }

  static createEngineMonitorResetEvent() {
    return EngineMonitorEvents.createEvent(
      EngineMonitorEvents.ENGINE_MONITOR_RESET,
      {}
    );
  }
}

export default EngineMonitorEvents;
