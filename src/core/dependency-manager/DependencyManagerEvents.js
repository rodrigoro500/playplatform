class DependencyManagerEvents {
  static DEPENDENCY_ADDED = "DEPENDENCY_ADDED";

  static DEPENDENCY_REMOVED = "DEPENDENCY_REMOVED";

  static DEPENDENCY_ACTIVATED = "DEPENDENCY_ACTIVATED";

  static DEPENDENCY_DEACTIVATED = "DEPENDENCY_DEACTIVATED";

  static DEPENDENCY_STATUS_CHANGED = "DEPENDENCY_STATUS_CHANGED";

  static DEPENDENCY_METADATA_UPDATED = "DEPENDENCY_METADATA_UPDATED";

  static DEPENDENCY_MANAGER_CLEARED = "DEPENDENCY_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createDependencyAddedEvent(dependency) {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_ADDED,
      {
        dependency,
      }
    );
  }

  static createDependencyRemovedEvent(dependencyId) {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_REMOVED,
      {
        dependencyId,
      }
    );
  }

  static createDependencyActivatedEvent(dependencyId) {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_ACTIVATED,
      {
        dependencyId,
      }
    );
  }

  static createDependencyDeactivatedEvent(dependencyId) {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_DEACTIVATED,
      {
        dependencyId,
      }
    );
  }

  static createDependencyStatusChangedEvent(
    dependencyId,
    status
  ) {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_STATUS_CHANGED,
      {
        dependencyId,
        status,
      }
    );
  }

  static createDependencyMetadataUpdatedEvent(
    dependencyId,
    metadata
  ) {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_METADATA_UPDATED,
      {
        dependencyId,
        metadata,
      }
    );
  }

  static createDependencyManagerClearedEvent() {
    return DependencyManagerEvents.createEvent(
      DependencyManagerEvents.DEPENDENCY_MANAGER_CLEARED,
      {}
    );
  }
}

export default DependencyManagerEvents;
