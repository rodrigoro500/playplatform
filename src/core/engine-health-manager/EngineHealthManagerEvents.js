class EngineHealthManagerEvents {
  static ENGINE_HEALTH_CHECK_COMPLETED = "ENGINE_HEALTH_CHECK_COMPLETED";

  static ENGINE_HEALTH_MANAGER_RESET = "ENGINE_HEALTH_MANAGER_RESET";

  static ENGINE_HEALTH_MANAGER_REPORT_UPDATED =
    "ENGINE_HEALTH_MANAGER_REPORT_UPDATED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineHealthCheckCompletedEvent(report) {
    return EngineHealthManagerEvents.createEvent(
      EngineHealthManagerEvents.ENGINE_HEALTH_CHECK_COMPLETED,
      {
        report,
      }
    );
  }

  static createEngineHealthManagerResetEvent() {
    return EngineHealthManagerEvents.createEvent(
      EngineHealthManagerEvents.ENGINE_HEALTH_MANAGER_RESET,
      {}
    );
  }

  static createEngineHealthManagerReportUpdatedEvent(report) {
    return EngineHealthManagerEvents.createEvent(
      EngineHealthManagerEvents.ENGINE_HEALTH_MANAGER_REPORT_UPDATED,
      {
        report,
      }
    );
  }
}

export default EngineHealthManagerEvents;
