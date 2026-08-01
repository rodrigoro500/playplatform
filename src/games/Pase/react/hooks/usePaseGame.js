import {
  useContext,
  useMemo,
} from "react";
import {
  PaseGameContext,
} from "../PaseGameContext";

function usePaseGameContext() {
  const context = useContext(PaseGameContext);

  if (context === null) {
    throw new Error(
      "usePaseGame debe utilizarse dentro de PaseGameProvider."
    );
  }

  return context;
}

function usePaseGame() {
  const {
    store,
    state,
  } = usePaseGameContext();

  return useMemo(() => ({
    store,
    state,
    table: state?.table ?? null,
    players: state?.players ?? [],
    bets: state?.bets ?? [],
    dice: state?.dice ?? null,
    running: state?.table?.running ?? false,
    refresh: () => store.refresh(),
    getState: () => store.getState(),
  }), [
    store,
    state,
  ]);
}

export default usePaseGame;
export {
  usePaseGame,
};
