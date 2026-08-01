import { useEffect } from "react";
import {
  PaseGameContext,
} from "../PaseGameContext";
import usePaseGame from "./usePaseGame";
import UsePaseGameEvents from "./usePaseGameEvents";

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

const store = {
  refresh() {
    return state;
  },

  getState() {
    return state;
  },
};

function UsePaseGameSandboxConsumer() {
  const {
    state: gameState,
    table,
    players,
    bets,
    dice,
    running,
    refresh,
    getState,
  } = usePaseGame();

  useEffect(() => {
    const refreshed =
      refresh();
    const currentState =
      getState();
    const events = [
      UsePaseGameEvents.createUsePaseGameInitializedEvent(),
      UsePaseGameEvents.createUsePaseGameRefreshedEvent(),
      UsePaseGameEvents.createUsePaseGameStateReadEvent(),
    ];

    console.log("state");
    console.log(gameState);
    console.log("table");
    console.log(table);
    console.log("players");
    console.log(players);
    console.log("bets");
    console.log(bets);
    console.log("dice");
    console.log(dice);
    console.log("running");
    console.log(running);
    console.log("refresh");
    console.log(refreshed);
    console.log("getState");
    console.log(currentState);
    console.log("events");
    console.log(events);
    console.log("===== USE PASE GAME SANDBOX OK =====");
  }, [
    gameState,
    table,
    players,
    bets,
    dice,
    running,
    refresh,
    getState,
  ]);

  return null;
}

function UsePaseGameSandbox() {
  return (
    <PaseGameContext.Provider value={{
      store,
      state,
    }}>
      <UsePaseGameSandboxConsumer />
    </PaseGameContext.Provider>
  );
}

export default UsePaseGameSandbox;
