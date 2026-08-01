class ResourceManager {
  static STATUSES = [
    "AVAILABLE",
    "IN_USE",
    "DISABLED",
  ];

  constructor() {
    this.resources = new Map();
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
      "El id del recurso debe ser un string no vacio."
    );
  }

  validateType(type) {
    this.validateText(
      type,
      "El tipo del recurso debe ser un string no vacio."
    );
  }

  validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del recurso debe ser un objeto valido."
      );
    }
  }

  validateStatus(status) {
    if (!ResourceManager.STATUSES.includes(status)) {
      throw new Error(
        "El estado del recurso no es valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  addResource(
    id,
    type,
    value,
    metadata = {}
  ) {
    this.validateId(id);
    this.validateType(type);
    this.validateMetadata(metadata);

    if (this.hasResource(id)) {
      throw new Error(
        "Ya existe un recurso con ese id."
      );
    }

    const timestamp =
      this.createTimestamp();

    const resource = {
      id,
      type,
      value,
      metadata: {
        ...metadata,
      },
      status: "AVAILABLE",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.resources.set(
      id,
      resource
    );

    return resource;
  }

  removeResource(id) {
    const resource =
      this.getResource(id);

    this.resources.delete(id);

    return resource;
  }

  getResource(id) {
    this.validateId(id);

    const resource =
      this.resources.get(id);

    if (!resource) {
      throw new Error(
        "No existe un recurso con ese id."
      );
    }

    return resource;
  }

  getResourceValue(id) {
    return this
      .getResource(id)
      .value;
  }

  hasResource(id) {
    this.validateId(id);

    return this.resources.has(id);
  }

  updateResource(
    id,
    value
  ) {
    const resource =
      this.getResource(id);

    resource.value = value;
    resource.updatedAt =
      this.createTimestamp();

    return resource;
  }

  updateMetadata(
    id,
    metadata
  ) {
    this.validateMetadata(metadata);

    const resource =
      this.getResource(id);

    resource.metadata = {
      ...resource.metadata,
      ...metadata,
    };
    resource.updatedAt =
      this.createTimestamp();

    return resource;
  }

  setResourceStatus(
    id,
    status
  ) {
    this.validateStatus(status);

    const resource =
      this.getResource(id);

    resource.status = status;
    resource.updatedAt =
      this.createTimestamp();

    return resource;
  }

  markAsAvailable(id) {
    return this.setResourceStatus(
      id,
      "AVAILABLE"
    );
  }

  markAsInUse(id) {
    return this.setResourceStatus(
      id,
      "IN_USE"
    );
  }

  disableResource(id) {
    return this.setResourceStatus(
      id,
      "DISABLED"
    );
  }

  getResources() {
    return Array.from(
      this.resources.values()
    );
  }

  getResourcesByType(type) {
    this.validateType(type);

    return this
      .getResources()
      .filter(resource =>
        resource.type === type
      );
  }

  getResourcesByStatus(status) {
    this.validateStatus(status);

    return this
      .getResources()
      .filter(resource =>
        resource.status === status
      );
  }

  count() {
    return this.resources.size;
  }

  clear() {
    this.resources.clear();
  }

  toJSON() {
    return {
      resources: this
        .getResources()
        .map(resource => ({
          id: resource.id,
          type: resource.type,
          value: resource.value,
          metadata: {
            ...resource.metadata,
          },
          status: resource.status,
          createdAt: resource.createdAt,
          updatedAt: resource.updatedAt,
        })),
    };
  }
}

export default ResourceManager;
