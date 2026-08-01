import Bet from "./Bet";

class BetValidator {
  static STATUSES = [
    "CREATED",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "WON",
    "LOST",
    "PUSH",
    "REFUNDED",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateId(id) {
    BetValidator.validateText(
      id,
      "El id de la apuesta debe ser un string no vacío."
    );
  }

  static validateActionId(actionId) {
    BetValidator.validateText(
      actionId,
      "El id de la acción de la apuesta debe ser un string no vacío."
    );
  }

  static validateTurnId(turnId) {
    BetValidator.validateText(
      turnId,
      "El id del turno de la apuesta debe ser un string no vacío."
    );
  }

  static validateRoundId(roundId) {
    BetValidator.validateText(
      roundId,
      "El id de la ronda de la apuesta debe ser un string no vacío."
    );
  }

  static validateSessionId(sessionId) {
    BetValidator.validateText(
      sessionId,
      "El id de la sesión de la apuesta debe ser un string no vacío."
    );
  }

  static validateGameId(gameId) {
    BetValidator.validateText(
      gameId,
      "El id del juego de la apuesta debe ser un string no vacío."
    );
  }

  static validatePlayerId(playerId) {
    BetValidator.validateText(
      playerId,
      "El id del jugador de la apuesta debe ser un string no vacío."
    );
  }

  static validateBetType(betType) {
    BetValidator.validateText(
      betType,
      "El tipo de la apuesta debe ser un string no vacío."
    );
  }

  static validateAmount(amount) {
    if (typeof amount !== "number") {
      throw new Error(
        "El monto de la apuesta debe ser un número."
      );
    }

    if (!Number.isFinite(amount)) {
      throw new Error(
        "El monto de la apuesta debe ser un número finito."
      );
    }

    if (amount <= 0) {
      throw new Error(
        "El monto de la apuesta debe ser mayor que cero."
      );
    }
  }

  static validateStatus(status) {
    if (!BetValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la apuesta no es válido."
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
        "La metadata de la apuesta debe ser un objeto válido."
      );
    }
  }

  static validateBet(bet) {
    if (!(bet instanceof Bet)) {
      throw new Error(
        "La apuesta debe ser una instancia de Bet."
      );
    }
  }
}

export default BetValidator;
