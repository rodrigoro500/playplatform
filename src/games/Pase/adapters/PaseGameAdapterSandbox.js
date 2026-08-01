import PaseGameAdapter from "./PaseGameAdapter";
import PaseGameAdapterEvents from "./PaseGameAdapterEvents";

class PaseGameAdapterSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE GAME ADAPTER SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const table = {
      running: true,
      players: 4,
    };
    const players = [
      { id: "P1", name: "Carlos" },
      { id: "P2", name: "Ana" },
      { id: "P3", name: "Luis" },
      { id: "P4", name: "Maria" },
    ];
    const bets = [
      { id: "B1", playerId: "P1", amount: 100 },
      { id: "B2", playerId: "P2", amount: 250 },
      { id: "B3", playerId: "P4", amount: 75 },
    ];
    const dice = [
      4,
      3,
    ];

    const gameViewModel = {
      getGameState() {
        return {
          table,
          players,
          bets,
          dice: {
            values: dice,
            total: 7,
            outcome: "PASE",
          },
        };
      },

      getTable() {
        return table;
      },

      getPlayers() {
        return [...players];
      },

      getBets() {
        return [...bets];
      },

      getDice() {
        return [...dice];
      },

      refresh() {
        return {
          table,
          players: [...players],
          bets: [...bets],
          dice: [...dice],
        };
      },

      getStatus() {
        return {
          initialized: true,
          players: players.length,
          bets: bets.length,
          running: true,
        };
      },
    };
    console.log("2. Crear GameViewModel simulado:");
    console.log({
      state: gameViewModel.getGameState(),
      status: gameViewModel.getStatus(),
    });

    const adapter =
      new PaseGameAdapter();
    console.log("3. Crear PaseGameAdapter:");
    console.log(adapter.toJSON());

    adapter.setManager(manager);
    adapter.setGameViewModel(gameViewModel);
    console.log("4. Configurar manager y gameViewModel:");
    console.log(adapter.toJSON());

    const initialized =
      adapter.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      adapter.isInitialized() === true,
      "PaseGameAdapter debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: adapter.isInitialized(),
    });

    const state =
      adapter.getState();
    const adapterTable =
      adapter.getTable();
    const adapterPlayers =
      adapter.getPlayers();
    const adapterBets =
      adapter.getBets();
    const adapterDice =
      adapter.getDice();
    const refreshed =
      adapter.refresh();
    const status =
      adapter.getStatus();
    const adapterJSON =
      adapter.toJSON();
    this.assert(
      state.dice.total === 7 &&
        state.dice.outcome === "PASE",
      "getState() debe delegar en gameViewModel.getGameState()."
    );
    this.assert(
      adapterTable.running === true &&
        adapterPlayers.length === 4 &&
        adapterBets.length === 3 &&
        adapterDice.length === 2,
      "El adapter debe delegar tabla, jugadores, apuestas y dados."
    );
    this.assert(
      refreshed.players.length === 4 &&
        status.players === 4 &&
        status.bets === 3 &&
        adapterJSON.initialized === true,
      "refresh(), getStatus() y toJSON() deben reflejar el ViewModel."
    );
    console.log("6. Consultar state, table, players, bets, dice, refresh, status y toJSON():");
    console.log({
      state,
      table: adapterTable,
      players: adapterPlayers,
      bets: adapterBets,
      dice: adapterDice,
      refreshed,
      status,
      json: adapterJSON,
    });

    const events = [
      PaseGameAdapterEvents.createPaseGameAdapterInitializedEvent(),
      PaseGameAdapterEvents.createPaseGameAdapterRefreshedEvent(),
      PaseGameAdapterEvents.createPaseGameAdapterResetEvent(),
    ];
    console.log("7. Crear todos los eventos:");
    console.log(events);

    const reset =
      adapter.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("8. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      adapter.toJSON();
    this.assert(
      adapter.isInitialized() === false,
      "PaseGameAdapter debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasGameViewModel === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("9. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: adapter.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      state,
      adapterTable,
      adapterPlayers,
      adapterBets,
      adapterDice,
      refreshed,
      status,
      adapterJSON,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE GAME ADAPTER SANDBOX OK =====");
  }
}

new PaseGameAdapterSandbox();

export default PaseGameAdapterSandbox;
