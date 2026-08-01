import PasePlayerViewModel from "./PasePlayerViewModel";
import PasePlayerViewModelEvents from "./PasePlayerViewModelEvents";

class PasePlayerViewModelSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE PLAYER VIEWMODEL SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const tableRuntime = {
      getPlayers() {
        return [
          {
            id: "P1",
            name: "Carlos",
            seat: 1,
            connected: true,
            wallet: 500,
          },
          {
            id: "P2",
            name: "Ana",
            seat: 2,
            connected: true,
            wallet: 750,
          },
          {
            id: "P3",
            name: "Luis",
            seat: 3,
            connected: false,
            wallet: 1200,
          },
          {
            id: "P4",
            name: "María",
            seat: 4,
            connected: true,
            wallet: 950,
          },
        ];
      },

      getPlayerCount() {
        return 4;
      },
    };
    console.log("2. Crear TableRuntime simulado:");
    console.log({
      players: tableRuntime.getPlayers(),
      playerCount: tableRuntime.getPlayerCount(),
    });

    const viewModel =
      new PasePlayerViewModel();
    console.log("3. Crear PasePlayerViewModel:");
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
      "PasePlayerViewModel debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: viewModel.isInitialized(),
    });

    const players =
      viewModel.getPlayers();
    const playerP2 =
      viewModel.getPlayer("P2");
    const hasP3 =
      viewModel.hasPlayer("P3");
    const hasP9 =
      viewModel.hasPlayer("P9");
    const playerCount =
      viewModel.getPlayerCount();
    const refreshed =
      viewModel.refresh();
    const status =
      viewModel.getStatus();
    const viewModelJSON =
      viewModel.toJSON();
    this.assert(
      players.length === 4 &&
        playerP2.name === "Ana",
      "getPlayers() y getPlayer() deben devolver jugadores simulados."
    );
    this.assert(
      hasP3 === true &&
        hasP9 === false,
      "hasPlayer() debe reflejar existencia por id."
    );
    this.assert(
      playerCount === 4 &&
        refreshed.length === 4 &&
        status.initialized === true &&
        status.players === 4 &&
        viewModelJSON.players === 4,
      "El estado del ViewModel debe reflejar cuatro jugadores."
    );
    console.log("6. Consultar jugadores, busquedas, conteo, refresh, status y toJSON():");
    console.log({
      players,
      playerP2,
      hasP3,
      hasP9,
      playerCount,
      refreshed,
      status,
      json: viewModelJSON,
    });

    const events = [
      PasePlayerViewModelEvents.createPasePlayerViewModelInitializedEvent(),
      PasePlayerViewModelEvents.createPasePlayerViewRefreshedEvent(),
      PasePlayerViewModelEvents.createPasePlayerViewModelResetEvent(),
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
      "PasePlayerViewModel debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.players === 0 &&
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
      players,
      playerP2,
      hasP3,
      hasP9,
      playerCount,
      refreshed,
      status,
      viewModelJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE PLAYER VIEWMODEL SANDBOX OK =====");
  }
}

new PasePlayerViewModelSandbox();

export default PasePlayerViewModelSandbox;
