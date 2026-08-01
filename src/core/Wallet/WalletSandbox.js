import BaseGameEngine from "../Engine/BaseGameEngine";
import EventManager from "../Engine/EventManager";
import WalletEvents from "./WalletEvents";
import WalletManager from "./WalletManager";

class WalletSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== WALLET SANDBOX =====");

    const walletManager =
      new WalletManager();

    console.log("1. WalletManager creado:");
    console.log(walletManager.toJSON());

    const wallet =
      walletManager.createWallet("player1");

    console.log("2. Wallet creado para player1:");
    console.log(wallet.toJSON());

    const balanceAfterFirstDeposit =
      walletManager.deposit(
        "player1",
        1000
      );

    console.log("3. Depositar 1000:");
    console.log(balanceAfterFirstDeposit);

    const balanceAfterSecondDeposit =
      walletManager.deposit(
        "player1",
        500
      );

    console.log("4. Depositar 500:");
    console.log(balanceAfterSecondDeposit);

    const balanceAfterDeposits =
      walletManager.getBalance("player1");

    this.assert(
      balanceAfterDeposits === 1500,
      "El saldo esperado después de depósitos es 1500."
    );

    console.log("5. Verificar saldo = 1500:");
    console.log(balanceAfterDeposits);

    const balanceAfterWithdraw =
      walletManager.withdraw(
        "player1",
        300
      );

    console.log("6. Retirar 300:");
    console.log(balanceAfterWithdraw);

    const currentBalance =
      walletManager.getBalance("player1");

    this.assert(
      currentBalance === 1200,
      "El saldo esperado después del retiro es 1200."
    );

    console.log("7. Verificar saldo = 1200:");
    console.log(currentBalance);

    const hasFundsFor500 =
      walletManager.hasFunds(
        "player1",
        500
      );

    this.assert(
      hasFundsFor500 === true,
      "hasFunds(500) debe devolver true."
    );

    console.log("8. Verificar hasFunds(500) = true:");
    console.log(hasFundsFor500);

    const hasFundsFor5000 =
      walletManager.hasFunds(
        "player1",
        5000
      );

    this.assert(
      hasFundsFor5000 === false,
      "hasFunds(5000) debe devolver false."
    );

    console.log("9. Verificar hasFunds(5000) = false:");
    console.log(hasFundsFor5000);

    let withdrawError =
      null;

    try {
      walletManager.withdraw(
        "player1",
        5000
      );
    } catch (error) {
      withdrawError = error;
    }

    this.assert(
      withdrawError instanceof Error,
      "Retirar más saldo debe lanzar una excepción."
    );

    console.log("10. Intentar retirar más saldo:");
    console.log(withdrawError.message);

    console.log("11. Serializar Wallet:");
    console.log(wallet.toJSON());

    console.log("12. Serializar WalletManager:");
    console.log(walletManager.toJSON());

    const events = [
      WalletEvents.createWalletCreatedEvent("player1"),
      WalletEvents.createDepositEvent(
        "player1",
        1000,
        1000
      ),
      WalletEvents.createDepositEvent(
        "player1",
        500,
        1500
      ),
      WalletEvents.createWithdrawEvent(
        "player1",
        300,
        1200
      ),
      WalletEvents.createBalanceChangedEvent(
        "player1",
        1200
      ),
      WalletEvents.createWalletRemovedEvent("player1"),
    ];

    console.log("13. Eventos creados:");
    console.log(events);

    console.log("14. Resultados finales:");
    console.log({
      wallet: wallet.toJSON(),
      walletManager: walletManager.toJSON(),
      events,
    });

    console.log("===== WALLET SANDBOX OK =====");

    this.runEngineIntegration();
  }

  runEngineIntegration() {
    console.log("===== WALLET + ENGINE SANDBOX =====");

    const eventManager =
      new EventManager();

    const engine =
      new BaseGameEngine({
        eventManager,
      });

    engine
      .getWalletManager()
      .setEventManager(eventManager);

    console.log("1. BaseGameEngine creado:");
    console.log({
      initialized: engine.isInitialized(),
      running: engine.isRunning(),
      finished: engine.isFinished(),
    });

    const wallet =
      engine.createPlayerWallet("player1");

    console.log("2. Wallet creado para player1:");
    console.log(wallet.toJSON());

    const balanceAfterDeposit =
      engine.depositToPlayer(
        "player1",
        5000
      );

    console.log("3. Depositar 5000:");
    console.log(balanceAfterDeposit);

    const balanceAfterBet =
      engine.placeBet(
        "player1",
        1000
      );

    console.log("4. Ejecutar placeBet(1000):");
    console.log(balanceAfterBet);

    this.assert(
      balanceAfterBet === 4000,
      "El saldo esperado después de placeBet es 4000."
    );

    console.log("5. Verificar saldo = 4000:");
    console.log(engine.getPlayerBalance("player1"));

    const balanceAfterRefund =
      engine.refundBet(
        "player1",
        500
      );

    console.log("6. Ejecutar refundBet(500):");
    console.log(balanceAfterRefund);

    this.assert(
      balanceAfterRefund === 4500,
      "El saldo esperado después de refundBet es 4500."
    );

    console.log("7. Verificar saldo = 4500:");
    console.log(engine.getPlayerBalance("player1"));

    const balanceAfterPrize =
      engine.creditPrize(
        "player1",
        2000
      );

    console.log("8. Ejecutar creditPrize(2000):");
    console.log(balanceAfterPrize);

    this.assert(
      balanceAfterPrize === 6500,
      "El saldo esperado después de creditPrize es 6500."
    );

    console.log("9. Verificar saldo = 6500:");
    console.log(engine.getPlayerBalance("player1"));

    console.log("10. Historial de transacciones:");
    console.log(
      engine
        .getWalletManager()
        .toTransactionsJSON()
    );

    console.log("11. Eventos emitidos:");
    console.log(eventManager.getEvents());

    console.log("12. Wallet serializado:");
    console.log(
      engine
        .getWalletManager()
        .getWallet("player1")
        .toJSON()
    );

    console.log("13. WalletManager serializado:");
    console.log(
      engine
        .getWalletManager()
        .toJSON()
    );

    console.log("14. BaseGameEngine serializado:");
    if (typeof engine.toJSON === "function") {
      console.log(engine.toJSON());
    } else {
      console.log({
        initialized: engine.isInitialized(),
        running: engine.isRunning(),
        finished: engine.isFinished(),
        currentRound: engine.getCurrentRound(),
        walletManager: engine
          .getWalletManager()
          .toJSON(),
      });
    }

    console.log(
      "===== WALLET + ENGINE SANDBOX OK ====="
    );
  }
}

new WalletSandbox();

export default WalletSandbox;
