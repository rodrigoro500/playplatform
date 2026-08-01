class PluginManagerEvents {
  static PLUGIN_REGISTERED = "PLUGIN_REGISTERED";

  static PLUGIN_UNREGISTERED = "PLUGIN_UNREGISTERED";

  static PLUGIN_ENABLED = "PLUGIN_ENABLED";

  static PLUGIN_DISABLED = "PLUGIN_DISABLED";

  static PLUGIN_METADATA_UPDATED = "PLUGIN_METADATA_UPDATED";

  static PLUGIN_MANAGER_CLEARED = "PLUGIN_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createPluginRegisteredEvent(plugin) {
    return PluginManagerEvents.createEvent(
      PluginManagerEvents.PLUGIN_REGISTERED,
      {
        plugin,
      }
    );
  }

  static createPluginUnregisteredEvent(pluginId) {
    return PluginManagerEvents.createEvent(
      PluginManagerEvents.PLUGIN_UNREGISTERED,
      {
        pluginId,
      }
    );
  }

  static createPluginEnabledEvent(pluginId) {
    return PluginManagerEvents.createEvent(
      PluginManagerEvents.PLUGIN_ENABLED,
      {
        pluginId,
      }
    );
  }

  static createPluginDisabledEvent(pluginId) {
    return PluginManagerEvents.createEvent(
      PluginManagerEvents.PLUGIN_DISABLED,
      {
        pluginId,
      }
    );
  }

  static createPluginMetadataUpdatedEvent(
    pluginId,
    metadata
  ) {
    return PluginManagerEvents.createEvent(
      PluginManagerEvents.PLUGIN_METADATA_UPDATED,
      {
        pluginId,
        metadata,
      }
    );
  }

  static createPluginManagerClearedEvent() {
    return PluginManagerEvents.createEvent(
      PluginManagerEvents.PLUGIN_MANAGER_CLEARED,
      {}
    );
  }
}

export default PluginManagerEvents;
