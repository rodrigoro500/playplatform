class ResourceManagerEvents {
  static RESOURCE_ADDED = "RESOURCE_ADDED";

  static RESOURCE_UPDATED = "RESOURCE_UPDATED";

  static RESOURCE_REMOVED = "RESOURCE_REMOVED";

  static RESOURCE_STATUS_CHANGED = "RESOURCE_STATUS_CHANGED";

  static RESOURCE_METADATA_UPDATED = "RESOURCE_METADATA_UPDATED";

  static RESOURCE_MANAGER_CLEARED = "RESOURCE_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createResourceAddedEvent(resource) {
    return ResourceManagerEvents.createEvent(
      ResourceManagerEvents.RESOURCE_ADDED,
      {
        resource,
      }
    );
  }

  static createResourceUpdatedEvent(resource) {
    return ResourceManagerEvents.createEvent(
      ResourceManagerEvents.RESOURCE_UPDATED,
      {
        resource,
      }
    );
  }

  static createResourceRemovedEvent(resourceId) {
    return ResourceManagerEvents.createEvent(
      ResourceManagerEvents.RESOURCE_REMOVED,
      {
        resourceId,
      }
    );
  }

  static createResourceStatusChangedEvent(
    resourceId,
    status
  ) {
    return ResourceManagerEvents.createEvent(
      ResourceManagerEvents.RESOURCE_STATUS_CHANGED,
      {
        resourceId,
        status,
      }
    );
  }

  static createResourceMetadataUpdatedEvent(
    resourceId,
    metadata
  ) {
    return ResourceManagerEvents.createEvent(
      ResourceManagerEvents.RESOURCE_METADATA_UPDATED,
      {
        resourceId,
        metadata,
      }
    );
  }

  static createResourceManagerClearedEvent() {
    return ResourceManagerEvents.createEvent(
      ResourceManagerEvents.RESOURCE_MANAGER_CLEARED,
      {}
    );
  }
}

export default ResourceManagerEvents;
