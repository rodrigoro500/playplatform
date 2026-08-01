class EngineSettlementCoordinatorEvents {
  static ENGINE_SETTLEMENT_COORDINATOR_INITIALIZED = "ENGINE_SETTLEMENT_COORDINATOR_INITIALIZED";
  static ENGINE_SETTLEMENT_EXECUTED = "ENGINE_SETTLEMENT_EXECUTED";
  static ENGINE_SETTLEMENT_RESULTS_CLEARED = "ENGINE_SETTLEMENT_RESULTS_CLEARED";
  static ENGINE_SETTLEMENT_COORDINATOR_RESET = "ENGINE_SETTLEMENT_COORDINATOR_RESET";

  static createEngineSettlementCoordinatorInitializedEvent() {
    return {
      type: this.ENGINE_SETTLEMENT_COORDINATOR_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSettlementExecutedEvent(result) {
    return {
      type: this.ENGINE_SETTLEMENT_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: {
        result,
      },
    };
  }

  static createEngineSettlementResultsClearedEvent() {
    return {
      type: this.ENGINE_SETTLEMENT_RESULTS_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSettlementCoordinatorResetEvent() {
    return {
      type: this.ENGINE_SETTLEMENT_COORDINATOR_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineSettlementCoordinatorEvents;
