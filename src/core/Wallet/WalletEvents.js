class WalletEvents {
  static DEPOSIT = "DEPOSIT";

  static WITHDRAW = "WITHDRAW";

  static WALLET_CREATED = "WALLET_CREATED";

  static WALLET_REMOVED = "WALLET_REMOVED";

  static BALANCE_CHANGED = "BALANCE_CHANGED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createWalletCreatedEvent(playerId) {
    return WalletEvents.createEvent(
      WalletEvents.WALLET_CREATED,
      {
        playerId,
      }
    );
  }

  static createWalletRemovedEvent(playerId) {
    return WalletEvents.createEvent(
      WalletEvents.WALLET_REMOVED,
      {
        playerId,
      }
    );
  }

  static createDepositEvent(
    playerId,
    amount,
    balance
  ) {
    return WalletEvents.createEvent(
      WalletEvents.DEPOSIT,
      {
        playerId,
        amount,
        balance,
      }
    );
  }

  static createWithdrawEvent(
    playerId,
    amount,
    balance
  ) {
    return WalletEvents.createEvent(
      WalletEvents.WITHDRAW,
      {
        playerId,
        amount,
        balance,
      }
    );
  }

  static createBalanceChangedEvent(
    playerId,
    balance
  ) {
    return WalletEvents.createEvent(
      WalletEvents.BALANCE_CHANGED,
      {
        playerId,
        balance,
      }
    );
  }
}

export default WalletEvents;
