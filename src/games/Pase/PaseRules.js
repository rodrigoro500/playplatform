class PaseRules {
  static INITIAL_SUERTE_TOTALS = Object.freeze([7, 11]);

  static INITIAL_MALA_TOTALS = Object.freeze([2, 3, 12]);

  static POINT_TOTALS = Object.freeze([
    4,
    5,
    6,
    8,
    9,
    10,
  ]);

  validateDice(dice) {
    if (!Array.isArray(dice) || dice.length !== 2) {
      throw new Error(
        "PaseRules necesita exactamente dos dados."
      );
    }

    const areValid = dice.every(
      (die) =>
        Number.isInteger(die) &&
        die >= 1 &&
        die <= 6
    );

    if (!areValid) {
      throw new Error(
        "Los dados deben contener valores enteros entre 1 y 6."
      );
    }

    return true;
  }

  calculateTotal(dice) {
    this.validateDice(dice);

    return dice[0] + dice[1];
  }

  isInitialSuerteWin(total) {
    return PaseRules.INITIAL_SUERTE_TOTALS.includes(
      total
    );
  }

  isInitialMalaWin(total) {
    return PaseRules.INITIAL_MALA_TOTALS.includes(
      total
    );
  }

  establishesPoint(total) {
    return PaseRules.POINT_TOTALS.includes(total);
  }

  isPointWin(total, point) {
    return total === point;
  }

  isSevenOut(total) {
    return total === 7;
  }
}

export default PaseRules;