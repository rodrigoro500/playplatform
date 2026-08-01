import EngineStateCoordinator from "./EngineStateCoordinator";
import EngineStateCoordinatorEvents from "./EngineStateCoordinatorEvents";

class EngineStateCoordinatorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE STATE COORDINATOR SANDBOX =====");

    const manager = {};
    console.log("1. Crear manager simulado:");
    console.log(manager);

    const coordinator = new EngineStateCoordinator();
    console.log("2. Crear EngineStateCoordinator:");
    console.log(coordinator.toJSON());

    this.assert(coordinator.isInitialized() === false, "EngineStateCoordinator debe iniciar sin inicializar.");
    const initialJSON = coordinator.toJSON();
    this.assert(
      initialJSON.initialized === false &&
        initialJSON.states === 0 &&
        Object.keys(initialJSON.registry).length === 0,
      "EngineStateCoordinator debe iniciar sin estados."
    );
    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: coordinator.isInitialized(),
      json: initialJSON,
    });

    coordinator.setManager(manager);
    console.log("4. Ejecutar setManager():");
    console.log(coordinator.getStatus());

    const initialized = coordinator.initialize();
    this.assert(initialized === true, "initialize() debe devolver true.");
    this.assert(coordinator.isInitialized() === true, "EngineStateCoordinator debe quedar inicializado.");
    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: coordinator.isInitialized(),
    });

    coordinator.setState("game", "waiting");
    coordinator.setState("round", 1);
    coordinator.setState("players", 5);
    console.log("6. Ejecutar setState():");
    console.log(coordinator.getStates());

    const hasGame = coordinator.hasState("game");
    this.assert(hasGame === true, 'hasState("game") debe devolver true.');
    console.log('7. Ejecutar hasState("game"):');
    console.log(hasGame);

    const roundState = coordinator.getState("round");
    this.assert(roundState === 1, 'getState("round") debe devolver 1.');
    console.log('8. Ejecutar getState("round"):');
    console.log(roundState);

    const sizeAfterSet = coordinator.size();
    this.assert(sizeAfterSet === 3, "size() debe devolver 3 despues de setState.");
    console.log("9. Ejecutar size():");
    console.log(sizeAfterSet);

    const statesAfterSet = coordinator.getStates();
    this.assert(
      Object.keys(statesAfterSet).length === 3,
      "getStates() debe devolver tres estados."
    );
    console.log("10. Ejecutar getStates():");
    console.log(statesAfterSet);

    const status = coordinator.getStatus();
    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const coordinatorJSON = coordinator.toJSON();
    console.log("12. Ejecutar toJSON():");
    console.log(coordinatorJSON);

    const removed = coordinator.removeState("players");
    this.assert(removed === true, 'removeState("players") debe devolver true.');
    this.assert(
      coordinator.size() === 2 && !coordinator.hasState("players"),
      "players debe quedar removido."
    );
    const statesAfterRemove = coordinator.getStates();
    console.log('13. Ejecutar removeState("players") y verificar size() y getStates():');
    console.log({
      removed,
      size: coordinator.size(),
      states: statesAfterRemove,
    });

    const cleared = coordinator.clear();
    this.assert(cleared === true, "clear() debe devolver true.");
    console.log("14. Ejecutar clear():");
    console.log(cleared);

    const sizeAfterClear = coordinator.size();
    this.assert(sizeAfterClear === 0, "size() debe devolver 0 despues de clear.");
    console.log("15. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineStateCoordinatorEvents.createEngineStateCoordinatorInitializedEvent(),
      EngineStateCoordinatorEvents.createEngineStateSetEvent("game", "waiting"),
      EngineStateCoordinatorEvents.createEngineStateRemovedEvent("players"),
      EngineStateCoordinatorEvents.createEngineStateCoordinatorClearedEvent(),
      EngineStateCoordinatorEvents.createEngineStateCoordinatorResetEvent(),
    ];
    console.log("16. Crear eventos:");
    console.log(events);

    const reset = coordinator.reset();
    this.assert(reset === true, "reset() debe devolver true.");
    console.log("17. Ejecutar reset():");
    console.log(reset);

    const resetJSON = coordinator.toJSON();
    this.assert(coordinator.isInitialized() === false, "EngineStateCoordinator debe quedar sin inicializar tras reset.");
    this.assert(coordinator.size() === 0, "size() debe quedar en 0 tras reset.");
    this.assert(Object.keys(coordinator.getStates()).length === 0, "getStates() debe quedar vacio tras reset.");
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.states === 0 &&
        Object.keys(resetJSON.registry).length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );
    console.log("18. Verificar nuevamente isInitialized(), size(), getStates() y toJSON():");
    console.log({
      initialized: coordinator.isInitialized(),
      size: coordinator.size(),
      states: coordinator.getStates(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      hasGame,
      roundState,
      sizeAfterSet,
      statesAfterSet,
      status,
      coordinatorJSON,
      removed,
      statesAfterRemove,
      cleared,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE STATE COORDINATOR SANDBOX OK =====");
  }
}

new EngineStateCoordinatorSandbox();

export default EngineStateCoordinatorSandbox;
