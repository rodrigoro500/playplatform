import EngineDiagnostics from "./EngineDiagnostics";
import EngineDiagnosticsEvents from "./EngineDiagnosticsEvents";

class EngineDiagnosticsSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE DIAGNOSTICS SANDBOX =====");

    const manager = {
      getSystemStatus() {
        return {
          engine: "running",
          modules: 40,
          uptime: 1200,
          healthy: true,
        };
      },
    };

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const diagnostics =
      new EngineDiagnostics();

    console.log("2. Crear una instancia de EngineDiagnostics:");
    console.log(diagnostics.toJSON());

    this.assert(
      diagnostics.isInitialized() === false,
      "EngineDiagnostics debe iniciar sin inicializar."
    );

    const initialJSON =
      diagnostics.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.managerAssigned === false,
      "EngineDiagnostics debe iniciar sin manager asignado."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: diagnostics.isInitialized(),
      json: initialJSON,
    });

    diagnostics.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(diagnostics.toJSON());

    const initialized =
      diagnostics.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      diagnostics.isInitialized() === true,
      "EngineDiagnostics debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: diagnostics.isInitialized(),
    });

    const diagnosticsResult =
      diagnostics.runDiagnostics();

    this.assert(
      diagnosticsResult.engine === "running" &&
        diagnosticsResult.modules === 40 &&
        diagnosticsResult.healthy === true,
      "runDiagnostics() debe devolver el estado del manager."
    );

    console.log("6. Ejecutar runDiagnostics():");
    console.log(diagnosticsResult);

    const report =
      diagnostics.getReport();

    this.assert(
      typeof report.timestamp === "string" &&
        report.timestamp.trim() !== "" &&
        report.diagnostics.engine === "running",
      "getReport() debe devolver timestamp y diagnosticos."
    );

    console.log("7. Ejecutar getReport():");
    console.log(report);

    const diagnosticsJSON =
      diagnostics.toJSON();

    console.log("8. Serializar utilizando toJSON():");
    console.log(diagnosticsJSON);

    const events = [
      EngineDiagnosticsEvents.createEngineDiagnosticsInitializedEvent(),
      EngineDiagnosticsEvents.createEngineDiagnosticsExecutedEvent(
        diagnosticsResult
      ),
      EngineDiagnosticsEvents.createEngineDiagnosticsReportGeneratedEvent(
        report
      ),
      EngineDiagnosticsEvents.createEngineDiagnosticsResetEvent(),
    ];

    console.log("9. Crear eventos utilizando EngineDiagnosticsEvents:");
    console.log(events);

    const reset =
      diagnostics.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("10. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      diagnostics.toJSON();

    this.assert(
      diagnostics.isInitialized() === false,
      "EngineDiagnostics debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.managerAssigned === false,
      "EngineDiagnostics debe limpiar manager tras reset."
    );

    console.log("11. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: diagnostics.isInitialized(),
      json: resetJSON,
    });

    console.log("12. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      diagnosticsResult,
      report,
      diagnosticsJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE DIAGNOSTICS SANDBOX OK =====");
  }
}

new EngineDiagnosticsSandbox();

export default EngineDiagnosticsSandbox;
