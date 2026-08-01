import Turn from "./Turn";
import TurnValidator from "./TurnValidator";

class TurnManager {
  constructor() {
    this.turns = new Map();
  }

  createTurn(
    id,
    roundId,
    sessionId,
    gameId,
    playerId,
    order,
    metadata = {}
  ) {
    TurnValidator.validateId(id);
    TurnValidator.validateRoundId(roundId);
    TurnValidator.validateSessionId(sessionId);
    TurnValidator.validateGameId(gameId);
    TurnValidator.validatePlayerId(playerId);
    TurnValidator.validateOrder(order);
    TurnValidator.validateMetadata(metadata);

    if (this.hasTurn(id)) {
      throw new Error(
        "Ya existe un turno con ese id."
      );
    }

    const turn =
      new Turn(
        id,
        roundId,
        sessionId,
        gameId,
        playerId,
        order,
        metadata
      );

    this.turns.set(
      id,
      turn
    );

    return turn;
  }

  getTurn(id) {
    TurnValidator.validateId(id);

    const turn =
      this.turns.get(id);

    if (!turn) {
      throw new Error(
        "No existe un turno con ese id."
      );
    }

    return turn;
  }

  hasTurn(id) {
    TurnValidator.validateId(id);

    return this.turns.has(id);
  }

  removeTurn(id) {
    TurnValidator.validateId(id);

    if (!this.hasTurn(id)) {
      throw new Error(
        "No existe un turno para eliminar."
      );
    }

    return this.turns.delete(id);
  }

  startTurn(id) {
    return this
      .getTurn(id)
      .start();
  }

  pauseTurn(id) {
    return this
      .getTurn(id)
      .pause();
  }

  resumeTurn(id) {
    return this
      .getTurn(id)
      .resume();
  }

  finishTurn(id) {
    return this
      .getTurn(id)
      .finish();
  }

  cancelTurn(id) {
    return this
      .getTurn(id)
      .cancel();
  }

  getTurns() {
    return Array.from(
      this.turns.values()
    );
  }

  getTurnsByRound(roundId) {
    TurnValidator.validateRoundId(roundId);

    return this
      .getTurns()
      .filter(turn =>
        turn.getRoundId() === roundId
      );
  }

  getTurnsBySession(sessionId) {
    TurnValidator.validateSessionId(sessionId);

    return this
      .getTurns()
      .filter(turn =>
        turn.getSessionId() === sessionId
      );
  }

  getTurnsByGame(gameId) {
    TurnValidator.validateGameId(gameId);

    return this
      .getTurns()
      .filter(turn =>
        turn.getGameId() === gameId
      );
  }

  getTurnsByPlayer(playerId) {
    TurnValidator.validatePlayerId(playerId);

    return this
      .getTurns()
      .filter(turn =>
        turn.getPlayerId() === playerId
      );
  }

  getTurnsByStatus(status) {
    TurnValidator.validateStatus(status);

    return this
      .getTurns()
      .filter(turn =>
        turn.getStatus() === status
      );
  }

  getRunningTurns() {
    return this.getTurnsByStatus("RUNNING");
  }

  getPausedTurns() {
    return this.getTurnsByStatus("PAUSED");
  }

  getFinishedTurns() {
    return this.getTurnsByStatus("FINISHED");
  }

  getCancelledTurns() {
    return this.getTurnsByStatus("CANCELLED");
  }

  clear() {
    this.turns.clear();
  }

  toJSON() {
    return this
      .getTurns()
      .map(turn => turn.toJSON());
  }
}

export default TurnManager;
