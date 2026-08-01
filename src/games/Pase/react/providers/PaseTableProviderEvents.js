class PaseTableProviderEvents {
  static PASE_TABLE_PROVIDER_INITIALIZED = "PASE_TABLE_PROVIDER_INITIALIZED";
  static PASE_TABLE_PROVIDER_RENDERED = "PASE_TABLE_PROVIDER_RENDERED";
  static PASE_TABLE_PROVIDER_DESTROYED = "PASE_TABLE_PROVIDER_DESTROYED";

  static createPaseTableProviderInitializedEvent() {
    return {
      type: this.PASE_TABLE_PROVIDER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableProviderRenderedEvent() {
    return {
      type: this.PASE_TABLE_PROVIDER_RENDERED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableProviderDestroyedEvent() {
    return {
      type: this.PASE_TABLE_PROVIDER_DESTROYED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseTableProviderEvents;
