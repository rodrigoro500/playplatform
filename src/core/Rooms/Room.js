import BaseEntity from "../Entities/BaseEntity";

const ROOM_STATUS = Object.freeze({
  WAITING: "WAITING",
  READY: "READY",
  PLAYING: "PLAYING",
  FINISHED: "FINISHED",
  CLOSED: "CLOSED",
});

class Room extends BaseEntity {
  constructor({
    id,
    name,
    owner,
    maxPlayers = 5,
  }) {
    super(id);

    if (!name || !name.trim()) {
      throw new Error("La sala debe tener un nombre.");
    }

    if (!owner) {
      throw new Error("La sala debe tener un propietario.");
    }

    if (!Number.isInteger(maxPlayers) || maxPlayers < 2) {
      throw new Error(
        "La capacidad de la sala debe ser un número entero mayor o igual a 2."
      );
    }

    this.name = name.trim();
    this.owner = owner;
    this.maxPlayers = maxPlayers;

    this.players = [];
    this.seats = Array(maxPlayers).fill(null);

    this.state = ROOM_STATUS.WAITING;
    this.currentGame = null;
  }

  getName() {
    return this.name;
  }

  getOwner() {
    return this.owner;
  }

  getMaxPlayers() {
    return this.maxPlayers;
  }

  getPlayers() {
    return [...this.players];
  }

  getPlayer(playerId) {
    return (
      this.players.find(
        player => player.getId() === playerId
      ) ?? null
    );
  }

  getPlayerCount() {
    return this.players.length;
  }

  hasPlayer(playerId) {
    return this.players.some(
      player => player.getId() === playerId
    );
  }

  addPlayer(player) {
    if (
      !player ||
      typeof player.getId !== "function" ||
      typeof player.getNickname !== "function"
    ) {
      throw new Error("Se debe proporcionar un jugador válido.");
    }

    if (this.hasPlayer(player.getId())) {
      throw new Error(
        `El jugador "${player.getNickname()}" ya pertenece a la sala.`
      );
    }

    if (this.isFull()) {
      throw new Error("La sala está completa.");
    }

    this.players.push(player);
    this.updateTimestamp();

    return player;
  }

  removePlayer(playerId) {
    const playerIndex = this.players.findIndex(
      player => player.getId() === playerId
    );

    if (playerIndex === -1) {
      throw new Error("Jugador no encontrado en la sala.");
    }

    const seatNumber = this.getPlayerSeat(playerId);

    if (seatNumber !== null) {
      this.releaseSeat(seatNumber);
    }

    const [removedPlayer] = this.players.splice(
      playerIndex,
      1
    );

    this.updateTimestamp();

    return removedPlayer;
  }

  isFull() {
    return this.players.length >= this.maxPlayers;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    if (!Object.values(ROOM_STATUS).includes(state)) {
      throw new Error(
        `El estado "${state}" no es válido para una sala.`
      );
    }

    this.state = state;
    this.updateTimestamp();

    return this.state;
  }

  setCurrentGame(gameName) {
    if (!gameName || typeof gameName !== "string") {
      throw new Error("Se debe indicar un juego válido.");
    }

    this.currentGame = gameName.trim();
    this.updateTimestamp();

    return this.currentGame;
  }

  clearCurrentGame() {
    const previousGame = this.currentGame;

    this.currentGame = null;
    this.updateTimestamp();

    return previousGame;
  }

  getCurrentGame() {
    return this.currentGame;
  }

  getSeats() {
    return [...this.seats];
  }

  getAvailableSeats() {
    return this.seats
      .map((playerId, index) => ({
        seatNumber: index + 1,
        playerId,
        occupied: playerId !== null,
      }))
      .filter(seat => !seat.occupied);
  }

  getOccupiedSeats() {
    return this.seats
      .map((playerId, index) => ({
        seatNumber: index + 1,
        playerId,
        occupied: playerId !== null,
      }))
      .filter(seat => seat.occupied);
  }

