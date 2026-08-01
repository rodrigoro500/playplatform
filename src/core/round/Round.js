class Round {
  static STATUSES = [
    "CREATED",
    "RUNNING",
    "PAUSED",
    "FINISHED",
    "CANCELLED",
  ];

  constructor(
    id,
    sessionId,
    gameId,
    number,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id de la ronda es obligatorio."
    );
    this.validateText(
      sessionId,
      "El id de la sesión de la ronda es obligatorio."
    );
    this.validateText(
      gameId,
      "El id del juego de la ronda es obligatorio."
    );
    this.validateNumber(number);
    this.validateMetadata(metadata);

    this.id = id;
    this.sessionId = sessionId;
    this.gameId = gameId;
    this.number = number;
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

  validateNumber(number) {
    if (
      typeof number !== "number" ||
      !Number.isInteger(number) ||
      number <= 0
    ) {
      throw new Error(
        "El número de la ronda debe ser un entero mayor que cero."
      );
    }
  }

  validateStatus(status) {
    if (!Round.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la ronda no es válido."
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
        "La metadata de la ronda debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getSessionId() {
    return this.sessionId;
  }

  getGameId() {
    return this.gameId;
  }

  getNumber() {
    return this.number;
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
      sessionId: this.sessionId,
      gameId: this.gameId,
      number: this.number,
      status: this.status,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      metadata: this.getMetadata(),
    };
  }
}

export default Round;
