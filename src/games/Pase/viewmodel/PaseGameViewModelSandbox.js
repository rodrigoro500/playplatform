import PaseGameViewModel from "./PaseGameViewModel";
import PaseGameViewModelEvents from "./PaseGameViewModelEvents";

class PaseGameViewModelSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE GAME VIEWMODEL SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const tableViewModel = {
      getTableState() {
        return {
          running: true,
          players: 4,
        };
      },

      isRunning() {
        return true;
      },
    };
    console.log("2. Crear TableViewModel simulado:");
    console.log(tableViewModel.getTableState());

    const players = [
      { id: "P1", name: "Carlos" },
      { id: "P2", name: "Ana" },
      { id: "P3", name: "Luis" },
      { id: "P4", name: "Maria" },
    ];
    const playerViewModel = {
      getPlayers() {
        return [...players];
      },

      getPlayerCount() {
        return players.length;
      },
    };
    console.log("3. Crear PlayerViewModel simulado:");
    console.log({
      players: playerViewModel.getPlayers(),
      playerCount: playerViewModel.getPlayerCount(),
    });

    const bets = [
      { id: "B1", playerId: "P1", amount: 100 },
      { id: "B2", playerId: "P2", amount: 250 },
      { id: "B3", playerId: "P4", amount: 75 },
    ];
    const betViewModel = {
      getBets() {
        return [...bets];
      },

      getBetCount() {
        return bets.length;
      },
    };
    console.log("4. Crear BetViewModel simulado:");
    console.log({
      bets: betViewModel.getBets(),
      betCount: betViewModel.getBetCount(),
    });

    const diceViewModel = {
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
    console.log("5. Crear DiceViewModel simulado:");
    console.log({
      dice: diceViewModel.getDice(),
      total: diceViewModel.getTotal(),
      outcome: diceViewModel.getOutcome(),
    });

    const viewModel =
      new PaseGameViewModel();
    console.log("6. Crear PaseGameViewModel:");
    console.log(viewModel.toJSON());

    viewModel.setManager(manager);
    viewModel.setTableViewModel(tableViewModel);
    viewModel.setPlayerViewModel(playerViewModel);
    viewModel.setBetViewModel(betViewModel);
    viewModel.setDiceViewModel(diceViewModel);
    console.log("7. Configurar manager y ViewModels:");
    console.log(viewModel.toJSON());

    const initialized =
      viewModel.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      viewModel.isInitialized() === true,
      "PaseGameViewModel debe quedar inicializado."
    );
    console.log("8. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: viewModel.isInitialized(),
    });

    const table =
      viewModel.getTable();
    const viewPlayers =
      viewModel.getPlayers();
    const viewBets =
      viewModel.getBets();
    const dice =
      viewModel.getDice();
    const refreshed =
      viewModel.refresh();
    const gameState =
      viewModel.getGameState();
    const status =
      viewModel.getStatus();
    const viewModelJSON =
      viewModel.toJSON();
    this.assert(
      table.running === true &&
        table.players === 4,
      "getTable() debe devolver el estado de tabla."
    );
    this.assert(
      viewPlayers.length === 4 &&
        viewBets.length === 3 &&
        dice.length === 2,
      "Los ViewModels deben devolver jugadores, apuestas y dados."
    );
    this.assert(
      refreshed.players.length === 4 &&
        gameState.dice.total === 7 &&
        gameState.dice.outcome === "PASE",
      "refresh() y getGameState() deben componer el estado del juego."
    );
    this.assert(
      status.initialized === true &&
        status.players === 4 &&
        status.bets === 3 &&
        status.running === true,
      "getStatus() debe reflejar conteos y running."
    );
    console.log("9. Consultar tabla, jugadores, apuestas, dados, refresh, gameState, status y toJSON():");
    console.log({
      table,
      players: viewPlayers,
      bets: viewBets,
      dice,
      refreshed,
      gameState,
      status,
      json: viewModelJSON,
    });

    const events = [
      PaseGameViewModelEvents.createPaseGameViewModelInitializedEvent(),
      PaseGameViewModelEvents.createPaseGameViewRefreshedEvent(),
      PaseGameViewModelEvents.createPaseGameStateUpdatedEvent(gameState),
      PaseGameViewModelEvents.createPaseGameViewModelResetEvent(),
    ];
    console.log("10. Crear todos los eventos:");
    console.log(events);

    const reset =
      viewModel.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("11. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      viewModel.toJSON();
    this.assert(
      viewModel.isInitialized() === false,
      "PaseGameViewModel debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasTableViewModel === false &&
        resetJSON.hasPlayerViewModel === false &&
        resetJSON.hasBetViewModel === false &&
        resetJSON.hasDiceViewModel === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("12. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: viewModel.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      table,
      viewPlayers,
      viewBets,
      dice,
      refreshed,
      gameState,
      status,
      viewModelJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE GAME VIEWMODEL SANDBOX OK =====");
  }
}

new PaseGameViewModelSandbox();

export default PaseGameViewModelSandbox;
