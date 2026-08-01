class EngineApi {
  constructor({
    facade = null,
    versionManager = null,
  } = {}) {
    this.facade = facade;
    this.versionManager = versionManager;
    this.initialized = false;
  }

  setFacade(facade) {
    this.facade = facade;

    return this;
  }

  setVersionManager(versionManager) {
    this.versionManager = versionManager;

    return this;
  }

  initialize() {
    if (!this.facade) {
      throw new Error(
        "EngineApi requiere facade."
      );
    }

    if (!this.versionManager) {
      throw new Error(
        "EngineApi requiere versionManager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getStatus() {
    if (!this.facade) {
      throw new Error(
        "EngineApi requiere facade."
      );
    }

    return this.facade.getStatus();
  }

  getHealth() {
    if (!this.facade) {
      throw new Error(
        "EngineApi requiere facade."
      );
    }

    return this.facade.getHealthStatus();
  }

  recover() {
    if (!this.facade) {
      throw new Error(
        "EngineApi requiere facade."
      );
    }

    return this.facade.recover();
  }

  getVersion() {
    if (!this.versionManager) {
      throw new Error(
        "EngineApi requiere versionManager."
      );
    }

    return this.versionManager.getCurrentVersion();
  }

  reset() {
    this.facade = null;
    this.versionManager = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      status: this.facade ? this.facade.getStatus() : null,
      version: this.versionManager ?
        this.versionManager.getCurrentVersion() :
        null,
    };
  }
}

export default EngineApi;
