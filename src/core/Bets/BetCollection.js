import BetStatus from "./BetStatus";

class BetCollection {
  constructor() {
    this.bets = [];
  }

  add(bet) {
    this.bets.push(bet);
    return bet;
  }

  remove(betId) {
    this.bets = this.bets.filter(
      (bet) => bet.getId() !== betId
    );
  }

  clear() {
    this.bets = [];
  }

  getAll() {
    return [...this.bets];
  }

  count() {
    return this.bets.length;
  }

  isEmpty() {
    return this.bets.length === 0;
  }

  findById(betId) {
    return (
      this.bets.find(
        (bet) => bet.getId() === betId
      ) || null
    );
  }

  findByPlayer(playerId) {
    return this.bets.filter(
      (bet) => bet.getPlayerId() === playerId
    );
  }

  findByType(type) {
    return this.bets.filter(
      (bet) => bet.getType() === type
    );
  }

  findByStatus(status) {
    return this.bets.filter(
      (bet) => bet.getStatus() === status
    );
  }

  getPending() {
    return this.findByStatus(
      BetStatus.PENDING
    );
  }

  getWon() {
    return this.findByStatus(
      BetStatus.WON
    );
  }

  getLost() {
    return this.findByStatus(
      BetStatus.LOST
    );
  }

  getCancelled() {
    return this.findByStatus(
      BetStatus.CANCELLED
    );
  }

  getRefunded() {
    return this.findByStatus(
      BetStatus.REFUNDED
    );
  }

  getTotalAmount() {
    return this.bets.reduce(
      (total, bet) => total + bet.getAmount(),
      0
    );
  }
}

export default BetCollection;