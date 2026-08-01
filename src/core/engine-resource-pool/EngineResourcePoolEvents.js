class EngineResourcePoolEvents {
  static ENGINE_RESOURCE_POOL_INITIALIZED = "ENGINE_RESOURCE_POOL_INITIALIZED";
  static ENGINE_RESOURCE_REGISTERED = "ENGINE_RESOURCE_REGISTERED";
  static ENGINE_RESOURCE_ACQUIRED = "ENGINE_RESOURCE_ACQUIRED";
  static ENGINE_RESOURCE_RELEASED = "ENGINE_RESOURCE_RELEASED";
  static ENGINE_RESOURCE_REMOVED = "ENGINE_RESOURCE_REMOVED";
  static ENGINE_RESOURCE_POOL_CLEARED = "ENGINE_RESOURCE_POOL_CLEARED";
  static ENGINE_RESOURCE_POOL_RESET = "ENGINE_RESOURCE_POOL_RESET";

  static createEngineResourcePoolInitializedEvent() {
    return {
      type: this.ENGINE_RESOURCE_POOL_INITIALIZED,
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

  static createEngineResourceAcquiredEvent(
    name,
    resource
  ) {
    return {
      type: this.ENGINE_RESOURCE_ACQUIRED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
        resource,
      },
    };
  }

  static createEngineResourceReleasedEvent(name) {
    return {
      type: this.ENGINE_RESOURCE_RELEASED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineResourceRemovedEvent(name) {
    return {
      type: this.ENGINE_RESOURCE_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        name,
      },
    };
  }

  static createEngineResourcePoolClearedEvent() {
    return {
      type: this.ENGINE_RESOURCE_POOL_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineResourcePoolResetEvent() {
    return {
      type: this.ENGINE_RESOURCE_POOL_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineResourcePoolEvents;
