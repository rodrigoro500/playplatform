class PaseRoundFlow {
  constructor(engine) {
    if (!engine) {
      throw new Error(
        "PaseRoundFlow necesita una instancia de PaseEngine."
      );
    }

    this.engine = engine;
  }

  getEngine() {
    return this.engine;
  }

  getCurrentRound() {
    return this.engine.requireActiveRound();
  }

  closeBetting() {
    const round = this.getCurrentRound();

    const state = round.closeBetting();

    return {
      roundId: round.getId?.() ?? round.id,
      state,
      betCount: round.getBets().length,
    };
  }

  startRoll() {
    const round = this.getCurrentRound();

    const state = round.startRolling();

    this.engine
      .getTable()
      .setStatus("ROLLING_DICE");

    return {
      roundId: round.getId?.() ?? round.id,
      shooterId: round.getShooterId(),
      state,
      gameStatus:
        this.engine
          .getTable()
          .getStatus(),
    };
  }

  beginResolution() {
    const round = this.getCurrentRound();

    const state = round.startResolving();

    this.engine
      .getTable()
      .setStatus("RESOLVING");

    return {
      roundId: round.getId?.() ?? round.id,
      state,
      gameStatus:
        this.engine
          .getTable()
          .getStatus(),
    };
  }

  setResult(result, winnerId = null) {
    const round = this.getCurrentRound();

    const savedResult =
      round.setResult(result);

    let savedWinner =
      round.getWinnerId();

    if (winnerId) {
      savedWinner =
        round.setWinner(winnerId);
    }

    return {
      roundId: round.getId?.() ?? round.id,
      result: savedResult,
      winnerId: savedWinner,
      state: round.getState(),
    };
  }

  beginFunding() {
    const round = this.getCurrentRound();

    const state =
      round.startFunding();

    this.engine
      .getTable()
      .setStatus("FUNDING");

    return {
      roundId: round.getId?.() ?? round.id,
      state,
      gameStatus:
        this.engine
          .getTable()
          .getStatus(),
    };
  }

  beginPayment() {
    const round = this.getCurrentRound();

    const state =
      round.startPayment();

    this.engine
      .getTable()
      .setStatus("PAYMENT");

    return {
      roundId: round.getId?.() ?? round.id,
      state,
      gameStatus:
        this.engine
          .getTable()
          .getStatus(),
    };
  }

  completeRound() {
    const round =
      this.getCurrentRound();

    const finishedRound =
      this.engine
        .getRoundEngine()
        .finishRound(
          round,
          round.getResult(),
          round.getWinnerId()
        );

    this.engine
      .getTable()
      .setStatus("ROUND_FINISHED");

    this.engine.setCurrentRound(
      null
    );

    return finishedRound;
  }
}

export default PaseRoundFlow;