import Transaction from "./Transaction";
import TransactionValidator from "./TransactionValidator";

class TransactionManager {
  constructor() {
    this.transactions = new Map();
  }

  createTransaction(
    id,
    walletId,
    playerId,
    gameId,
    sessionId,
    roundId,
    turnId,
    actionId,
    betId,
    type,
    amount,
    balanceBefore,
    balanceAfter,
    metadata = {}
  ) {
    TransactionValidator.validateId(id);
    TransactionValidator.validateWalletId(walletId);
    TransactionValidator.validatePlayerId(playerId);
    TransactionValidator.validateGameId(gameId);
    TransactionValidator.validateSessionId(sessionId);
    TransactionValidator.validateRoundId(roundId);
    TransactionValidator.validateTurnId(turnId);
    TransactionValidator.validateActionId(actionId);
    TransactionValidator.validateBetId(betId);
    TransactionValidator.validateType(type);
    TransactionValidator.validateAmount(amount);
    TransactionValidator.validateBalanceBefore(balanceBefore);
    TransactionValidator.validateBalanceAfter(balanceAfter);
    TransactionValidator.validateMetadata(metadata);

    if (this.hasTransaction(id)) {
      throw new Error(
        "Ya existe una transaccion con ese id."
      );
    }

    const transaction =
      new Transaction(
        id,
        walletId,
        playerId,
        gameId,
        sessionId,
        roundId,
        turnId,
        actionId,
        betId,
        type,
        amount,
        balanceBefore,
        balanceAfter,
        metadata
      );

    this.transactions.set(
      id,
      transaction
    );

    return transaction;
  }

  getTransaction(id) {
    TransactionValidator.validateId(id);

    const transaction =
      this.transactions.get(id);

    if (!transaction) {
      throw new Error(
        "No existe una transaccion con ese id."
      );
    }

    return transaction;
  }

  hasTransaction(id) {
    TransactionValidator.validateId(id);

    return this.transactions.has(id);
  }

  removeTransaction(id) {
    TransactionValidator.validateId(id);

    if (!this.hasTransaction(id)) {
      throw new Error(
        "No existe una transaccion para eliminar."
      );
    }

    return this.transactions.delete(id);
  }

  completeTransaction(id) {
    return this
      .getTransaction(id)
      .complete();
  }

  failTransaction(id) {
    return this
      .getTransaction(id)
      .fail();
  }

  cancelTransaction(id) {
    return this
      .getTransaction(id)
      .cancel();
  }

  getTransactions() {
    return Array.from(
      this.transactions.values()
    );
  }

  getTransactionsByWallet(walletId) {
    TransactionValidator.validateWalletId(walletId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getWalletId() === walletId
      );
  }

  getTransactionsByPlayer(playerId) {
    TransactionValidator.validatePlayerId(playerId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getPlayerId() === playerId
      );
  }

  getTransactionsByGame(gameId) {
    TransactionValidator.validateGameId(gameId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getGameId() === gameId
      );
  }

  getTransactionsBySession(sessionId) {
    TransactionValidator.validateSessionId(sessionId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getSessionId() === sessionId
      );
  }

  getTransactionsByRound(roundId) {
    TransactionValidator.validateRoundId(roundId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getRoundId() === roundId
      );
  }

  getTransactionsByTurn(turnId) {
    TransactionValidator.validateTurnId(turnId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getTurnId() === turnId
      );
  }

  getTransactionsByAction(actionId) {
    TransactionValidator.validateActionId(actionId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getActionId() === actionId
      );
  }

  getTransactionsByBet(betId) {
    TransactionValidator.validateBetId(betId);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getBetId() === betId
      );
  }

  getTransactionsByType(type) {
    TransactionValidator.validateType(type);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getType() === type
      );
  }

  getTransactionsByStatus(status) {
    TransactionValidator.validateStatus(status);

    return this
      .getTransactions()
      .filter(transaction =>
        transaction.getStatus() === status
      );
  }

  getPendingTransactions() {
    return this.getTransactionsByStatus("PENDING");
  }

  getCompletedTransactions() {
    return this.getTransactionsByStatus("COMPLETED");
  }

  getFailedTransactions() {
    return this.getTransactionsByStatus("FAILED");
  }

  getCancelledTransactions() {
    return this.getTransactionsByStatus("CANCELLED");
  }

  clear() {
    this.transactions.clear();
  }

  toJSON() {
    return this
      .getTransactions()
      .map(transaction =>
        transaction.toJSON()
      );
  }
}

export default TransactionManager;
