class PaseDiceEngine {
  rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  rollDice() {
    const die1 = this.rollDie();
    const die2 = this.rollDie();

    const total = die1 + die2;

    return {
      dice: [die1, die2],
      total,
    };
  }
}

export default PaseDiceEngine;