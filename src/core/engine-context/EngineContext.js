class EngineContext {
  constructor() {
    this.context = new Map();
  }

  validateKey(key) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave del contexto debe ser un string no vacio."
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
        "La metadata del contexto debe ser un objeto valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  set(
    key,
    value,
    metadata = {}
  ) {
    this.validateKey(key);
    this.validateMetadata(metadata);

    if (this.has(key)) {
      throw new Error(
        "Ya existe una entrada de contexto con esa clave."
      );
    }

    const timestamp =
      this.createTimestamp();

    const entry = {
      key,
      value,
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.context.set(
      key,
      entry
    );

    return entry;
  }

  get(key) {
    return this
      .getEntry(key)
      .value;
  }

  has(key) {
    this.validateKey(key);

    return this.context.has(key);
  }

  remove(key) {
    const entry =
      this.getEntry(key);

    this.context.delete(key);

    return entry;
  }

  update(
    key,
    value
  ) {
    const entry =
      this.getEntry(key);

    entry.value = value;
    entry.updatedAt =
      this.createTimestamp();

    return entry;
  }

  updateMetadata(
    key,
    metadata
  ) {
    this.validateMetadata(metadata);

    const entry =
      this.getEntry(key);

    entry.metadata = {
      ...entry.metadata,
      ...metadata,
    };
    entry.updatedAt =
      this.createTimestamp();

    return entry;
  }

  getMetadata(key) {
    return {
      ...this
        .getEntry(key)
        .metadata,
    };
  }

  getKeys() {
    return Array.from(
      this.context.keys()
    );
  }

  getValues() {
    return this
      .getContext()
      .map(entry =>
        entry.value
      );
  }

  getEntries() {
    return this.getContext();
  }

  getEntry(key) {
    this.validateKey(key);

    const entry =
      this.context.get(key);

    if (!entry) {
      throw new Error(
        "No existe una entrada de contexto con esa clave."
      );
    }

    return entry;
  }

  getContext() {
    return Array.from(
      this.context.values()
    );
  }

  count() {
    return this.context.size;
  }

  clear() {
    this.context.clear();
  }

  serializeValue(value) {
    if (typeof value === "function") {
      return null;
    }

    if (
      value === null ||
      typeof value !== "object"
    ) {
      return value;
    }

    return Object.fromEntries(
      Object
        .entries(value)
        .filter(([, entryValue]) =>
          typeof entryValue !== "function"
        )
    );
  }

  toJSON() {
    return {
      context: this
        .getContext()
        .map(entry => ({
          key: entry.key,
          value: this.serializeValue(entry.value),
          metadata: {
            ...entry.metadata,
          },
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        })),
    };
  }
}

export default EngineContext;
