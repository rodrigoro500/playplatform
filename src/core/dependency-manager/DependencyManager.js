class DependencyManager {
  static STATUSES = [
    "ACTIVE",
    "INACTIVE",
  ];

  static TYPES = [
    "REQUIRED",
    "OPTIONAL",
  ];

  constructor() {
    this.dependencies = new Map();
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
      "El id de la dependencia debe ser un string no vacio."
    );
  }

  validateSource(source) {
    this.validateText(
      source,
      "El source de la dependencia debe ser un string no vacio."
    );
  }

  validateTarget(target) {
    this.validateText(
      target,
      "El target de la dependencia debe ser un string no vacio."
    );
  }

  validateType(type) {
    if (!DependencyManager.TYPES.includes(type)) {
      throw new Error(
        "El tipo de la dependencia no es valido."
      );
    }
  }

  validateStatus(status) {
    if (!DependencyManager.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la dependencia no es valido."
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
        "La metadata de la dependencia debe ser un objeto valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  addDependency(
    id,
    source,
    target,
    type = "REQUIRED",
    metadata = {}
  ) {
    this.validateId(id);
    this.validateSource(source);
    this.validateTarget(target);
    this.validateType(type);
    this.validateMetadata(metadata);

    if (this.hasDependency(id)) {
      throw new Error(
        "Ya existe una dependencia con ese id."
      );
    }

    const timestamp =
      this.createTimestamp();

    const dependency = {
      id,
      source,
      target,
      type,
      status: "ACTIVE",
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.dependencies.set(
      id,
      dependency
    );

    return dependency;
  }

  removeDependency(id) {
    const dependency =
      this.getDependency(id);

    this.dependencies.delete(id);

    return dependency;
  }

  getDependency(id) {
    this.validateId(id);

    const dependency =
      this.dependencies.get(id);

    if (!dependency) {
      throw new Error(
        "No existe una dependencia con ese id."
      );
    }

    return dependency;
  }

  hasDependency(id) {
    this.validateId(id);

    return this.dependencies.has(id);
  }

  updateMetadata(
    id,
    metadata
  ) {
    this.validateMetadata(metadata);

    const dependency =
      this.getDependency(id);

    dependency.metadata = {
      ...dependency.metadata,
      ...metadata,
    };
    dependency.updatedAt =
      this.createTimestamp();

    return dependency;
  }

  setDependencyStatus(
    id,
    status
  ) {
    this.validateStatus(status);

    const dependency =
      this.getDependency(id);

    dependency.status = status;
    dependency.updatedAt =
      this.createTimestamp();

    return dependency;
  }

  activateDependency(id) {
    return this.setDependencyStatus(
      id,
      "ACTIVE"
    );
  }

  deactivateDependency(id) {
    return this.setDependencyStatus(
      id,
      "INACTIVE"
    );
  }

  getDependencies() {
    return Array.from(
      this.dependencies.values()
    );
  }

  getDependenciesBySource(source) {
    this.validateSource(source);

    return this
      .getDependencies()
      .filter(dependency =>
        dependency.source === source
      );
  }

  getDependenciesByTarget(target) {
    this.validateTarget(target);

    return this
      .getDependencies()
      .filter(dependency =>
        dependency.target === target
      );
  }

  getDependenciesByType(type) {
    this.validateType(type);

    return this
      .getDependencies()
      .filter(dependency =>
        dependency.type === type
      );
  }

  getDependenciesByStatus(status) {
    this.validateStatus(status);

    return this
      .getDependencies()
      .filter(dependency =>
        dependency.status === status
      );
  }

  count() {
    return this.dependencies.size;
  }

  clear() {
    this.dependencies.clear();
  }

  toJSON() {
    return {
      dependencies: this
        .getDependencies()
        .map(dependency => ({
          id: dependency.id,
          source: dependency.source,
          target: dependency.target,
          type: dependency.type,
          status: dependency.status,
          metadata: {
            ...dependency.metadata,
          },
          createdAt: dependency.createdAt,
          updatedAt: dependency.updatedAt,
        })),
    };
  }
}

export default DependencyManager;
