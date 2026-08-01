class EngineSnapshotManagerValidator {
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
    EngineSnapshotManagerValidator.validateObject(
      manager,
      "El manager de EngineSnapshotManager debe ser un objeto valido."
    );
  }

  static validateSnapshot(snapshot) {
    EngineSnapshotManagerValidator.validateObject(
      snapshot,
      "El snapshot debe ser un objeto valido."
    );

    if (
      typeof snapshot.id !== "number" ||
      !Number.isFinite(snapshot.id) ||
      snapshot.id <= 0
    ) {
      throw new Error(
        "El id de snapshot debe ser un numero mayor que cero."
      );
    }

    if (
      typeof snapshot.timestamp !== "string" ||
      snapshot.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp de snapshot debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(snapshot.timestamp).getTime())) {
      throw new Error(
        "El timestamp de snapshot debe representar una fecha valida."
      );
    }

    EngineSnapshotManagerValidator.validateObject(
      snapshot.data,
      "La data de snapshot debe ser un objeto no nulo."
    );
  }

  static validateSnapshots(snapshots) {
    if (!Array.isArray(snapshots)) {
      throw new Error(
        "snapshots debe ser un Array."
      );
    }

    snapshots.forEach(snapshot =>
      EngineSnapshotManagerValidator.validateSnapshot(snapshot)
    );
  }

  static validateEngineSnapshotManager(engineSnapshotManager) {
    EngineSnapshotManagerValidator.validateObject(
      engineSnapshotManager,
      "EngineSnapshotManager debe ser un objeto valido."
    );

    EngineSnapshotManagerValidator.validateManager(
      engineSnapshotManager.manager
    );
    EngineSnapshotManagerValidator.validateSnapshots(
      engineSnapshotManager.snapshots
    );

    if (engineSnapshotManager.lastSnapshot !== null) {
      EngineSnapshotManagerValidator.validateSnapshot(
        engineSnapshotManager.lastSnapshot
      );
    }
  }
}

export default EngineSnapshotManagerValidator;
