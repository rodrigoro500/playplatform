class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  validateText(value, message) {
    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      throw new Error(message);
    }
  }

  validateId(id) {
    this.validateText(
      id,
      "El id del plugin debe ser un string no vacio."
    );
  }

  validateName(name) {
    this.validateText(
      name,
      "El nombre del plugin debe ser un string no vacio."
    );
  }

  validateVersion(version) {
    this.validateText(
      version,
      "La version del plugin debe ser un string no vacio."
    );
  }

  validateMetadata(metadata) {
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

  createTimestamp() {
    return new Date().toISOString();
  }

  registerPlugin(
    id,
    name,
    version,
    instance,
    metadata = {}
  ) {
    this.validateId(id);
    this.validateName(name);
    this.validateVersion(version);
    this.validateMetadata(metadata);

    if (this.hasPlugin(id)) {
      throw new Error(
        "Ya existe un plugin con ese id."
      );
    }

    const timestamp =
      this.createTimestamp();

    const plugin = {
      id,
      name,
      version,
      instance,
      enabled: true,
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.plugins.set(
      id,
      plugin
    );

    return plugin;
  }

  unregisterPlugin(id) {
    const plugin =
      this.getPlugin(id);

    this.plugins.delete(id);

    return plugin;
  }

  getPlugin(id) {
    this.validateId(id);

    const plugin =
      this.plugins.get(id);

    if (!plugin) {
      throw new Error(
        "No existe un plugin con ese id."
      );
    }

    return plugin;
  }

  getPluginInstance(id) {
    return this
      .getPlugin(id)
      .instance;
  }

  hasPlugin(id) {
    this.validateId(id);

    return this.plugins.has(id);
  }

  enablePlugin(id) {
    const plugin =
      this.getPlugin(id);

    plugin.enabled = true;
    plugin.updatedAt =
      this.createTimestamp();

    return plugin;
  }

  disablePlugin(id) {
    const plugin =
      this.getPlugin(id);

    plugin.enabled = false;
    plugin.updatedAt =
      this.createTimestamp();

    return plugin;
  }

  togglePlugin(id) {
    const plugin =
      this.getPlugin(id);

    plugin.enabled = !plugin.enabled;
    plugin.updatedAt =
      this.createTimestamp();

    return plugin;
  }

  isEnabled(id) {
    return this
      .getPlugin(id)
      .enabled;
  }

  updateMetadata(
    id,
    metadata
  ) {
    this.validateMetadata(metadata);

    const plugin =
      this.getPlugin(id);

    plugin.metadata = {
      ...plugin.metadata,
      ...metadata,
    };
    plugin.updatedAt =
      this.createTimestamp();

    return plugin;
  }

  getPlugins() {
    return Array.from(
      this.plugins.values()
    );
  }

  getEnabledPlugins() {
    return this
      .getPlugins()
      .filter(plugin =>
        plugin.enabled === true
      );
  }

  getDisabledPlugins() {
    return this
      .getPlugins()
      .filter(plugin =>
        plugin.enabled === false
      );
  }

  count() {
    return this.plugins.size;
  }

  clear() {
    this.plugins.clear();
  }

  serializePlugin(plugin) {
    return {
      id: plugin.id,
      name: plugin.name,
      version: plugin.version,
      instance:
        typeof plugin.instance === "function"
          ? null
          : plugin.instance,
      enabled: plugin.enabled,
      metadata: {
        ...plugin.metadata,
      },
      createdAt: plugin.createdAt,
      updatedAt: plugin.updatedAt,
    };
  }

  toJSON() {
    return {
      plugins: this
        .getPlugins()
        .map(plugin =>
          this.serializePlugin(plugin)
        ),
    };
  }
}

export default PluginManager;
