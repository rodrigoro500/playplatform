import Round from "./Round";
import RoundValidator from "./RoundValidator";

class RoundManager {
  constructor() {
    this.rounds = new Map();
  }

  createRound(
    id,
    sessionId,
    gameId,
    number,
    metadata = {}
  ) {
    RoundValidator.validateId(id);
    RoundValidator.validateSessionId(sessionId);
    RoundValidator.validateGameId(gameId);
    RoundValidator.validateNumber(number);
    RoundValidator.validateMetadata(metadata);

    if (this.hasRound(id)) {
      throw new Error(
        "Ya existe una ronda con ese id."
      );
    }

    const round =
      new Round(
        id,
        sessionId,
        gameId,
        number,
        metadata
      );

    this.rounds.set(
      id,
      round
    );

    return round;
  }

  getRound(id) {
    RoundValidator.validateId(id);

    const round =
      this.rounds.get(id);

    if (!round) {
      throw new Error(
        "No existe una ronda con ese id."
      );
    }

    return round;
  }

  hasRound(id) {
    RoundValidator.validateId(id);

    return this.rounds.has(id);
  }

  removeRound(id) {
    RoundValidator.validateId(id);

    if (!this.hasRound(id)) {
      throw new Error(
        "No existe una ronda para eliminar."
      );
    }

    return this.rounds.delete(id);
  }

  startRound(id) {
    return this
      .getRound(id)
      .start();
  }

  pauseRound(id) {
    return this
      .getRound(id)
      .pause();
  }

  resumeRound(id) {
    return this
      .getRound(id)
      .resume();
  }

  finishRound(id) {
    return this
      .getRound(id)
      .finish();
  }

  cancelRound(id) {
    return this
      .getRound(id)
      .cancel();
  }

  getRounds() {
    return Array.from(
      this.rounds.values()
    );
  }

  getRoundsBySession(sessionId) {
    RoundValidator.validateSessionId(sessionId);

    return this
      .getRounds()
      .filter(round =>
        round.getSessionId() === sessionId
      );
  }

  getRoundsByGame(gameId) {
    RoundValidator.validateGameId(gameId);

    return this
      .getRounds()
      .filter(round =>
        round.getGameId() === gameId
      );
  }

  getRoundsByStatus(status) {
    RoundValidator.validateStatus(status);

    return this
      .getRounds()
      .filter(round =>
        round.getStatus() === status
      );
  }

  getRunningRounds() {
    return this.getRoundsByStatus("RUNNING");
  }

  getPausedRounds() {
    return this.getRoundsByStatus("PAUSED");
  }

  getFinishedRounds() {
    return this.getRoundsByStatus("FINISHED");
  }

  getCancelledRounds() {
    return this.getRoundsByStatus("CANCELLED");
  }

  clear() {
    this.rounds.clear();
  }

  toJSON() {
    return this
      .getRounds()
      .map(round => round.toJSON());
  }
}

export default RoundManager;
