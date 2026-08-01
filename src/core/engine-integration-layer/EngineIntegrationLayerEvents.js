class EngineIntegrationLayerEvents {
  static ENGINE_INTEGRATION_LAYER_INITIALIZED = "ENGINE_INTEGRATION_LAYER_INITIALIZED";
  static ENGINE_COMPONENT_INTEGRATED = "ENGINE_COMPONENT_INTEGRATED";
  static ENGINE_COMPONENT_REMOVED = "ENGINE_COMPONENT_REMOVED";
  static ENGINE_INTEGRATION_LAYER_RESET = "ENGINE_INTEGRATION_LAYER_RESET";

  static createEngineIntegrationLayerInitializedEvent() {
    return {
      type: this.ENGINE_INTEGRATION_LAYER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineComponentIntegratedEvent(name) {
    return {
      type: this.ENGINE_COMPONENT_INTEGRATED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineComponentRemovedEvent(name) {
    return {
      type: this.ENGINE_COMPONENT_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineIntegrationLayerResetEvent() {
    return {
      type: this.ENGINE_INTEGRATION_LAYER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineIntegrationLayerEvents;
