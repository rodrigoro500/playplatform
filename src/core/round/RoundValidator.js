import Round from "./Round";

class RoundValidator {
  static STATUSES = [
    "CREATED",
    "RUNNING",
    "PAUSED",
    "FINISHED",
    "CANCELLED",
  ];

  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id de la ronda debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id de la ronda no puede estar vacío."
      );
    }
  }

  static validateSessionId(sessionId) {
    if (typeof sessionId !== "string") {
      throw new Error(
        "El id de la sesión de la ronda debe ser un string."
      );
    }

    if (sessionId.trim() === "") {
      throw new Error(
        "El id de la sesión de la ronda no puede estar vacío."
      );
    }
  }

  static validateGameId(gameId) {
    if (typeof gameId !== "string") {
      throw new Error(
        "El id del juego de la ronda debe ser un string."
      );
    }

    if (gameId.trim() === "") {
      throw new Error(
        "El id del juego de la ronda no puede estar vacío."
      );
    }
  }

  static validateNumber(number) {
    if (typeof number !== "number") {
      throw new Error(
        "El número de la ronda debe ser un número."
      );
    }

    if (!Number.isInteger(number)) {
      throw new Error(
        "El número de la ronda debe ser un entero."
      );
    }

    if (number <= 0) {
      throw new Error(
        "El número de la ronda debe ser mayor que cero."
      );
    }
  }

  static validateStatus(status) {
    if (!RoundValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la ronda no es válido."
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
        "La metadata de la ronda debe ser un objeto válido."
      );
    }
  }

  static validateRound(round) {
    if (!(round instanceof Round)) {
      throw new Error(
        "La ronda debe ser una instancia de Round."
      );
    }
  }
}

export default RoundValidator;
