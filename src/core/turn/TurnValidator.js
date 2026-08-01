import Turn from "./Turn";

class TurnValidator {
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
        "El id del turno debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id del turno no puede estar vacío."
      );
    }
  }

  static validateRoundId(roundId) {
    if (typeof roundId !== "string") {
      throw new Error(
        "El id de la ronda del turno debe ser un string."
      );
    }

    if (roundId.trim() === "") {
      throw new Error(
        "El id de la ronda del turno no puede estar vacío."
      );
    }
  }

  static validateSessionId(sessionId) {
    if (typeof sessionId !== "string") {
      throw new Error(
        "El id de la sesión del turno debe ser un string."
      );
    }

    if (sessionId.trim() === "") {
      throw new Error(
        "El id de la sesión del turno no puede estar vacío."
      );
    }
  }

  static validateGameId(gameId) {
    if (typeof gameId !== "string") {
      throw new Error(
        "El id del juego del turno debe ser un string."
      );
    }

    if (gameId.trim() === "") {
      throw new Error(
        "El id del juego del turno no puede estar vacío."
      );
    }
  }

  static validatePlayerId(playerId) {
    if (typeof playerId !== "string") {
      throw new Error(
        "El id del jugador del turno debe ser un string."
      );
    }

    if (playerId.trim() === "") {
      throw new Error(
        "El id del jugador del turno no puede estar vacío."
      );
    }
  }

  static validateOrder(order) {
    if (typeof order !== "number") {
      throw new Error(
        "El orden del turno debe ser un número."
      );
    }

    if (!Number.isInteger(order)) {
      throw new Error(
        "El orden del turno debe ser un entero."
      );
    }

    if (order <= 0) {
      throw new Error(
        "El orden del turno debe ser mayor que cero."
      );
    }
  }

  static validateStatus(status) {
    if (!TurnValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado del turno no es válido."
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
        "La metadata del turno debe ser un objeto válido."
      );
    }
  }

  static validateTurn(turn) {
    if (!(turn instanceof Turn)) {
      throw new Error(
        "El turno debe ser una instancia de Turn."
      );
    }
  }
}

export default TurnValidator;
