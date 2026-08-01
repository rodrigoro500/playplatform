class EngineCacheEvents {
  static ENGINE_CACHE_INITIALIZED = "ENGINE_CACHE_INITIALIZED";
  static ENGINE_CACHE_ENTRY_SET = "ENGINE_CACHE_ENTRY_SET";
  static ENGINE_CACHE_ENTRY_REMOVED = "ENGINE_CACHE_ENTRY_REMOVED";
  static ENGINE_CACHE_CLEARED = "ENGINE_CACHE_CLEARED";
  static ENGINE_CACHE_RESET = "ENGINE_CACHE_RESET";

  static createEngineCacheInitializedEvent() {
    return {
      type: this.ENGINE_CACHE_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineCacheEntrySetEvent(
    key,
    value
  ) {
    return {
      type: this.ENGINE_CACHE_ENTRY_SET,
      timestamp: new Date().toISOString(),
      payload: {
        key,
        value,
      },
    };
  }

  static createEngineCacheEntryRemovedEvent(key) {
    return {
      type: this.ENGINE_CACHE_ENTRY_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        key,
      },
    };
  }

  static createEngineCacheClearedEvent() {
    return {
      type: this.ENGINE_CACHE_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineCacheResetEvent() {
    return {
      type: this.ENGINE_CACHE_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineCacheEvents;
