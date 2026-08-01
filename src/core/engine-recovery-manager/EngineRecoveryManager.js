class EngineRecoveryManager {
  constructor({
    manager = null,
    healthManager = null,
    snapshotManager = null,
  } = {}) {
    this.manager = manager;
    this.healthManager = healthManager;
    this.snapshotManager = snapshotManager;
    this.recoveryHistory = [];
    this.lastRecovery = null;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setHealthManager(healthManager) {
    this.healthManager = healthManager;

    return this;
  }

  setSnapshotManager(snapshotManager) {
    this.snapshotManager = snapshotManager;

    return this;
  }

  recover() {
    if (!this.manager) {
      throw new Error(
        "EngineRecoveryManager requiere manager."
      );
    }

    if (!this.healthManager) {
      throw new Error(
        "EngineRecoveryManager requiere healthManager."
      );
    }

    const report = {
      id: this.recoveryHistory.length + 1,
      timestamp: new Date().toISOString(),
      success: true,
      manager: !!this.manager,
      healthManager: !!this.healthManager,
      snapshotManager: !!this.snapshotManager,
    };

    this.lastRecovery = report;
    this.recoveryHistory.push(report);

    return report;
  }

  canRecover() {
    return Boolean(
      this.manager &&
        this.healthManager
    );
  }

  getRecoveryHistory() {
    return this.recoveryHistory;
  }

  getLastRecovery() {
    return this.lastRecovery;
  }

  clearHistory() {
    this.recoveryHistory = [];
    this.lastRecovery = null;

    return true;
  }

  getStatus() {
    return {
      manager: !!this.manager,
      healthManager: !!this.healthManager,
      snapshotManager: !!this.snapshotManager,
      recoveryCount: this.recoveryHistory.length,
      canRecover: this.canRecover(),
    };
  }

  reset() {
    this.manager = null;
    this.healthManager = null;
    this.snapshotManager = null;
    this.recoveryHistory = [];
    this.lastRecovery = null;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      lastRecovery: this.lastRecovery,
      recoveryHistory: this.recoveryHistory,
    };
  }
}

export default EngineRecoveryManager;
