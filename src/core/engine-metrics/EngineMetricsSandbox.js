import EngineMetrics from "./EngineMetrics";
import EngineMetricsEvents from "./EngineMetricsEvents";

class EngineMetricsSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE METRICS SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const metrics =
      new EngineMetrics();

    console.log("2. Crear una instancia de EngineMetrics:");
    console.log(metrics.toJSON());

    this.assert(
      metrics.isInitialized() === false,
      "EngineMetrics debe iniciar sin inicializar."
    );

    const initialJSON =
      metrics.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        Object.keys(initialJSON.metrics).length === 0,
      "EngineMetrics debe iniciar sin metricas."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: metrics.isInitialized(),
      json: initialJSON,
    });

    metrics.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(metrics.getStatus());

    const initialized =
      metrics.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      metrics.isInitialized() === true,
      "EngineMetrics debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: metrics.isInitialized(),
    });

    metrics
      .setMetric("players", 5)
      .setMetric("tables", 2)
      .setMetric("games", 1);

    console.log("6. Ejecutar setMetric():");
    console.log(metrics.getMetrics());

    const players =
      metrics.getMetric("players");
    const tables =
      metrics.getMetric("tables");
    const games =
      metrics.getMetric("games");

    this.assert(
      players === 5 &&
        tables === 2 &&
        games === 1,
      "getMetric() debe devolver los valores registrados."
    );

    console.log("7. Ejecutar getMetric():");
    console.log({
      players,
      tables,
      games,
    });

    const hasPlayers =
      metrics.hasMetric("players");
    const hasUnknown =
      metrics.hasMetric("unknown");

    this.assert(
      hasPlayers === true,
      "hasMetric(\"players\") debe devolver true."
    );
    this.assert(
      hasUnknown === false,
      "hasMetric(\"unknown\") debe devolver false."
    );

    console.log("8. Ejecutar hasMetric():");
    console.log({
      players: hasPlayers,
      unknown: hasUnknown,
    });

    const allMetrics =
      metrics.getMetrics();

    console.log("9. Obtener getMetrics():");
    console.log(allMetrics);

    const status =
      metrics.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(status);

    const metricsJSON =
      metrics.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(metricsJSON);

    const removedMetric =
      metrics.removeMetric("tables");

    this.assert(
      removedMetric === true,
      "removeMetric() debe devolver true."
    );
    this.assert(
      metrics.hasMetric("tables") === false,
      "tables debe quedar removida."
    );

    console.log("12. Ejecutar removeMetric(\"tables\") y verificar getMetrics():");
    console.log({
      removedMetric,
      metrics: metrics.getMetrics(),
    });

    const clearedMetrics =
      metrics.clearMetrics();

    this.assert(
      clearedMetrics === true,
      "clearMetrics() debe devolver true."
    );
    this.assert(
      Object.keys(metrics.getMetrics()).length === 0,
      "getMetrics() debe quedar vacio tras clearMetrics."
    );

    console.log("13. Ejecutar clearMetrics() y verificar getMetrics():");
    console.log({
      clearedMetrics,
      metrics: metrics.getMetrics(),
    });

    const events = [
      EngineMetricsEvents.createEngineMetricsInitializedEvent(),
      EngineMetricsEvents.createEngineMetricSetEvent("players", 5),
      EngineMetricsEvents.createEngineMetricRemovedEvent("tables"),
      EngineMetricsEvents.createEngineMetricsClearedEvent(),
      EngineMetricsEvents.createEngineMetricsResetEvent(),
    ];

    console.log("14. Crear eventos utilizando EngineMetricsEvents:");
    console.log(events);

    const reset =
      metrics.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      metrics.toJSON();

    this.assert(
      metrics.isInitialized() === false,
      "EngineMetrics debe quedar sin inicializar tras reset."
    );
    this.assert(
      Object.keys(metrics.getMetrics()).length === 0,
      "getMetrics() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        Object.keys(resetJSON.metrics).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("16. Verificar nuevamente isInitialized(), getMetrics() y toJSON():");
    console.log({
      initialized: metrics.isInitialized(),
      metrics: metrics.getMetrics(),
      json: resetJSON,
    });

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      players,
      tables,
      games,
      hasPlayers,
      hasUnknown,
      allMetrics,
      status,
      metricsJSON,
      removedMetric,
      clearedMetrics,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE METRICS SANDBOX OK =====");
  }
}

new EngineMetricsSandbox();

export default EngineMetricsSandbox;
