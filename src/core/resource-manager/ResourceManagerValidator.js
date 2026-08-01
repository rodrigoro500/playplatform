class ResourceManagerValidator {
  static STATUSES = [
    "AVAILABLE",
    "IN_USE",
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

  static validateResource(resource) {
    if (
      resource === null ||
      typeof resource !== "object" ||
      Array.isArray(resource)
    ) {
      throw new Error(
        "El recurso debe ser un objeto valido."
      );
    }

    ResourceManagerValidator.validateText(
      resource.id,
      "El id del recurso debe ser un string no vacio."
    );
    ResourceManagerValidator.validateText(
      resource.type,
      "El tipo del recurso debe ser un string no vacio."
    );
    ResourceManagerValidator.validateMetadata(
      resource.metadata
    );
    ResourceManagerValidator.validateStatus(
      resource.status
    );
    ResourceManagerValidator.validateText(
      resource.createdAt,
      "El createdAt del recurso debe ser un string no vacio."
    );
    ResourceManagerValidator.validateText(
      resource.updatedAt,
      "El updatedAt del recurso debe ser un string no vacio."
    );
  }

  static validateResources(resources) {
    if (!(resources instanceof Map)) {
      throw new Error(
        "Los resources deben ser una instancia de Map."
      );
    }

    resources.forEach(resource =>
      ResourceManagerValidator.validateResource(resource)
    );
  }

  static validateMetadata(metadata) {
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

  static validateStatus(status) {
    if (!ResourceManagerValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del recurso no es valido."
      );
    }
  }

  static validateResourceManager(resourceManager) {
    if (
      resourceManager === null ||
      typeof resourceManager !== "object" ||
      Array.isArray(resourceManager)
    ) {
      throw new Error(
        "El ResourceManager debe ser un objeto valido."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(resourceManager, "resources")) {
      throw new Error(
        "El ResourceManager debe contener la propiedad resources."
      );
    }

    ResourceManagerValidator.validateResources(
      resourceManager.resources
    );
  }
}

export default ResourceManagerValidator;
