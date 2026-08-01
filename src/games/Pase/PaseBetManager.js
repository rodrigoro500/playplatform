import BetValidator from "../../core/Validators/BetValidator";
import {
  Bet,
  BetFactory,
  BetResolver,
  BetSettlementResolver,
} from "../../core/Bets";

class PaseBetManager {
  constructor(engine) {
    if (!engine) {
      throw new Error(
        "PaseBetManager necesita una instancia de PaseEngine."
      );
    }

    this.engine = engine;
    this.validator = new BetValidator();
    this.resolver = new BetResolver();
    this.settlementResolver =
      new BetSettlementResolver();
  }

  getRound() {
    return this.engine.requireActiveRound();
  }

  placeBet(betData) {
    const round = this.getRound();

    if (round.getState() !== "WAITING_BETS") {
      throw new Error(
        "Las apuestas están cerradas."
      );
    }

    const data =
      betData instanceof Bet
        ? betData.toJSON()
        : betData;

    this.validator.validate(data);

    const bet =
      betData instanceof Bet
        ? betData
        : BetFactory.create(betData);

    round.addBet(bet);

    return bet;
  }

  resolveBet(bet, outcome) {
    return this.resolver.resolve(
      bet,
      outcome
    );
  }

  settleBets(outcome) {
    return this.settlementResolver.resolve(
      this.getBets(),
      outcome
    );
  }

  removeBet(betId) {
    return this.getRound().removeBet(betId);
  }

  clearBets() {
    this.getRound().clearBets();

    return true;
  }

  getBets() {
    return this.getRound().getBets();
  }

  getBetCount() {
    return this.getBets().length;
  }

  hasBets() {
    return this.getBetCount() > 0;
  }
}

export default PaseBetManager;