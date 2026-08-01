class ServiceManagerValidator {
  static STATUSES = [
    "ACTIVE",
    "INACTIVE",
    "DISABLED",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateService(service) {
    if (
      service === null ||
      typeof service !== "object" ||
      Array.isArray(service)
    ) {
      throw new Error(
        "El servicio debe ser un objeto valido."
      );
    }

    ServiceManagerValidator.validateText(
      service.id,
      "El id del servicio debe ser un string no vacio."
    );
    ServiceManagerValidator.validateText(
      service.name,
      "El nombre del servicio debe ser un string no vacio."
    );
    ServiceManagerValidator.validateStatus(
      service.status
    );
    ServiceManagerValidator.validateMetadata(
      service.metadata
    );
    ServiceManagerValidator.validateText(
      service.createdAt,
      "El createdAt del servicio debe ser un string no vacio."
    );
    ServiceManagerValidator.validateText(
      service.updatedAt,
      "El updatedAt del servicio debe ser un string no vacio."
    );
  }

  static validateServices(services) {
    if (!(services instanceof Map)) {
      throw new Error(
        "Los servicios deben ser una instancia de Map."
      );
    }

    services.forEach(service =>
      ServiceManagerValidator.validateService(service)
    );
  }

  static validateMetadata(metadata) {
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

  static validateStatus(status) {
    if (!ServiceManagerValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del servicio no es valido."
      );
    }
  }

  static validateServiceManager(serviceManager) {
    if (
      serviceManager === null ||
      typeof serviceManager !== "object" ||
      Array.isArray(serviceManager)
    ) {
      throw new Error(
        "El ServiceManager debe ser un objeto valido."
      );
    }

    ServiceManagerValidator.validateServices(
      serviceManager.services
    );
  }
}

export default ServiceManagerValidator;
