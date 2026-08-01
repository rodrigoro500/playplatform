class WalletValidator {
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

  static validateAmount(amount) {
    if (typeof amount !== "number") {
      throw new Error(
        "El monto debe ser un número."
      );
    }

    if (!Number.isFinite(amount)) {
      throw new Error(
        "El monto debe ser un número finito."
      );
    }

    if (amount <= 0) {
      throw new Error(
        "El monto debe ser mayor que cero."
      );
    }
  }

  static validateDeposit(amount) {
    WalletValidator.validateAmount(amount);
  }

  static validateWithdraw(balance, amount) {
    WalletValidator.validateAmount(amount);
    WalletValidator.validateBalance(balance);

    if (balance < amount) {
      throw new Error(
        "El saldo es insuficiente para realizar el retiro."
      );
    }
  }

  static validateBalance(balance) {
    if (typeof balance !== "number") {
      throw new Error(
        "El saldo debe ser un número."
      );
    }

    if (!Number.isFinite(balance)) {
      throw new Error(
        "El saldo debe ser un número finito."
      );
    }

    if (balance < 0) {
      throw new Error(
        "El saldo no puede ser negativo."
      );
    }
  }
}

export default WalletValidator;
