class BaseEntity {
  constructor(id) {
    if (!id) {
      throw new Error("La entidad debe tener un ID.");
    }

    this.id = id;

    this.createdAt = new Date().toISOString();
    this.updatedAt = this.createdAt;
  }

  getId() {
    return this.id;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  updateTimestamp() {
    this.updatedAt = new Date().toISOString();

    return this.updatedAt;
  }

  equals(entity) {
    if (!(entity instanceof BaseEntity)) {
      return false;
    }

    return this.id === entity.getId();
  }
clone() {
    throw new Error(
        "Cada entidad debe implementar su propio método clone()."
    );
}

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default BaseEntity;