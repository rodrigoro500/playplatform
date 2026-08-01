class TransactionEvents {
  static TRANSACTION_CREATED = "TRANSACTION_CREATED";

  static TRANSACTION_REMOVED = "TRANSACTION_REMOVED";

  static TRANSACTION_COMPLETED = "TRANSACTION_COMPLETED";

  static TRANSACTION_FAILED = "TRANSACTION_FAILED";

  static TRANSACTION_CANCELLED = "TRANSACTION_CANCELLED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createTransactionCreatedEvent(transaction) {
    return TransactionEvents.createEvent(
      TransactionEvents.TRANSACTION_CREATED,
      {
        transaction: transaction.toJSON(),
      }
    );
  }

  static createTransactionRemovedEvent(transactionId) {
    return TransactionEvents.createEvent(
      TransactionEvents.TRANSACTION_REMOVED,
      {
        transactionId,
      }
    );
  }

  static createTransactionCompletedEvent(transactionId) {
    return TransactionEvents.createEvent(
      TransactionEvents.TRANSACTION_COMPLETED,
      {
        transactionId,
      }
    );
  }

  static createTransactionFailedEvent(transactionId) {
    return TransactionEvents.createEvent(
      TransactionEvents.TRANSACTION_FAILED,
      {
        transactionId,
      }
    );
  }

  static createTransactionCancelledEvent(transactionId) {
    return TransactionEvents.createEvent(
      TransactionEvents.TRANSACTION_CANCELLED,
      {
        transactionId,
      }
    );
  }
}

export default TransactionEvents;
