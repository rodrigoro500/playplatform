class EngineBackupManagerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineBackupManager manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineBackupManager manager debe ser un objeto."
      );
    }

    if (typeof manager.toJSON !== "function") {
      throw new Error(
        "EngineBackupManager manager debe implementar toJSON()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineBackupManager initialized debe ser boolean."
      );
    }
  }

  static validateBackup(backup) {
    if (
      backup === null ||
      typeof backup !== "object"
    ) {
      throw new Error(
        "El backup debe ser un objeto valido."
      );
    }

    if (
      typeof backup.id !== "number" ||
      !Number.isFinite(backup.id) ||
      backup.id <= 0
    ) {
      throw new Error(
        "El id del backup debe ser un numero mayor que cero."
      );
    }

    if (
      typeof backup.timestamp !== "string" ||
      backup.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp del backup debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(backup.timestamp).getTime())) {
      throw new Error(
        "El timestamp del backup debe representar una fecha valida."
      );
    }

    if (
      backup.snapshot === null ||
      typeof backup.snapshot !== "object"
    ) {
      throw new Error(
        "El snapshot del backup debe ser un objeto no nulo."
      );
    }
  }

  static validateBackups(backups) {
    if (!Array.isArray(backups)) {
      throw new Error(
        "backups debe ser un Array."
      );
    }

    backups.forEach(backup =>
      EngineBackupManagerValidator.validateBackup(backup)
    );
  }

  static validateEngineBackupManager(engineBackupManager) {
    if (
      engineBackupManager === null ||
      typeof engineBackupManager !== "object"
    ) {
      throw new Error(
        "EngineBackupManager debe ser un objeto valido."
      );
    }

    EngineBackupManagerValidator.validateManager(
      engineBackupManager.manager
    );
    EngineBackupManagerValidator.validateInitialized(
      engineBackupManager.initialized
    );
    EngineBackupManagerValidator.validateBackups(
      engineBackupManager.backups
    );
  }
}

export default EngineBackupManagerValidator;
