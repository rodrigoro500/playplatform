class EngineRecoveryManagerEvents {
  static ENGINE_RECOVERY_STARTED = "ENGINE_RECOVERY_STARTED";

  static ENGINE_RECOVERY_COMPLETED = "ENGINE_RECOVERY_COMPLETED";

  static ENGINE_RECOVERY_FAILED = "ENGINE_RECOVERY_FAILED";

  static ENGINE_RECOVERY_MANAGER_RESET = "ENGINE_RECOVERY_MANAGER_RESET";

  static ENGINE_RECOVERY_HISTORY_CLEARED = "ENGINE_RECOVERY_HISTORY_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineRecoveryStartedEvent() {
    return EngineRecoveryManagerEvents.createEvent(
      EngineRecoveryManagerEvents.ENGINE_RECOVERY_STARTED,
      {}
    );
  }

  static createEngineRecoveryCompletedEvent(recovery) {
    return EngineRecoveryManagerEvents.createEvent(
      EngineRecoveryManagerEvents.ENGINE_RECOVERY_COMPLETED,
      {
        recovery,
      }
    );
  }

  static createEngineRecoveryFailedEvent(error) {
    return EngineRecoveryManagerEvents.createEvent(
      EngineRecoveryManagerEvents.ENGINE_RECOVERY_FAILED,
      {
        error,
      }
    );
  }

  static createEngineRecoveryManagerResetEvent() {
    return EngineRecoveryManagerEvents.createEvent(
      EngineRecoveryManagerEvents.ENGINE_RECOVERY_MANAGER_RESET,
      {}
    );
  }

  static createEngineRecoveryHistoryClearedEvent() {
    return EngineRecoveryManagerEvents.createEvent(
      EngineRecoveryManagerEvents.ENGINE_RECOVERY_HISTORY_CLEARED,
      {}
    );
  }
}

export default EngineRecoveryManagerEvents;
