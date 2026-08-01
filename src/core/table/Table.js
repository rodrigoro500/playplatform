class Table {
  static STATUSES = [
    "OPEN",
    "CLOSED",
    "PLAYING",
  ];

  constructor(
    id,
    name,
    gameType,
    maxPlayers = 10,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id de la mesa es obligatorio."
    );
    this.validateText(
      name,
      "El nombre de la mesa es obligatorio."
    );
    this.validateText(
      gameType,
      "El tipo de juego de la mesa es obligatorio."
    );
    this.validateMaxPlayers(maxPlayers);
    this.validateMetadata(metadata);

    this.id = id;
    this.name = name;
    this.gameType = gameType;
    this.status = "OPEN";
    this.players = [];
    this.maxPlayers = maxPlayers;
    this.metadata = {
      ...metadata,
    };
    this.createdAt = new Date().toISOString();
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

  validateStatus(status) {
    if (!Table.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la mesa no es válido."
      );
    }
  }

  validateMaxPlayers(maxPlayers) {
    if (
      typeof maxPlayers !== "number" ||
      !Number.isFinite(maxPlayers) ||
      maxPlayers <= 0
    ) {
      throw new Error(
        "La cantidad máxima de jugadores debe ser mayor que cero."
      );
    }
  }

  validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata de la mesa debe ser un objeto."
      );
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.validateText(
      name,
      "El nombre de la mesa es obligatorio."
    );

    this.name = name;

    return this.name;
  }

  getGameType() {
    return this.gameType;
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
        "El jugador ya pertenece a la mesa."
      );
    }

    if (this.isFull()) {
      throw new Error(
        "La mesa ya alcanzó la cantidad máxima de jugadores."
      );
    }

    this.players.push(playerId);

    return this.getPlayers();
  }

  removePlayer(playerId) {
    this.validatePlayerId(playerId);

    if (!this.hasPlayer(playerId)) {
      throw new Error(
        "El jugador no pertenece a la mesa."
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

  isFull() {
    return this.getPlayerCount() >= this.maxPlayers;
  }

  getMaxPlayers() {
    return this.maxPlayers;
  }

  setMaxPlayers(maxPlayers) {
    this.validateMaxPlayers(maxPlayers);

    if (maxPlayers < this.getPlayerCount()) {
      throw new Error(
        "La cantidad máxima de jugadores no puede ser menor que los jugadores actuales."
      );
    }

    this.maxPlayers = maxPlayers;

    return this.maxPlayers;
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

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      gameType: this.gameType,
      status: this.status,
      players: this.getPlayers(),
      maxPlayers: this.maxPlayers,
      metadata: this.getMetadata(),
      createdAt: this.createdAt,
    };
  }
}

export default Table;
