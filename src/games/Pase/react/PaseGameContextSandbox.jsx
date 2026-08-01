import { useEffect } from "react";
import {
  PaseGameProvider,
  usePaseGame,
} from "./PaseGameContext";
import PaseGameContextEvents from "./PaseGameContextEvents";

function createPaseGameContextSandboxStore() {
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

  const listeners = new Set();

  return {
    initialize() {
      return true;
    },

    getState() {
      return state;
    },

    subscribe(listener) {
      listeners.add(listener);

      return true;
    },

    unsubscribe(listener) {
      listeners.delete(listener);

      return true;
    },
  };
}

const paseGameContextSandboxStore =
  createPaseGameContextSandboxStore();

function PaseGameContextSandboxConsumer() {
  const {
    state,
  } = usePaseGame();

  useEffect(() => {
    if (state === null) {
      return;
    }

    const events = [
      PaseGameContextEvents.createPaseGameContextInitializedEvent(),
      PaseGameContextEvents.createPaseGameContextUpdatedEvent(),
      PaseGameContextEvents.createPaseGameContextUnmountedEvent(),
    ];

    console.log("state");
    console.log(state);
    console.log("table");
    console.log(state.table);
    console.log("players");
    console.log(state.players);
    console.log("bets");
    console.log(state.bets);
    console.log("dice");
    console.log(state.dice);
    console.log("events");
    console.log(events);
    console.log("===== PASE GAME CONTEXT SANDBOX OK =====");
  }, [state]);

  return null;
}

function PaseGameContextSandbox() {
  return (
    <PaseGameProvider store={paseGameContextSandboxStore}>
      <PaseGameContextSandboxConsumer />
    </PaseGameProvider>
  );
}

export default PaseGameContextSandbox;
