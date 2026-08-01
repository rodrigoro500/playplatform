class CommandManagerEvents {
  static COMMAND_ADDED = "COMMAND_ADDED";

  static COMMAND_REMOVED = "COMMAND_REMOVED";

  static COMMAND_EXECUTED = "COMMAND_EXECUTED";

  static COMMAND_UNDONE = "COMMAND_UNDONE";

  static HISTORY_CLEARED = "HISTORY_CLEARED";

  static COMMAND_MANAGER_CLEARED = "COMMAND_MANAGER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createCommandAddedEvent(command) {
    return CommandManagerEvents.createEvent(
      CommandManagerEvents.COMMAND_ADDED,
      {
        command,
      }
    );
  }

  static createCommandRemovedEvent(commandId) {
    return CommandManagerEvents.createEvent(
      CommandManagerEvents.COMMAND_REMOVED,
      {
        commandId,
      }
    );
  }

  static createCommandExecutedEvent(commandId) {
    return CommandManagerEvents.createEvent(
      CommandManagerEvents.COMMAND_EXECUTED,
      {
        commandId,
      }
    );
  }

  static createCommandUndoneEvent(commandId) {
    return CommandManagerEvents.createEvent(
      CommandManagerEvents.COMMAND_UNDONE,
      {
        commandId,
      }
    );
  }

  static createHistoryClearedEvent() {
    return CommandManagerEvents.createEvent(
      CommandManagerEvents.HISTORY_CLEARED,
      {}
    );
  }

  static createCommandManagerClearedEvent() {
    return CommandManagerEvents.createEvent(
      CommandManagerEvents.COMMAND_MANAGER_CLEARED,
      {}
    );
  }
}

export default CommandManagerEvents;
