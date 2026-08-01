class StateMachine {
  constructor() {
    this.currentState = null;
    this.states = new Set();
    this.transitions = new Map();
  }

  validateState(state) {
    if (
      typeof state !== "string" ||
      state.trim() === ""
    ) {
      throw new Error(
        "El estado debe ser un string no vacio."
      );
    }
  }

  addState(state) {
    this.validateState(state);

    if (this.hasState(state)) {
      throw new Error(
        "Ya existe ese estado."
      );
    }

    this.states.add(state);

    return state;
  }

  removeState(state) {
    this.validateState(state);

    if (!this.hasState(state)) {
      throw new Error(
        "No existe ese estado."
      );
    }

    this.states.delete(state);
    this.transitions.delete(state);

    this.transitions.forEach(toStates => {
      toStates.delete(state);
    });

    if (this.currentState === state) {
      this.currentState = null;
    }

    return true;
  }

  hasState(state) {
    this.validateState(state);

    return this.states.has(state);
  }

  getStates() {
    return Array.from(
      this.states
    );
  }

  setInitialState(state) {
    if (!this.hasState(state)) {
      throw new Error(
        "El estado inicial debe existir."
      );
    }

    this.currentState = state;

    return this.currentState;
  }

  getCurrentState() {
    return this.currentState;
  }

  addTransition(
    fromState,
    toState
  ) {
    if (!this.hasState(fromState)) {
      throw new Error(
        "El estado origen debe existir."
      );
    }

    if (!this.hasState(toState)) {
      throw new Error(
        "El estado destino debe existir."
      );
    }

    if (!this.transitions.has(fromState)) {
      this.transitions.set(
        fromState,
        new Set()
      );
    }

    this.transitions
      .get(fromState)
      .add(toState);

    return toState;
  }

  removeTransition(
    fromState,
    toState
  ) {
    this.validateState(fromState);
    this.validateState(toState);

    if (!this.transitions.has(fromState)) {
      return false;
    }

    const toStates =
      this.transitions.get(fromState);

    const removed =
      toStates.delete(toState);

    if (toStates.size === 0) {
      this.transitions.delete(fromState);
    }

    return removed;
  }

  canTransition(toState) {
    this.validateState(toState);

    if (!this.currentState) {
      return false;
    }

    if (!this.transitions.has(this.currentState)) {
      return false;
    }

    return this.transitions
      .get(this.currentState)
      .has(toState);
  }

  transition(toState) {
    if (!this.canTransition(toState)) {
      throw new Error(
        "La transicion solicitada no es valida."
      );
    }

    this.currentState = toState;

    return this.currentState;
  }

  getTransitions() {
    const transitions = {};

    this.transitions.forEach((toStates, fromState) => {
      transitions[fromState] =
        Array.from(toStates);
    });

    return transitions;
  }

  getTransitionsFrom(state) {
    this.validateState(state);

    if (!this.transitions.has(state)) {
      return [];
    }

    return Array.from(
      this.transitions.get(state)
    );
  }

  clear() {
    this.currentState = null;
    this.states.clear();
    this.transitions.clear();
  }

  toJSON() {
    return {
      currentState: this.currentState,
      states: this.getStates(),
      transitions: this.getTransitions(),
    };
  }
}

export default StateMachine;
