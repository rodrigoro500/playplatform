class LifecycleManagerEvents {
  static COMPONENT_REGISTERED = "COMPONENT_REGISTERED";

  static COMPONENT_UNREGISTERED = "COMPONENT_UNREGISTERED";

  static COMPONENT_INITIALIZED = "COMPONENT_INITIALIZED";

  static COMPONENT_STARTED = "COMPONENT_STARTED";

  static COMPONENT_PAUSED = "COMPONENT_PAUSED";

  static COMPONENT_RESUMED = "COMPONENT_RESUMED";

  static COMPONENT_STOPPED = "COMPONENT_STOPPED";

  static COMPONENT_DESTROYED = "COMPONENT_DESTROYED";

  static COMPONENT_STATE_CHANGED = "COMPONENT_STATE_CHANGED";

  static COMPONENT_METADATA_UPDATED = "COMPONENT_METADATA_UPDATED";

  static LIFECYCLE_MANAGER_CLEARED = "LIFECYCLE_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createComponentRegisteredEvent(component) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_REGISTERED,
      {
        component,
      }
    );
  }

  static createComponentUnregisteredEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_UNREGISTERED,
      {
        componentId,
      }
    );
  }

  static createComponentInitializedEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_INITIALIZED,
      {
        componentId,
      }
    );
  }

  static createComponentStartedEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_STARTED,
      {
        componentId,
      }
    );
  }

  static createComponentPausedEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_PAUSED,
      {
        componentId,
      }
    );
  }

  static createComponentResumedEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_RESUMED,
      {
        componentId,
      }
    );
  }

  static createComponentStoppedEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_STOPPED,
      {
        componentId,
      }
    );
  }

  static createComponentDestroyedEvent(componentId) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_DESTROYED,
      {
        componentId,
      }
    );
  }

  static createComponentStateChangedEvent(
    componentId,
    state
  ) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_STATE_CHANGED,
      {
        componentId,
        state,
      }
    );
  }

  static createComponentMetadataUpdatedEvent(
    componentId,
    metadata
  ) {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.COMPONENT_METADATA_UPDATED,
      {
        componentId,
        metadata,
      }
    );
  }

  static createLifecycleManagerClearedEvent() {
    return LifecycleManagerEvents.createEvent(
      LifecycleManagerEvents.LIFECYCLE_MANAGER_CLEARED,
      {}
    );
  }
}

export default LifecycleManagerEvents;
