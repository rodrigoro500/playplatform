class RoundEvents {
  static ROUND_CREATED = "ROUND_CREATED";

  static ROUND_REMOVED = "ROUND_REMOVED";

  static ROUND_STARTED = "ROUND_STARTED";

  static ROUND_PAUSED = "ROUND_PAUSED";

  static ROUND_RESUMED = "ROUND_RESUMED";

  static ROUND_FINISHED = "ROUND_FINISHED";

  static ROUND_CANCELLED = "ROUND_CANCELLED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createRoundCreatedEvent(round) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_CREATED,
      {
        round: round.toJSON(),
      }
    );
  }

  static createRoundRemovedEvent(roundId) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_REMOVED,
      {
        roundId,
      }
    );
  }

  static createRoundStartedEvent(roundId) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_STARTED,
      {
        roundId,
      }
    );
  }

  static createRoundPausedEvent(roundId) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_PAUSED,
      {
        roundId,
      }
    );
  }

  static createRoundResumedEvent(roundId) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_RESUMED,
      {
        roundId,
      }
    );
  }

  static createRoundFinishedEvent(roundId) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_FINISHED,
      {
        roundId,
      }
    );
  }

  static createRoundCancelledEvent(roundId) {
    return RoundEvents.createEvent(
      RoundEvents.ROUND_CANCELLED,
      {
        roundId,
      }
    );
  }
}

export default RoundEvents;
