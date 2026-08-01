class StateMachineEvents {
  static STATE_ADDED = "STATE_ADDED";

  static STATE_REMOVED = "STATE_REMOVED";

  static INITIAL_STATE_SET = "INITIAL_STATE_SET";

  static TRANSITION_ADDED = "TRANSITION_ADDED";

  static TRANSITION_REMOVED = "TRANSITION_REMOVED";

  static STATE_CHANGED = "STATE_CHANGED";

  static STATE_MACHINE_CLEARED = "STATE_MACHINE_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createStateAddedEvent(state) {
    return StateMachineEvents.createEvent(
      StateMachineEvents.STATE_ADDED,
      {
        state,
      }
    );
  }

  static createStateRemovedEvent(state) {
    return StateMachineEvents.createEvent(
      StateMachineEvents.STATE_REMOVED,
      {
        state,
      }
    );
  }

  static createInitialStateSetEvent(state) {
    return StateMachineEvents.createEvent(
      StateMachineEvents.INITIAL_STATE_SET,
      {
        state,
      }
    );
  }

  static createTransitionAddedEvent(
    fromState,
    toState
  ) {
    return StateMachineEvents.createEvent(
      StateMachineEvents.TRANSITION_ADDED,
      {
        fromState,
        toState,
      }
    );
  }

  static createTransitionRemovedEvent(
    fromState,
    toState
  ) {
    return StateMachineEvents.createEvent(
      StateMachineEvents.TRANSITION_REMOVED,
      {
        fromState,
        toState,
      }
    );
  }

  static createStateChangedEvent(
    previousState,
    currentState
  ) {
    return StateMachineEvents.createEvent(
      StateMachineEvents.STATE_CHANGED,
      {
        previousState,
        currentState,
      }
    );
  }

  static createStateMachineClearedEvent() {
    return StateMachineEvents.createEvent(
      StateMachineEvents.STATE_MACHINE_CLEARED,
      {}
    );
  }
}

export default StateMachineEvents;
