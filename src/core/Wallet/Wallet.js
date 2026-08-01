class Wallet {
  constructor(playerId) {
    if (!playerId) {
      throw new Error("Debe indicar el jugador del Wallet.");
    }

    this.playerId = playerId;
    this.balance = 0;
  }

  getPlayerId() {
    return this.playerId;
  }

  getBalance() {
    return this.balance;
  }

  deposit(amount) {
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      throw new Error(
        "El monto a depositar debe ser un número no negativo."
      );
    }

    this.balance += amount;

    return this.balance;
  }

  withdraw(amount) {
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      throw new Error(
        "El monto a retirar debe ser un número no negativo."
      );
    }

    if (this.balance - amount < 0) {
      throw new Error(
        "El Wallet no tiene saldo suficiente para retirar ese monto."
      );
    }

    this.balance -= amount;

    return this.balance;
  }

  hasFunds(amount) {
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      throw new Error(
        "El monto a validar debe ser un número no negativo."
      );
    }

    return this.balance >= amount;
  }

  setBalance(amount) {
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      throw new Error(
        "El saldo del Wallet debe ser un número no negativo."
      );
    }

    this.balance = amount;

    return this.balance;
  }

  toJSON() {
    return {
      playerId: this.playerId,
      balance: this.balance,
    };
  }
}

export default Wallet;
