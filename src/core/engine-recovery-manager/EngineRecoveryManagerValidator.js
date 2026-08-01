class EngineRecoveryManagerValidator {
  static validateObject(
    value,
    message
  ) {
    if (
      value === null ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      throw new Error(message);
    }
  }

  static validateManager(manager) {
    EngineRecoveryManagerValidator.validateObject(
      manager,
      "El manager de EngineRecoveryManager debe ser un objeto valido."
    );
  }

  static validateHealthManager(healthManager) {
    EngineRecoveryManagerValidator.validateObject(
      healthManager,
      "El healthManager de EngineRecoveryManager debe ser un objeto valido."
    );
  }

  static validateSnapshotManager(snapshotManager) {
    if (snapshotManager === null) {
      return;
    }

    EngineRecoveryManagerValidator.validateObject(
      snapshotManager,
      "El snapshotManager de EngineRecoveryManager debe ser null o un objeto valido."
    );
  }

  static validateBoolean(
    value,
    fieldName
  ) {
    if (typeof value !== "boolean") {
      throw new Error(
        `${fieldName} de recovery debe ser boolean.`
      );
    }
  }

  static validateRecovery(recovery) {
    EngineRecoveryManagerValidator.validateObject(
      recovery,
      "El recovery debe ser un objeto valido."
    );

    if (
      typeof recovery.id !== "number" ||
      !Number.isFinite(recovery.id) ||
      recovery.id <= 0
    ) {
      throw new Error(
        "El id de recovery debe ser un numero mayor que cero."
      );
    }

    if (
      typeof recovery.timestamp !== "string" ||
      recovery.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp de recovery debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(recovery.timestamp).getTime())) {
      throw new Error(
        "El timestamp de recovery debe representar una fecha valida."
      );
    }

    EngineRecoveryManagerValidator.validateBoolean(
      recovery.success,
      "success"
    );
    EngineRecoveryManagerValidator.validateBoolean(
      recovery.manager,
      "manager"
    );
    EngineRecoveryManagerValidator.validateBoolean(
      recovery.healthManager,
      "healthManager"
    );
    EngineRecoveryManagerValidator.validateBoolean(
      recovery.snapshotManager,
      "snapshotManager"
    );
  }

  static validateRecoveryHistory(history) {
    if (!Array.isArray(history)) {
      throw new Error(
        "El recoveryHistory debe ser un Array."
      );
    }

    history.forEach(recovery =>
      EngineRecoveryManagerValidator.validateRecovery(recovery)
    );
  }

  static validateEngineRecoveryManager(engineRecoveryManager) {
    EngineRecoveryManagerValidator.validateObject(
      engineRecoveryManager,
      "EngineRecoveryManager debe ser un objeto valido."
    );

    EngineRecoveryManagerValidator.validateManager(
      engineRecoveryManager.manager
    );
    EngineRecoveryManagerValidator.validateHealthManager(
      engineRecoveryManager.healthManager
    );
    EngineRecoveryManagerValidator.validateSnapshotManager(
      engineRecoveryManager.snapshotManager
    );
    EngineRecoveryManagerValidator.validateRecoveryHistory(
      engineRecoveryManager.recoveryHistory
    );

    if (engineRecoveryManager.lastRecovery !== null) {
      EngineRecoveryManagerValidator.validateRecovery(
        engineRecoveryManager.lastRecovery
      );
    }
  }
}

export default EngineRecoveryManagerValidator;
