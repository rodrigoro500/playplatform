class ServiceManagerEvents {
  static SERVICE_REGISTERED = "SERVICE_REGISTERED";

  static SERVICE_UNREGISTERED = "SERVICE_UNREGISTERED";

  static SERVICE_ACTIVATED = "SERVICE_ACTIVATED";

  static SERVICE_DEACTIVATED = "SERVICE_DEACTIVATED";

  static SERVICE_DISABLED = "SERVICE_DISABLED";

  static SERVICE_STATUS_CHANGED = "SERVICE_STATUS_CHANGED";

  static SERVICE_METADATA_UPDATED = "SERVICE_METADATA_UPDATED";

  static SERVICE_MANAGER_CLEARED = "SERVICE_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createServiceRegisteredEvent(service) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_REGISTERED,
      {
        service,
      }
    );
  }

  static createServiceUnregisteredEvent(serviceId) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_UNREGISTERED,
      {
        serviceId,
      }
    );
  }

  static createServiceActivatedEvent(serviceId) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_ACTIVATED,
      {
        serviceId,
      }
    );
  }

  static createServiceDeactivatedEvent(serviceId) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_DEACTIVATED,
      {
        serviceId,
      }
    );
  }

  static createServiceDisabledEvent(serviceId) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_DISABLED,
      {
        serviceId,
      }
    );
  }

  static createServiceStatusChangedEvent(
    serviceId,
    status
  ) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_STATUS_CHANGED,
      {
        serviceId,
        status,
      }
    );
  }

  static createServiceMetadataUpdatedEvent(
    serviceId,
    metadata
  ) {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_METADATA_UPDATED,
      {
        serviceId,
        metadata,
      }
    );
  }

  static createServiceManagerClearedEvent() {
    return ServiceManagerEvents.createEvent(
      ServiceManagerEvents.SERVICE_MANAGER_CLEARED,
      {}
    );
  }
}

export default ServiceManagerEvents;
