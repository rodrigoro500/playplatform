import Transaction from "./Transaction";

class TransactionValidator {
  static STATUSES = [
    "PENDING",
    "COMPLETED",
    "FAILED",
    "CANCELLED",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateFiniteNumber(value, message) {
    if (typeof value !== "number") {
      throw new Error(message);
    }

    if (!Number.isFinite(value)) {
      throw new Error(message);
    }
  }

  static validateId(id) {
    TransactionValidator.validateText(
      id,
      "El id de la transaccion debe ser un string no vacio."
    );
  }

  static validateWalletId(walletId) {
    TransactionValidator.validateText(
      walletId,
      "El id del wallet de la transaccion debe ser un string no vacio."
    );
  }

  static validatePlayerId(playerId) {
    TransactionValidator.validateText(
      playerId,
      "El id del jugador de la transaccion debe ser un string no vacio."
    );
  }

  static validateGameId(gameId) {
    TransactionValidator.validateText(
      gameId,
      "El id del juego de la transaccion debe ser un string no vacio."
    );
  }

  static validateSessionId(sessionId) {
    TransactionValidator.validateText(
      sessionId,
      "El id de la sesion de la transaccion debe ser un string no vacio."
    );
  }

  static validateRoundId(roundId) {
    TransactionValidator.validateText(
      roundId,
      "El id de la ronda de la transaccion debe ser un string no vacio."
    );
  }

  static validateTurnId(turnId) {
    TransactionValidator.validateText(
      turnId,
      "El id del turno de la transaccion debe ser un string no vacio."
    );
  }

  static validateActionId(actionId) {
    TransactionValidator.validateText(
      actionId,
      "El id de la accion de la transaccion debe ser un string no vacio."
    );
  }

  static validateBetId(betId) {
    TransactionValidator.validateText(
      betId,
      "El id de la apuesta de la transaccion debe ser un string no vacio."
    );
  }

  static validateType(type) {
    TransactionValidator.validateText(
      type,
      "El tipo de la transaccion debe ser un string no vacio."
    );
  }

  static validateAmount(amount) {
    TransactionValidator.validateFiniteNumber(
      amount,
      "El monto de la transaccion debe ser un numero finito."
    );
  }

  static validateBalanceBefore(balanceBefore) {
    TransactionValidator.validateFiniteNumber(
      balanceBefore,
      "El balanceBefore de la transaccion debe ser un numero finito."
    );
  }

  static validateBalanceAfter(balanceAfter) {
    TransactionValidator.validateFiniteNumber(
      balanceAfter,
      "El balanceAfter de la transaccion debe ser un numero finito."
    );
  }

  static validateStatus(status) {
    if (!TransactionValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la transaccion no es valido."
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
        "La metadata de la transaccion debe ser un objeto valido."
      );
    }
  }

  static validateTransaction(transaction) {
    if (!(transaction instanceof Transaction)) {
      throw new Error(
        "La transaccion debe ser una instancia de Transaction."
      );
    }
  }
}

export default TransactionValidator;
