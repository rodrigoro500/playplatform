class RoundLifecycleError extends Error {
  constructor(message, details = {}) {
    super(message);

    this.name = "RoundLifecycleError";
    this.code = details.code ?? "ROUND_LIFECYCLE_ERROR";
    this.currentState = details.currentState ?? null;
    this.requestedState = details.requestedState ?? null;
  }
}

export default RoundLifecycleError;