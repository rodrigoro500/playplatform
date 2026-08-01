import Game from "./Game";

class GameValidator {
  static STATUSES = [
    "CREATED",
    "WAITING",
    "RUNNING",
    "FINISHED",
    "CANCELLED",
  ];

  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id del juego debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id del juego no puede estar vacío."
      );
    }
  }

  static validateType(type) {
    if (typeof type !== "string") {
      throw new Error(
        "El tipo del juego debe ser un string."
      );
    }

    if (type.trim() === "") {
      throw new Error(
        "El tipo del juego no puede estar vacío."
      );
    }
  }

  static validateStatus(status) {
    if (!GameValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del juego no es válido."
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

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del juego debe ser un objeto válido."
      );
    }
  }

  static validateGame(game) {
    if (!(game instanceof Game)) {
      throw new Error(
        "El juego debe ser una instancia de Game."
      );
    }
  }
}

export default GameValidator;
