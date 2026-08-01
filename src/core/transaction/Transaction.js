class Transaction {
  static STATUSES = [
    "PENDING",
    "COMPLETED",
    "FAILED",
    "CANCELLED",
  ];

  constructor(
    id,
    walletId,
    playerId,
    gameId,
    sessionId,
    roundId,
    turnId,
    actionId,
    betId,
    type,
    amount,
    balanceBefore,
    balanceAfter,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id de la transaccion es obligatorio."
    );
    this.validateText(
      walletId,
      "El id del wallet de la transaccion es obligatorio."
    );
    this.validateText(
      playerId,
      "El id del jugador de la transaccion es obligatorio."
    );
    this.validateText(
      gameId,
      "El id del juego de la transaccion es obligatorio."
    );
    this.validateText(
      sessionId,
      "El id de la sesion de la transaccion es obligatorio."
    );
    this.validateText(
      roundId,
      "El id de la ronda de la transaccion es obligatorio."
    );
    this.validateText(
      turnId,
      "El id del turno de la transaccion es obligatorio."
    );
    this.validateText(
      actionId,
      "El id de la accion de la transaccion es obligatorio."
    );
    this.validateText(
      betId,
      "El id de la apuesta de la transaccion es obligatorio."
    );
    this.validateText(
      type,
      "El tipo de la transaccion es obligatorio."
    );
    this.validateMetadata(metadata);

    this.id = id;
    this.walletId = walletId;
    this.playerId = playerId;
    this.gameId = gameId;
    this.sessionId = sessionId;
    this.roundId = roundId;
    this.turnId = turnId;
    this.actionId = actionId;
    this.betId = betId;
    this.type = type;
    this.amount = amount;
    this.balanceBefore = balanceBefore;
    this.balanceAfter = balanceAfter;
    this.status = "PENDING";
    this.createdAt = new Date().toISOString();
    this.completedAt = null;
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
    if (!Transaction.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la transaccion no es valido."
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
        "La metadata de la transaccion debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getWalletId() {
    return this.walletId;
  }

  getPlayerId() {
    return this.playerId;
  }

  getGameId() {
    return this.gameId;
  }

  getSessionId() {
    return this.sessionId;
  }

  getRoundId() {
    return this.roundId;
  }

  getTurnId() {
    return this.turnId;
  }

  getActionId() {
    return this.actionId;
  }

  getBetId() {
    return this.betId;
  }

  getType() {
    return this.type;
  }

  getAmount() {
    return this.amount;
  }

  getBalanceBefore() {
    return this.balanceBefore;
  }

  getBalanceAfter() {
    return this.balanceAfter;
  }

  getStatus() {
    return this.status;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getCompletedAt() {
    return this.completedAt;
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

  complete() {
    this.setStatus("COMPLETED");
    this.completedAt = new Date().toISOString();

    return this.status;
  }

  fail() {
    this.setStatus("FAILED");
    this.completedAt = new Date().toISOString();

    return this.status;
  }

  cancel() {
    this.setStatus("CANCELLED");
    this.completedAt = new Date().toISOString();

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
      walletId: this.walletId,
      playerId: this.playerId,
      gameId: this.gameId,
      sessionId: this.sessionId,
      roundId: this.roundId,
      turnId: this.turnId,
      actionId: this.actionId,
      betId: this.betId,
      type: this.type,
      amount: this.amount,
      balanceBefore: this.balanceBefore,
      balanceAfter: this.balanceAfter,
      status: this.status,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
      metadata: this.getMetadata(),
    };
  }
}

export default Transaction;
