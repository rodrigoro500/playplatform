import PaseBetRuntime from "./PaseBetRuntime";
import PaseBetRuntimeEvents from "./PaseBetRuntimeEvents";

class PaseBetRuntimeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE BET RUNTIME SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const tableRuntime = {
      getPlayerCount() {
        return 4;
      },
    };
    console.log("2. Crear TableRuntime simulado:");
    console.log({
      players: tableRuntime.getPlayerCount(),
    });

    const wallet = {};
    console.log("3. Crear Wallet simulado:");
    console.log(wallet);

    const bets = [];
    const betManager = {
      placeBet(bet) {
        bets.push(bet);

        return bet;
      },

      cancelBet(id) {
        const index =
          bets.findIndex((bet) => bet.id === id);

        if (index !== -1) {
          bets.splice(index, 1);
        }

        return true;
      },

      getBet(id) {
        return bets.find((bet) => bet.id === id) || null;
      },

      getBets() {
        return [...bets];
      },

      getBetCount() {
        return bets.length;
      },
    };
    console.log("4. Crear BetManager simulado:");
    console.log({
      bets: betManager.getBets(),
      count: betManager.getBetCount(),
    });

    const runtime =
      new PaseBetRuntime();
    console.log("5. Crear PaseBetRuntime:");
    console.log(runtime.toJSON());

    runtime.setManager(manager);
    runtime.setTableRuntime(tableRuntime);
    runtime.setBetManager(betManager);
    runtime.setWallet(wallet);
    console.log("6. Configurar manager, tableRuntime, betManager y wallet:");
    console.log(runtime.toJSON());

    const initialized =
      runtime.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      runtime.isInitialized() === true,
      "PaseBetRuntime debe quedar inicializado."
    );
    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: runtime.isInitialized(),
    });

    const firstBet =
      runtime.placeBet({
        id: 1,
        player: "P1",
        amount: 100,
      });
    const secondBet =
      runtime.placeBet({
        id: 2,
        player: "P2",
        amount: 200,
      });
    this.assert(
      runtime.getBetCount() === 2,
      "Deben registrarse dos apuestas."
    );
    console.log("8. Registrar dos apuestas:");
    console.log({
      firstBet,
      secondBet,
    });

    const foundBet =
      runtime.getBet(1);
    const allBets =
      runtime.getBets();
    const betCount =
      runtime.getBetCount();
    const status =
      runtime.getStatus();
    this.assert(
      foundBet === firstBet,
      "getBet() debe devolver la apuesta solicitada."
    );
    this.assert(
      allBets.length === 2 &&
        betCount === 2 &&
        status.players === 4 &&
        status.bets === 2,
      "El estado debe reflejar jugadores y apuestas."
    );
    console.log("9. Consultar getBet(), getBets(), getBetCount() y getStatus():");
    console.log({
      foundBet,
      allBets,
      betCount,
      status,
    });

    const cancelled =
      runtime.cancelBet(1);
    this.assert(
      cancelled === true,
      "cancelBet() debe devolver true."
    );
    this.assert(
      runtime.getBet(1) === null,
      "La apuesta cancelada no debe existir."
    );
    console.log("10. Cancelar una apuesta:");
    console.log({
      cancelled,
      bets: runtime.getBets(),
    });

    const betCountAfterCancel =
      runtime.getBetCount();
    const statusAfterCancel =
      runtime.getStatus();
    const runtimeJSON =
      runtime.toJSON();
    this.assert(
      betCountAfterCancel === 1 &&
        statusAfterCancel.bets === 1 &&
        runtimeJSON.initialized === true,
      "El estado debe reflejar la apuesta cancelada."
    );
    console.log("11. Consultar nuevamente getBetCount(), getStatus() y toJSON():");
    console.log({
      betCount: betCountAfterCancel,
      status: statusAfterCancel,
      json: runtimeJSON,
    });

    const events = [
      PaseBetRuntimeEvents.createPaseBetRuntimeInitializedEvent(),
      PaseBetRuntimeEvents.createPaseBetPlacedEvent(secondBet),
      PaseBetRuntimeEvents.createPaseBetCancelledEvent(1),
      PaseBetRuntimeEvents.createPaseBetRuntimeResetEvent(),
    ];
    console.log("12. Crear todos los eventos:");
    console.log(events);

    const reset =
      runtime.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("13. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      runtime.toJSON();
    this.assert(
      runtime.isInitialized() === false,
      "PaseBetRuntime debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasTableRuntime === false &&
        resetJSON.hasBetManager === false &&
        resetJSON.hasWallet === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("14. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: runtime.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      firstBet,
      secondBet,
      foundBet,
      allBets,
      betCount,
      status,
      cancelled,
      betCountAfterCancel,
      statusAfterCancel,
      runtimeJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE BET RUNTIME SANDBOX OK =====");
  }
}

new PaseBetRuntimeSandbox();

export default PaseBetRuntimeSandbox;
