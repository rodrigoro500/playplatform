import BetStatus from "./BetStatus";

class Bet {
  constructor({
    id,
    playerId,
    type,
    amount,
    data = {},
  }) {
    if (!id) {
      throw new Error("La apuesta requiere un ID.");
    }

    if (!playerId) {
      throw new Error("La apuesta requiere un jugador.");
    }

    if (!type) {
      throw new Error("La apuesta requiere un tipo.");
    }

    if (
      typeof amount !== "number" ||
      amount <= 0
    ) {
      throw new Error("Monto inválido.");
    }

    this.id = id;
    this.playerId = playerId;
    this.type = type;
    this.amount = amount;
    this.data = data;
    this.status = BetStatus.PENDING;
    this.createdAt = new Date();
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

  getData() {
    return this.data;
  }

  getStatus() {
    return this.status;
  }

  win() {
    this.status = BetStatus.WON;
  }

  lose() {
    this.status = BetStatus.LOST;
  }

  cancel() {
    this.status = BetStatus.CANCELLED;
  }

  refund() {
    this.status = BetStatus.REFUNDED;
  }

  isPending() {
    return this.status === BetStatus.PENDING;
  }

  isWon() {
    return this.status === BetStatus.WON;
  }

  isLost() {
    return this.status === BetStatus.LOST;
  }

  isCancelled() {
    return this.status === BetStatus.CANCELLED;
  }

  isRefunded() {
    return this.status === BetStatus.REFUNDED;
  }

  toJSON() {
    return {
      id: this.id,
      playerId: this.playerId,
      type: this.type,
      amount: this.amount,
      data: this.data,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}

export default Bet;