class Command {
  static STATUSES = [
    "PENDING",
    "EXECUTED",
    "UNDONE",
    "FAILED",
  ];

  constructor(
    id,
    name,
    executeCallback,
    undoCallback = null,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id del command es obligatorio."
    );
    this.validateText(
      name,
      "El nombre del command es obligatorio."
    );
    this.validateCallback(
      executeCallback,
      "El executeCallback del command es obligatorio."
    );
    this.validateOptionalCallback(undoCallback);
    this.validateMetadata(metadata);

    this.id = id;
    this.name = name;
    this.executeCallback = executeCallback;
    this.undoCallback = undoCallback;
    this.metadata = {
      ...metadata,
    };
    this.status = "PENDING";
    this.executedAt = null;
    this.undoneAt = null;
  }

  validateText(value, message) {
    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      throw new Error(message);
    }
  }

  validateCallback(callback, message) {
    if (typeof callback !== "function") {
      throw new Error(message);
    }
  }

  validateOptionalCallback(callback) {
    if (
      callback !== null &&
      typeof callback !== "function"
    ) {
      throw new Error(
        "El undoCallback del command debe ser una funcion o null."
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
        "La metadata del command debe ser un objeto valido."
      );
    }
  }

  execute() {
    try {
      const result =
        this.executeCallback();

      this.status = "EXECUTED";
      this.executedAt = new Date().toISOString();

      return result;
    } catch (error) {
      this.status = "FAILED";

      throw error;
    }
  }

  undo() {
    if (this.status !== "EXECUTED") {
      throw new Error(
        "Solo se puede deshacer un command ejecutado."
      );
    }

    if (!this.undoCallback) {
      throw new Error(
        "El command no tiene undoCallback."
      );
    }

    const result =
      this.undoCallback();

    this.status = "UNDONE";
    this.undoneAt = new Date().toISOString();

    return result;
  }

  getStatus() {
    return this.status;
  }

  isPending() {
    return this.status === "PENDING";
  }

  isExecuted() {
    return this.status === "EXECUTED";
  }

  isUndone() {
    return this.status === "UNDONE";
  }

  isFailed() {
    return this.status === "FAILED";
  }

  setMetadata(
    key,
    value
  ) {
    this.validateText(
      key,
      "La clave de metadata del command debe ser un string no vacio."
    );

    this.metadata[key] = value;

    return value;
  }

  getMetadata(key) {
    this.validateText(
      key,
      "La clave de metadata del command debe ser un string no vacio."
    );

    return this.metadata[key];
  }

  getAllMetadata() {
    return {
      ...this.metadata,
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      executedAt: this.executedAt,
      undoneAt: this.undoneAt,
      metadata: this.getAllMetadata(),
    };
  }
}

export default Command;
