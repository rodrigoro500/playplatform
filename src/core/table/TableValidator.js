import Table from "./Table";

class TableValidator {
  static STATUSES = [
    "OPEN",
    "CLOSED",
    "PLAYING",
  ];

  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id de la mesa debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id de la mesa no puede estar vacío."
      );
    }
  }

  static validateName(name) {
    if (typeof name !== "string") {
      throw new Error(
        "El nombre de la mesa debe ser un string."
      );
    }

    if (name.trim() === "") {
      throw new Error(
        "El nombre de la mesa no puede estar vacío."
      );
    }
  }

  static validateGameType(gameType) {
    if (typeof gameType !== "string") {
      throw new Error(
        "El tipo de juego de la mesa debe ser un string."
      );
    }

    if (gameType.trim() === "") {
      throw new Error(
        "El tipo de juego de la mesa no puede estar vacío."
      );
    }
  }

  static validateStatus(status) {
    if (!TableValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la mesa no es válido."
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

  static validateMaxPlayers(maxPlayers) {
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

    if (maxPlayers <= 0) {
      throw new Error(
        "La cantidad máxima de jugadores debe ser mayor que cero."
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
        "La metadata de la mesa debe ser un objeto válido."
      );
    }
  }

  static validateTable(table) {
    if (!(table instanceof Table)) {
      throw new Error(
        "La mesa debe ser una instancia de Table."
      );
    }
  }
}

export default TableValidator;
