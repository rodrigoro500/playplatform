import RoundLifecycleStates from "./RoundLifecycleStates";
import RoundLifecycleError from "../errors/RoundLifecycleError";

const ALLOWED_TRANSITIONS = Object.freeze({
  [RoundLifecycleStates.CREATED]: [
    RoundLifecycleStates.WAITING_BETS,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.WAITING_BETS]: [
    RoundLifecycleStates.READY_TO_ROLL,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.READY_TO_ROLL]: [
    RoundLifecycleStates.ROLLING,
    RoundLifecycleStates.WAITING_BETS,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.ROLLING]: [
    RoundLifecycleStates.RESOLVING,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.RESOLVING]: [
    RoundLifecycleStates.FUNDING,
    RoundLifecycleStates.PAYMENT,
    RoundLifecycleStates.FINISHED,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.FUNDING]: [
    RoundLifecycleStates.PAYMENT,
    RoundLifecycleStates.FINISHED,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.PAYMENT]: [
    RoundLifecycleStates.FINISHED,
    RoundLifecycleStates.CANCELLED,
  ],

  [RoundLifecycleStates.FINISHED]: [],

  [RoundLifecycleStates.CANCELLED]: [],
});

class RoundLifecycle {
  constructor({ roundId = null, initialState } = {}) {
    this.roundId = roundId;

    this.initialState =
      initialState ?? RoundLifecycleStates.CREATED;

    this.state = this.initialState;

    this.history = [
      this.createHistoryEntry({
        from: null,
        to: this.initialState,
        reason: "ROUND_LIFECYCLE_CREATED",
      }),
    ];
  }

  getState() {
    return this.state;
  }

  getHistory() {
    return [...this.history];
  }

  is(state) {
    return this.state === state;
  }

  isFinished() {
    return this.is(RoundLifecycleStates.FINISHED);
  }

  isCancelled() {
    return this.is(RoundLifecycleStates.CANCELLED);
  }

  isTerminal() {
    return this.isFinished() || this.isCancelled();
  }

  canTransitionTo(nextState) {
    const allowedStates = ALLOWED_TRANSITIONS[this.state] ?? [];

    return allowedStates.includes(nextState);
  }

  transitionTo(nextState, metadata = {}) {
    this.validateKnownState(nextState);

    if (this.state === nextState) {
      throw new RoundLifecycleError(
        `La ronda ya se encuentra en el estado ${nextState}.`,
        {
          code: "ROUND_STATE_ALREADY_ACTIVE",
          currentState: this.state,
          requestedState: nextState,
        }
      );
    }

    if (this.isTerminal()) {
      throw new RoundLifecycleError(
        `No se puede modificar una ronda terminada en estado ${this.state}.`,
        {
          code: "ROUND_TERMINAL_STATE",
          currentState: this.state,
          requestedState: nextState,
        }
      );
    }

    if (!this.canTransitionTo(nextState)) {
      throw new RoundLifecycleError(
        `Transición de ronda inválida: ${this.state} → ${nextState}.`,
        {
          code: "INVALID_ROUND_TRANSITION",
          currentState: this.state,
          requestedState: nextState,
        }
      );
    }

    const previousState = this.state;

    this.state = nextState;

    this.history.push(
      this.createHistoryEntry({
        from: previousState,
        to: nextState,
        reason: metadata.reason ?? null,
        metadata,
      })
    );

    return this.state;
  }

  waitForBets(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.WAITING_BETS,
      metadata
    );
  }

  markReadyToRoll(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.READY_TO_ROLL,
      metadata
    );
  }

  startRolling(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.ROLLING,
      metadata
    );
  }

  startResolving(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.RESOLVING,
      metadata
    );
  }

  startFunding(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.FUNDING,
      metadata
    );
  }

  startPayment(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.PAYMENT,
      metadata
    );
  }

  finish(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.FINISHED,
      metadata
    );
  }

  cancel(metadata = {}) {
    return this.transitionTo(
      RoundLifecycleStates.CANCELLED,
      metadata
    );
  }

  reset({ roundId = this.roundId } = {}) {
    this.roundId = roundId;
    this.state = RoundLifecycleStates.CREATED;

    this.history = [
      this.createHistoryEntry({
        from: null,
        to: RoundLifecycleStates.CREATED,
        reason: "ROUND_LIFECYCLE_RESET",
      }),
    ];

    return this.state;
  }

  getSnapshot() {
    return {
      roundId: this.roundId,
      state: this.state,
      isFinished: this.isFinished(),
      isCancelled: this.isCancelled(),
      isTerminal: this.isTerminal(),
      history: this.getHistory(),
    };
  }

  validateKnownState(state) {
    const validStates = Object.values(RoundLifecycleStates);

    if (!validStates.includes(state)) {
      throw new RoundLifecycleError(
        `Estado de ronda desconocido: ${state}.`,
        {
          code: "UNKNOWN_ROUND_STATE",
          currentState: this.state,
          requestedState: state,
        }
      );
    }
  }

  createHistoryEntry({
    from,
    to,
    reason = null,
    metadata = {},
  }) {
    return {
      from,
      to,
      reason,
      metadata: { ...metadata },
      timestamp: new Date().toISOString(),
    };
  }
}

export default RoundLifecycle;