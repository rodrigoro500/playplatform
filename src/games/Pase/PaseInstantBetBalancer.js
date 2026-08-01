class PaseInstantBetBalancer {
  balance(bets) {
    const suerteBets = bets.filter(
      (bet) => bet.selection === "SUERTE"
    );

    const malaBets = bets.filter(
      (bet) => bet.selection === "MALA"
    );

    const totalSuerte = this.getTotal(
      suerteBets
    );

    const totalMala = this.getTotal(
      malaBets
    );

    const matchedAmount = Math.min(
      totalSuerte,
      totalMala
    );

    return {
  totalSuerte,
  totalMala,
  matchedAmount,
  refunds: [
        ...this.calculateRefunds(
          suerteBets,
          totalSuerte - matchedAmount
        ),
        ...this.calculateRefunds(
          malaBets,
          totalMala - matchedAmount
        ),
      ],
    };
  }

  getTotal(bets) {
    return bets.reduce(
      (total, bet) =>
        total + bet.amount,
      0
    );
  }

  calculateRefunds(
  bets,
  excess
) {
  if (excess <= 0) {
    return [];
  }

  const refunds = [];

  let remaining = excess;

  const ordered = [...bets].reverse();

  for (const bet of ordered) {
    if (remaining <= 0) {
      break;
    }

    const refund = Math.min(
      bet.amount,
      remaining
    );

    refunds.push({
      bet,
      betId: bet.id,
      playerId: bet.playerId,
      refundAmount: refund,
      acceptedAmount:
        bet.amount - refund,
    });

    remaining -= refund;
  }

  return refunds;
}
}

export default PaseInstantBetBalancer;