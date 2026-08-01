import { useEffect } from "react";
import PaseTableProvider from "./PaseTableProvider";
import PaseTableProviderEvents from "./PaseTableProviderEvents";

const store = {
  initialize() {
    return true;
  },

  getState() {
    return {
      table: {
        running: true,
      },
      players: [],
      bets: [],
      dice: null,
    };
  },

  subscribe() {
    return true;
  },

  unsubscribe() {
    return true;
  },
};

function PaseTableProviderSandboxContent() {
  useEffect(() => {
    const children = "Mesa de Pase";
    const rendered =
      children === "Mesa de Pase";
    const events = [
      PaseTableProviderEvents.createPaseTableProviderInitializedEvent(),
      PaseTableProviderEvents.createPaseTableProviderRenderedEvent(),
      PaseTableProviderEvents.createPaseTableProviderDestroyedEvent(),
    ];

    if (!rendered) {
      throw new Error(
        "PaseTableProviderSandbox no renderizo correctamente."
      );
    }

    console.log("Store");
    console.log(store);
    console.log("Children");
    console.log(children);
    console.log("Events");
    console.log(events);
    console.log("===== PASE TABLE PROVIDER SANDBOX OK =====");
  }, []);

  return (
    <div>
      Mesa de Pase
    </div>
  );
}

function PaseTableProviderSandbox() {
  return (
    <PaseTableProvider store={store}>
      <PaseTableProviderSandboxContent />
    </PaseTableProvider>
  );
}

export default PaseTableProviderSandbox;
