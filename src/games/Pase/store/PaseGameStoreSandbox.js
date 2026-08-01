import PaseGameStore from "./PaseGameStore";
import PaseGameStoreEvents from "./PaseGameStoreEvents";

class PaseGameStoreSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE GAME STORE SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const state = {
      table: {
        running: true,
      },
      players: [
        { id: "P1" },
        { id: "P2" },
        { id: "P3" },
        { id: "P4" },
      ],
      bets: [
        { id: "B1" },
        { id: "B2" },
      ],
      dice: {
        values: [4, 3],
        total: 7,
        outcome: "PASE",
      },
    };

    const reactAdapter = {
      getGameState() {
        return state;
      },

      refresh() {
        return state;
      },
    };
    console.log("2. Crear ReactAdapter simulado:");
    console.log(reactAdapter.getGameState());

    const store =
      new PaseGameStore();
    console.log("3. Crear PaseGameStore:");
    console.log(store.toJSON());

    store.setManager(manager);
    store.setReactAdapter(reactAdapter);
    console.log("4. Configurar manager y reactAdapter:");
    console.log(store.toJSON());

    const initialized =
      store.initialize();
    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      store.isInitialized() === true,
      "PaseGameStore debe quedar inicializado."
    );
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: store.isInitialized(),
      state: store.getState(),
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
      store.subscribe(listener1);
    const subscribed2 =
      store.subscribe(listener2);
    this.assert(
      subscribed1 === true &&
        subscribed2 === true &&
        store.toJSON().listeners === 2,
      "subscribe() debe registrar dos listeners."
    );
    console.log("7. Ejecutar subscribe(listener1) y subscribe(listener2):");
    console.log({
      subscribed1,
      subscribed2,
      json: store.toJSON(),
    });

    const currentState =
      store.getState();
    const table =
      store.getTable();
    const players =
      store.getPlayers();
    const bets =
      store.getBets();
    const dice =
      store.getDice();
    const status =
      store.getStatus();
    const refreshed =
      store.refresh();
    const storeJSON =
      store.toJSON();
    this.assert(
      currentState === state &&
        table.running === true,
      "getState() y getTable() deben devolver el estado cargado."
    );
    this.assert(
      players.length === 4 &&
        bets.length === 2 &&
        dice.total === 7 &&
        dice.outcome === "PASE",
      "La store debe exponer jugadores, apuestas y dados."
    );
    this.assert(
      status.initialized === true &&
        status.players === 4 &&
        status.bets === 2,
      "getStatus() debe reflejar conteos de estado."
    );
    this.assert(
      refreshed === state &&
        listenerCalls.length === 2 &&
        storeJSON.listeners === 2,
      "refresh() debe actualizar y notificar dos listeners."
    );
    console.log("8. Consultar state, table, players, bets, dice, status, refresh y toJSON():");
    console.log({
      state: currentState,
      table,
      players,
      bets,
      dice,
      status,
      refreshed,
      json: storeJSON,
      listenerCalls,
    });

    const unsubscribed =
      store.unsubscribe(listener2);
    this.assert(
      unsubscribed === true &&
        store.toJSON().listeners === 1,
      "unsubscribe() debe eliminar listener2."
    );
    console.log("9. Ejecutar unsubscribe(listener2):");
    console.log({
      unsubscribed,
      json: store.toJSON(),
    });

    store.notify();
    this.assert(
      listenerCalls.length === 3 &&
        listenerCalls[2] === "listener1",
      "notify() debe ejecutar solo el listener restante."
    );
    console.log("10. Ejecutar notify():");
    console.log({
      listenerCalls,
    });

    const events = [
      PaseGameStoreEvents.createPaseGameStoreInitializedEvent(),
      PaseGameStoreEvents.createPaseGameStoreUpdatedEvent(currentState),
      PaseGameStoreEvents.createPaseGameStoreRefreshedEvent(),
      PaseGameStoreEvents.createPaseGameStoreResetEvent(),
    ];
    console.log("11. Crear todos los eventos:");
    console.log(events);

    const reset =
      store.reset();
    this.assert(
      reset === true,
      "reset() debe devolver true."
    );
    console.log("12. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      store.toJSON();
    this.assert(
      store.isInitialized() === false,
      "PaseGameStore debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.hasState === false &&
        resetJSON.listeners === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("13. Verificar nuevamente isInitialized() y toJSON():");
    console.log({
      initialized: store.isInitialized(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialized,
      subscribed1,
      subscribed2,
      currentState,
      table,
      players,
      bets,
      dice,
      status,
      refreshed,
      storeJSON,
      unsubscribed,
      listenerCalls,
      events,
      reset,
      resetJSON,
    });

    console.log("===== PASE GAME STORE SANDBOX OK =====");
  }
}

new PaseGameStoreSandbox();

export default PaseGameStoreSandbox;
