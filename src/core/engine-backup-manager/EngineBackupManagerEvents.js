class EngineBackupManagerEvents {
  static ENGINE_BACKUP_MANAGER_INITIALIZED = "ENGINE_BACKUP_MANAGER_INITIALIZED";
  static ENGINE_BACKUP_CREATED = "ENGINE_BACKUP_CREATED";
  static ENGINE_BACKUP_RESTORED = "ENGINE_BACKUP_RESTORED";
  static ENGINE_BACKUP_REMOVED = "ENGINE_BACKUP_REMOVED";
  static ENGINE_BACKUP_MANAGER_RESET = "ENGINE_BACKUP_MANAGER_RESET";

  static createEngineBackupManagerInitializedEvent() {
    return {
      type: this.ENGINE_BACKUP_MANAGER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineBackupCreatedEvent(backup) {
    return {
      type: this.ENGINE_BACKUP_CREATED,
      timestamp: new Date().toISOString(),
      payload: {
        backup,
      },
    };
  }

  static createEngineBackupRestoredEvent(backup) {
    return {
      type: this.ENGINE_BACKUP_RESTORED,
      timestamp: new Date().toISOString(),
      payload: {
        backup,
      },
    };
  }

  static createEngineBackupRemovedEvent(id) {
    return {
      type: this.ENGINE_BACKUP_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        id,
      },
    };
  }

  static createEngineBackupManagerResetEvent() {
    return {
      type: this.ENGINE_BACKUP_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineBackupManagerEvents;
