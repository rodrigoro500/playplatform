class EngineDiagnosticsEvents {
  static ENGINE_DIAGNOSTICS_INITIALIZED = "ENGINE_DIAGNOSTICS_INITIALIZED";
  static ENGINE_DIAGNOSTICS_EXECUTED = "ENGINE_DIAGNOSTICS_EXECUTED";
  static ENGINE_DIAGNOSTICS_REPORT_GENERATED = "ENGINE_DIAGNOSTICS_REPORT_GENERATED";
  static ENGINE_DIAGNOSTICS_RESET = "ENGINE_DIAGNOSTICS_RESET";

  static createEngineDiagnosticsInitializedEvent() {
    return {
      type: this.ENGINE_DIAGNOSTICS_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineDiagnosticsExecutedEvent(diagnostics) {
    return {
      type: this.ENGINE_DIAGNOSTICS_EXECUTED,
      timestamp: new Date().toISOString(),
      payload: {
        diagnostics,
      },
    };
  }

  static createEngineDiagnosticsReportGeneratedEvent(report) {
    return {
      type: this.ENGINE_DIAGNOSTICS_REPORT_GENERATED,
      timestamp: new Date().toISOString(),
      payload: {
        report,
      },
    };
  }

  static createEngineDiagnosticsResetEvent() {
    return {
      type: this.ENGINE_DIAGNOSTICS_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineDiagnosticsEvents;
