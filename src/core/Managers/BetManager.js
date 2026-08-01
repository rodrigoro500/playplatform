import Bet from "../Entities/Bet";

class BetManager {
  constructor() {
    this.bets = new Map();
  }

  validateBetId(betId) {
    if (
      typeof betId !== "string" ||
      !betId.trim()
    ) {
      throw new Error(
        "El ID de la apuesta debe ser un texto válido."
      );
    }

    return betId.trim();
  }

  addBet(bet) {
    if (!(bet instanceof Bet)) {
      throw new Error(
        "Solo se pueden agregar instancias de Bet."
      );
    }

    const betId = bet.getId();

    if (this.bets.has(betId)) {
      throw new Error(
        `La apuesta con ID "${betId}" ya existe.`
      );
    }

    this.bets.set(betId, bet);

    return bet;
  }

  removeBet(betId) {
    const normalizedBetId =
      this.validateBetId(betId);

    const bet = this.bets.get(
      normalizedBetId
    );

    if (!bet) {
      return null;
    }

    this.bets.delete(normalizedBetId);

    return bet;
  }

  hasBet(betId) {
    const normalizedBetId =
      this.validateBetId(betId);

    return this.bets.has(normalizedBetId);
  }

  getBetById(betId) {
    const normalizedBetId =
      this.validateBetId(betId);

    return (
      this.bets.get(normalizedBetId) ??
      null
    );
  }

  getAll() {
    return [...this.bets.values()];
  }

  getByPlayer(playerId) {
    if (
      typeof playerId !== "string" ||
      !playerId.trim()
    ) {
      throw new Error(
        "El ID del jugador debe ser un texto válido."
      );
    }

    const normalizedPlayerId =
      playerId.trim();

    return this.getAll().filter(
      (bet) =>
        bet.getPlayerId() ===
        normalizedPlayerId
    );
  }

  getByRound(roundId) {
    if (
      typeof roundId !== "string" ||
      !roundId.trim()
    ) {
      throw new Error(
        "El ID de la ronda debe ser un texto válido."
      );
    }

    const normalizedRoundId =
      roundId.trim();

    return this.getAll().filter(
      (bet) =>
        bet.getRoundId() ===
        normalizedRoundId
    );
  }

  getByStatus(status) {
    if (
      typeof status !== "string" ||
      !status.trim()
    ) {
      throw new Error(
        "El estado de la apuesta debe ser un texto válido."
      );
    }

    const normalizedStatus =
      status.trim().toUpperCase();

    return this.getAll().filter(
      (bet) =>
        bet.getStatus() ===
        normalizedStatus
    );
  }

  count() {
    return this.bets.size;
  }

  isEmpty() {
    return this.bets.size === 0;
  }

  clear() {
    const removedBets = this.getAll();

    this.bets.clear();

    return removedBets;
  }

  toJSON() {
    return this.getAll().map((bet) =>
      bet.toJSON()
    );
  }
}

export default BetManager;