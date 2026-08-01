class Lobby {
  static STATUSES = [
    "WAITING",
    "READY",
    "STARTED",
    "CLOSED",
  ];

  constructor(
    id,
    name,
    gameType,
    minPlayers = 2,
    maxPlayers = 10,
    metadata = {}
  ) {
    this.validateText(
      id,
      "El id del lobby es obligatorio."
    );
    this.validateText(
      name,
      "El nombre del lobby es obligatorio."
    );
    this.validateText(
      gameType,
      "El tipo de juego del lobby es obligatorio."
    );
    this.validateLimits(
      minPlayers,
      maxPlayers
    );
    this.validateMetadata(metadata);

    this.id = id;
    this.name = name;
    this.gameType = gameType;
    this.status = "WAITING";
    this.players = [];
    this.minPlayers = minPlayers;
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
    if (!Lobby.STATUSES.includes(status)) {
      throw new Error(
        "El estado del lobby no es válido."
      );
    }
  }

  validateLimits(minPlayers, maxPlayers) {
    if (
      typeof minPlayers !== "number" ||
      !Number.isInteger(minPlayers) ||
      minPlayers <= 0
    ) {
      throw new Error(
        "La cantidad mínima de jugadores debe ser mayor que cero."
      );
    }

    if (
      typeof maxPlayers !== "number" ||
      !Number.isInteger(maxPlayers) ||
      maxPlayers < minPlayers
    ) {
      throw new Error(
        "La cantidad máxima de jugadores debe ser mayor o igual que la mínima."
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
        "La metadata del lobby debe ser un objeto."
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
      "El nombre del lobby es obligatorio."
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
        "El jugador ya pertenece al lobby."
      );
    }

    if (this.isFull()) {
      throw new Error(
        "El lobby ya alcanzó la cantidad máxima de jugadores."
      );
    }

    this.players.push(playerId);

    return this.getPlayers();
  }

  removePlayer(playerId) {
    this.validatePlayerId(playerId);

    if (!this.hasPlayer(playerId)) {
      throw new Error(
        "El jugador no pertenece al lobby."
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

  isReady() {
    return this.getPlayerCount() >= this.minPlayers;
  }

  isFull() {
    return this.getPlayerCount() >= this.maxPlayers;
  }

  getMinPlayers() {
    return this.minPlayers;
  }

  getMaxPlayers() {
    return this.maxPlayers;
  }

  setLimits(minPlayers, maxPlayers) {
    this.validateLimits(
      minPlayers,
      maxPlayers
    );

    if (maxPlayers < this.getPlayerCount()) {
      throw new Error(
        "La cantidad máxima de jugadores no puede ser menor que los jugadores actuales."
      );
    }

    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;

    return {
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
    };
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
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
      metadata: this.getMetadata(),
      createdAt: this.createdAt,
    };
  }
}

export default Lobby;
