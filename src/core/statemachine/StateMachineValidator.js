class StateMachineValidator {
  static validateState(state) {
    if (typeof state !== "string") {
      throw new Error(
        "El estado debe ser un string."
      );
    }

    if (state.trim() === "") {
      throw new Error(
        "El estado no puede estar vacio."
      );
    }
  }

  static validateStates(states) {
    if (!(states instanceof Set)) {
      throw new Error(
        "Los estados deben ser una instancia de Set."
      );
    }

    states.forEach(state =>
      StateMachineValidator.validateState(state)
    );
  }

  static validateTransition(
    fromState,
    toState
  ) {
    StateMachineValidator.validateState(fromState);
    StateMachineValidator.validateState(toState);
  }

  static validateTransitions(transitions) {
    if (!(transitions instanceof Map)) {
      throw new Error(
        "Las transiciones deben ser una instancia de Map."
      );
    }

    transitions.forEach((toStates, fromState) => {
      StateMachineValidator.validateState(fromState);

      if (!(toStates instanceof Set)) {
        throw new Error(
          "Los destinos de una transicion deben ser una instancia de Set."
        );
      }

      toStates.forEach(toState =>
        StateMachineValidator.validateState(toState)
      );
    });
  }

  static validateCurrentState(currentState) {
    if (currentState === null) {
      return;
    }

    StateMachineValidator.validateState(currentState);
  }

  static validateStateMachine(stateMachine) {
    if (
      stateMachine === null ||
      typeof stateMachine !== "object" ||
      Array.isArray(stateMachine)
    ) {
      throw new Error(
        "La maquina de estados debe ser un objeto valido."
      );
    }

    StateMachineValidator.validateCurrentState(
      stateMachine.currentState
    );
    StateMachineValidator.validateStates(
      stateMachine.states
    );
    StateMachineValidator.validateTransitions(
      stateMachine.transitions
    );
  }
}

export default StateMachineValidator;
