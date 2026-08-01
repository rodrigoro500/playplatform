class PasePotFunding {
  constructor(requiredAmount = 0) {
    this.requiredAmount =
      requiredAmount;

    this.fundedAmount = 0;

    this.remainingAmount =
      requiredAmount;

    this.completed = false;

    this.priorityPlayerId = null;

    this.currentCandidatePlayerId =
      null;

    this.contributions = [];
  }

  setRequiredAmount(amount) {
    if (amount < 0) {
      throw new Error(
        "El monto requerido no puede ser negativo."
      );
    }

    this.requiredAmount = amount;

    this.remainingAmount =
      amount - this.fundedAmount;

    this.updateCompletion();
  }

  getRequiredAmount() {
    return this.requiredAmount;
  }

  getFundedAmount() {
    return this.fundedAmount;
  }

  getRemainingAmount() {
    return this.remainingAmount;
  }

  isCompleted() {
    return this.completed;
  }

  setPriorityPlayer(playerId) {
    this.priorityPlayerId =
      playerId;
  }

  getPriorityPlayer() {
    return this.priorityPlayerId;
  }

  setCurrentCandidate(playerId) {
    this.currentCandidatePlayerId =
      playerId;
  }

  getCurrentCandidate() {
    return this.currentCandidatePlayerId;
  }

  registerContribution(
    playerId,
    amount
  ) {
    if (amount <= 0) {
      throw new Error(
        "El aporte debe ser mayor que cero."
      );
    }

    if (amount > this.remainingAmount) {
      throw new Error(
        "El aporte supera el monto pendiente."
      );
    }

    this.contributions.push({
      playerId,
      amount,
      createdAt: new Date(),
    });

    this.fundedAmount += amount;

    this.remainingAmount =
      this.requiredAmount -
      this.fundedAmount;

    this.priorityPlayerId =
      playerId;

    this.updateCompletion();

    return this.remainingAmount;
  }

  updateCompletion() {
    this.completed =
      this.remainingAmount <= 0;
  }

  getContributions() {
    return [
      ...this.contributions,
    ];
  }

  getContributionByPlayer(
    playerId
  ) {
    return this.contributions
      .filter(
        (contribution) =>
          contribution.playerId ===
          playerId
      )
      .reduce(
        (
          total,
          contribution
        ) =>
          total +
          contribution.amount,
        0
      );
  }

  getContributorCount() {
    const contributorIds =
      new Set(
        this.contributions.map(
          (contribution) =>
            contribution.playerId
        )
      );

    return contributorIds.size;
  }

  getLastContributor() {
    if (
      this.contributions.length === 0
    ) {
      return null;
    }

    return this.contributions[
      this.contributions.length - 1
    ].playerId;
  }

  clear() {
    this.fundedAmount = 0;

    this.remainingAmount =
      this.requiredAmount;

    this.completed = false;

    this.priorityPlayerId = null;

    this.currentCandidatePlayerId =
      null;

    this.contributions = [];
  }

  toJSON() {
    return {
      requiredAmount:
        this.requiredAmount,

      fundedAmount:
        this.fundedAmount,

      remainingAmount:
        this.remainingAmount,

      completed:
        this.completed,

      priorityPlayerId:
        this.priorityPlayerId,

      currentCandidatePlayerId:
        this.currentCandidatePlayerId,

      contributorCount:
        this.getContributorCount(),

      lastContributor:
        this.getLastContributor(),

      contributions:
        this.getContributions(),
    };
  }
}

export default PasePotFunding;