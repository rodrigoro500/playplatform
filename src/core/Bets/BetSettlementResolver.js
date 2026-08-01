import BetSettlement from "./BetSettlement";
import BetResolver from "./BetResolver";

class BetSettlementResolver {
  constructor() {
    this.resolver = new BetResolver();
  }

  resolve(bets, outcome) {
    const settlement = new BetSettlement();

    bets.forEach((bet) => {
      settlement.add(
        this.resolver.resolve(
          bet,
          outcome
        )
      );
    });

    return settlement;
  }
}

export default BetSettlementResolver;