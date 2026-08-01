class ServiceManager {
  static STATUSES = [
    "ACTIVE",
    "INACTIVE",
    "DISABLED",
  ];

  constructor() {
    this.services = new Map();
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
      "El id del servicio debe ser un string no vacio."
    );
  }

  validateName(name) {
    this.validateText(
      name,
      "El nombre del servicio debe ser un string no vacio."
    );
  }

  validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del servicio debe ser un objeto valido."
      );
    }
  }

  validateStatus(status) {
    if (!ServiceManager.STATUSES.includes(status)) {
      throw new Error(
        "El estado del servicio no es valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  registerService(
    id,
    name,
    instance,
    metadata = {}
  ) {
    this.validateId(id);
    this.validateName(name);
    this.validateMetadata(metadata);

    if (this.hasService(id)) {
      throw new Error(
        "Ya existe un servicio con ese id."
      );
    }

    const timestamp =
      this.createTimestamp();

    const service = {
      id,
      name,
      instance,
      status: "ACTIVE",
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.services.set(
      id,
      service
    );

    return service;
  }

  unregisterService(id) {
    const service =
      this.getService(id);

    this.services.delete(id);

    return service;
  }

  getService(id) {
    this.validateId(id);

    const service =
      this.services.get(id);

    if (!service) {
      throw new Error(
        "No existe un servicio con ese id."
      );
    }

    return service;
  }

  getServiceInstance(id) {
    return this
      .getService(id)
      .instance;
  }

  hasService(id) {
    this.validateId(id);

    return this.services.has(id);
  }

  activateService(id) {
    return this.setServiceStatus(
      id,
      "ACTIVE"
    );
  }

  deactivateService(id) {
    return this.setServiceStatus(
      id,
      "INACTIVE"
    );
  }

  disableService(id) {
    return this.setServiceStatus(
      id,
      "DISABLED"
    );
  }

  setServiceStatus(
    id,
    status
  ) {
    this.validateStatus(status);

    const service =
      this.getService(id);

    service.status = status;
    service.updatedAt =
      this.createTimestamp();

    return service;
  }

  isActive(id) {
    return this
      .getService(id)
      .status === "ACTIVE";
  }

  updateMetadata(
    id,
    metadata
  ) {
    this.validateMetadata(metadata);

    const service =
      this.getService(id);

    service.metadata = {
      ...service.metadata,
      ...metadata,
    };
    service.updatedAt =
      this.createTimestamp();

    return service;
  }

  getServices() {
    return Array.from(
      this.services.values()
    );
  }

  getServicesByStatus(status) {
    this.validateStatus(status);

    return this
      .getServices()
      .filter(service =>
        service.status === status
      );
  }

  count() {
    return this.services.size;
  }

  clear() {
    this.services.clear();
  }

  serializeService(service) {
    return {
      id: service.id,
      name: service.name,
      instance:
        typeof service.instance === "function"
          ? null
          : service.instance,
      status: service.status,
      metadata: {
        ...service.metadata,
      },
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };
  }

  toJSON() {
    return {
      services: this
        .getServices()
        .map(service =>
          this.serializeService(service)
        ),
    };
  }
}

export default ServiceManager;
