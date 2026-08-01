class TurnEvents {
  static TURN_CREATED = "TURN_CREATED";

  static TURN_REMOVED = "TURN_REMOVED";

  static TURN_STARTED = "TURN_STARTED";

  static TURN_PAUSED = "TURN_PAUSED";

  static TURN_RESUMED = "TURN_RESUMED";

  static TURN_FINISHED = "TURN_FINISHED";

  static TURN_CANCELLED = "TURN_CANCELLED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createTurnCreatedEvent(turn) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_CREATED,
      {
        turn: turn.toJSON(),
      }
    );
  }

  static createTurnRemovedEvent(turnId) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_REMOVED,
      {
        turnId,
      }
    );
  }

  static createTurnStartedEvent(turnId) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_STARTED,
      {
        turnId,
      }
    );
  }

  static createTurnPausedEvent(turnId) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_PAUSED,
      {
        turnId,
      }
    );
  }

  static createTurnResumedEvent(turnId) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_RESUMED,
      {
        turnId,
      }
    );
  }

  static createTurnFinishedEvent(turnId) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_FINISHED,
      {
        turnId,
      }
    );
  }

  static createTurnCancelledEvent(turnId) {
    return TurnEvents.createEvent(
      TurnEvents.TURN_CANCELLED,
      {
        turnId,
      }
    );
  }
}

export default TurnEvents;
