import Wallet from "./Wallet";
import WalletEvents from "./WalletEvents";
import WalletTransaction from "./WalletTransaction";
import WalletValidator from "./WalletValidator";

class WalletManager {
  constructor(eventManager = null) {
    this.wallets = new Map();
    this.transactions = [];
    this.eventManager = eventManager;
  }

  createWallet(playerId) {
    WalletValidator.validatePlayerId(playerId);

    if (this.hasWallet(playerId)) {
      throw new Error(
        "Ya existe un Wallet para este jugador."
      );
    }

    const wallet =
      new Wallet(playerId);

    this.wallets.set(
      playerId,
      wallet
    );

    this.emitWalletEvent(
      WalletEvents.createWalletCreatedEvent(
        playerId
      )
    );

    return wallet;
  }

  getWallet(playerId) {
    WalletValidator.validatePlayerId(playerId);

    const wallet =
      this.wallets.get(playerId);

    if (!wallet) {
      throw new Error(
        "No existe un Wallet para este jugador."
      );
    }

    return wallet;
  }

  hasWallet(playerId) {
    WalletValidator.validatePlayerId(playerId);

    return this.wallets.has(playerId);
  }

  getBalance(playerId) {
    return this
      .getWallet(playerId)
      .getBalance();
  }

  deposit(playerId, amount) {
    WalletValidator.validatePlayerId(playerId);
    WalletValidator.validateDeposit(amount);

    const wallet =
      this.getWallet(playerId);

    const balanceBefore =
      wallet.getBalance();

    const balanceAfter =
      wallet.deposit(amount);

    const transaction =
      new WalletTransaction(
        playerId,
        "DEPOSIT",
        amount,
        balanceBefore,
        balanceAfter
      );

    this.transactions.push(transaction);

    this.emitWalletEvent(
      WalletEvents.createDepositEvent(
        playerId,
        amount,
        balanceAfter
      )
    );

    this.emitWalletEvent(
      WalletEvents.createBalanceChangedEvent(
        playerId,
        balanceAfter
      )
    );

    return balanceAfter;
  }

  withdraw(playerId, amount) {
    WalletValidator.validatePlayerId(playerId);

    const wallet =
      this.getWallet(playerId);

    WalletValidator.validateWithdraw(
      wallet.getBalance(),
      amount
    );

    const balanceBefore =
      wallet.getBalance();

    const balanceAfter =
      wallet.withdraw(amount);

    const transaction =
      new WalletTransaction(
        playerId,
        "WITHDRAW",
        amount,
        balanceBefore,
        balanceAfter
      );

    this.transactions.push(transaction);

    this.emitWalletEvent(
      WalletEvents.createWithdrawEvent(
        playerId,
        amount,
        balanceAfter
      )
    );

    this.emitWalletEvent(
      WalletEvents.createBalanceChangedEvent(
        playerId,
        balanceAfter
      )
    );

    return balanceAfter;
  }

  hasFunds(playerId, amount) {
    WalletValidator.validatePlayerId(playerId);
    WalletValidator.validateAmount(amount);

    return this
      .getWallet(playerId)
      .hasFunds(amount);
  }

  removeWallet(playerId) {
    WalletValidator.validatePlayerId(playerId);

    if (!this.hasWallet(playerId)) {
      throw new Error(
        "No existe un Wallet para eliminar."
      );
    }

    const removed =
      this.wallets.delete(playerId);

    this.emitWalletEvent(
      WalletEvents.createWalletRemovedEvent(
        playerId
      )
    );

    return removed;
  }

  clear() {
    this.wallets.clear();
  }

  setEventManager(eventManager) {
    this.eventManager = eventManager;
  }

  getEventManager() {
    return this.eventManager;
  }

  emitWalletEvent(event) {
    if (!this.eventManager) {
      return null;
    }

    return this.eventManager.emit(
      event.type,
      event.payload
    );
  }

  getTransactions() {
    return [
      ...this.transactions,
    ];
  }

  getPlayerTransactions(playerId) {
    WalletValidator.validatePlayerId(playerId);

    return this.transactions.filter(
      transaction =>
        transaction.getPlayerId() === playerId
    );
  }

  clearTransactions() {
    this.transactions = [];
  }

  getLastTransaction() {
    if (this.transactions.length === 0) {
      return null;
    }

    return this.transactions[
      this.transactions.length - 1
    ];
  }

  toTransactionsJSON() {
    return this.transactions.map(
      transaction => transaction.toJSON()
    );
  }

  getAllWallets() {
    return Array.from(
      this.wallets.values()
    );
  }

  toJSON() {
    return this
      .getAllWallets()
      .map(wallet => wallet.toJSON());
  }
}

export default WalletManager;
