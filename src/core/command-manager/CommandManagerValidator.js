import Command from "../command/Command";

class CommandManagerValidator {
  static HISTORY_ACTIONS = [
    "EXECUTE",
    "UNDO",
  ];

  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateCommand(command) {
    if (!(command instanceof Command)) {
      throw new Error(
        "El command debe ser una instancia de Command."
      );
    }
  }

  static validateCommands(commands) {
    if (!(commands instanceof Map)) {
      throw new Error(
        "Los commands deben ser una instancia de Map."
      );
    }

    commands.forEach(command =>
      CommandManagerValidator.validateCommand(command)
    );
  }

  static validateHistory(history) {
    if (!Array.isArray(history)) {
      throw new Error(
        "El history debe ser un Array."
      );
    }

    history.forEach(entry =>
      CommandManagerValidator.validateHistoryEntry(entry)
    );
  }

  static validateHistoryEntry(entry) {
    if (
      entry === null ||
      typeof entry !== "object" ||
      Array.isArray(entry)
    ) {
      throw new Error(
        "La entrada del history debe ser un objeto valido."
      );
    }

    CommandManagerValidator.validateText(
      entry.commandId,
      "El commandId del history debe ser un string no vacio."
    );

    if (!CommandManagerValidator.HISTORY_ACTIONS.includes(entry.action)) {
      throw new Error(
        "La accion del history no es valida."
      );
    }

    CommandManagerValidator.validateText(
      entry.timestamp,
      "El timestamp del history debe ser un string no vacio."
    );
  }

  static validateCommandManager(commandManager) {
    if (
      commandManager === null ||
      typeof commandManager !== "object" ||
      Array.isArray(commandManager)
    ) {
      throw new Error(
        "El CommandManager debe ser un objeto valido."
      );
    }

    CommandManagerValidator.validateCommands(
      commandManager.commands
    );
    CommandManagerValidator.validateHistory(
      commandManager.history
    );
  }
}

export default CommandManagerValidator;
