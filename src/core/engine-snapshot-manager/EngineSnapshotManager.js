class EngineSnapshotManager {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.snapshots = [];
    this.lastSnapshot = null;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  createSnapshot(data = {}) {
    if (!this.manager) {
      throw new Error(
        "EngineSnapshotManager requiere manager."
      );
    }

    const snapshot = {
      id: this.snapshots.length + 1,
      timestamp: new Date().toISOString(),
      data,
    };

    this.lastSnapshot = snapshot;
    this.snapshots.push(snapshot);

    return snapshot;
  }

  restoreSnapshot(id) {
    const snapshot =
      this.getSnapshot(id);

    if (!snapshot) {
      throw new Error(
        `Snapshot con id ${id} no existe.`
      );
    }

    this.lastSnapshot = snapshot;

    return snapshot;
  }

  getSnapshot(id) {
    return this.snapshots.find(snapshot =>
      snapshot.id === id
    ) || null;
  }

  getSnapshots() {
    return this.snapshots;
  }

  getLastSnapshot() {
    return this.lastSnapshot;
  }

  deleteSnapshot(id) {
    const snapshot =
      this.getSnapshot(id);

    if (!snapshot) {
      throw new Error(
        `Snapshot con id ${id} no existe.`
      );
    }

    this.snapshots = this.snapshots.filter(currentSnapshot =>
      currentSnapshot.id !== id
    );

    if (this.lastSnapshot === snapshot) {
      this.lastSnapshot = null;
    }

    return true;
  }

  clearSnapshots() {
    this.snapshots = [];
    this.lastSnapshot = null;

    return true;
  }

  getStatus() {
    return {
      manager: !!this.manager,
      snapshotCount: this.snapshots.length,
      hasLastSnapshot: this.lastSnapshot !== null,
    };
  }

  reset() {
    this.manager = null;
    this.snapshots = [];
    this.lastSnapshot = null;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      lastSnapshot: this.lastSnapshot,
      snapshots: this.snapshots,
    };
  }
}

export default EngineSnapshotManager;
