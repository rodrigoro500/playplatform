class EngineRegistryEvents {
  static MODULE_REGISTERED = "MODULE_REGISTERED";

  static MODULE_UNREGISTERED = "MODULE_UNREGISTERED";

  static MODULE_ENABLED = "MODULE_ENABLED";

  static MODULE_DISABLED = "MODULE_DISABLED";

  static MODULE_TOGGLED = "MODULE_TOGGLED";

  static MODULE_METADATA_UPDATED = "MODULE_METADATA_UPDATED";

  static ENGINE_REGISTRY_CLEARED = "ENGINE_REGISTRY_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createModuleRegisteredEvent(module) {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.MODULE_REGISTERED,
      {
        module,
      }
    );
  }

  static createModuleUnregisteredEvent(id) {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.MODULE_UNREGISTERED,
      {
        id,
      }
    );
  }

  static createModuleEnabledEvent(id) {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.MODULE_ENABLED,
      {
        id,
      }
    );
  }

  static createModuleDisabledEvent(id) {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.MODULE_DISABLED,
      {
        id,
      }
    );
  }

  static createModuleToggledEvent(
    id,
    enabled
  ) {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.MODULE_TOGGLED,
      {
        id,
        enabled,
      }
    );
  }

  static createModuleMetadataUpdatedEvent(
    id,
    metadata
  ) {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.MODULE_METADATA_UPDATED,
      {
        id,
        metadata,
      }
    );
  }

  static createEngineRegistryClearedEvent() {
    return EngineRegistryEvents.createEvent(
      EngineRegistryEvents.ENGINE_REGISTRY_CLEARED,
      {}
    );
  }
}

export default EngineRegistryEvents;
