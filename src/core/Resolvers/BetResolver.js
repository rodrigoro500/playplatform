import Bet from "../Entities/Bet";

const BET_RESULT = Object.freeze({
  WIN: "WIN",
  LOSS: "LOSS",
  REFUND: "REFUND",
});

class BetResolver {
  validateBet(bet) {
    if (!(bet instanceof Bet)) {
      throw new Error(
        "La apuesta debe ser una instancia válida de Bet."
      );
    }
  }

  validateResult(result) {
    if (
      typeof result !== "string" ||
      !Object.values(BET_RESULT).includes(result)
    ) {
      throw new Error(
        `El resultado "${result}" no es válido.`
      );
    }
  }

  validateResolvedAmount(resolvedAmount) {
    if (!Number.isFinite(resolvedAmount)) {
      throw new Error(
        "El monto resuelto debe ser un número válido."
      );
    }

    if (!Number.isInteger(resolvedAmount)) {
      throw new Error(
        "El monto resuelto debe ser un número entero."
      );
    }

    if (resolvedAmount < 0) {
      throw new Error(
        "El monto resuelto no puede ser negativo."
      );
    }
  }

  validateLockedBet(bet) {
    if (!bet.isLocked()) {
      throw new Error(
        `Solo se pueden resolver apuestas en estado LOCKED. Estado actual: "${bet.getStatus()}".`
      );
    }
  }

  createResolutionResult({
    bet,
    result,
    previousStatus,
  }) {
    return {
      success: true,
      result,
      betId: bet.getId(),
      playerId: bet.getPlayerId(),
      roundId: bet.getRoundId(),
      previousStatus,
      currentStatus: bet.getStatus(),
      amount: bet.getAmount(),
      resolvedAmount: bet.getResolvedAmount(),
      resolvedAt: bet.toJSON().resolvedAt,
      bet,
    };
  }

  resolve({
    bet,
    result,
    resolvedAmount = null,
  }) {
    this.validateBet(bet);
    this.validateResult(result);
    this.validateLockedBet(bet);

    switch (result) {
      case BET_RESULT.WIN:
        return this.resolveWin(
          bet,
          resolvedAmount
        );

      case BET_RESULT.LOSS:
        return this.resolveLoss(bet);

      case BET_RESULT.REFUND:
        return this.resolveRefund(
          bet,
          resolvedAmount
        );

      default:
        throw new Error(
          `No existe una estrategia para resolver "${result}".`
        );
    }
  }

  resolveWin(bet, resolvedAmount) {
    this.validateBet(bet);
    this.validateLockedBet(bet);
    this.validateResolvedAmount(
      resolvedAmount
    );

    if (resolvedAmount <= 0) {
      throw new Error(
        "Una apuesta ganadora debe tener un monto resuelto mayor que cero."
      );
    }

    const previousStatus =
      bet.getStatus();

    bet.win(resolvedAmount);

    return this.createResolutionResult({
      bet,
      result: BET_RESULT.WIN,
      previousStatus,
    });
  }

  resolveLoss(bet) {
    this.validateBet(bet);
    this.validateLockedBet(bet);

    const previousStatus =
      bet.getStatus();

    bet.lose();

    return this.createResolutionResult({
      bet,
      result: BET_RESULT.LOSS,
      previousStatus,
    });
  }

  resolveRefund(
    bet,
    resolvedAmount = null
  ) {
    this.validateBet(bet);
    this.validateLockedBet(bet);

    const refundAmount =
      resolvedAmount === null
        ? bet.getAmount()
        : resolvedAmount;

    this.validateResolvedAmount(
      refundAmount
    );

    const previousStatus =
      bet.getStatus();

    bet.refund(refundAmount);

    return this.createResolutionResult({
      bet,
      result: BET_RESULT.REFUND,
      previousStatus,
    });
  }
}

export {
  BET_RESULT,
};

export default BetResolver;