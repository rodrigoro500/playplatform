class Player {
  constructor(
    id,
    name,
    metadata = {}
  ) {
    this.validateId(id);
    this.validateName(name);
    this.validateMetadata(metadata);

    this.id = id;
    this.name = name;
    this.connected = true;
    this.active = true;
    this.metadata = {
      ...metadata,
    };
  }

  validateId(id) {
    if (
      typeof id !== "string" ||
      id.trim() === ""
    ) {
      throw new Error(
        "El id del jugador es obligatorio y debe ser un texto válido."
      );
    }
  }

  validateName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del jugador es obligatorio y debe ser un texto válido."
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
        "La metadata del jugador debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.validateName(name);

    this.name = name;

    return this.name;
  }

  isConnected() {
    return this.connected;
  }

  connect() {
    this.connected = true;

    return this.connected;
  }

  disconnect() {
    this.connected = false;

    return this.connected;
  }

  isActive() {
    return this.active;
  }

  activate() {
    this.active = true;

    return this.active;
  }

  deactivate() {
    this.active = false;

    return this.active;
  }

  getMetadata() {
    return {
      ...this.metadata,
    };
  }

  setMetadata(metadata) {
    this.validateMetadata(metadata);

    this.metadata = {
      ...metadata,
    };

    return this.getMetadata();
  }

  updateMetadata(data) {
    this.validateMetadata(data);

    this.metadata = {
      ...this.metadata,
      ...data,
    };

    return this.getMetadata();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      connected: this.connected,
      active: this.active,
      metadata: this.getMetadata(),
    };
  }
}

export default Player;
