import BaseEntity from "./BaseEntity";

const BET_STATUS = Object.freeze({
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  LOCKED: "LOCKED",
  WON: "WON",
  LOST: "LOST",
  REFUNDED: "REFUNDED",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
});

const ALLOWED_TRANSITIONS = Object.freeze({
  [BET_STATUS.CREATED]: [
    BET_STATUS.CONFIRMED,
    BET_STATUS.CANCELLED,
  ],

  [BET_STATUS.CONFIRMED]: [
    BET_STATUS.LOCKED,
    BET_STATUS.CANCELLED,
  ],

  [BET_STATUS.LOCKED]: [
    BET_STATUS.WON,
    BET_STATUS.LOST,
    BET_STATUS.REFUNDED,
    BET_STATUS.CANCELLED,
  ],

  [BET_STATUS.WON]: [
    BET_STATUS.PAID,
  ],

  [BET_STATUS.LOST]: [],

  [BET_STATUS.REFUNDED]: [],

  [BET_STATUS.PAID]: [],

  [BET_STATUS.CANCELLED]: [],
});

class Bet extends BaseEntity {
  constructor({
    id,
    roundId,
    playerId,
    walletId,
    selection,
    amount,
    metadata = {},
  }) {
    super(id);

    if (!roundId) {
      throw new Error(
        "La apuesta debe pertenecer a una ronda."
      );
    }

    if (!playerId) {
      throw new Error(
        "La apuesta debe pertenecer a un jugador."
      );
    }

    if (!walletId) {
      throw new Error(
        "La apuesta debe estar asociada a una billetera."
      );
    }

    if (
      typeof selection !== "string" ||
      !selection.trim()
    ) {
      throw new Error(
        "La apuesta debe tener una selección válida."
      );
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new Error(
        "El monto de la apuesta debe ser mayor que cero."
      );
    }

    if (!Number.isInteger(amount)) {
      throw new Error(
        "El monto de la apuesta debe ser un número entero."
      );
    }

    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "Los metadatos de la apuesta deben ser un objeto."
      );
    }

    this.roundId = roundId;
    this.playerId = playerId;
    this.walletId = walletId;

    this.selection = selection.trim();
    this.amount = amount;

    this.status = BET_STATUS.CREATED;
    this.resolvedAmount = null;

    this.metadata = { ...metadata };

    this.events = [];
    this.history = [];

    this.confirmedAt = null;
    this.lockedAt = null;
    this.resolvedAt = null;
    this.paidAt = null;
    this.cancelledAt = null;

    this.registerHistory("BET_CREATED", {
      betId: this.id,
      roundId: this.roundId,
      playerId: this.playerId,
      walletId: this.walletId,
      selection: this.selection,
      amount: this.amount,
    });
  }

  getRoundId() {
    return this.roundId;
  }

  getPlayerId() {
    return this.playerId;
  }

  getWalletId() {
    return this.walletId;
  }

  getSelection() {
    return this.selection;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  getResolvedAmount() {
    return this.resolvedAmount;
  }

  getMetadata() {
    return { ...this.metadata };
  }

  getEvents() {
    return [...this.events];
  }

  getHistory() {
    return [...this.history];
  }

  isCreated() {
    return this.status === BET_STATUS.CREATED;
  }

  isConfirmed() {
    return this.status === BET_STATUS.CONFIRMED;
  }

  isLocked() {
    return this.status === BET_STATUS.LOCKED;
  }

  isWon() {
    return this.status === BET_STATUS.WON;
  }

  isLost() {
    return this.status === BET_STATUS.LOST;
  }

  isRefunded() {
    return this.status === BET_STATUS.REFUNDED;
  }

  isPaid() {
    return this.status === BET_STATUS.PAID;
  }

  isCancelled() {
    return this.status === BET_STATUS.CANCELLED;
  }

  isResolved() {
    return [
      BET_STATUS.WON,
      BET_STATUS.LOST,
      BET_STATUS.REFUNDED,
      BET_STATUS.PAID,
    ].includes(this.status);
  }

  canTransition(nextStatus) {
    const allowedStatuses =
      ALLOWED_TRANSITIONS[this.status] ?? [];

    return allowedStatuses.includes(nextStatus);
  }

  transitionTo(nextStatus) {
    if (
      !Object.values(BET_STATUS).includes(nextStatus)
    ) {
      throw new Error(
        `El estado "${nextStatus}" no es válido para una apuesta.`
      );
    }

    if (!this.canTransition(nextStatus)) {
      throw new Error(
        `No se puede cambiar la apuesta de "${this.status}" a "${nextStatus}".`
      );
    }

    const previousStatus = this.status;

    this.status = nextStatus;
    this.updateTimestamp();

    this.registerHistory("BET_STATUS_CHANGED", {
      previousStatus,
      nextStatus,
    });

    return this.status;
  }

  confirm() {
    this.transitionTo(BET_STATUS.CONFIRMED);

    this.confirmedAt = new Date().toISOString();
    this.updateTimestamp();

    this.registerHistory("BET_CONFIRMED", {
      confirmedAt: this.confirmedAt,
    });

    return this.status;
  }

  lock() {
    this.transitionTo(BET_STATUS.LOCKED);

    this.lockedAt = new Date().toISOString();
    this.updateTimestamp();

    this.registerHistory("BET_LOCKED", {
      lockedAt: this.lockedAt,
    });

    return this.status;
  }

  win(resolvedAmount) {
    this.validateResolvedAmount(
      resolvedAmount,
      "ganada"
    );

    if (resolvedAmount <= 0) {
      throw new Error(
        "Una apuesta ganada debe tener un monto resuelto mayor que cero."
      );
    }

    this.transitionTo(BET_STATUS.WON);

    this.resolvedAmount = resolvedAmount;
    this.resolvedAt = new Date().toISOString();

    this.updateTimestamp();

    this.registerHistory("BET_WON", {
      resolvedAmount: this.resolvedAmount,
      resolvedAt: this.resolvedAt,
    });

    return this.status;
  }

  lose() {
    this.transitionTo(BET_STATUS.LOST);

    this.resolvedAmount = 0;
    this.resolvedAt = new Date().toISOString();

    this.updateTimestamp();

    this.registerHistory("BET_LOST", {
      resolvedAmount: this.resolvedAmount,
      resolvedAt: this.resolvedAt,
    });

    return this.status;
  }

  refund(
    resolvedAmount = this.amount
  ) {
    this.validateResolvedAmount(
      resolvedAmount,
      "reembolsada"
    );

    this.transitionTo(BET_STATUS.REFUNDED);

    this.resolvedAmount = resolvedAmount;
    this.resolvedAt = new Date().toISOString();

    this.updateTimestamp();

    this.registerHistory("BET_REFUNDED", {
      resolvedAmount: this.resolvedAmount,
      resolvedAt: this.resolvedAt,
    });

    return this.status;
  }

  pay() {
    if (!this.isWon()) {
      throw new Error(
        "Solo una apuesta ganada puede marcarse como pagada."
      );
    }

    if (
      this.resolvedAmount === null ||
      this.resolvedAmount <= 0
    ) {
      throw new Error(
        "No se puede pagar una apuesta sin un monto resuelto válido."
      );
    }

    this.transitionTo(BET_STATUS.PAID);

    this.paidAt = new Date().toISOString();
    this.updateTimestamp();

    this.registerHistory("BET_PAID", {
      resolvedAmount: this.resolvedAmount,
      paidAt: this.paidAt,
    });

    return this.status;
  }

  cancel(reason = "Sin motivo especificado") {
    if (
      typeof reason !== "string" ||
      !reason.trim()
    ) {
      throw new Error(
        "El motivo de cancelación debe ser válido."
      );
    }

    this.transitionTo(BET_STATUS.CANCELLED);

    this.cancelledAt = new Date().toISOString();
    this.updateTimestamp();

    this.registerHistory("BET_CANCELLED", {
      reason: reason.trim(),
      cancelledAt: this.cancelledAt,
    });

    return this.status;
  }

  setMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "Los metadatos deben ser un objeto válido."
      );
    }

    this.metadata = {
      ...this.metadata,
      ...metadata,
    };

    this.updateTimestamp();

    this.registerHistory("BET_METADATA_UPDATED", {
      metadata: { ...this.metadata },
    });

    return this.getMetadata();
  }

  validateResolvedAmount(
    resolvedAmount,
    operation
  ) {
    if (
      !Number.isFinite(resolvedAmount) ||
      resolvedAmount < 0
    ) {
      throw new Error(
        `El monto resuelto de una apuesta ${operation} debe ser un número mayor o igual a cero.`
      );
    }

    if (!Number.isInteger(resolvedAmount)) {
      throw new Error(
        "El monto resuelto debe ser un número entero."
      );
    }
  }

  registerEvent(type, payload = {}) {
    if (
      typeof type !== "string" ||
      !type.trim()
    ) {
      throw new Error(
        "El evento debe tener un tipo válido."
      );
    }

    const event = {
      id:
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,
      type: type.trim(),
      payload,
      betId: this.id,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);
    this.updateTimestamp();

    return event;
  }

  registerHistory(type, payload = {}) {
    if (
      typeof type !== "string" ||
      !type.trim()
    ) {
      throw new Error(
        "El historial debe tener un tipo válido."
      );
    }

    const entry = {
      type: type.trim(),
      payload,
      status: this.status,
      timestamp: new Date().toISOString(),
    };

    this.history.push(entry);

    return entry;
  }

  clone() {
    const copy = new Bet({
      id: this.id,
      roundId: this.roundId,
      playerId: this.playerId,
      walletId: this.walletId,
      selection: this.selection,
      amount: this.amount,
      metadata: { ...this.metadata },
    });

    copy.status = this.status;
    copy.resolvedAmount = this.resolvedAmount;

    copy.events = this.events.map((event) => ({
      ...event,
      payload:
        event.payload &&
        typeof event.payload === "object"
          ? structuredClone(event.payload)
          : event.payload,
    }));

    copy.history = this.history.map((entry) => ({
      ...entry,
      payload:
        entry.payload &&
        typeof entry.payload === "object"
          ? structuredClone(entry.payload)
          : entry.payload,
    }));

    copy.confirmedAt = this.confirmedAt;
    copy.lockedAt = this.lockedAt;
    copy.resolvedAt = this.resolvedAt;
    copy.paidAt = this.paidAt;
    copy.cancelledAt = this.cancelledAt;

    copy.createdAt = this.createdAt;
    copy.updatedAt = this.updatedAt;

    return copy;
  }

  toJSON() {
    return {
      ...super.toJSON(),

      roundId: this.roundId,
      playerId: this.playerId,
      walletId: this.walletId,

      selection: this.selection,
      amount: this.amount,

      status: this.status,
      resolvedAmount: this.resolvedAmount,

      metadata: this.getMetadata(),
      events: this.getEvents(),
      history: this.getHistory(),

      confirmedAt: this.confirmedAt,
      lockedAt: this.lockedAt,
      resolvedAt: this.resolvedAt,
      paidAt: this.paidAt,
      cancelledAt: this.cancelledAt,
    };
  }
}

export {
  BET_STATUS,
  ALLOWED_TRANSITIONS,
};

export default Bet;