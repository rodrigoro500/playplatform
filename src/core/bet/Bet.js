class Bet {
  static STATUSES = [
    "CREATED",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "WON",
    "LOST",
    "PUSH",
    "REFUNDED",
  ];

  constructor(
    id,
    actionId,
    turnId,
    roundId,
    sessionId,
    gameId,
    playerId,
    betType,
    amount,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id de la apuesta es obligatorio."
    );
    this.validateText(
      actionId,
      "El id de la acción de la apuesta es obligatorio."
    );
    this.validateText(
      turnId,
      "El id del turno de la apuesta es obligatorio."
    );
    this.validateText(
      roundId,
      "El id de la ronda de la apuesta es obligatorio."
    );
    this.validateText(
      sessionId,
      "El id de la sesión de la apuesta es obligatorio."
    );
    this.validateText(
      gameId,
      "El id del juego de la apuesta es obligatorio."
    );
    this.validateText(
      playerId,
      "El id del jugador de la apuesta es obligatorio."
    );
    this.validateText(
      betType,
      "El tipo de la apuesta es obligatorio."
    );
    this.validateMetadata(metadata);

    this.id = id;
    this.actionId = actionId;
    this.turnId = turnId;
    this.roundId = roundId;
    this.sessionId = sessionId;
    this.gameId = gameId;
    this.playerId = playerId;
    this.betType = betType;
    this.amount = amount;
    this.status = "CREATED";
    this.createdAt = new Date().toISOString();
    this.settledAt = null;
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
    if (!Bet.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la apuesta no es válido."
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
        "La metadata de la apuesta debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getActionId() {
    return this.actionId;
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

  getBetType() {
    return this.betType;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getSettledAt() {
    return this.settledAt;
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

  accept() {
    return this.setStatus("ACCEPTED");
  }

  reject() {
    return this.setStatus("REJECTED");
  }

  cancel() {
    this.setStatus("CANCELLED");
    this.settledAt = new Date().toISOString();

    return this.status;
  }

  win() {
    this.setStatus("WON");
    this.settledAt = new Date().toISOString();

    return this.status;
  }

  lose() {
    this.setStatus("LOST");
    this.settledAt = new Date().toISOString();

    return this.status;
  }

  push() {
    this.setStatus("PUSH");
    this.settledAt = new Date().toISOString();

    return this.status;
  }

  refund() {
    this.setStatus("REFUNDED");
    this.settledAt = new Date().toISOString();

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
      actionId: this.actionId,
      turnId: this.turnId,
      roundId: this.roundId,
      sessionId: this.sessionId,
      gameId: this.gameId,
      playerId: this.playerId,
      betType: this.betType,
      amount: this.amount,
      status: this.status,
      createdAt: this.createdAt,
      settledAt: this.settledAt,
      metadata: this.getMetadata(),
    };
  }
}

export default Bet;
