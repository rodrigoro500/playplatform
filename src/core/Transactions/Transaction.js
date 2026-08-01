import BaseEntity from "../Entities/BaseEntity";

class Transaction extends BaseEntity {
  constructor({
    id,
    walletId,
    playerId,
    type,
    amount,
    description = "",
  }) {
    super(id);

    // Validaciones...

    this.walletId = walletId;
    this.playerId = playerId;
    this.type = type;
    this.amount = amount;
    this.description = description;

    this.status = TRANSACTION_STATUS.PENDING;
  }

  // Métodos del dominio...

  clone() {
    const copy = new Transaction({
      id: this.id,
      walletId: this.walletId,
      playerId: this.playerId,
      type: this.type,
      amount: this.amount,
      description: this.description,
    });

    copy.status = this.status;
    copy.createdAt = this.createdAt;
    copy.updatedAt = this.updatedAt;

    return copy;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      walletId: this.walletId,
      playerId: this.playerId,
      type: this.type,
      amount: this.amount,
      description: this.description,
      status: this.status,
    };
  }
}