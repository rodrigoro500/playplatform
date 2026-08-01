class WalletTransaction {
  constructor(
    playerId,
    type,
    amount,
    balanceBefore,
    balanceAfter,
    metadata = {}
  ) {
    const validTypes = [
      "DEPOSIT",
      "WITHDRAW",
    ];

    if (!playerId) {
      throw new Error(
        "Debe indicar el jugador de la transacción."
      );
    }

    if (!validTypes.includes(type)) {
      throw new Error(
        "El tipo de transacción debe ser DEPOSIT o WITHDRAW."
      );
    }

    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new Error(
        "El monto de la transacción debe ser mayor a cero."
      );
    }

    if (
      typeof balanceBefore !== "number" ||
      !Number.isFinite(balanceBefore) ||
      balanceBefore < 0
    ) {
      throw new Error(
        "El saldo anterior de la transacción no puede ser negativo."
      );
    }

    if (
      typeof balanceAfter !== "number" ||
      !Number.isFinite(balanceAfter) ||
      balanceAfter < 0
    ) {
      throw new Error(
        "El saldo posterior de la transacción no puede ser negativo."
      );
    }

    this.id =
      `wallet-transaction-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;
    this.playerId = playerId;
    this.type = type;
    this.amount = amount;
    this.balanceBefore = balanceBefore;
    this.balanceAfter = balanceAfter;
    this.timestamp = new Date().toISOString();
    this.metadata = Object.freeze({
      ...metadata,
    });

    Object.freeze(this);
  }

  getId() {
    return this.id;
  }

  getPlayerId() {
    return this.playerId;
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

  getTimestamp() {
    return this.timestamp;
  }

  getMetadata() {
    return {
      ...this.metadata,
    };
  }

  toJSON() {
    return {
      id: this.id,
      playerId: this.playerId,
      type: this.type,
      amount: this.amount,
      balanceBefore: this.balanceBefore,
      balanceAfter: this.balanceAfter,
      timestamp: this.timestamp,
      metadata: this.getMetadata(),
    };
  }
}

export default WalletTransaction;
