class StateManager {
  constructor(initialState = "WAITING") {
    this.currentState = initialState;

    this.transitions = {
      WAITING: ["READY"],

      READY: ["CREDITS"],

      CREDITS: ["GAME_SELECTION"],

      GAME_SELECTION: ["BETTING"],

      BETTING: ["LOCKING_BETS"],

      LOCKING_BETS: ["WAITING_BALANCE"],

      WAITING_BALANCE: ["GAME_RUNNING"],

      GAME_RUNNING: ["CALCULATING"],

      CALCULATING: ["PAYING"],

      PAYING: ["ROUND_FINISHED"],

      ROUND_FINISHED: ["NEXT_ROUND", "ROOM_FINISHED"],

      NEXT_ROUND: ["BETTING"],

      ROOM_FINISHED: [],
    };
  }

  getState() {
    return this.currentState;
  }

  canTransition(nextState) {
    const allowedTransitions =
      this.transitions[this.currentState] || [];

    return allowedTransitions.includes(nextState);
  }

  transition(nextState) {
    if (!this.canTransition(nextState)) {
      throw new Error(
        `No se puede pasar de ${this.currentState} a ${nextState}`
      );
    }

    this.currentState = nextState;

    return this.currentState;
  }
}

export default StateManager;