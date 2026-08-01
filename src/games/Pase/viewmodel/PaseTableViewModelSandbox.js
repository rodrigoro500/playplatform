import PaseTableViewModel from "./PaseTableViewModel";
import PaseTableViewModelEvents from "./PaseTableViewModelEvents";

class PaseTableViewModelSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE TABLE VIEWMODEL SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const tableRuntime = {
      getPlayers() {
        return [
          { id: "P1" },
          { id: "P2" },
          { id: "P3" },
          { id: "P4" },
        ];
      },

      getPlayerCount() {
        return 4;
      },

      getStatus() {
        return {
          running: true,
        };
      },
    };
    console.log("2. Crear TableRuntime simulado:");
    console.log({
      players: tableRuntime.getPlayers(),
      playerCount: tableRuntime.getPlayerCount(),
      status: tableRuntime.getStatus(),
    });

    const viewModel =
      new PaseTableViewModel();
    console.log("3. Crear PaseTableViewModel:");
    console.log(viewModel.toJSON());

    viewModel.setManager(manager);
    viewModel.setTableRuntime(tableRuntime);
    console.log("4. Configurar manager y tableRuntime:");
    console.log(viewModel.toJSON());

    const initialized =
      viewModel.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      viewModel.isInitialized() === true,
      "PaseTableViewModel debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: viewModel.isInitialized(),
    });

    const tableState =
      viewModel.getTableState();
    const players =
      viewModel.getPlayers();
    const playerCount =
      viewModel.getPlayerCount();
    const running =
      viewModel.isRunning();
    const refreshed =
      viewModel.refresh();
    const status =
      viewModel.getStatus();
    const viewModelJSON =
      viewModel.toJSON();
    this.assert(
      tableState.running === true,
      "getTableState() debe devolver el estado de tableRuntime."
    );
    this.assert(
      players.length === 4 &&
        playerCount === 4,
      "getPlayers() y getPlayerCount() deben reflejar cuatro jugadores."
    );
    this.assert(
      running === true &&
        refreshed.running === true &&
        status.initialized === true &&
        status.players === 4 &&
        status.running === true,
      "El estado del ViewModel debe reflejar la mesa simulada."
    );
    console.log("6. Consultar estado, jugadores, running, refresh, status y toJSON():");
    console.log({
      tableState,
      players,
      playerCount,
      running,
      refreshed,
      status,
      json: viewModelJSON,
    });

    const events = [
      PaseTableViewModelEvents.createPaseTableViewModelInitializedEvent(),
      PaseTableViewModelEvents.createPaseTableViewRefreshedEvent(),
      PaseTableViewModelEvents.createPaseTableViewModelResetEvent(),
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
      "PaseTableViewModel debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasTableRuntime === false,
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
      tableState,
      players,
      playerCount,
      running,
      refreshed,
      status,
      viewModelJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE TABLE VIEWMODEL SANDBOX OK =====");
  }
}

new PaseTableViewModelSandbox();

export default PaseTableViewModelSandbox;
