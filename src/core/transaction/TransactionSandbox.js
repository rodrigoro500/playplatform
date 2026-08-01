import TransactionEvents from "./TransactionEvents";
import TransactionManager from "./TransactionManager";

class TransactionSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== TRANSACTION SANDBOX =====");

    const transactionManager =
      new TransactionManager();

    console.log("1. Crear TransactionManager:");
    console.log(transactionManager.toJSON());

    const transaction1 =
      transactionManager.createTransaction(
        "transaction1",
        "wallet1",
        "player1",
        "game1",
        "session1",
        "round1",
        "turn1",
        "action1",
        "bet1",
        "BET",
        100,
        1000,
        900
      );

    console.log("2. Crear transaction1:");
    console.log(transaction1.toJSON());

    const transaction2 =
      transactionManager.createTransaction(
        "transaction2",
        "wallet2",
        "player2",
        "game1",
        "session1",
        "round1",
        "turn2",
        "action2",
        "bet2",
        "PAYOUT",
        200,
        900,
        1100
      );

    console.log("3. Crear transaction2:");
    console.log(transaction2.toJSON());

    this.assert(
      transactionManager.hasTransaction("transaction1") === true,
      "transaction1 debe existir."
    );

    this.assert(
      transactionManager.hasTransaction("transaction2") === true,
      "transaction2 debe existir."
    );

    console.log("4. Verificar hasTransaction():");
    console.log({
      transaction1: transactionManager.hasTransaction("transaction1"),
      transaction2: transactionManager.hasTransaction("transaction2"),
    });

    const foundTransaction1 =
      transactionManager.getTransaction("transaction1");

    const foundTransaction2 =
      transactionManager.getTransaction("transaction2");

    console.log("5. Obtener ambas Transaction:");
    console.log([
      foundTransaction1.toJSON(),
      foundTransaction2.toJSON(),
    ]);

    transactionManager.completeTransaction("transaction1");

    console.log("6. Completar transaction1:");
    console.log(
      transactionManager
        .getTransaction("transaction1")
        .toJSON()
    );

    transactionManager.failTransaction("transaction2");

    console.log("7. Marcar transaction2 como FAILED:");
    console.log(
      transactionManager
        .getTransaction("transaction2")
        .toJSON()
    );

    const completedTransactions =
      transactionManager.getCompletedTransactions();

    this.assert(
      completedTransactions.length === 1,
      "Debe haber una transaccion completada."
    );

    console.log("8. Obtener Transaction COMPLETED:");
    console.log(
      completedTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const failedTransactions =
      transactionManager.getFailedTransactions();

    this.assert(
      failedTransactions.length === 1,
      "Debe haber una transaccion fallida."
    );

    console.log("9. Obtener Transaction FAILED:");
    console.log(
      failedTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const walletTransactions =
      transactionManager.getTransactionsByWallet("wallet1");

    this.assert(
      walletTransactions.length === 1,
      "Debe haber una transaccion para wallet1."
    );

    console.log("10. Obtener Transaction por Wallet:");
    console.log(
      walletTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const playerTransactions =
      transactionManager.getTransactionsByPlayer("player1");

    this.assert(
      playerTransactions.length === 1,
      "Debe haber una transaccion para player1."
    );

    console.log("11. Obtener Transaction por Player:");
    console.log(
      playerTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const gameTransactions =
      transactionManager.getTransactionsByGame("game1");

    this.assert(
      gameTransactions.length === 2,
      "Debe haber dos transacciones para game1."
    );

    console.log("12. Obtener Transaction por Game:");
    console.log(
      gameTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const sessionTransactions =
      transactionManager.getTransactionsBySession("session1");

    this.assert(
      sessionTransactions.length === 2,
      "Debe haber dos transacciones para session1."
    );

    console.log("13. Obtener Transaction por Session:");
    console.log(
      sessionTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const roundTransactions =
      transactionManager.getTransactionsByRound("round1");

    this.assert(
      roundTransactions.length === 2,
      "Debe haber dos transacciones para round1."
    );

    console.log("14. Obtener Transaction por Round:");
    console.log(
      roundTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const turnTransactions =
      transactionManager.getTransactionsByTurn("turn1");

    this.assert(
      turnTransactions.length === 1,
      "Debe haber una transaccion para turn1."
    );

    console.log("15. Obtener Transaction por Turn:");
    console.log(
      turnTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const actionTransactions =
      transactionManager.getTransactionsByAction("action1");

    this.assert(
      actionTransactions.length === 1,
      "Debe haber una transaccion para action1."
    );

    console.log("16. Obtener Transaction por Action:");
    console.log(
      actionTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const betTransactions =
      transactionManager.getTransactionsByBet("bet1");

    this.assert(
      betTransactions.length === 1,
      "Debe haber una transaccion para bet1."
    );

    console.log("17. Obtener Transaction por Bet:");
    console.log(
      betTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const typeTransactions =
      transactionManager.getTransactionsByType("BET");

    this.assert(
      typeTransactions.length === 1,
      "Debe haber una transaccion tipo BET."
    );

    console.log("18. Obtener Transaction por Type:");
    console.log(
      typeTransactions.map(transaction =>
        transaction.toJSON()
      )
    );

    const events = [
      TransactionEvents.createTransactionCreatedEvent(transaction1),
      TransactionEvents.createTransactionCreatedEvent(transaction2),
      TransactionEvents.createTransactionCompletedEvent("transaction1"),
      TransactionEvents.createTransactionFailedEvent("transaction2"),
      TransactionEvents.createTransactionRemovedEvent("transaction2"),
    ];

    console.log("19. Crear eventos utilizando TransactionEvents:");
    console.log(events);

    console.log("20. Serializar Transaction:");
    console.log(
      transactionManager
        .getTransaction("transaction1")
        .toJSON()
    );

    console.log("21. Serializar TransactionManager:");
    console.log(transactionManager.toJSON());

    const removedTransaction2 =
      transactionManager.removeTransaction("transaction2");

    this.assert(
      removedTransaction2 === true,
      "transaction2 debe eliminarse correctamente."
    );

    console.log("22. Eliminar transaction2:");
    console.log(transactionManager.toJSON());

    transactionManager.clear();

    console.log("23. Limpiar TransactionManager:");
    console.log(transactionManager.toJSON());

    console.log("24. Mostrar todos los resultados por consola:");
    console.log({
      events,
      completedTransactions: completedTransactions.map(transaction =>
        transaction.toJSON()
      ),
      failedTransactions: failedTransactions.map(transaction =>
        transaction.toJSON()
      ),
      walletTransactions: walletTransactions.map(transaction =>
        transaction.toJSON()
      ),
      playerTransactions: playerTransactions.map(transaction =>
        transaction.toJSON()
      ),
      gameTransactions: gameTransactions.map(transaction =>
        transaction.toJSON()
      ),
      sessionTransactions: sessionTransactions.map(transaction =>
        transaction.toJSON()
      ),
      roundTransactions: roundTransactions.map(transaction =>
        transaction.toJSON()
      ),
      turnTransactions: turnTransactions.map(transaction =>
        transaction.toJSON()
      ),
      actionTransactions: actionTransactions.map(transaction =>
        transaction.toJSON()
      ),
      betTransactions: betTransactions.map(transaction =>
        transaction.toJSON()
      ),
      typeTransactions: typeTransactions.map(transaction =>
        transaction.toJSON()
      ),
      transactionManager: transactionManager.toJSON(),
    });

    console.log("===== TRANSACTION SANDBOX OK =====");
  }
}

new TransactionSandbox();

export default TransactionSandbox;
