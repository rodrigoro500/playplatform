import BetValidator from "../Validators/BetValidator";
import BetResolver from "../Resolvers/BetResolver";

class RoundEngine {
  constructor() {
    this.betValidator = new BetValidator();
    this.betResolver = new BetResolver();
  }

  startRound(round) {
    if (!round || typeof round.start !== "function") {
      throw new Error(
        "RoundEngine necesita una instancia válida de Round."
      );
    }

    round.start();

    return round;
  }

  validateBet(bet) {
    return this.betValidator.validate(bet);
  }

  resolveBet({
    bet,
    result,
    resolvedAmount = null,
  }) {
    return this.betResolver.resolve({
      bet,
      result,
      resolvedAmount,
    });
  }

  finishRound(
    round,
    result,
    winnerId = null
  ) {
    if (!round || typeof round.finish !== "function") {
      throw new Error(
        "RoundEngine necesita una instancia válida de Round."
      );
    }

    if (!result) {
      throw new Error(
        "RoundEngine necesita un resultado para finalizar la ronda."
      );
    }

    round.finish(result, winnerId);

    return round;
  }
}

export default RoundEngine;