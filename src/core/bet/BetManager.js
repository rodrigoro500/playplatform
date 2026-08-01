import Bet from "./Bet";
import BetValidator from "./BetValidator";

class BetManager {
  constructor() {
    this.bets = new Map();
  }

  createBet(
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
    BetValidator.validateId(id);
    BetValidator.validateActionId(actionId);
    BetValidator.validateTurnId(turnId);
    BetValidator.validateRoundId(roundId);
    BetValidator.validateSessionId(sessionId);
    BetValidator.validateGameId(gameId);
    BetValidator.validatePlayerId(playerId);
    BetValidator.validateBetType(betType);
    BetValidator.validateAmount(amount);
    BetValidator.validateMetadata(metadata);

    if (this.hasBet(id)) {
      throw new Error(
        "Ya existe una apuesta con ese id."
      );
    }

    const bet =
      new Bet(
        id,
        actionId,
        turnId,
        roundId,
        sessionId,
        gameId,
        playerId,
        betType,
        amount,
        metadata
      );

    this.bets.set(
      id,
      bet
    );

    return bet;
  }

  getBet(id) {
    BetValidator.validateId(id);

    const bet =
      this.bets.get(id);

    if (!bet) {
      throw new Error(
        "No existe una apuesta con ese id."
      );
    }

    return bet;
  }

  hasBet(id) {
    BetValidator.validateId(id);

    return this.bets.has(id);
  }

  removeBet(id) {
    BetValidator.validateId(id);

    if (!this.hasBet(id)) {
      throw new Error(
        "No existe una apuesta para eliminar."
      );
    }

    return this.bets.delete(id);
  }

  acceptBet(id) {
    return this
      .getBet(id)
      .accept();
  }

  rejectBet(id) {
    return this
      .getBet(id)
      .reject();
  }

  cancelBet(id) {
    return this
      .getBet(id)
      .cancel();
  }

  winBet(id) {
    return this
      .getBet(id)
      .win();
  }

  loseBet(id) {
    return this
      .getBet(id)
      .lose();
  }

  pushBet(id) {
    return this
      .getBet(id)
      .push();
  }

  refundBet(id) {
    return this
      .getBet(id)
      .refund();
  }

  getBets() {
    return Array.from(
      this.bets.values()
    );
  }

  getBetsByAction(actionId) {
    BetValidator.validateActionId(actionId);

    return this
      .getBets()
      .filter(bet =>
        bet.getActionId() === actionId
      );
  }

  getBetsByTurn(turnId) {
    BetValidator.validateTurnId(turnId);

    return this
      .getBets()
      .filter(bet =>
        bet.getTurnId() === turnId
      );
  }

  getBetsByRound(roundId) {
    BetValidator.validateRoundId(roundId);

    return this
      .getBets()
      .filter(bet =>
        bet.getRoundId() === roundId
      );
  }

  getBetsBySession(sessionId) {
    BetValidator.validateSessionId(sessionId);

    return this
      .getBets()
      .filter(bet =>
        bet.getSessionId() === sessionId
      );
  }

  getBetsByGame(gameId) {
    BetValidator.validateGameId(gameId);

    return this
      .getBets()
      .filter(bet =>
        bet.getGameId() === gameId
      );
  }

  getBetsByPlayer(playerId) {
    BetValidator.validatePlayerId(playerId);

    return this
      .getBets()
      .filter(bet =>
        bet.getPlayerId() === playerId
      );
  }

  getBetsByType(betType) {
    BetValidator.validateBetType(betType);

    return this
      .getBets()
      .filter(bet =>
        bet.getBetType() === betType
      );
  }

  getBetsByStatus(status) {
    BetValidator.validateStatus(status);

    return this
      .getBets()
      .filter(bet =>
        bet.getStatus() === status
      );
  }

  getAcceptedBets() {
    return this.getBetsByStatus("ACCEPTED");
  }

  getRejectedBets() {
    return this.getBetsByStatus("REJECTED");
  }

  getCancelledBets() {
    return this.getBetsByStatus("CANCELLED");
  }

  getWonBets() {
    return this.getBetsByStatus("WON");
  }

  getLostBets() {
    return this.getBetsByStatus("LOST");
  }

  getPushBets() {
    return this.getBetsByStatus("PUSH");
  }

  getRefundedBets() {
    return this.getBetsByStatus("REFUNDED");
  }

  clear() {
    this.bets.clear();
  }

  toJSON() {
    return this
      .getBets()
      .map(bet => bet.toJSON());
  }
}

export default BetManager;
