class CommandValidator {
  static STATUSES = [
    "PENDING",
    "EXECUTED",
    "UNDONE",
    "FAILED",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateId(id) {
    CommandValidator.validateText(
      id,
      "El id del command debe ser un string no vacio."
    );
  }

  static validateName(name) {
    CommandValidator.validateText(
      name,
      "El nombre del command debe ser un string no vacio."
    );
  }

  static validateExecuteCallback(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "El executeCallback del command debe ser una funcion."
      );
    }
  }

  static validateUndoCallback(callback) {
    if (
      callback !== null &&
      typeof callback !== "function"
    ) {
      throw new Error(
        "El undoCallback del command debe ser una funcion o null."
      );
    }
  }

  static validateStatus(status) {
    if (!CommandValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del command no es valido."
      );
    }
  }

  static validateMetadata(metadata) {
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

  static validateOptionalTimestamp(
    timestamp,
    fieldName
  ) {
    if (
      timestamp !== null &&
      typeof timestamp !== "string"
    ) {
      throw new Error(
        `${fieldName} del command debe ser null o string.`
      );
    }
  }

  static validateCommand(command) {
    if (
      command === null ||
      typeof command !== "object" ||
      Array.isArray(command)
    ) {
      throw new Error(
        "El command debe ser un objeto valido."
      );
    }

    CommandValidator.validateId(command.id);
    CommandValidator.validateName(command.name);
    CommandValidator.validateExecuteCallback(
      command.executeCallback
    );
    CommandValidator.validateUndoCallback(
      command.undoCallback
    );
    CommandValidator.validateMetadata(command.metadata);
    CommandValidator.validateStatus(command.status);
    CommandValidator.validateOptionalTimestamp(
      command.executedAt,
      "executedAt"
    );
    CommandValidator.validateOptionalTimestamp(
      command.undoneAt,
      "undoneAt"
    );
  }
}

export default CommandValidator;
