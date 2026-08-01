import PaseBetViewModel from "./PaseBetViewModel";
import PaseBetViewModelEvents from "./PaseBetViewModelEvents";

class PaseBetViewModelSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE BET VIEWMODEL SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const bets = [
      {
        id: "B1",
        playerId: "P1",
        type: "PASE",
        amount: 100,
        status: "ACTIVE",
      },
      {
        id: "B2",
        playerId: "P2",
        type: "NO_PASE",
        amount: 250,
        status: "ACTIVE",
      },
      {
        id: "B3",
        playerId: "P4",
        type: "PASE",
        amount: 75,
        status: "ACTIVE",
      },
    ];

    const betRuntime = {
      getBets() {
        return bets;
      },

      getBet(id) {
        return bets.find((bet) => bet.id === id) || null;
      },

      getBetCount() {
        return bets.length;
      },
    };
    console.log("2. Crear BetRuntime simulado:");
    console.log({
      bets: betRuntime.getBets(),
      betCount: betRuntime.getBetCount(),
    });

    const viewModel =
      new PaseBetViewModel();
    console.log("3. Crear PaseBetViewModel:");
    console.log(viewModel.toJSON());

    viewModel.setManager(manager);
    viewModel.setBetRuntime(betRuntime);
    console.log("4. Configurar manager y betRuntime:");
    console.log(viewModel.toJSON());

    const initialized =
      viewModel.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      viewModel.isInitialized() === true,
      "PaseBetViewModel debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: viewModel.isInitialized(),
    });

    const viewBets =
      viewModel.getBets();
    const betB2 =
      viewModel.getBet("B2");
    const hasB3 =
      viewModel.hasBet("B3");
    const hasB9 =
      viewModel.hasBet("B9");
    const betCount =
      viewModel.getBetCount();
    const refreshed =
      viewModel.refresh();
    const status =
      viewModel.getStatus();
    const viewModelJSON =
      viewModel.toJSON();
    this.assert(
      viewBets.length === 3 &&
        betB2.amount === 250,
      "getBets() y getBet() deben devolver apuestas simuladas."
    );
    this.assert(
      hasB3 === true &&
        hasB9 === false,
      "hasBet() debe reflejar existencia por id."
    );
    this.assert(
      betCount === 3 &&
        refreshed.length === 3 &&
        status.initialized === true &&
        status.bets === 3 &&
        viewModelJSON.bets === 3,
      "El estado del ViewModel debe reflejar tres apuestas."
    );
    console.log("6. Consultar apuestas, busquedas, conteo, refresh, status y toJSON():");
    console.log({
      bets: viewBets,
      betB2,
      hasB3,
      hasB9,
      betCount,
      refreshed,
      status,
      json: viewModelJSON,
    });

    const events = [
      PaseBetViewModelEvents.createPaseBetViewModelInitializedEvent(),
      PaseBetViewModelEvents.createPaseBetViewRefreshedEvent(),
      PaseBetViewModelEvents.createPaseBetViewModelResetEvent(),
    ];
    console.log("7. Crear todos los eventos:");
    console.log(events);

    const reset =
      viewModel.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("8. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      viewModel.toJSON();
    this.assert(
      viewModel.isInitialized() === false,
      "PaseBetViewModel debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.bets === 0 &&
        resetJSON.hasRuntime === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("9. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: viewModel.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      viewBets,
      betB2,
      hasB3,
      hasB9,
      betCount,
      refreshed,
      status,
      viewModelJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE BET VIEWMODEL SANDBOX OK =====");
  }
}

new PaseBetViewModelSandbox();

export default PaseBetViewModelSandbox;
