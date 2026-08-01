class PluginManagerValidator {
  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validatePlugin(plugin) {
    if (
      plugin === null ||
      typeof plugin !== "object" ||
      Array.isArray(plugin)
    ) {
      throw new Error(
        "El plugin debe ser un objeto valido."
      );
    }

    PluginManagerValidator.validateText(
      plugin.id,
      "El id del plugin debe ser un string no vacio."
    );
    PluginManagerValidator.validateText(
      plugin.name,
      "El nombre del plugin debe ser un string no vacio."
    );
    PluginManagerValidator.validateText(
      plugin.version,
      "La version del plugin debe ser un string no vacio."
    );

    if (typeof plugin.enabled !== "boolean") {
      throw new Error(
        "enabled del plugin debe ser boolean."
      );
    }

    PluginManagerValidator.validateMetadata(
      plugin.metadata
    );
    PluginManagerValidator.validateText(
      plugin.createdAt,
      "El createdAt del plugin debe ser un string no vacio."
    );
    PluginManagerValidator.validateText(
      plugin.updatedAt,
      "El updatedAt del plugin debe ser un string no vacio."
    );
  }

  static validatePlugins(plugins) {
    if (!(plugins instanceof Map)) {
      throw new Error(
        "Los plugins deben ser una instancia de Map."
      );
    }

    plugins.forEach(plugin =>
      PluginManagerValidator.validatePlugin(plugin)
    );
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del plugin debe ser un objeto valido."
      );
    }
  }

  static validatePluginManager(pluginManager) {
    if (
      pluginManager === null ||
      typeof pluginManager !== "object" ||
      Array.isArray(pluginManager)
    ) {
      throw new Error(
        "El PluginManager debe ser un objeto valido."
      );
    }

    PluginManagerValidator.validatePlugins(
      pluginManager.plugins
    );
  }
}

export default PluginManagerValidator;
