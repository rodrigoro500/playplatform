import BetResult from "./BetResult";
import BetStatus from "./BetStatus";

class BetResolver {
  resolve(bet, outcome) {
    if (!bet) {
      throw new Error(
        "La apuesta es obligatoria."
      );
    }

    const won =
      bet.getType() === outcome;

    if (won) {
      bet.win();
    } else {
      bet.lose();
    }

    return new BetResult({
      betId: bet.getId(),
      playerId: bet.getPlayerId(),
      status: won
        ? BetStatus.WON
        : BetStatus.LOST,
      payout: won
        ? bet.getAmount() * 2
        : 0,
      profit: won
        ? bet.getAmount()
        : -bet.getAmount(),
      data: {
        outcome,
      },
    });
  }
}

export default BetResolver;