import Bet, {
  BET_STATUS,
} from "../Entities/Bet";

class BetValidator {
  createResult() {
    return {
      valid: true,
      errors: [],
    };
  }

  addError(result, message) {
    result.valid = false;
    result.errors.push(message);
  }

  validate(bet) {
    const result = this.createResult();

    if (!(bet instanceof Bet)) {
      this.addError(
        result,
        "La apuesta debe ser una instancia válida de Bet."
      );

      return result;
    }

    const roundResult = this.validateRound(
      bet.getRoundId()
    );

    const playerResult = this.validatePlayer(
      bet.getPlayerId()
    );

    const walletResult = this.validateWallet(
      bet.getWalletId()
    );

    const selectionResult =
      this.validateSelection(
        bet.getSelection()
      );

    const amountResult = this.validateAmount(
      bet.getAmount()
    );

    const statusResult = this.validateStatus(
      bet.getStatus()
    );

    const results = [
      roundResult,
      playerResult,
      walletResult,
      selectionResult,
      amountResult,
      statusResult,
    ];

    results.forEach((validationResult) => {
      if (!validationResult.valid) {
        result.valid = false;
        result.errors.push(
          ...validationResult.errors
        );
      }
    });

    return result;
  }

  validateAmount(amount) {
    const result = this.createResult();

    if (!Number.isFinite(amount)) {
      this.addError(
        result,
        "El monto de la apuesta debe ser un número válido."
      );

      return result;
    }

    if (!Number.isInteger(amount)) {
      this.addError(
        result,
        "El monto de la apuesta debe ser un número entero."
      );
    }

    if (amount <= 0) {
      this.addError(
        result,
        "El monto de la apuesta debe ser mayor que cero."
      );
    }

    return result;
  }

  validateSelection(selection) {
    const result = this.createResult();

    if (
      typeof selection !== "string" ||
      !selection.trim()
    ) {
      this.addError(
        result,
        "La selección de la apuesta es obligatoria."
      );
    }

    return result;
  }

  validatePlayer(playerId) {
    return this.validateId(
      playerId,
      "El ID del jugador es obligatorio."
    );
  }

  validateRound(roundId) {
    return this.validateId(
      roundId,
      "El ID de la ronda es obligatorio."
    );
  }

  validateWallet(walletId) {
    return this.validateId(
      walletId,
      "El ID de la billetera es obligatorio."
    );
  }

  validateStatus(status) {
    const result = this.createResult();

    if (
      typeof status !== "string" ||
      !Object.values(BET_STATUS).includes(
        status
      )
    ) {
      this.addError(
        result,
        "El estado de la apuesta no es válido."
      );
    }

    return result;
  }

  validateInitialStatus(status) {
    const result = this.createResult();

    if (status !== BET_STATUS.CREATED) {
      this.addError(
        result,
        "Una apuesta nueva debe comenzar en estado CREATED."
      );
    }

    return result;
  }

  validateId(id, errorMessage) {
    const result = this.createResult();

    if (
      typeof id !== "string" ||
      !id.trim()
    ) {
      this.addError(result, errorMessage);
    }

    return result;
  }
}

export default BetValidator;