class EngineBackupManager {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.backups = [];
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineBackupManager requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  createBackup() {
    if (!this.manager) {
      throw new Error(
        "EngineBackupManager requiere manager."
      );
    }

    const backup = {
      id: this.backups.length + 1,
      timestamp: new Date().toISOString(),
      snapshot: this.manager.toJSON(),
    };

    this.backups.push(backup);

    return backup;
  }

  restoreBackup(id) {
    const backup = this.backups.find(currentBackup =>
      currentBackup.id === id
    );

    if (!backup) {
      throw new Error(
        `Backup con id ${id} no existe.`
      );
    }

    return backup.snapshot;
  }

  removeBackup(id) {
    const backup = this.backups.find(currentBackup =>
      currentBackup.id === id
    );

    if (!backup) {
      throw new Error(
        `Backup con id ${id} no existe.`
      );
    }

    this.backups = this.backups.filter(currentBackup =>
      currentBackup.id !== id
    );

    return true;
  }

  getBackups() {
    return [...this.backups];
  }

  getStatus() {
    return {
      initialized: this.initialized,
      backups: this.backups.length,
    };
  }

  reset() {
    this.manager = null;
    this.backups = [];
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      backups: this.backups.length,
    };
  }
}

export default EngineBackupManager;
