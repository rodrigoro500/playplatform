class Game {
  static STATUSES = [
    "CREATED",
    "WAITING",
    "RUNNING",
    "FINISHED",
    "CANCELLED",
  ];

  constructor(
    id,
    type,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id del juego es obligatorio."
    );
    this.validateText(
      type,
      "El tipo del juego es obligatorio."
    );
    this.validateMetadata(metadata);

    this.id = id;
    this.type = type;
    this.status = "CREATED";
    this.players = [];
    this.metadata = {
      ...metadata,
    };
    this.createdAt = new Date().toISOString();
    this.startedAt = null;
    this.finishedAt = null;
  }

  validateText(value, message) {
    if (
      typeof value !== "string" ||
      value.trim() === ""
    ) {
      throw new Error(message);
    }
  }

  validatePlayerId(playerId) {
    this.validateText(
      playerId,
      "El id del jugador es obligatorio."
    );
  }

  validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del juego debe ser un objeto."
      );
    }
  }

  validateStatus(status) {
    if (!Game.STATUSES.includes(status)) {
      throw new Error(
        "El estado del juego no es válido."
      );
    }
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.validateStatus(status);

    this.status = status;

    return this.status;
  }

  getPlayers() {
    return [
      ...this.players,
    ];
  }

  addPlayer(playerId) {
    this.validatePlayerId(playerId);

    if (this.hasPlayer(playerId)) {
      throw new Error(
        "El jugador ya pertenece al juego."
      );
    }

    this.players.push(playerId);

    return this.getPlayers();
  }

  removePlayer(playerId) {
    this.validatePlayerId(playerId);

    if (!this.hasPlayer(playerId)) {
      throw new Error(
        "El jugador no pertenece al juego."
      );
    }

    this.players = this.players.filter(
      currentPlayerId =>
        currentPlayerId !== playerId
    );

    return this.getPlayers();
  }

  hasPlayer(playerId) {
    this.validatePlayerId(playerId);

    return this.players.includes(playerId);
  }

  getPlayerCount() {
    return this.players.length;
  }

  getMetadata() {
    return {
      ...this.metadata,
    };
  }

  setMetadata(metadata) {
    this.validateMetadata(metadata);

    this.metadata = {
      ...metadata,
    };

    return this.getMetadata();
  }

  updateMetadata(data) {
    this.validateMetadata(data);

    this.metadata = {
      ...this.metadata,
      ...data,
    };

    return this.getMetadata();
  }

  start() {
    this.setStatus("RUNNING");
    this.startedAt = new Date().toISOString();

    return this.status;
  }

  finish() {
    this.setStatus("FINISHED");
    this.finishedAt = new Date().toISOString();

    return this.status;
  }

  cancel() {
    this.setStatus("CANCELLED");
    this.finishedAt = new Date().toISOString();

    return this.status;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      players: this.getPlayers(),
      metadata: this.getMetadata(),
      createdAt: this.createdAt,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
    };
  }
}

export default Game;
