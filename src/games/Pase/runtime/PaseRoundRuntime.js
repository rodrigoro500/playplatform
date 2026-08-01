class PaseRoundRuntime {
  constructor({
    manager = null,
    playFlow = null,
    paseEngine = null,
    table = null,
    turnManager = null,
    diceEngine = null,
    resolver = null,
    settlementResolver = null,
  } = {}) {
    this.manager = manager;
    this.playFlow = playFlow;
    this.paseEngine = paseEngine;
    this.table = table;
    this.turnManager = turnManager;
    this.diceEngine = diceEngine;
    this.resolver = resolver;
    this.settlementResolver = settlementResolver;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  setPlayFlow(playFlow) {
    this.playFlow = playFlow;

    return this;
  }

  setPaseEngine(engine) {
    this.paseEngine = engine;

    return this;
  }

  setTable(table) {
    this.table = table;

    return this;
  }

  setTurnManager(turnManager) {
    this.turnManager = turnManager;

    return this;
  }

  setDiceEngine(diceEngine) {
    this.diceEngine = diceEngine;

    return this;
  }

  setResolver(resolver) {
    this.resolver = resolver;

    return this;
  }

  setSettlementResolver(settlementResolver) {
    this.settlementResolver = settlementResolver;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "PaseRoundRuntime requiere manager."
      );
    }

    if (!this.playFlow) {
      throw new Error(
        "PaseRoundRuntime requiere playFlow."
      );
    }

    if (!this.paseEngine) {
      throw new Error(
        "PaseRoundRuntime requiere paseEngine."
      );
    }

    if (!this.table) {
      throw new Error(
        "PaseRoundRuntime requiere table."
      );
    }

    if (!this.turnManager) {
      throw new Error(
        "PaseRoundRuntime requiere turnManager."
      );
    }

    if (!this.diceEngine) {
      throw new Error(
        "PaseRoundRuntime requiere diceEngine."
      );
    }

    if (!this.resolver) {
      throw new Error(
        "PaseRoundRuntime requiere resolver."
      );
    }

    if (!this.settlementResolver) {
      throw new Error(
        "PaseRoundRuntime requiere settlementResolver."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  startRound() {
    return this.playFlow.start();
  }

  rollDice() {
    return this.diceEngine.rollDice();
  }

  resolve(result) {
    return this.resolver.resolve(result);
  }

  settle(result) {
    return this.settlementResolver.resolve(result);
  }

  finishRound() {
    return this.playFlow.finish();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      players: this.table.getPlayers().length,
    };
  }

  reset() {
    this.manager = null;
    this.playFlow = null;
    this.paseEngine = null;
    this.table = null;
    this.turnManager = null;
    this.diceEngine = null;
    this.resolver = null;
    this.settlementResolver = null;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      hasTable: this.table !== null,
      hasDiceEngine: this.diceEngine !== null,
      hasResolver: this.resolver !== null,
      hasSettlementResolver: this.settlementResolver !== null,
    };
  }
}

export default PaseRoundRuntime;
