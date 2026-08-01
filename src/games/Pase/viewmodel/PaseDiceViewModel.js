class PaseDiceViewModel {
  constructor({
    manager = null,
    diceEngine = null,
  } = {}) {
    this.manager = manager;
    this.diceEngine = diceEngine;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setDiceEngine(diceEngine) {
    this.diceEngine = diceEngine;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseDiceViewModel requiere manager."
      );
    }

    if (!this.diceEngine) {
      throw new Error(
        "PaseDiceViewModel requiere diceEngine."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  getDice() {
    return this.diceEngine.getDice().map((die) => ({
      index: die.index ?? null,
      value: die.value ?? null,
    }));
  }

  getDie(index) {
    return this.getDice().find((die) => die.index === index) || null;
  }

  getTotal() {
    return this.diceEngine.getTotal();
  }

  getOutcome() {
    return this.diceEngine.getOutcome();
  }

  hasResult() {
    return this.getDice().length > 0;
  }

  refresh() {
    return this.getDice();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      hasResult: this.hasResult(),
      total: this.getTotal(),
    };
  }

  reset() {
    this.manager = null;
    this.diceEngine = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasDiceEngine: this.diceEngine !== null,
    };
  }
}

export default PaseDiceViewModel;
