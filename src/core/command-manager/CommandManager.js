import Command from "../command/Command";

class CommandManager {
  constructor() {
    this.commands = new Map();
    this.history = [];
  }

  validateCommand(command) {
    if (!(command instanceof Command)) {
      throw new Error(
        "El command debe ser una instancia de Command."
      );
    }
  }

  validateCommandId(commandId) {
    if (
      typeof commandId !== "string" ||
      commandId.trim() === ""
    ) {
      throw new Error(
        "El id del command debe ser un string no vacio."
      );
    }
  }

  createHistoryEntry(
    commandId,
    action
  ) {
    return {
      commandId,
      action,
      timestamp: new Date().toISOString(),
    };
  }

  addCommand(command) {
    this.validateCommand(command);

    const commandId =
      command.id;

    this.validateCommandId(commandId);

    if (this.hasCommand(commandId)) {
      throw new Error(
        "Ya existe un Command con ese id."
      );
    }

    this.commands.set(
      commandId,
      command
    );

    return command;
  }

  removeCommand(commandId) {
    this.validateCommandId(commandId);

    if (!this.hasCommand(commandId)) {
      throw new Error(
        "No existe un Command para eliminar."
      );
    }

    return this.commands.delete(commandId);
  }

  getCommand(commandId) {
    this.validateCommandId(commandId);

    const command =
      this.commands.get(commandId);

    if (!command) {
      throw new Error(
        "No existe un Command con ese id."
      );
    }

    return command;
  }

  hasCommand(commandId) {
    this.validateCommandId(commandId);

    return this.commands.has(commandId);
  }

  executeCommand(commandId) {
    const result =
      this
        .getCommand(commandId)
        .execute();

    this.history.push(
      this.createHistoryEntry(
        commandId,
        "EXECUTE"
      )
    );

    return result;
  }

  undoCommand(commandId) {
    const result =
      this
        .getCommand(commandId)
        .undo();

    this.history.push(
      this.createHistoryEntry(
        commandId,
        "UNDO"
      )
    );

    return result;
  }

  getCommands() {
    return Array.from(
      this.commands.values()
    );
  }

  getExecutedCommands() {
    return this
      .getCommands()
      .filter(command =>
        command.getStatus() === "EXECUTED"
      );
  }

  getPendingCommands() {
    return this
      .getCommands()
      .filter(command =>
        command.getStatus() === "PENDING"
      );
  }

  getUndoneCommands() {
    return this
      .getCommands()
      .filter(command =>
        command.getStatus() === "UNDONE"
      );
  }

  getFailedCommands() {
    return this
      .getCommands()
      .filter(command =>
        command.getStatus() === "FAILED"
      );
  }

  getHistory() {
    return this.history.map(entry => ({
      ...entry,
    }));
  }

  clearHistory() {
    this.history = [];
  }

  clear() {
    this.commands.clear();
    this.clearHistory();
  }

  count() {
    return this.commands.size;
  }

  toJSON() {
    return {
      commands: this
        .getCommands()
        .map(command =>
          command.toJSON()
        ),
      history: this.getHistory(),
    };
  }
}

export default CommandManager;
