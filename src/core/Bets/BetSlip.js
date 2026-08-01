import BetCollection from "./BetCollection";

class BetSlip {
  constructor({
    id,
    playerId,
  }) {
    if (!id) {
      throw new Error(
        "BetSlip requiere un ID."
      );
    }

    if (!playerId) {
      throw new Error(
        "BetSlip requiere un jugador."
      );
    }

    this.id = id;
    this.playerId = playerId;
    this.collection = new BetCollection();
    this.createdAt = new Date();
  }

  getId() {
    return this.id;
  }

  getPlayerId() {
    return this.playerId;
  }

  addBet(bet) {
    return this.collection.add(bet);
  }

  removeBet(betId) {
    return this.collection.remove(betId);
  }

  clear() {
    this.collection.clear();
  }

  getBet(betId) {
    return this.collection.findById(betId);
  }

  getBets() {
    return this.collection.getAll();
  }

  getBetCount() {
    return this.collection.count();
  }

  getTotalAmount() {
    return this.collection.getTotalAmount();
  }

  isEmpty() {
    return this.collection.isEmpty();
  }

  getPendingBets() {
    return this.collection.getPending();
  }

  getWonBets() {
    return this.collection.getWon();
  }

  getLostBets() {
    return this.collection.getLost();
  }

  getCancelledBets() {
    return this.collection.getCancelled();
  }

  getRefundedBets() {
    return this.collection.getRefunded();
  }

  toJSON() {
    return {
      id: this.id,
      playerId: this.playerId,
      bets: this.getBets().map((bet) =>
        bet.toJSON()
      ),
      totalAmount: this.getTotalAmount(),
      createdAt: this.createdAt,
    };
  }
}

export default BetSlip;