import PasePotFunding from "./PasePotFunding";
import PaseFundingCalculator from "./PaseFundingCalculator";

class PaseFundingManager {
  constructor() {
    this.potFunding =
      new PasePotFunding();

    this.calculator =
      new PaseFundingCalculator();
  }

  getPotFunding() {
    return this.potFunding;
  }

  getCalculator() {
    return this.calculator;
  }

  calculateFunding(round) {
    return this
      .getCalculator()
      .calculate(round);
  }

  calculateRemainingFunding() {
    const funding =
      this.getPotFunding();

    return this
      .getCalculator()
      .calculateRemaining(
        funding.getRequiredAmount(),
        funding.getFundedAmount()
      );
  }

  startFunding(
    requiredAmount,
    priorityPlayerId = null
  ) {
    const funding =
      this.getPotFunding();

    funding.clear();

    funding.setRequiredAmount(
      requiredAmount
    );

    if (priorityPlayerId) {
      funding.setPriorityPlayer(
        priorityPlayerId
      );
    }

    return funding.toJSON();
  }

  registerContribution(
    playerId,
    amount
  ) {
    const funding =
      this.getPotFunding();

    funding.registerContribution(
      playerId,
      amount
    );

    return funding.toJSON();
  }

  getFundingState() {
    return this
      .getPotFunding()
      .toJSON();
  }

  getContributionByPlayer(
    playerId
  ) {
    return this
      .getPotFunding()
      .getContributionByPlayer(
        playerId
      );
  }

  getContributorCount() {
    return this
      .getPotFunding()
      .getContributorCount();
  }

  getLastContributor() {
    return this
      .getPotFunding()
      .getLastContributor();
  }

  isFundingCompleted() {
    return this
      .getPotFunding()
      .isCompleted();
  }

  getRemainingAmount() {
    return this
      .getPotFunding()
      .getRemainingAmount();
  }

  resetFunding() {
    this
      .getPotFunding()
      .clear();

    return this.getFundingState();
  }
}

export default PaseFundingManager;