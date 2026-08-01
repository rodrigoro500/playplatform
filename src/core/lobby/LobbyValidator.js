import Lobby from "./Lobby";

class LobbyValidator {
  static STATUSES = [
    "WAITING",
    "READY",
    "STARTED",
    "CLOSED",
  ];

  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id del lobby debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id del lobby no puede estar vacío."
      );
    }
  }

  static validateName(name) {
    if (typeof name !== "string") {
      throw new Error(
        "El nombre del lobby debe ser un string."
      );
    }

    if (name.trim() === "") {
      throw new Error(
        "El nombre del lobby no puede estar vacío."
      );
    }
  }

  static validateGameType(gameType) {
    if (typeof gameType !== "string") {
      throw new Error(
        "El tipo de juego del lobby debe ser un string."
      );
    }

    if (gameType.trim() === "") {
      throw new Error(
        "El tipo de juego del lobby no puede estar vacío."
      );
    }
  }

  static validateStatus(status) {
    if (!LobbyValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del lobby no es válido."
      );
    }
  }

  static validatePlayerId(playerId) {
    if (typeof playerId !== "string") {
      throw new Error(
        "El id del jugador debe ser un string."
      );
    }

    if (playerId.trim() === "") {
      throw new Error(
        "El id del jugador no puede estar vacío."
      );
    }
  }

  static validateMinPlayers(minPlayers) {
    if (typeof minPlayers !== "number") {
      throw new Error(
        "La cantidad mínima de jugadores debe ser un número."
      );
    }

    if (!Number.isInteger(minPlayers)) {
      throw new Error(
        "La cantidad mínima de jugadores debe ser un número entero."
      );
    }

    if (minPlayers <= 0) {
      throw new Error(
        "La cantidad mínima de jugadores debe ser mayor que cero."
      );
    }
  }

  static validateMaxPlayers(
    maxPlayers,
    minPlayers
  ) {
    if (typeof maxPlayers !== "number") {
      throw new Error(
        "La cantidad máxima de jugadores debe ser un número."
      );
    }

    if (!Number.isInteger(maxPlayers)) {
      throw new Error(
        "La cantidad máxima de jugadores debe ser un número entero."
      );
    }

    if (maxPlayers < minPlayers) {
      throw new Error(
        "La cantidad máxima de jugadores debe ser mayor o igual que la mínima."
      );
    }
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del lobby debe ser un objeto válido."
      );
    }
  }

  static validateLobby(lobby) {
    if (!(lobby instanceof Lobby)) {
      throw new Error(
        "El lobby debe ser una instancia de Lobby."
      );
    }
  }
}

export default LobbyValidator;
