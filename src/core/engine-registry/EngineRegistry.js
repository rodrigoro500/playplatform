class EngineRegistry {
  constructor() {
    this.modules = new Map();
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
      "El id del modulo debe ser un string no vacio."
    );
  }

  validateCategory(category) {
    if (typeof category !== "string") {
      throw new Error(
        "La categoria del modulo debe ser un string."
      );
    }
  }

  validateVersion(version) {
    if (typeof version !== "string") {
      throw new Error(
        "La version del modulo debe ser un string."
      );
    }
  }

  validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del modulo debe ser un objeto valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  registerModule(
    id,
    instance,
    category = "core",
    version = "1.0.0",
    metadata = {}
  ) {
    this.validateId(id);
    this.validateCategory(category);
    this.validateVersion(version);
    this.validateMetadata(metadata);

    if (this.hasModule(id)) {
      throw new Error(
        "Ya existe un modulo con ese id."
      );
    }

    const timestamp =
      this.createTimestamp();

    const module = {
      id,
      instance,
      category,
      version,
      enabled: true,
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.modules.set(
      id,
      module
    );

    return module;
  }

  unregisterModule(id) {
    const module =
      this.getModule(id);

    this.modules.delete(id);

    return module;
  }

  getModule(id) {
    this.validateId(id);

    const module =
      this.modules.get(id);

    if (!module) {
      throw new Error(
        "No existe un modulo con ese id."
      );
    }

    return module;
  }

  getModuleInstance(id) {
    return this
      .getModule(id)
      .instance;
  }

  hasModule(id) {
    this.validateId(id);

    return this.modules.has(id);
  }

  enableModule(id) {
    const module =
      this.getModule(id);

    module.enabled = true;
    module.updatedAt =
      this.createTimestamp();

    return module;
  }

  disableModule(id) {
    const module =
      this.getModule(id);

    module.enabled = false;
    module.updatedAt =
      this.createTimestamp();

    return module;
  }

  toggleModule(id) {
    const module =
      this.getModule(id);

    module.enabled = !module.enabled;
    module.updatedAt =
      this.createTimestamp();

    return module;
  }

  isEnabled(id) {
    return this
      .getModule(id)
      .enabled;
  }

  updateMetadata(
    id,
    metadata
  ) {
    this.validateMetadata(metadata);

    const module =
      this.getModule(id);

    module.metadata = {
      ...module.metadata,
      ...metadata,
    };
    module.updatedAt =
      this.createTimestamp();

    return module;
  }

  getModules() {
    return Array.from(
      this.modules.values()
    );
  }

  getModulesByCategory(category) {
    this.validateCategory(category);

    return this
      .getModules()
      .filter(module =>
        module.category === category
      );
  }

  getEnabledModules() {
    return this
      .getModules()
      .filter(module =>
        module.enabled === true
      );
  }

  getDisabledModules() {
    return this
      .getModules()
      .filter(module =>
        module.enabled === false
      );
  }

  count() {
    return this.modules.size;
  }

  clear() {
    this.modules.clear();
  }

  serializeInstance(instance) {
    if (typeof instance === "function") {
      return null;
    }

    if (
      instance === null ||
      typeof instance !== "object"
    ) {
      return instance;
    }

    return Object.fromEntries(
      Object
        .entries(instance)
        .filter(([, value]) =>
          typeof value !== "function"
        )
    );
  }

  toJSON() {
    return {
      modules: this
        .getModules()
        .map(module => ({
          id: module.id,
          instance: this.serializeInstance(
            module.instance
          ),
          category: module.category,
          version: module.version,
          enabled: module.enabled,
          metadata: {
            ...module.metadata,
          },
          createdAt: module.createdAt,
          updatedAt: module.updatedAt,
        })),
    };
  }
}

export default EngineRegistry;
