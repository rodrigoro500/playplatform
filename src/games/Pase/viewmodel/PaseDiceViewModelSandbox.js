import PaseDiceViewModel from "./PaseDiceViewModel";
import PaseDiceViewModelEvents from "./PaseDiceViewModelEvents";

class PaseDiceViewModelSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE DICE VIEWMODEL SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const diceEngine = {
      getDice() {
        return [
          4,
          3,
        ];
      },

      getTotal() {
        return 7;
      },

      getOutcome() {
        return "PASE";
      },
    };
    console.log("2. Crear DiceEngine simulado:");
    console.log({
      dice: diceEngine.getDice(),
      total: diceEngine.getTotal(),
      outcome: diceEngine.getOutcome(),
    });

    const viewModel =
      new PaseDiceViewModel();
    console.log("3. Crear PaseDiceViewModel:");
    console.log(viewModel.toJSON());

    viewModel.setManager(manager);
    viewModel.setDiceEngine(diceEngine);
    console.log("4. Configurar manager y diceEngine:");
    console.log(viewModel.toJSON());

    const initialized =
      viewModel.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      viewModel.isInitialized() === true,
      "PaseDiceViewModel debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: viewModel.isInitialized(),
    });

    const dice =
      viewModel.getDice();
    const die0 =
      viewModel.getDie(0);
    const die1 =
      viewModel.getDie(1);
    const die5 =
      viewModel.getDie(5);
    const total =
      viewModel.getTotal();
    const outcome =
      viewModel.getOutcome();
    const hasResult =
      viewModel.hasResult();
    const refreshed =
      viewModel.refresh();
    const status =
      viewModel.getStatus();
    const viewModelJSON =
      viewModel.toJSON();
    this.assert(
      dice.length === 2 &&
        refreshed.length === 2,
      "getDice() y refresh() deben devolver dos dados."
    );
    this.assert(
      total === 7 &&
        outcome === "PASE" &&
        hasResult === true,
      "El resultado de dados debe reflejar total y outcome simulados."
    );
    this.assert(
      status.initialized === true &&
        status.hasResult === true &&
        status.total === 7,
      "getStatus() debe reflejar el estado de dados."
    );
    console.log("6. Consultar dados, total, outcome, resultado, refresh, status y toJSON():");
    console.log({
      dice,
      die0,
      die1,
      die5,
      total,
      outcome,
      hasResult,
      refreshed,
      status,
      json: viewModelJSON,
    });

    const events = [
      PaseDiceViewModelEvents.createPaseDiceViewModelInitializedEvent(),
      PaseDiceViewModelEvents.createPaseDiceViewRefreshedEvent(),
      PaseDiceViewModelEvents.createPaseDiceViewModelResetEvent(),
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
      "PaseDiceViewModel debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasDiceEngine === false,
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
      dice,
      die0,
      die1,
      die5,
      total,
      outcome,
      hasResult,
      refreshed,
      status,
      viewModelJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE DICE VIEWMODEL SANDBOX OK =====");
  }
}

new PaseDiceViewModelSandbox();

export default PaseDiceViewModelSandbox;
