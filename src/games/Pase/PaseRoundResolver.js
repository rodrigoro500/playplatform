class PaseRoundResolver {
  constructor(engine) {
    if (!engine) {
      throw new Error(
        "PaseRoundResolver necesita una instancia de PaseEngine."
      );
    }

    this.engine = engine;
  }

  resolve() {
    const round = this.engine.requireActiveRound();

    const result = round.getResult();

    if (!result) {
      throw new Error(
        "La ronda todavía no tiene un resultado."
      );
    }

    const resolution = result.resolution;

    if (!resolution) {
      throw new Error(
        "El resultado todavía no posee una resolución oficial."
      );
    }

    if (!resolution.finished) {
      return {
        round,
        result,
        resolution,
        outcome: null,
        settlement: null,
      };
    }

    const outcome =
      resolution.winner === "SUERTE"
        ? "PASE"
        : "NO_PASE";

    const settlement =
      this.engine.settleBets(outcome);

    return {
      round,
      result,
      resolution,
      outcome,
      settlement,
    };
  }
}

export default PaseRoundResolver;