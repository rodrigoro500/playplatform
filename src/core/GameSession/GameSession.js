import BaseEntity from "../Entities/BaseEntity";

const SESSION_STATUS = Object.freeze({
  WAITING: "WAITING",
  RUNNING: "RUNNING",
  FINISHED: "FINISHED",
  CANCELLED: "CANCELLED",
});

class GameSession extends BaseEntity {
  constructor({
    id,
    roomId,
    gameName,
    players = [],
  }) {
    super(id);

    if (!roomId) {
      throw new Error("La sesión debe pertenecer a una sala.");
    }

    if (!gameName || typeof gameName !== "string") {
      throw new Error("Debe especificarse un juego válido.");
    }

    if (!Array.isArray(players)) {
      throw new Error(
        "Los jugadores de la sesión deben proporcionarse en un arreglo."
      );
    }

    this.roomId = roomId;
    this.gameName = gameName.trim();

    this.players = [...players];

    this.round = 1;
    this.currentTurn = 0;
    this.status = SESSION_STATUS.WAITING;

    this.startedAt = null;
    this.finishedAt = null;
  }

  getRoomId() {
    return this.roomId;
  }

  getGameName() {
    return this.gameName;
  }

  getRound() {
    return this.round;
  }

  getStatus() {
    return this.status;
  }

  getPlayers() {
    return [...this.players];
  }

  getPlayerCount() {
    return this.players.length;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  getStartedAt() {
    return this.startedAt;
  }

  getFinishedAt() {
    return this.finishedAt;
  }

  isWaiting() {
    return this.status === SESSION_STATUS.WAITING;
  }

  isRunning() {
    return this.status === SESSION_STATUS.RUNNING;
  }

  isFinished() {
    return this.status === SESSION_STATUS.FINISHED;
  }

  start() {
    if (!this.isWaiting()) {
      throw new Error(
        "Solo una sesión en espera puede iniciarse."
      );
    }

    if (this.players.length < 2) {
      throw new Error(
        "Se necesitan al menos dos jugadores."
      );
    }

    this.status = SESSION_STATUS.RUNNING;
    this.startedAt = new Date().toISOString();

    this.updateTimestamp();

    return this.status;
  }

  finish() {
    if (!this.isRunning()) {
      throw new Error(
        "Solo una sesión en ejecución puede finalizarse."
      );
    }

    this.status = SESSION_STATUS.FINISHED;
    this.finishedAt = new Date().toISOString();

    this.updateTimestamp();

    return this.status;
  }

  cancel() {
    if (this.isFinished()) {
      throw new Error(
        "No se puede cancelar una sesión finalizada."
      );
    }

    this.status = SESSION_STATUS.CANCELLED;
    this.finishedAt = new Date().toISOString();

    this.updateTimestamp();

    return this.status;
  }

  nextRound() {
    if (!this.isRunning()) {
      throw new Error(
        "La sesión debe estar en ejecución para avanzar de ronda."
      );
    }

    this.round += 1;
    this.currentTurn = 0;

    this.updateTimestamp();

    return this.round;
  }

  nextTurn() {
    if (!this.isRunning()) {
      throw new Error(
        "La sesión debe estar en ejecución para avanzar de turno."
      );
    }

    if (this.players.length === 0) {
      throw new Error(
        "No hay jugadores disponibles para asignar un turno."
      );
    }

    this.currentTurn =
      (this.currentTurn + 1) % this.players.length;

    this.updateTimestamp();

    return this.players[this.currentTurn];
  }

  getCurrentPlayer() {
    return this.players[this.currentTurn] ?? null;
  }

  clone() {
    const copy = new GameSession({
      id: this.id,
      roomId: this.roomId,
      gameName: this.gameName,
      players: this.players.map(player =>
        typeof player?.clone === "function"
          ? player.clone()
          : player
      ),
    });

    copy.round = this.round;
    copy.currentTurn = this.currentTurn;
    copy.status = this.status;
    copy.startedAt = this.startedAt;
    copy.finishedAt = this.finishedAt;
    copy.createdAt = this.createdAt;
    copy.updatedAt = this.updatedAt;

    return copy;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      roomId: this.roomId,
      gameName: this.gameName,
      players: this.players.map(player =>
        typeof player?.toJSON === "function"
          ? player.toJSON()
          : player
      ),
      playerCount: this.getPlayerCount(),
      round: this.round,
      currentTurn: this.currentTurn,
      currentPlayer:
        typeof this.getCurrentPlayer()?.toJSON === "function"
          ? this.getCurrentPlayer().toJSON()
          : this.getCurrentPlayer(),
      status: this.status,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
    };
  }
}

export { SESSION_STATUS };
export default GameSession;