  isSeatValid(seatNumber) {
    return (
      Number.isInteger(seatNumber) &&
      seatNumber >= 1 &&
      seatNumber <= this.maxPlayers
    );
  }

  isSeatAvailable(seatNumber) {
    if (!this.isSeatValid(seatNumber)) {
      return false;
    }

    return this.seats[seatNumber - 1] === null;
  }

  getPlayerSeat(playerId) {
    const seatIndex = this.seats.findIndex(
      currentPlayerId => currentPlayerId === playerId
    );

    return seatIndex === -1 ? null : seatIndex + 1;
  }

  assignSeat(playerId, seatNumber) {
    const player = this.getPlayer(playerId);

    if (!player) {
      throw new Error(
        "El jugador debe pertenecer a la sala antes de ocupar una silla."
      );
    }

    if (!this.isSeatValid(seatNumber)) {
      throw new Error(
        `La silla debe estar entre 1 y ${this.maxPlayers}.`
      );
    }

    const currentSeat = this.getPlayerSeat(playerId);

    if (currentSeat !== null) {
      throw new Error(
        `El jugador ya ocupa la silla ${currentSeat}.`
      );
    }

    if (!this.isSeatAvailable(seatNumber)) {
      throw new Error(
        `La silla ${seatNumber} ya está ocupada.`
      );
    }

    this.seats[seatNumber - 1] = playerId;

    try {
      player.assignSeat(seatNumber);
    } catch (error) {
      this.seats[seatNumber - 1] = null;
      throw error;
    }

    this.updateTimestamp();

    return seatNumber;
  }

  releaseSeat(seatNumber) {
    if (!this.isSeatValid(seatNumber)) {
      throw new Error(
        `La silla debe estar entre 1 y ${this.maxPlayers}.`
      );
    }

    const seatIndex = seatNumber - 1;
    const playerId = this.seats[seatIndex];

    if (playerId === null) {
      throw new Error(
        `La silla ${seatNumber} ya está libre.`
      );
    }

    const player = this.getPlayer(playerId);

    this.seats[seatIndex] = null;

    try {
      if (player) {
        player.releaseSeat();
      }
    } catch (error) {
      this.seats[seatIndex] = playerId;
      throw error;
    }

    this.updateTimestamp();

    return playerId;
  }

  canStart(minimumPlayers = 2) {
    if (
      !Number.isInteger(minimumPlayers) ||
      minimumPlayers < 2 ||
      minimumPlayers > this.maxPlayers
    ) {
      throw new Error(
        `La cantidad mínima debe estar entre 2 y ${this.maxPlayers}.`
      );
    }

    const seatedPlayers = this.getOccupiedSeats().length;

    return seatedPlayers >= minimumPlayers;
  }

  clone() {
    const copy = new Room({
      id: this.id,
      name: this.name,
      owner: this.owner,
      maxPlayers: this.maxPlayers,
    });

    copy.players = this.players.map(player =>
      typeof player.clone === "function"
        ? player.clone()
        : player
    );

    copy.seats = [...this.seats];
    copy.state = this.state;
    copy.currentGame = this.currentGame;
    copy.createdAt = this.createdAt;
    copy.updatedAt = this.updatedAt;

    return copy;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      owner:
        typeof this.owner.toJSON === "function"
          ? this.owner.toJSON()
          : this.owner,
      maxPlayers: this.maxPlayers,
      playerCount: this.getPlayerCount(),
      players: this.players.map(player =>
        typeof player.toJSON === "function"
          ? player.toJSON()
          : player
      ),
      seats: this.getSeats(),
      availableSeats: this.getAvailableSeats(),
      occupiedSeats: this.getOccupiedSeats(),
      state: this.state,
      currentGame: this.currentGame,
    };
  }
}

export { ROOM_STATUS };
export default Room;