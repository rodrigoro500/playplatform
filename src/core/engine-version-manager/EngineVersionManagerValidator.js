class EngineVersionManagerValidator {
  static validateObject(
    value,
    message
  ) {
    if (
      value === null ||
      typeof value !== "object"
    ) {
      throw new Error(message);
    }
  }

  static validateManager(manager) {
    EngineVersionManagerValidator.validateObject(
      manager,
      "El manager de EngineVersionManager debe ser un objeto valido."
    );
  }

  static validateVersion(version) {
    if (
      typeof version !== "string" ||
      version.trim() === ""
    ) {
      throw new Error(
        "La version debe ser un string no vacio."
      );
    }

    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      throw new Error(
        "La version debe seguir el formato semantico MAJOR.MINOR.PATCH."
      );
    }
  }

  static validateSupportedVersions(supportedVersions) {
    if (!Array.isArray(supportedVersions)) {
      throw new Error(
        "supportedVersions debe ser un Array."
      );
    }

    supportedVersions.forEach(version =>
      EngineVersionManagerValidator.validateVersion(version)
    );
  }

  static validateVersionRecord(record) {
    EngineVersionManagerValidator.validateObject(
      record,
      "El registro de version debe ser un objeto valido."
    );

    if (
      typeof record.id !== "number" ||
      !Number.isFinite(record.id) ||
      record.id <= 0
    ) {
      throw new Error(
        "El id del registro de version debe ser un numero mayor que cero."
      );
    }

    if (
      typeof record.timestamp !== "string" ||
      record.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp del registro de version debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(record.timestamp).getTime())) {
      throw new Error(
        "El timestamp del registro de version debe representar una fecha valida."
      );
    }

    EngineVersionManagerValidator.validateVersion(record.version);
  }

  static validateVersionHistory(versionHistory) {
    if (!Array.isArray(versionHistory)) {
      throw new Error(
        "versionHistory debe ser un Array."
      );
    }

    versionHistory.forEach(record =>
      EngineVersionManagerValidator.validateVersionRecord(record)
    );
  }

  static validateEngineVersionManager(engineVersionManager) {
    EngineVersionManagerValidator.validateObject(
      engineVersionManager,
      "EngineVersionManager debe ser un objeto valido."
    );

    EngineVersionManagerValidator.validateManager(
      engineVersionManager.manager
    );
    EngineVersionManagerValidator.validateVersion(
      engineVersionManager.currentVersion
    );
    EngineVersionManagerValidator.validateSupportedVersions(
      engineVersionManager.supportedVersions
    );
    EngineVersionManagerValidator.validateVersionHistory(
      engineVersionManager.versionHistory
    );
  }
}

export default EngineVersionManagerValidator;
