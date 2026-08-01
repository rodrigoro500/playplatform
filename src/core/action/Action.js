class Action {
  static STATUSES = [
    "CREATED",
    "RUNNING",
    "PAUSED",
    "FINISHED",
    "CANCELLED",
  ];

  constructor(
    id,
    turnId,
    roundId,
    sessionId,
    gameId,
    playerId,
    type,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id de la acción es obligatorio."
    );
    this.validateText(
      turnId,
      "El id del turno de la acción es obligatorio."
    );
    this.validateText(
      roundId,
      "El id de la ronda de la acción es obligatorio."
    );
    this.validateText(
      sessionId,
      "El id de la sesión de la acción es obligatorio."
    );
    this.validateText(
      gameId,
      "El id del juego de la acción es obligatorio."
    );
    this.validateText(
      playerId,
      "El id del jugador de la acción es obligatorio."
    );
    this.validateText(
      type,
      "El tipo de la acción es obligatorio."
    );
    this.validateMetadata(metadata);

    this.id = id;
    this.turnId = turnId;
    this.roundId = roundId;
    this.sessionId = sessionId;
    this.gameId = gameId;
    this.playerId = playerId;
    this.type = type;
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

  validateStatus(status) {
    if (!Action.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la acción no es válido."
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
        "La metadata de la acción debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getTurnId() {
    return this.turnId;
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

  getType() {
    return this.type;
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
      turnId: this.turnId,
      roundId: this.roundId,
      sessionId: this.sessionId,
      gameId: this.gameId,
      playerId: this.playerId,
      type: this.type,
      status: this.status,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      metadata: this.getMetadata(),
    };
  }
}

export default Action;
