class CommandEvents {
  static COMMAND_CREATED = "COMMAND_CREATED";

  static COMMAND_EXECUTED = "COMMAND_EXECUTED";

  static COMMAND_UNDONE = "COMMAND_UNDONE";

  static COMMAND_FAILED = "COMMAND_FAILED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createCommandCreatedEvent(command) {
    return CommandEvents.createEvent(
      CommandEvents.COMMAND_CREATED,
      {
        command,
      }
    );
  }

  static createCommandExecutedEvent(commandId) {
    return CommandEvents.createEvent(
      CommandEvents.COMMAND_EXECUTED,
      {
        commandId,
      }
    );
  }

  static createCommandUndoneEvent(commandId) {
    return CommandEvents.createEvent(
      CommandEvents.COMMAND_UNDONE,
      {
        commandId,
      }
    );
  }

  static createCommandFailedEvent(
    commandId,
    error
  ) {
    return CommandEvents.createEvent(
      CommandEvents.COMMAND_FAILED,
      {
        commandId,
        error,
      }
    );
  }
}

export default CommandEvents;
