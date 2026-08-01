import Action from "./Action";

class ActionValidator {
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
        "El id de la acción debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id de la acción no puede estar vacío."
      );
    }
  }

  static validateTurnId(turnId) {
    if (typeof turnId !== "string") {
      throw new Error(
        "El id del turno de la acción debe ser un string."
      );
    }

    if (turnId.trim() === "") {
      throw new Error(
        "El id del turno de la acción no puede estar vacío."
      );
    }
  }

  static validateRoundId(roundId) {
    if (typeof roundId !== "string") {
      throw new Error(
        "El id de la ronda de la acción debe ser un string."
      );
    }

    if (roundId.trim() === "") {
      throw new Error(
        "El id de la ronda de la acción no puede estar vacío."
      );
    }
  }

  static validateSessionId(sessionId) {
    if (typeof sessionId !== "string") {
      throw new Error(
        "El id de la sesión de la acción debe ser un string."
      );
    }

    if (sessionId.trim() === "") {
      throw new Error(
        "El id de la sesión de la acción no puede estar vacío."
      );
    }
  }

  static validateGameId(gameId) {
    if (typeof gameId !== "string") {
      throw new Error(
        "El id del juego de la acción debe ser un string."
      );
    }

    if (gameId.trim() === "") {
      throw new Error(
        "El id del juego de la acción no puede estar vacío."
      );
    }
  }

  static validatePlayerId(playerId) {
    if (typeof playerId !== "string") {
      throw new Error(
        "El id del jugador de la acción debe ser un string."
      );
    }

    if (playerId.trim() === "") {
      throw new Error(
        "El id del jugador de la acción no puede estar vacío."
      );
    }
  }

  static validateType(type) {
    if (typeof type !== "string") {
      throw new Error(
        "El tipo de la acción debe ser un string."
      );
    }

    if (type.trim() === "") {
      throw new Error(
        "El tipo de la acción no puede estar vacío."
      );
    }
  }

  static validateStatus(status) {
    if (!ActionValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la acción no es válido."
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
        "La metadata de la acción debe ser un objeto válido."
      );
    }
  }

  static validateAction(action) {
    if (!(action instanceof Action)) {
      throw new Error(
        "La acción debe ser una instancia de Action."
      );
    }
  }
}

export default ActionValidator;
