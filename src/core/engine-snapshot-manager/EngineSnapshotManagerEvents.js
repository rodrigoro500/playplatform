class EngineSnapshotManagerEvents {
  static ENGINE_SNAPSHOT_CREATED = "ENGINE_SNAPSHOT_CREATED";
  static ENGINE_SNAPSHOT_RESTORED = "ENGINE_SNAPSHOT_RESTORED";
  static ENGINE_SNAPSHOT_DELETED = "ENGINE_SNAPSHOT_DELETED";
  static ENGINE_SNAPSHOTS_CLEARED = "ENGINE_SNAPSHOTS_CLEARED";
  static ENGINE_SNAPSHOT_MANAGER_RESET = "ENGINE_SNAPSHOT_MANAGER_RESET";

  static createEngineSnapshotCreatedEvent(snapshot) {
    return {
      type: this.ENGINE_SNAPSHOT_CREATED,
      timestamp: new Date().toISOString(),
      payload: {
        snapshot,
      },
    };
  }

  static createEngineSnapshotRestoredEvent(snapshot) {
    return {
      type: this.ENGINE_SNAPSHOT_RESTORED,
      timestamp: new Date().toISOString(),
      payload: {
        snapshot,
      },
    };
  }

  static createEngineSnapshotDeletedEvent(snapshotId) {
    return {
      type: this.ENGINE_SNAPSHOT_DELETED,
      timestamp: new Date().toISOString(),
      payload: {
        snapshotId,
      },
    };
  }

  static createEngineSnapshotsClearedEvent() {
    return {
      type: this.ENGINE_SNAPSHOTS_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSnapshotManagerResetEvent() {
    return {
      type: this.ENGINE_SNAPSHOT_MANAGER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineSnapshotManagerEvents;
