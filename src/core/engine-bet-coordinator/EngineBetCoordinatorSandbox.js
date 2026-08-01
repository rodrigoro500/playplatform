import EngineBetCoordinator from "./EngineBetCoordinator";
import EngineBetCoordinatorEvents from "./EngineBetCoordinatorEvents";

class EngineBetCoordinatorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createBetManager() {
    const bets = new Map();

    return {
      placeBet(bet) {
        bets.set(
          bet.id,
          bet
        );

        return bet;
      },

      cancelBet(id) {
        if (!bets.has(id)) {
          throw new Error(
            "La apuesta no existe."
          );
        }

        const bet =
          bets.get(id);

        bets.delete(id);

        return bet;
      },

      getBet(id) {
        if (!bets.has(id)) {
          return null;
        }

        return bets.get(id);
      },

      getBets() {
        return [...bets.values()];
      },

      getBetCount() {
        return bets.size;
      },
    };
  }

  run() {
    console.log("===== ENGINE BET COORDINATOR SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const roundCoordinator = {
      startRound() {
        return true;
      },

      finishRound() {
        return true;
      },
    };
    console.log("2. Crear RoundCoordinator simulado:");
    console.log(roundCoordinator);

    const wallet = {};
    console.log("3. Crear Wallet simulado:");
    console.log(wallet);

    const betManager =
      this.createBetManager();
    console.log("4. Crear BetManager simulado:");
    console.log({
      bets: betManager.getBets(),
      count: betManager.getBetCount(),
    });

    const coordinator =
      new EngineBetCoordinator();
    console.log("5. Crear EngineBetCoordinator:");
    console.log(coordinator.toJSON());

    coordinator.setManager(manager);
    coordinator.setRoundCoordinator(roundCoordinator);
    coordinator.setBetManager(betManager);
    coordinator.setWallet(wallet);
    console.log("6. Configurar manager, roundCoordinator, betManager y wallet:");
    console.log(coordinator.toJSON());

    const initialized =
      coordinator.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      coordinator.isInitialized() === true,
      "EngineBetCoordinator debe quedar inicializado."
    );
    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: coordinator.isInitialized(),
    });

    const firstBet =
      coordinator.placeBet({
        id: "bet-1",
        playerId: "player-1",
        amount: 100,
      });
    const secondBet =
      coordinator.placeBet({
        id: "bet-2",
        playerId: "player-2",
        amount: 250,
      });
    this.assert(
      coordinator.getStatus().bets === 2,
      "Deben registrarse dos apuestas."
    );
    console.log("8. Registrar dos apuestas:");
    console.log({
      firstBet,
      secondBet,
      bets: coordinator.getBets(),
    });

    const retrievedBet =
      coordinator.getBet("bet-1");
    const betsAfterRegister =
      coordinator.getBets();
    const statusAfterRegister =
      coordinator.getStatus();
    this.assert(
      retrievedBet === firstBet,
      'getBet("bet-1") debe devolver la primera apuesta.'
    );
    this.assert(
      betsAfterRegister.length === 2 &&
        statusAfterRegister.bets === 2,
      "getBets() y getStatus() deben reflejar dos apuestas."
    );
    console.log("9. Consultar getBet(), getBets() y getStatus():");
    console.log({
      retrievedBet,
      bets: betsAfterRegister,
      status: statusAfterRegister,
    });

    const cancelledBet =
      coordinator.cancelBet("bet-2");
    this.assert(
      cancelledBet === secondBet,
      'cancelBet("bet-2") debe devolver la apuesta cancelada.'
    );
    console.log("10. Cancelar una apuesta:");
    console.log(cancelledBet);

    const betsAfterCancel =
      coordinator.getBets();
    const statusAfterCancel =
      coordinator.getStatus();
    this.assert(
      betsAfterCancel.length === 1 &&
        statusAfterCancel.bets === 1,
      "Debe quedar una apuesta tras cancelar."
    );
    console.log("11. Consultar nuevamente getBets() y getStatus():");
    console.log({
      bets: betsAfterCancel,
      status: statusAfterCancel,
    });

    const coordinatorJSON =
      coordinator.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(coordinatorJSON);

    const events = [
      EngineBetCoordinatorEvents.createEngineBetCoordinatorInitializedEvent(),
      EngineBetCoordinatorEvents.createEngineBetPlacedEvent(firstBet),
      EngineBetCoordinatorEvents.createEngineBetPlacedEvent(secondBet),
      EngineBetCoordinatorEvents.createEngineBetCancelledEvent("bet-2"),
      EngineBetCoordinatorEvents.createEngineBetCoordinatorResetEvent(),
    ];
    console.log("13. Crear todos los eventos:");
    console.log(events);

    const reset =
      coordinator.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      coordinator.toJSON();
    this.assert(
      coordinator.isInitialized() === false,
      "EngineBetCoordinator debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasRoundCoordinator === false &&
        resetJSON.hasBetManager === false &&
        resetJSON.hasWallet === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("15. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: coordinator.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      firstBet,
      secondBet,
      retrievedBet,
      betsAfterRegister,
      statusAfterRegister,
      cancelledBet,
      betsAfterCancel,
      statusAfterCancel,
      coordinatorJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE BET COORDINATOR SANDBOX OK =====");
  }
}

new EngineBetCoordinatorSandbox();

export default EngineBetCoordinatorSandbox;
