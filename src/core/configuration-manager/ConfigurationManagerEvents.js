class ConfigurationManagerEvents {
  static CONFIGURATION_CREATED = "CONFIGURATION_CREATED";

  static CONFIGURATION_UPDATED = "CONFIGURATION_UPDATED";

  static CONFIGURATION_REMOVED = "CONFIGURATION_REMOVED";

  static CONFIGURATION_METADATA_UPDATED = "CONFIGURATION_METADATA_UPDATED";

  static CONFIGURATION_DESCRIPTION_UPDATED = "CONFIGURATION_DESCRIPTION_UPDATED";

  static CONFIGURATION_MANAGER_CLEARED = "CONFIGURATION_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createConfigurationCreatedEvent(configuration) {
    return ConfigurationManagerEvents.createEvent(
      ConfigurationManagerEvents.CONFIGURATION_CREATED,
      {
        configuration,
      }
    );
  }

  static createConfigurationUpdatedEvent(configuration) {
    return ConfigurationManagerEvents.createEvent(
      ConfigurationManagerEvents.CONFIGURATION_UPDATED,
      {
        configuration,
      }
    );
  }

  static createConfigurationRemovedEvent(key) {
    return ConfigurationManagerEvents.createEvent(
      ConfigurationManagerEvents.CONFIGURATION_REMOVED,
      {
        key,
      }
    );
  }

  static createConfigurationMetadataUpdatedEvent(
    key,
    metadata
  ) {
    return ConfigurationManagerEvents.createEvent(
      ConfigurationManagerEvents.CONFIGURATION_METADATA_UPDATED,
      {
        key,
        metadata,
      }
    );
  }

  static createConfigurationDescriptionUpdatedEvent(
    key,
    description
  ) {
    return ConfigurationManagerEvents.createEvent(
      ConfigurationManagerEvents.CONFIGURATION_DESCRIPTION_UPDATED,
      {
        key,
        description,
      }
    );
  }

  static createConfigurationManagerClearedEvent() {
    return ConfigurationManagerEvents.createEvent(
      ConfigurationManagerEvents.CONFIGURATION_MANAGER_CLEARED,
      {}
    );
  }
}

export default ConfigurationManagerEvents;
