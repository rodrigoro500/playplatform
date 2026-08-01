class PaseSettlementResolver {
  constructor({
    commissionRate = 0.1,
  } = {}) {
    this.commissionRate = commissionRate;
  }

  getCommissionRate() {
    return this.commissionRate;
  }

  setCommissionRate(rate) {
    if (rate < 0 || rate > 1) {
      throw new Error(
        "La comisión debe estar entre 0 y 1."
      );
    }

    this.commissionRate = rate;
  }

  resolveFirstVictory({
    winner,
    potAmount,
  }) {
    if (winner === "MALA") {
      return {
        finished: true,
        winner: "MALA",
        requiresFunding: false,
        requiredAmount: 0,
        commission: 0,
        payout: potAmount,
      };
    }

    if (winner === "SUERTE") {
      return {
        finished: false,
        winner: null,
        requiresFunding: true,
        requiredAmount: potAmount,
        commission: 0,
        payout: 0,
      };
    }

    throw new Error(
      "Ganador desconocido."
    );
  }

  resolveFinalVictory({
    winner,
    potAmount,
  }) {
    if (winner === "MALA") {
      return {
        finished: true,
        winner: "MALA",
        requiresFunding: false,
        commission: 0,
        payout: potAmount,
      };
    }

    if (winner === "SUERTE") {
      const commission =
        potAmount * this.commissionRate;

      return {
        finished: true,
        winner: "SUERTE",
        requiresFunding: false,
        commission,
        payout:
          potAmount - commission,
      };
    }

    throw new Error(
      "Ganador desconocido."
    );
  }

  calculateCommission(amount) {
    return amount * this.commissionRate;
  }
}

export default PaseSettlementResolver;