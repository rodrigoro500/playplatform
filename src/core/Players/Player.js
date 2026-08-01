import BaseEntity from "../Entities/BaseEntity";

const PLAYER_STATUS = Object.freeze({
  LOBBY: "LOBBY",
  SEATED: "SEATED",
  READY: "READY",
  PLAYING: "PLAYING",
  DISCONNECTED: "DISCONNECTED",
});

class Player extends BaseEntity {
  constructor({
    id,
    nickname,
    avatar = null,
    isAdmin = false,
  }) {
    super(id);

    if (!nickname || !nickname.trim()) {
      throw new Error("El jugador debe tener un apodo.");
    }

    if (typeof isAdmin !== "boolean") {
      throw new Error("isAdmin debe ser un valor booleano.");
    }

    this.nickname = nickname.trim();
    this.avatar = avatar;
    this.isAdmin = isAdmin;

    this.seatNumber = null;
    this.isConnected = true;
    this.status = PLAYER_STATUS.LOBBY;
  }

  getNickname() {
    return this.nickname;
  }

  getAvatar() {
    return this.avatar;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getSeatNumber() {
    return this.seatNumber;
  }

  getStatus() {
    return this.status;
  }

  getIsConnected() {
    return this.isConnected;
  }

  isSeated() {
    return this.seatNumber !== null;
  }

  assignSeat(seatNumber) {
    if (!Number.isInteger(seatNumber)) {
      throw new Error(
        "El número de silla debe ser un número entero."
      );
    }

    if (seatNumber < 1 || seatNumber > 5) {
      throw new Error("La silla debe estar entre 1 y 5.");
    }

    if (this.isSeated()) {
      throw new Error(
        `${this.nickname} ya ocupa la silla ${this.seatNumber}.`
      );
    }

    this.seatNumber = seatNumber;
    this.status = PLAYER_STATUS.SEATED;
    this.updateTimestamp();

    return this.seatNumber;
  }

  releaseSeat() {
    const previousSeat = this.seatNumber;

    this.seatNumber = null;
    this.status = this.isConnected
      ? PLAYER_STATUS.LOBBY
      : PLAYER_STATUS.DISCONNECTED;

    this.updateTimestamp();

    return previousSeat;
  }

  connect() {
    this.isConnected = true;

    if (this.status === PLAYER_STATUS.DISCONNECTED) {
      this.status = this.isSeated()
        ? PLAYER_STATUS.SEATED
        : PLAYER_STATUS.LOBBY;
    }

    this.updateTimestamp();

    return this.isConnected;
  }

  disconnect() {
    this.isConnected = false;
    this.status = PLAYER_STATUS.DISCONNECTED;

    this.updateTimestamp();

    return this.isConnected;
  }

  setStatus(newStatus) {
    if (!Object.values(PLAYER_STATUS).includes(newStatus)) {
      throw new Error(
        `El estado "${newStatus}" no es válido para un jugador.`
      );
    }

    if (
      newStatus !== PLAYER_STATUS.DISCONNECTED &&
      !this.isConnected
    ) {
      throw new Error(
        "Un jugador desconectado no puede cambiar a un estado activo."
      );
    }

    if (
      [
        PLAYER_STATUS.SEATED,
        PLAYER_STATUS.READY,
        PLAYER_STATUS.PLAYING,
      ].includes(newStatus) &&
      !this.isSeated()
    ) {
      throw new Error(
        `El jugador debe ocupar una silla para pasar al estado "${newStatus}".`
      );
    }

    this.status = newStatus;
    this.updateTimestamp();

    return this.status;
  }

  clone() {
    const copy = new Player({
      id: this.id,
      nickname: this.nickname,
      avatar: this.avatar,
      isAdmin: this.isAdmin,
    });

    copy.seatNumber = this.seatNumber;
    copy.isConnected = this.isConnected;
    copy.status = this.status;
    copy.createdAt = this.createdAt;
    copy.updatedAt = this.updatedAt;

    return copy;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      nickname: this.nickname,
      avatar: this.avatar,
      isAdmin: this.isAdmin,
      seatNumber: this.seatNumber,
      isConnected: this.isConnected,
      status: this.status,
    };
  }
}

export { PLAYER_STATUS };
export default Player;