class EngineVersionManager {
  constructor({
    manager = null,
    currentVersion = "1.0.0",
    supportedVersions = ["1.0.0"],
  } = {}) {
    this.manager = manager;
    this.currentVersion = currentVersion;
    this.supportedVersions = supportedVersions;
    this.versionHistory = [];
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  validateVersion(version) {
    if (
      typeof version !== "string" ||
      version.trim() === ""
    ) {
      throw new Error(
        "La version debe ser un string no vacio."
      );
    }
  }

  setCurrentVersion(version) {
    this.validateVersion(version);
    this.currentVersion = version;

    return this;
  }

  addSupportedVersion(version) {
    this.validateVersion(version);

    if (!this.supportedVersions.includes(version)) {
      this.supportedVersions.push(version);
    }

    return this;
  }

  removeSupportedVersion(version) {
    this.supportedVersions = this.supportedVersions.filter(
      supportedVersion => supportedVersion !== version
    );

    return true;
  }

  isVersionSupported(version) {
    return this.supportedVersions.includes(version);
  }

  registerVersion() {
    if (!this.manager) {
      throw new Error(
        "EngineVersionManager requiere manager."
      );
    }

    const record = {
      id: this.versionHistory.length + 1,
      timestamp: new Date().toISOString(),
      version: this.currentVersion,
    };

    this.versionHistory.push(record);

    return record;
  }

  getCurrentVersion() {
    return this.currentVersion;
  }

  getSupportedVersions() {
    return this.supportedVersions;
  }

  getVersionHistory() {
    return this.versionHistory;
  }

  getStatus() {
    return {
      manager: !!this.manager,
      currentVersion: this.currentVersion,
      supportedVersions: this.supportedVersions.length,
      registeredVersions: this.versionHistory.length,
    };
  }

  reset() {
    this.manager = null;
    this.currentVersion = "1.0.0";
    this.supportedVersions = ["1.0.0"];
    this.versionHistory = [];

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      currentVersion: this.currentVersion,
      supportedVersions: this.supportedVersions,
      versionHistory: this.versionHistory,
    };
  }
}

export default EngineVersionManager;
