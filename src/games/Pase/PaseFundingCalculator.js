class PaseFundingCalculator {
  calculate(round) {
    if (!round) {
      throw new Error(
        "La ronda es obligatoria."
      );
    }

    const bets =
      round.getBets();

    let totalPot = 0;

    for (const bet of bets) {
      totalPot += bet.amount;
    }

    return {
      totalPot,
      requiredFunding:
        totalPot,
    };
  }

  calculateRemaining(
    requiredFunding,
    fundedAmount
  ) {
    return Math.max(
      0,
      requiredFunding -
        fundedAmount
    );
  }
}

export default PaseFundingCalculator;