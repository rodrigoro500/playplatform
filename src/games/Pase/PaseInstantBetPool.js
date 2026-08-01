class PaseInstantBetPool {
  constructor() {
    this.bets = [];

    this.totalAmount = 0;

    this.status = "OPEN";

    this.result = null;

    this.settled = false;
  }

  isOpen() {
    return this.status === "OPEN";
  }

  isClosed() {
    return this.status === "CLOSED";
  }

  normalizeSelection(selection) {
    const normalizedSelection =
      String(selection)
        .trim()
        .toUpperCase();

    if (
      normalizedSelection === "KULO"
    ) {
      return "MALA";
    }

    return normalizedSelection;
  }

  validateSelection(selection) {
    const validSelections = [
      "SUERTE",
      "MALA",
    ];

    if (
      !validSelections.includes(
        selection
      )
    ) {
      throw new Error(
        "La selección debe ser SUERTE, MALA o KULO."
      );
    }
  }

  registerBet(
    playerId,
    selection,
    amount
  ) {
    if (!this.isOpen()) {
      throw new Error(
        "Las apuestas rápidas están cerradas."
      );
    }

    if (!playerId) {
      throw new Error(
        "El jugador es obligatorio."
      );
    }

    if (!selection) {
      throw new Error(
        "La selección es obligatoria."
      );
    }

    if (amount <= 0) {
      throw new Error(
        "El monto debe ser mayor que cero."
      );
    }

    const normalizedSelection =
      this.normalizeSelection(
        selection
      );

    this.validateSelection(
      normalizedSelection
    );

    const bet = {
  id: crypto.randomUUID(),

  playerId,

  selection:
    normalizedSelection,

  amount,

  createdAt:
    new Date(),
};

    this.bets.push(bet);

    this.totalAmount += amount;

    return bet;
  }

   updateBetAmount(
  bet,
  amount
) {
  if (amount < 0) {
    throw new Error(
      "El monto no puede ser negativo."
    );
  }

  this.totalAmount -= bet.amount;

  bet.amount = amount;

  this.totalAmount += amount;

  return bet;
}

removeEmptyBets() {
  this.bets =
    this.bets.filter(
      (bet) =>
        bet.amount > 0
    );

  return this.getBets();
}
  close() {
    this.status = "CLOSED";

    return this.toJSON();
  }

  getBets() {
    return [
      ...this.bets,
    ];
  }

  getTotalAmount() {
    return this.totalAmount;
  }

  getBetsBySelection(
    selection
  ) {
    const normalizedSelection =
      this.normalizeSelection(
        selection
      );

    this.validateSelection(
      normalizedSelection
    );

    return this.bets.filter(
      (bet) =>
        bet.selection ===
        normalizedSelection
    );
  }

  setResult(result) {
    const normalizedResult =
      this.normalizeSelection(
        result
      );

    this.validateSelection(
      normalizedResult
    );

    this.result =
      normalizedResult;

    return this.result;
  }

  getResult() {
    return this.result;
  }

  markAsSettled() {
    this.settled = true;
  }

  isSettled() {
    return this.settled;
  }

  clear() {
    this.bets = [];

    this.totalAmount = 0;

    this.status = "OPEN";

    this.result = null;

    this.settled = false;
  }
   
   getBetById(id) {
  return this.bets.find(
    (bet) => bet.id === id
  );
}

   getMatchedAmount() {
  return Math.min(
    this.getBetsBySelection(
      "SUERTE"
    ).reduce(
      (total, bet) =>
        total + bet.amount,
      0
    ),
    this.getBetsBySelection(
      "MALA"
    ).reduce(
      (total, bet) =>
        total + bet.amount,
      0
    )
  );
}

getWinningBets() {
  if (!this.result) {
    return [];
  }

  return this.getBetsBySelection(
    this.result
  );
}

getTotalWinningAmount() {
  return this.getWinningBets().reduce(
    (total, bet) =>
      total + bet.amount,
    0
  );
}

calculatePayouts() {
  const winners =
    this.getWinningBets();

  return winners.map((bet) => ({
    betId: bet.id,
    playerId: bet.playerId,
    selection: bet.selection,
    amount: bet.amount,
    payout: bet.amount * 2,
    profit: bet.amount,
  }));
}

getTotalPayout() {
  return this.calculatePayouts().reduce(
    (total, payout) =>
      total + payout.payout,
    0
  );
}

getRemainingPoolAmount() {
  return (
    this.totalAmount -
    this.getTotalPayout()
  );
}

settle() {
  if (this.settled) {
    throw new Error(
      "El pozo ya fue liquidado."
    );
  }

  const payouts =
    this.calculatePayouts();

  this.settled = true;

  return {
    result: this.result,
    payouts,
    totalPayout:
      this.getTotalPayout(),
    remainingAmount:
      this.getRemainingPoolAmount(),
    settled:
      this.settled,
  };
}

reset() {
  this.bets = [];

  this.totalAmount = 0;

  this.totalSuerte = 0;

  this.totalMala = 0;

  this.result = null;

  this.status = "CLOSED";

  this.settled = false;
}
  
  toJSON() {
  return {
    bets: this.getBets(),

    totalAmount:
      this.getTotalAmount(),

    totalSuerte:
      this.getBetsBySelection(
        "SUERTE"
      ).reduce(
        (total, bet) =>
          total + bet.amount,
        0
      ),

    totalMala:
      this.getBetsBySelection(
        "MALA"
      ).reduce(
        (total, bet) =>
          total + bet.amount,
        0
      ),

    matchedAmount:
      this.getMatchedAmount(),

    status: this.status,

    result: this.result,

    settled: this.settled,
  };
}
}

export default PaseInstantBetPool;