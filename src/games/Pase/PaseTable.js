class PaseTable {
  constructor({
    id,
    name = "",
    maxPlayers = 8,
    players = [],
  }) {
    if (!id) {
      throw new Error(
        "La mesa debe tener un identificador."
      );
    }

    this.id = id;

    this.name = name;

    this.maxPlayers = maxPlayers;

    this.players = [...players];

    this.currentShooterId = null;

    this.currentGameId = null;

    this.currentSessionId = null;

    this.status = "WAITING_PLAYERS";

    this.createdAt = new Date();

    this.updatedAt = new Date();
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPlayers() {
    return [...this.players];
  }

  getPlayerCount() {
    return this.players.length;
  }

  isFull() {
    return this.players.length >= this.maxPlayers;
  }

  hasPlayer(playerId) {
    return this.players.includes(playerId);
  }

  addPlayer(playerId) {
    if (this.isFull()) {
      throw new Error(
        "La mesa ya alcanzó el máximo de jugadores."
      );
    }

    if (this.hasPlayer(playerId)) {
      throw new Error(
        "El jugador ya pertenece a la mesa."
      );
    }

    this.players.push(playerId);

    this.updatedAt = new Date();

    return playerId;
  }

  removePlayer(playerId) {
    this.players = this.players.filter(
      (player) => player !== playerId
    );

    this.updatedAt = new Date();
  }

  setShooter(playerId) {
    if (!this.hasPlayer(playerId)) {
      throw new Error(
        "El tirador debe pertenecer a la mesa."
      );
    }

    this.currentShooterId = playerId;

    this.updatedAt = new Date();
  }

  getShooter() {
    return this.currentShooterId;
  }

  setCurrentGame(gameId) {
    this.currentGameId = gameId;

    this.updatedAt = new Date();
  }

  getCurrentGame() {
    return this.currentGameId;
  }

  setCurrentSession(sessionId) {
    this.currentSessionId = sessionId;

    this.updatedAt = new Date();
  }

  getCurrentSession() {
    return this.currentSessionId;
  }

  setStatus(status) {
    this.status = status;

    this.updatedAt = new Date();
  }

  getStatus() {
    return this.status;
  }

  clearTable() {
    this.players = [];

    this.currentShooterId = null;

    this.currentGameId = null;

    this.currentSessionId = null;

    this.status = "WAITING_PLAYERS";

    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,

      name: this.name,

      maxPlayers: this.maxPlayers,

      players: [...this.players],

      playerCount: this.players.length,

      currentShooterId:
        this.currentShooterId,

      currentGameId:
        this.currentGameId,

      currentSessionId:
        this.currentSessionId,

      status: this.status,

      createdAt: this.createdAt,

      updatedAt: this.updatedAt,
    };
  }
}

export default PaseTable;