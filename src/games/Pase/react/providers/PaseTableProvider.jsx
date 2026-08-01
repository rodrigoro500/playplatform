import {
  PaseGameProvider,
} from "../PaseGameContext";

function PaseTableProvider({
  store,
  children,
}) {
  return (
    <PaseGameProvider store={store}>
      {children}
    </PaseGameProvider>
  );
}

export {
  PaseTableProvider,
};

export default PaseTableProvider;
