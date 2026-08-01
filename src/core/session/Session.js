class Session {
  static STATUSES = [
    "CREATED",
    "RUNNING",
    "PAUSED",
    "FINISHED",
    "CANCELLED",
  ];

  constructor(
    id,
    gameId,
    tableId = null,
    lobbyId = null,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id de la sesión es obligatorio."
    );
    this.validateText(
      gameId,
      "El id del juego de la sesión es obligatorio."
    );
    this.validateOptionalText(
      tableId,
      "El id de la mesa debe ser un texto válido."
    );
    this.validateOptionalText(
      lobbyId,
      "El id del lobby debe ser un texto válido."
    );
    this.validateMetadata(metadata);

    this.id = id;
    this.gameId = gameId;
    this.tableId = tableId;
    this.lobbyId = lobbyId;
    this.status = "CREATED";
    this.startedAt = null;
    this.finishedAt = null;
    this.metadata = {
      ...metadata,
    };
  }

  validateText(value, message) {
    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      throw new Error(message);
    }
  }

  validateOptionalText(value, message) {
    if (value === null) {
      return;
    }

    this.validateText(
      value,
      message
    );
  }

  validateStatus(status) {
    if (!Session.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la sesión no es válido."
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
        "La metadata de la sesión debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getGameId() {
    return this.gameId;
  }

  getTableId() {
    return this.tableId;
  }

  getLobbyId() {
    return this.lobbyId;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.validateStatus(status);

    this.status = status;

    return this.status;
  }

  start() {
    this.setStatus("RUNNING");
    this.startedAt = new Date().toISOString();

    return this.status;
  }

  pause() {
    return this.setStatus("PAUSED");
  }

  resume() {
    return this.setStatus("RUNNING");
  }

  finish() {
    this.setStatus("FINISHED");
    this.finishedAt = new Date().toISOString();

    return this.status;
  }

  cancel() {
    this.setStatus("CANCELLED");
    this.finishedAt = new Date().toISOString();

    return this.status;
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
      gameId: this.gameId,
      tableId: this.tableId,
      lobbyId: this.lobbyId,
      status: this.status,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      metadata: this.getMetadata(),
    };
  }
}

export default Session;
