class ConfigurationManager {
  constructor() {
    this.configurations = new Map();
  }

  validateText(value, message) {
    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      throw new Error(message);
    }
  }

  validateKey(key) {
    this.validateText(
      key,
      "La clave de configuracion debe ser un string no vacio."
    );
  }

  validateCategory(category) {
    if (typeof category !== "string") {
      throw new Error(
        "La categoria de configuracion debe ser un string."
      );
    }
  }

  validateDescription(description) {
    if (typeof description !== "string") {
      throw new Error(
        "La descripcion de configuracion debe ser un string."
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
        "La metadata de configuracion debe ser un objeto valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  set(
    key,
    value,
    category = "general",
    description = "",
    metadata = {}
  ) {
    this.validateKey(key);
    this.validateCategory(category);
    this.validateDescription(description);
    this.validateMetadata(metadata);

    if (this.has(key)) {
      throw new Error(
        "Ya existe una configuracion con esa clave."
      );
    }

    const timestamp =
      this.createTimestamp();

    const configuration = {
      key,
      value,
      category,
      description,
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.configurations.set(
      key,
      configuration
    );

    return configuration;
  }

  get(key) {
    return this
      .getConfiguration(key)
      .value;
  }

  has(key) {
    this.validateKey(key);

    return this.configurations.has(key);
  }

  remove(key) {
    const configuration =
      this.getConfiguration(key);

    this.configurations.delete(key);

    return configuration;
  }

  update(
    key,
    value
  ) {
    const configuration =
      this.getConfiguration(key);

    configuration.value = value;
    configuration.updatedAt =
      this.createTimestamp();

    return configuration;
  }

  updateMetadata(
    key,
    metadata
  ) {
    this.validateMetadata(metadata);

    const configuration =
      this.getConfiguration(key);

    configuration.metadata = {
      ...configuration.metadata,
      ...metadata,
    };
    configuration.updatedAt =
      this.createTimestamp();

    return configuration;
  }

  setDescription(
    key,
    description
  ) {
    this.validateDescription(description);

    const configuration =
      this.getConfiguration(key);

    configuration.description = description;
    configuration.updatedAt =
      this.createTimestamp();

    return configuration;
  }

  getDescription(key) {
    return this
      .getConfiguration(key)
      .description;
  }

  getCategory(key) {
    return this
      .getConfiguration(key)
      .category;
  }

  getKeys() {
    return Array.from(
      this.configurations.keys()
    );
  }

  getValues() {
    return this
      .getConfigurations()
      .map(configuration =>
        configuration.value
      );
  }

  getEntries() {
    return Array.from(
      this.configurations.entries()
    );
  }

  getConfiguration(key) {
    this.validateKey(key);

    const configuration =
      this.configurations.get(key);

    if (!configuration) {
      throw new Error(
        "No existe una configuracion con esa clave."
      );
    }

    return configuration;
  }

  getConfigurations() {
    return Array.from(
      this.configurations.values()
    );
  }

  getConfigurationsByCategory(category) {
    this.validateCategory(category);

    return this
      .getConfigurations()
      .filter(configuration =>
        configuration.category === category
      );
  }

  count() {
    return this.configurations.size;
  }

  clear() {
    this.configurations.clear();
  }

  toJSON() {
    return {
      configurations: this
        .getConfigurations()
        .map(configuration => ({
          key: configuration.key,
          value: configuration.value,
          category: configuration.category,
          description: configuration.description,
          metadata: {
            ...configuration.metadata,
          },
          createdAt: configuration.createdAt,
          updatedAt: configuration.updatedAt,
        })),
    };
  }
}

export default ConfigurationManager;
