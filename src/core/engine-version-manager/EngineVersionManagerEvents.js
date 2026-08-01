class EngineVersionManagerEvents {
  static ENGINE_VERSION_CHANGED = "ENGINE_VERSION_CHANGED";
  static ENGINE_SUPPORTED_VERSION_ADDED = "ENGINE_SUPPORTED_VERSION_ADDED";
  static ENGINE_SUPPORTED_VERSION_REMOVED = "ENGINE_SUPPORTED_VERSION_REMOVED";
  static ENGINE_VERSION_REGISTERED = "ENGINE_VERSION_REGISTERED";
  static ENGINE_VERSION_MANAGER_RESET = "ENGINE_VERSION_MANAGER_RESET";

  static createEngineVersionChangedEvent(version) {
    return {
      type: this.ENGINE_VERSION_CHANGED,
      timestamp: new Date().toISOString(),
      payload: {
        version,
      },
    };
  }

  static createEngineSupportedVersionAddedEvent(version) {
    return {
      type: this.ENGINE_SUPPORTED_VERSION_ADDED,
      timestamp: new Date().toISOString(),
      payload: {
        version,
      },
    };
  }

  static createEngineSupportedVersionRemovedEvent(version) {
    return {
      type: this.ENGINE_SUPPORTED_VERSION_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        version,
      },
    };
  }

  static createEngineVersionRegisteredEvent(record) {
    return {
      type: this.ENGINE_VERSION_REGISTERED,
      timestamp: new Date().toISOString(),
      payload: {
        record,
      },
    };
  }

  static createEngineVersionManagerResetEvent() {
    return {
      type: this.ENGINE_VERSION_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineVersionManagerEvents;
