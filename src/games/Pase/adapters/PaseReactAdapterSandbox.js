import PaseReactAdapter from "./PaseReactAdapter";
import PaseReactAdapterEvents from "./PaseReactAdapterEvents";

class PaseReactAdapterSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE REACT ADAPTER SANDBOX =====");

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

    const gameAdapter = {
      getState() {
        return {
          table,
          players: [...players],
          bets: [...bets],
          dice: {
            values: [...dice],
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
    console.log("2. Crear GameAdapter simulado:");
    console.log({
      state: gameAdapter.getState(),
      status: gameAdapter.getStatus(),
    });

    const adapter =
      new PaseReactAdapter();
    console.log("3. Crear PaseReactAdapter:");
    console.log(adapter.toJSON());

    adapter.setManager(manager);
    adapter.setGameAdapter(gameAdapter);
    console.log("4. Configurar manager y gameAdapter:");
    console.log(adapter.toJSON());

    const initialized =
      adapter.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      adapter.isInitialized() === true,
      "PaseReactAdapter debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: adapter.isInitialized(),
    });

    const listenerCalls = [];
    const listener1 = () => {
      listenerCalls.push("listener1");
    };
    const listener2 = () => {
      listenerCalls.push("listener2");
    };
    console.log("6. Crear dos listeners simulados:");
    console.log({
      listenerCalls,
    });

    const subscribed1 =
      adapter.subscribe(listener1);
    const subscribed2 =
      adapter.subscribe(listener2);
    this.assert(
      subscribed1 === true &&
        subscribed2 === true &&
        adapter.toJSON().listeners === 2,
      "subscribe() debe registrar dos listeners."
    );
    console.log("7. Ejecutar subscribe(listener1) y subscribe(listener2):");
    console.log({
      subscribed1,
      subscribed2,
      json: adapter.toJSON(),
    });

    const gameState =
      adapter.getGameState();
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
      gameState.dice.total === 7 &&
        gameState.dice.outcome === "PASE",
      "getGameState() debe delegar en gameAdapter.getState()."
    );
    this.assert(
      adapterTable.running === true &&
        adapterPlayers.length === 4 &&
        adapterBets.length === 3 &&
        adapterDice.length === 2,
      "El ReactAdapter debe delegar tabla, jugadores, apuestas y dados."
    );
    this.assert(
      refreshed.players.length === 4 &&
        status.players === 4 &&
        status.bets === 3 &&
        adapterJSON.listeners === 2 &&
        listenerCalls.length === 2,
      "refresh() debe devolver datos y notificar a dos listeners."
    );
    console.log("8. Consultar gameState, table, players, bets, dice, refresh, status y toJSON():");
    console.log({
      gameState,
      table: adapterTable,
      players: adapterPlayers,
      bets: adapterBets,
      dice: adapterDice,
      refreshed,
      status,
      json: adapterJSON,
      listenerCalls,
    });

    const unsubscribed =
      adapter.unsubscribe(listener1);
    this.assert(
      unsubscribed === true &&
        adapter.toJSON().listeners === 1,
      "unsubscribe() debe eliminar listener1."
    );
    console.log("9. Ejecutar unsubscribe(listener1):");
    console.log({
      unsubscribed,
      json: adapter.toJSON(),
    });

    adapter.notify();
    this.assert(
      listenerCalls.length === 3 &&
        listenerCalls[2] === "listener2",
      "notify() debe ejecutar solo el listener restante."
    );
    console.log("10. Ejecutar notify():");
    console.log({
      listenerCalls,
    });

    const events = [
      PaseReactAdapterEvents.createPaseReactAdapterInitializedEvent(),
      PaseReactAdapterEvents.createPaseReactAdapterRefreshedEvent(),
      PaseReactAdapterEvents.createPaseReactAdapterSubscribedEvent(),
      PaseReactAdapterEvents.createPaseReactAdapterUnsubscribedEvent(),
      PaseReactAdapterEvents.createPaseReactAdapterResetEvent(),
    ];
    console.log("11. Crear todos los eventos:");
    console.log(events);

    const reset =
      adapter.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("12. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      adapter.toJSON();
    this.assert(
      adapter.isInitialized() === false,
      "PaseReactAdapter debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.listeners === 0 &&
        resetJSON.hasGameAdapter === false,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("13. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: adapter.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      subscribed1,
      subscribed2,
      gameState,
      adapterTable,
      adapterPlayers,
      adapterBets,
      adapterDice,
      refreshed,
      status,
      adapterJSON,
      unsubscribed,
      listenerCalls,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE REACT ADAPTER SANDBOX OK =====");
  }
}

new PaseReactAdapterSandbox();

export default PaseReactAdapterSandbox;
