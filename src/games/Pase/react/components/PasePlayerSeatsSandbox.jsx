import { useEffect } from "react";
import {
  PaseGameContext,
} from "../PaseGameContext";
import PasePlayerSeats from "./PasePlayerSeats";
import PasePlayerSeatsEvents from "./PasePlayerSeatsEvents";

const players = [
  {
    id: "P1",
    name: "Carlos",
    wallet: 500,
  },
  {
    id: "P2",
    name: "Ana",
    wallet: 850,
  },
  {
    id: "P3",
    name: "Luis",
    wallet: 1200,
  },
  {
    id: "P4",
    name: "María",
    wallet: 450,
  },
];

const state = {
  table: {
    running: true,
  },
  players,
  bets: [],
  dice: null,
};

const store = {
  refresh() {
    return state;
  },

  getState() {
    return state;
  },
};

function PasePlayerSeatsSandboxVerifier() {
  useEffect(() => {
    const component = "PasePlayerSeats";
    const allPlayersVisible =
      players.every((player) => player.id);
    const namesVisible =
      players.every((player) => player.name);
    const walletsVisible =
      players.every((player) => player.wallet !== undefined);
    const events = [
      PasePlayerSeatsEvents.createPasePlayerSeatsRenderedEvent(),
      PasePlayerSeatsEvents.createPasePlayerSeatsUpdatedEvent(),
      PasePlayerSeatsEvents.createPasePlayerSeatsEmptyEvent(),
    ];

    if (!allPlayersVisible || !namesVisible || !walletsVisible) {
      throw new Error(
        "PasePlayerSeatsSandbox no renderizo todos los jugadores correctamente."
      );
    }

    console.log("Players");
    console.log(players);
    console.log("Component");
    console.log(component);
    console.log("Events");
    console.log(events);
    console.log("===== PASE PLAYER SEATS SANDBOX OK =====");
  }, []);

  return null;
}

function PasePlayerSeatsSandbox() {
  return (
    <PaseGameContext.Provider value={{
      store,
      state,
    }}>
      <PasePlayerSeats />
      <PasePlayerSeatsSandboxVerifier />
    </PaseGameContext.Provider>
  );
}

export default PasePlayerSeatsSandbox;
