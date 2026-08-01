class BetEvents {
  static BET_CREATED = "BET_CREATED";

  static BET_REMOVED = "BET_REMOVED";

  static BET_ACCEPTED = "BET_ACCEPTED";

  static BET_REJECTED = "BET_REJECTED";

  static BET_CANCELLED = "BET_CANCELLED";

  static BET_WON = "BET_WON";

  static BET_LOST = "BET_LOST";

  static BET_PUSH = "BET_PUSH";

  static BET_REFUNDED = "BET_REFUNDED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createBetCreatedEvent(bet) {
    return BetEvents.createEvent(
      BetEvents.BET_CREATED,
      {
        bet: bet.toJSON(),
      }
    );
  }

  static createBetRemovedEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_REMOVED,
      {
        betId,
      }
    );
  }

  static createBetAcceptedEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_ACCEPTED,
      {
        betId,
      }
    );
  }

  static createBetRejectedEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_REJECTED,
      {
        betId,
      }
    );
  }

  static createBetCancelledEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_CANCELLED,
      {
        betId,
      }
    );
  }

  static createBetWonEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_WON,
      {
        betId,
      }
    );
  }

  static createBetLostEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_LOST,
      {
        betId,
      }
    );
  }

  static createBetPushEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_PUSH,
      {
        betId,
      }
    );
  }

  static createBetRefundedEvent(betId) {
    return BetEvents.createEvent(
      BetEvents.BET_REFUNDED,
      {
        betId,
      }
    );
  }
}

export default BetEvents;
