import BetStatus from "./BetStatus";

class BetResult {
  constructor({
    betId,
    playerId,
    status = BetStatus.PENDING,
    payout = 0,
    profit = 0,
    data = {},
  }) {
    if (!betId) {
      throw new Error(
        "BetResult requiere el ID de la apuesta."
      );
    }

    if (!playerId) {
      throw new Error(
        "BetResult requiere el jugador."
      );
    }

    this.betId = betId;
    this.playerId = playerId;
    this.status = status;
    this.payout = payout;
    this.profit = profit;
    this.data = data;
    this.createdAt = new Date();
  }

  getBetId() {
    return this.betId;
  }

  getPlayerId() {
    return this.playerId;
  }

  getStatus() {
    return this.status;
  }

  getPayout() {
    return this.payout;
  }

  getProfit() {
    return this.profit;
  }

  getData() {
    return this.data;
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
      betId: this.betId,
      playerId: this.playerId,
      status: this.status,
      payout: this.payout,
      profit: this.profit,
      data: this.data,
      createdAt: this.createdAt,
    };
  }
}

export default BetResult;