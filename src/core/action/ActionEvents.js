class ActionEvents {
  static ACTION_CREATED = "ACTION_CREATED";

  static ACTION_REMOVED = "ACTION_REMOVED";

  static ACTION_STARTED = "ACTION_STARTED";

  static ACTION_PAUSED = "ACTION_PAUSED";

  static ACTION_RESUMED = "ACTION_RESUMED";

  static ACTION_FINISHED = "ACTION_FINISHED";

  static ACTION_CANCELLED = "ACTION_CANCELLED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createActionCreatedEvent(action) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_CREATED,
      {
        action: action.toJSON(),
      }
    );
  }

  static createActionRemovedEvent(actionId) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_REMOVED,
      {
        actionId,
      }
    );
  }

  static createActionStartedEvent(actionId) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_STARTED,
      {
        actionId,
      }
    );
  }

  static createActionPausedEvent(actionId) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_PAUSED,
      {
        actionId,
      }
    );
  }

  static createActionResumedEvent(actionId) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_RESUMED,
      {
        actionId,
      }
    );
  }

  static createActionFinishedEvent(actionId) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_FINISHED,
      {
        actionId,
      }
    );
  }

  static createActionCancelledEvent(actionId) {
    return ActionEvents.createEvent(
      ActionEvents.ACTION_CANCELLED,
      {
        actionId,
      }
    );
  }
}

export default ActionEvents;
