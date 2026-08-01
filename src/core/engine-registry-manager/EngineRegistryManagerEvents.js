class EngineRegistryManagerEvents {
  static ENGINE_REGISTRY_MANAGER_INITIALIZED = "ENGINE_REGISTRY_MANAGER_INITIALIZED";
  static ENGINE_RESOURCE_REGISTERED = "ENGINE_RESOURCE_REGISTERED";
  static ENGINE_RESOURCE_UNREGISTERED = "ENGINE_RESOURCE_UNREGISTERED";
  static ENGINE_REGISTRY_CLEARED = "ENGINE_REGISTRY_CLEARED";
  static ENGINE_REGISTRY_MANAGER_RESET = "ENGINE_REGISTRY_MANAGER_RESET";

  static createEngineRegistryManagerInitializedEvent() {
    return {
      type: this.ENGINE_REGISTRY_MANAGER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineResourceRegisteredEvent(
    name,
    resource
  ) {
    return {
      type: this.ENGINE_RESOURCE_REGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
        resource,
      },
    };
  }

  static createEngineResourceUnregisteredEvent(name) {
    return {
      type: this.ENGINE_RESOURCE_UNREGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineRegistryClearedEvent() {
    return {
      type: this.ENGINE_REGISTRY_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineRegistryManagerResetEvent() {
    return {
      type: this.ENGINE_REGISTRY_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineRegistryManagerEvents;
