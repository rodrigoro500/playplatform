class PaseMatchRuntime {
  constructor({
    manager = null,
    roundRuntime = null,
  } = {}) {
    this.manager = manager;
    this.roundRuntime = roundRuntime;
    this.currentRound = 0;
    this.running = false;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setRoundRuntime(roundRuntime) {
    this.roundRuntime = roundRuntime;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseMatchRuntime requiere manager."
      );
    }

    if (!this.roundRuntime) {
      throw new Error(
        "PaseMatchRuntime requiere roundRuntime."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  startMatch() {
    if (!this.initialized) {
      throw new Error(
        "PaseMatchRuntime debe estar inicializado."
      );
    }

    this.running = true;
    this.currentRound = 1;
    this.roundRuntime.startRound();

    return true;
  }

  playRound() {
    const result =
      this.roundRuntime.rollDice();

    this.roundRuntime.resolve(result);
    this.roundRuntime.settle(result);
    this.roundRuntime.finishRound();

    return result;
  }

  finishMatch() {
    this.running = false;
    this.roundRuntime.finishRound();

    return true;
  }

  isRunning() {
    return this.running;
  }

  getCurrentRound() {
    return this.currentRound;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      running: this.running,
      currentRound: this.currentRound,
    };
  }

  reset() {
    this.manager = null;
    this.roundRuntime = null;
    this.currentRound = 0;
    this.running = false;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      running: this.running,
      currentRound: this.currentRound,
      hasRoundRuntime: this.roundRuntime !== null,
    };
  }
}

export default PaseMatchRuntime;
