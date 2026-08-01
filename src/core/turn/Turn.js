class Turn {
  static STATUSES = [
    "CREATED",
    "RUNNING",
    "PAUSED",
    "FINISHED",
    "CANCELLED",
  ];

  constructor(
    id,
    roundId,
    sessionId,
    gameId,
    playerId,
    order,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id del turno es obligatorio."
    );
    this.validateText(
      roundId,
      "El id de la ronda del turno es obligatorio."
    );
    this.validateText(
      sessionId,
      "El id de la sesión del turno es obligatorio."
    );
    this.validateText(
      gameId,
      "El id del juego del turno es obligatorio."
    );
    this.validateText(
      playerId,
      "El id del jugador del turno es obligatorio."
    );
    this.validateOrder(order);
    this.validateMetadata(metadata);

    this.id = id;
    this.roundId = roundId;
    this.sessionId = sessionId;
    this.gameId = gameId;
    this.playerId = playerId;
    this.order = order;
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

  validateOrder(order) {
    if (
      typeof order !== "number" ||
      !Number.isInteger(order) ||
      order <= 0
    ) {
      throw new Error(
        "El orden del turno debe ser un entero mayor que cero."
      );
    }
  }

  validateStatus(status) {
    if (!Turn.STATUSES.includes(status)) {
      throw new Error(
        "El estado del turno no es válido."
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
        "La metadata del turno debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getRoundId() {
    return this.roundId;
  }

  getSessionId() {
    return this.sessionId;
  }

  getGameId() {
    return this.gameId;
  }

  getPlayerId() {
    return this.playerId;
  }

  getOrder() {
    return this.order;
  }

  getStatus() {
    return this.status;
  }

  getStartedAt() {
    return this.startedAt;
  }

  getFinishedAt() {
    return this.finishedAt;
  }

  getMetadata() {
    return {
      ...this.metadata,
    };
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

  setMetadata(metadata) {
    this.validateMetadata(metadata);

    this.metadata = {
      ...metadata,
    };

    return this.getMetadata();
  }

  updateMetadata(metadata) {
    this.validateMetadata(metadata);

    this.metadata = {
      ...this.metadata,
      ...metadata,
    };

    return this.getMetadata();
  }

  toJSON() {
    return {
      id: this.id,
      roundId: this.roundId,
      sessionId: this.sessionId,
      gameId: this.gameId,
      playerId: this.playerId,
      order: this.order,
      status: this.status,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      metadata: this.getMetadata(),
    };
  }
}

export default Turn;
