class DependencyManagerValidator {
  static STATUSES = [
    "ACTIVE",
    "INACTIVE",
  ];

  static TYPES = [
    "REQUIRED",
    "OPTIONAL",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateDependency(dependency) {
    if (
      dependency === null ||
      typeof dependency !== "object" ||
      Array.isArray(dependency)
    ) {
      throw new Error(
        "La dependencia debe ser un objeto valido."
      );
    }

    DependencyManagerValidator.validateText(
      dependency.id,
      "El id de la dependencia debe ser un string no vacio."
    );
    DependencyManagerValidator.validateText(
      dependency.source,
      "El source de la dependencia debe ser un string no vacio."
    );
    DependencyManagerValidator.validateText(
      dependency.target,
      "El target de la dependencia debe ser un string no vacio."
    );
    DependencyManagerValidator.validateType(
      dependency.type
    );
    DependencyManagerValidator.validateStatus(
      dependency.status
    );
    DependencyManagerValidator.validateMetadata(
      dependency.metadata
    );
    DependencyManagerValidator.validateText(
      dependency.createdAt,
      "El createdAt de la dependencia debe ser un string no vacio."
    );
    DependencyManagerValidator.validateText(
      dependency.updatedAt,
      "El updatedAt de la dependencia debe ser un string no vacio."
    );
  }

  static validateDependencies(dependencies) {
    if (!(dependencies instanceof Map)) {
      throw new Error(
        "Las dependencias deben ser una instancia de Map."
      );
    }

    dependencies.forEach(dependency =>
      DependencyManagerValidator.validateDependency(dependency)
    );
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata de la dependencia debe ser un objeto valido."
      );
    }
  }

  static validateStatus(status) {
    if (!DependencyManagerValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la dependencia no es valido."
      );
    }
  }

  static validateType(type) {
    if (!DependencyManagerValidator.TYPES.includes(type)) {
      throw new Error(
        "El tipo de la dependencia no es valido."
      );
    }
  }

  static validateDependencyManager(dependencyManager) {
    if (
      dependencyManager === null ||
      typeof dependencyManager !== "object" ||
      Array.isArray(dependencyManager)
    ) {
      throw new Error(
        "El DependencyManager debe ser un objeto valido."
      );
    }

    DependencyManagerValidator.validateDependencies(
      dependencyManager.dependencies
    );
  }
}

export default DependencyManagerValidator;
