import StateMachine from "./StateMachine";
import StateMachineEvents from "./StateMachineEvents";

class StateMachineSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== STATEMACHINE SANDBOX =====");

    const stateMachine =
      new StateMachine();

    console.log("1. Crear una instancia de StateMachine:");
    console.log(stateMachine.toJSON());

    stateMachine.addState("CREATED");
    stateMachine.addState("WAITING");
    stateMachine.addState("RUNNING");
    stateMachine.addState("PAUSED");
    stateMachine.addState("FINISHED");

    console.log("2. Agregar los estados:");
    console.log(stateMachine.getStates());

    this.assert(
      stateMachine.hasState("CREATED") === true,
      "CREATED debe existir."
    );
    this.assert(
      stateMachine.hasState("RUNNING") === true,
      "RUNNING debe existir."
    );

    console.log("3. Verificar hasState():");
    console.log({
      created: stateMachine.hasState("CREATED"),
      running: stateMachine.hasState("RUNNING"),
    });

    const states =
      stateMachine.getStates();

    this.assert(
      states.length === 5,
      "Deben existir cinco estados."
    );

    console.log("4. Obtener todos los estados:");
    console.log(states);

    stateMachine.setInitialState("CREATED");

    console.log("5. Definir CREATED como estado inicial:");
    console.log(stateMachine.getCurrentState());

    this.assert(
      stateMachine.getCurrentState() === "CREATED",
      "El estado actual debe ser CREATED."
    );

    console.log("6. Verificar getCurrentState():");
    console.log(stateMachine.getCurrentState());

    stateMachine.addTransition(
      "CREATED",
      "WAITING"
    );
    stateMachine.addTransition(
      "WAITING",
      "RUNNING"
    );
    stateMachine.addTransition(
      "RUNNING",
      "PAUSED"
    );
    stateMachine.addTransition(
      "PAUSED",
      "RUNNING"
    );
    stateMachine.addTransition(
      "RUNNING",
      "FINISHED"
    );

    console.log("7. Agregar las transiciones:");
    console.log(stateMachine.getTransitions());

    const transitions =
      stateMachine.getTransitions();

    console.log("8. Obtener todas las transiciones:");
    console.log(transitions);

    const runningTransitions =
      stateMachine.getTransitionsFrom("RUNNING");

    this.assert(
      runningTransitions.length === 2,
      "RUNNING debe tener dos transiciones."
    );

    console.log("9. Obtener transiciones desde RUNNING:");
    console.log(runningTransitions);

    this.assert(
      stateMachine.canTransition("WAITING") === true,
      "Debe poder transicionar de CREATED a WAITING."
    );

    console.log("10. Verificar canTransition():");
    console.log({
      toWaiting: stateMachine.canTransition("WAITING"),
      toPaused: stateMachine.canTransition("PAUSED"),
    });

    const previousStateCreated =
      stateMachine.getCurrentState();

    stateMachine.transition("WAITING");

    console.log("11. Ejecutar transicion CREATED -> WAITING:");
    console.log(stateMachine.getCurrentState());

    const previousStateWaiting =
      stateMachine.getCurrentState();

    stateMachine.transition("RUNNING");

    console.log("12. Ejecutar transicion WAITING -> RUNNING:");
    console.log(stateMachine.getCurrentState());

    const previousStateRunning =
      stateMachine.getCurrentState();

    stateMachine.transition("PAUSED");

    console.log("13. Ejecutar transicion RUNNING -> PAUSED:");
    console.log(stateMachine.getCurrentState());

    const previousStatePaused =
      stateMachine.getCurrentState();

    stateMachine.transition("RUNNING");

    console.log("14. Ejecutar transicion PAUSED -> RUNNING:");
    console.log(stateMachine.getCurrentState());

    const previousStateRunningAgain =
      stateMachine.getCurrentState();

    stateMachine.transition("FINISHED");

    console.log("15. Ejecutar transicion RUNNING -> FINISHED:");
    console.log(stateMachine.getCurrentState());

    const events = [
      StateMachineEvents.createStateAddedEvent("CREATED"),
      StateMachineEvents.createStateRemovedEvent("FINISHED"),
      StateMachineEvents.createInitialStateSetEvent("CREATED"),
      StateMachineEvents.createTransitionAddedEvent(
        "CREATED",
        "WAITING"
      ),
      StateMachineEvents.createTransitionRemovedEvent(
        "RUNNING",
        "PAUSED"
      ),
      StateMachineEvents.createStateChangedEvent(
        previousStateCreated,
        "WAITING"
      ),
      StateMachineEvents.createStateChangedEvent(
        previousStateWaiting,
        "RUNNING"
      ),
      StateMachineEvents.createStateChangedEvent(
        previousStateRunning,
        "PAUSED"
      ),
      StateMachineEvents.createStateChangedEvent(
        previousStatePaused,
        "RUNNING"
      ),
      StateMachineEvents.createStateChangedEvent(
        previousStateRunningAgain,
        "FINISHED"
      ),
      StateMachineEvents.createStateMachineClearedEvent(),
    ];

    console.log("16. Crear eventos utilizando StateMachineEvents:");
    console.log(events);

    const stateMachineJSON =
      stateMachine.toJSON();

    console.log("17. Serializar StateMachine utilizando toJSON():");
    console.log(stateMachineJSON);

    const removedTransition =
      stateMachine.removeTransition(
        "RUNNING",
        "PAUSED"
      );

    this.assert(
      removedTransition === true,
      "La transicion RUNNING -> PAUSED debe eliminarse."
    );

    console.log("18. Eliminar una transicion:");
    console.log(stateMachine.getTransitions());

    const removedState =
      stateMachine.removeState("PAUSED");

    this.assert(
      removedState === true,
      "PAUSED debe eliminarse."
    );

    console.log("19. Eliminar un estado:");
    console.log(stateMachine.toJSON());

    stateMachine.clear();

    console.log("20. Limpiar completamente StateMachine:");
    console.log(stateMachine.toJSON());

    this.assert(
      stateMachine.getStates().length === 0,
      "No deben existir estados."
    );
    this.assert(
      Object.keys(stateMachine.getTransitions()).length === 0,
      "No deben existir transiciones."
    );

    console.log("21. Verificar que no existan estados ni transiciones:");
    console.log(stateMachine.toJSON());

    console.log("22. Mostrar todos los resultados por consola:");
    console.log({
      states,
      transitions,
      runningTransitions,
      stateMachineJSON,
      events,
      finalStateMachine: stateMachine.toJSON(),
    });

    console.log("===== STATEMACHINE SANDBOX OK =====");
  }
}

new StateMachineSandbox();

export default StateMachineSandbox;
