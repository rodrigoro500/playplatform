import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PaseGameContext = createContext(null);

function PaseGameProvider({
  store,
  children,
}) {
  const [state, setState] = useState(null);

  useEffect(() => {
    store.initialize();
    setState(store.getState());

    const listener = () => {
      setState(store.getState());
    };

    store.subscribe(listener);

    return () => {
      store.unsubscribe(listener);
    };
  }, [store]);

  const value = useMemo(() => ({
    store,
    state,
  }), [
    store,
    state,
  ]);

  return (
    <PaseGameContext.Provider value={value}>
      {children}
    </PaseGameContext.Provider>
  );
}

function usePaseGame() {
  const context = useContext(PaseGameContext);

  if (context === null) {
    throw new Error(
      "usePaseGame debe utilizarse dentro de PaseGameProvider."
    );
  }

  return context;
}

export {
  PaseGameContext,
  PaseGameProvider,
  usePaseGame,
};
