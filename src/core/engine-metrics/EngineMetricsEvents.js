class EngineMetricsEvents {
  static ENGINE_METRICS_INITIALIZED = "ENGINE_METRICS_INITIALIZED";
  static ENGINE_METRIC_SET = "ENGINE_METRIC_SET";
  static ENGINE_METRIC_REMOVED = "ENGINE_METRIC_REMOVED";
  static ENGINE_METRICS_CLEARED = "ENGINE_METRICS_CLEARED";
  static ENGINE_METRICS_RESET = "ENGINE_METRICS_RESET";

  static createEngineMetricsInitializedEvent() {
    return {
      type: this.ENGINE_METRICS_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMetricSetEvent(
    name,
    value
  ) {
    return {
      type: this.ENGINE_METRIC_SET,
      timestamp: new Date().toISOString(),
      payload: {
        name,
        value,
      },
    };
  }

  static createEngineMetricRemovedEvent(name) {
    return {
      type: this.ENGINE_METRIC_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineMetricsClearedEvent() {
    return {
      type: this.ENGINE_METRICS_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineMetricsResetEvent() {
    return {
      type: this.ENGINE_METRICS_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineMetricsEvents;
