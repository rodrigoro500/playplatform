import PaseInstantBetPool from "./PaseInstantBetPool";
import PaseInstantBetBalancer from "./PaseInstantBetBalancer";

class PaseInstantBetPoolManager {
  constructor() {
    this.pool =
      new PaseInstantBetPool();

    this.balancer =
      new PaseInstantBetBalancer();
  }

  getBetById(id) {
  return this
    .getPool()
    .getBetById(id);
}

calculatePayouts() {
  return this
    .getPool()
    .calculatePayouts();
}

resetPool() {
  this.getPool().reset();

  return this.getPool();
}

settlePool() {
  return this
    .getPool()
    .settle();
}

getRemainingPoolAmount() {
  return this
    .getPool()
    .getRemainingPoolAmount();
}

getTotalPayout() {
  return this
    .getPool()
    .getTotalPayout();
}

getTotalWinningAmount() {
  return this
    .getPool()
    .getTotalWinningAmount();
}

  getMatchedAmount() {
  return this
    .getPool()
    .getMatchedAmount();
}

getWinningBets() {
  return this
    .getPool()
    .getWinningBets();
}

  getPool() {
    return this.pool;
  }

  getBalancer() {
    return this.balancer;
  }

  openPool() {
    this
      .getPool()
      .clear();

    return this.getPoolState();
  }

  registerBet(
    playerId,
    selection,
    amount
  ) {
    return this
      .getPool()
      .registerBet(
        playerId,
        selection,
        amount
      );
  }

  closePool() {
    this
      .getPool()
      .close();

    return this.balancePool();
  }

  balancePool() {
  const result =
    this
      .getBalancer()
      .balance(
        this
          .getPool()
          .getBets()
      );

  result.refunds.forEach(
    (refund) => {
      this
        .getPool()
        .updateBetAmount(
          refund.bet,
          refund.acceptedAmount
        );
    }
  );

  this
    .getPool()
    .removeEmptyBets();

  return result;
}

  getPoolState() {
    return this
      .getPool()
      .toJSON();
  }

  getTotalAmount() {
    return this
      .getPool()
      .getTotalAmount();
  }

  getBetsBySelection(
    selection
  ) {
    return this
      .getPool()
      .getBetsBySelection(
        selection
      );
  }

  setResult(result) {
    this
      .getPool()
      .setResult(result);

    return this.getPoolState();
  }

  markAsSettled() {
    this
      .getPool()
      .markAsSettled();

    return this.getPoolState();
  }

  isOpen() {
    return this
      .getPool()
      .isOpen();
  }

  isSettled() {
    return this
      .getPool()
      .isSettled();
  }

  resetPool() {
    this
      .getPool()
      .clear();

    return this.getPoolState();
  }
}

export default PaseInstantBetPoolManager;