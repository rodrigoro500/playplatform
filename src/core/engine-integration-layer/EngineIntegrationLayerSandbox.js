import EngineIntegrationLayer from "./EngineIntegrationLayer";
import EngineIntegrationLayerEvents from "./EngineIntegrationLayerEvents";

class EngineIntegrationLayerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createOrchestrator() {
    const components = new Map();

    return {
      registerComponent(name, component) {
        components.set(
          name,
          component
        );

        return this;
      },

      getComponent(name) {
        if (!components.has(name)) {
          throw new Error(
            "El componente no existe."
          );
        }

        return components.get(name);
      },

      hasComponent(name) {
        return components.has(name);
      },

      removeComponent(name) {
        if (!components.has(name)) {
          throw new Error(
            "El componente no existe."
          );
        }

        components.delete(name);

        return true;
      },

      size() {
        return components.size;
      },

      getComponents() {
        return Object.fromEntries(
          components
        );
      },
    };
  }

  run() {
    console.log("===== ENGINE INTEGRATION LAYER SANDBOX =====");

    const manager = {};
    console.log("Crear manager:");
    console.log(manager);

    const orchestrator =
      this.createOrchestrator();
    console.log("Crear Orchestrator simulado:");
    console.log(orchestrator.getComponents());

    const integrationLayer =
      new EngineIntegrationLayer();
    console.log("Crear EngineIntegrationLayer:");
    console.log(integrationLayer.toJSON());

    integrationLayer.setManager(manager);
    integrationLayer.setOrchestrator(orchestrator);

    const initialized =
      integrationLayer.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      integrationLayer.isInitialized() === true,
      "EngineIntegrationLayer debe quedar inicializado."
    );
    console.log("Inicializar:");
    console.log({
      initialized,
      isInitialized: integrationLayer.isInitialized(),
    });

    integrationLayer.register("Wallet", {});
    integrationLayer.register("Round", {});
    integrationLayer.register("Pipeline", {});
    integrationLayer.register("Workflow", {});
    integrationLayer.register("Statistics", {});
    this.assert(
      integrationLayer.has("Wallet") === true &&
        integrationLayer.has("Statistics") === true,
      "Los componentes deben quedar registrados."
    );
    console.log("Registrar Wallet, Round, Pipeline, Workflow y Statistics:");
    console.log(integrationLayer.getComponents());

    const round =
      integrationLayer.resolve("Round");
    this.assert(
      round !== undefined,
      "resolve(\"Round\") debe devolver el componente Round."
    );
    console.log("Resolver Round:");
    console.log(round);

    const removed =
      integrationLayer.remove("Statistics");
    this.assert(
      removed === true,
      "remove(\"Statistics\") debe devolver true."
    );
    this.assert(
      integrationLayer.has("Statistics") === false,
      "Statistics debe quedar eliminado."
    );
    console.log("Eliminar Statistics:");
    console.log({
      removed,
      components: integrationLayer.getComponents(),
    });

    const status =
      integrationLayer.getStatus();
    console.log("Consultar Status:");
    console.log(status);

    const json =
      integrationLayer.toJSON();
    console.log("Consultar JSON:");
    console.log(json);

    const events = [
      EngineIntegrationLayerEvents.createEngineIntegrationLayerInitializedEvent(),
      EngineIntegrationLayerEvents.createEngineComponentIntegratedEvent("Wallet"),
      EngineIntegrationLayerEvents.createEngineComponentIntegratedEvent("Round"),
      EngineIntegrationLayerEvents.createEngineComponentIntegratedEvent("Pipeline"),
      EngineIntegrationLayerEvents.createEngineComponentIntegratedEvent("Workflow"),
      EngineIntegrationLayerEvents.createEngineComponentIntegratedEvent("Statistics"),
      EngineIntegrationLayerEvents.createEngineComponentRemovedEvent("Statistics"),
      EngineIntegrationLayerEvents.createEngineIntegrationLayerResetEvent(),
    ];
    console.log("Crear todos los eventos:");
    console.log(events);

    const reset =
      integrationLayer.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    this.assert(
      integrationLayer.isInitialized() === false,
      "EngineIntegrationLayer debe quedar sin inicializar tras reset."
    );
    console.log("Reset:");
    console.log({
      reset,
      initialized: integrationLayer.isInitialized(),
      json: integrationLayer.toJSON(),
    });

    console.log("Mostrar resultados:");
    console.log({
      initialized,
      round,
      removed,
      status,
      json,
      events,
      reset,
    });

    console.log("===== ENGINE INTEGRATION LAYER SANDBOX OK =====");
  }
}

new EngineIntegrationLayerSandbox();

export default EngineIntegrationLayerSandbox;
