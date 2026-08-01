import Command from "../command/Command";
import CommandManager from "./CommandManager";
import CommandManagerEvents from "./CommandManagerEvents";

class CommandManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== COMMAND MANAGER SANDBOX =====");

    const commandManager =
      new CommandManager();

    console.log("1. Crear una instancia de CommandManager:");
    console.log(commandManager.toJSON());

    const command1 =
      new Command(
        "command1",
        "Command One",
        () => "command1 executed",
        () => "command1 undone"
      );

    const command2 =
      new Command(
        "command2",
        "Command Two",
        () => "command2 executed"
      );

    const command3 =
      new Command(
        "command3",
        "Command Three",
        () => "command3 executed"
      );

    console.log("2. Crear tres instancias de Command:");
    console.log([
      command1.toJSON(),
      command2.toJSON(),
      command3.toJSON(),
    ]);

    commandManager.addCommand(command1);
    commandManager.addCommand(command2);
    commandManager.addCommand(command3);

    console.log("3. Agregar los Commands al CommandManager:");
    console.log(commandManager.toJSON());

    this.assert(
      commandManager.hasCommand("command1") === true,
      "command1 debe existir."
    );

    console.log("4. Verificar hasCommand():");
    console.log({
      command1: commandManager.hasCommand("command1"),
      command2: commandManager.hasCommand("command2"),
      command3: commandManager.hasCommand("command3"),
    });

    const foundCommand =
      commandManager.getCommand("command1");

    console.log("5. Obtener un Command por ID:");
    console.log(foundCommand.toJSON());

    const executeCommand1Result =
      commandManager.executeCommand("command1");

    console.log("6. Ejecutar el primer Command:");
    console.log(executeCommand1Result);

    const executeCommand2Result =
      commandManager.executeCommand("command2");

    console.log("7. Ejecutar el segundo Command:");
    console.log(executeCommand2Result);

    const undoCommand1Result =
      commandManager.undoCommand("command1");

    console.log("8. Deshacer el primer Command:");
    console.log(undoCommand1Result);

    const pendingCommands =
      commandManager.getPendingCommands();

    this.assert(
      pendingCommands.length === 1,
      "Debe existir un Command PENDING."
    );

    console.log("9. Obtener Commands en estado PENDING:");
    console.log(
      pendingCommands.map(command =>
        command.toJSON()
      )
    );

    const executedCommands =
      commandManager.getExecutedCommands();

    this.assert(
      executedCommands.length === 1,
      "Debe existir un Command EXECUTED."
    );

    console.log("10. Obtener Commands en estado EXECUTED:");
    console.log(
      executedCommands.map(command =>
        command.toJSON()
      )
    );

    const undoneCommands =
      commandManager.getUndoneCommands();

    this.assert(
      undoneCommands.length === 1,
      "Debe existir un Command UNDONE."
    );

    console.log("11. Obtener Commands en estado UNDONE:");
    console.log(
      undoneCommands.map(command =>
        command.toJSON()
      )
    );

    const failedCommands =
      commandManager.getFailedCommands();

    console.log("12. Obtener Commands en estado FAILED:");
    console.log(
      failedCommands.map(command =>
        command.toJSON()
      )
    );

    const history =
      commandManager.getHistory();

    this.assert(
      history.length === 3,
      "El history debe tener tres entradas."
    );

    console.log("13. Obtener el historial completo:");
    console.log(history);

    const commandCount =
      commandManager.count();

    this.assert(
      commandCount === 3,
      "Deben existir tres Commands."
    );

    console.log("14. Verificar count():");
    console.log(commandCount);

    const commandManagerJSON =
      commandManager.toJSON();

    console.log("15. Serializar utilizando toJSON():");
    console.log(commandManagerJSON);

    const events = [
      CommandManagerEvents.createCommandAddedEvent(command1.toJSON()),
      CommandManagerEvents.createCommandRemovedEvent("command3"),
      CommandManagerEvents.createCommandExecutedEvent("command1"),
      CommandManagerEvents.createCommandUndoneEvent("command1"),
      CommandManagerEvents.createHistoryClearedEvent(),
      CommandManagerEvents.createCommandManagerClearedEvent(),
    ];

    console.log("16. Crear eventos utilizando CommandManagerEvents:");
    console.log(events);

    const removedCommand =
      commandManager.removeCommand("command3");

    this.assert(
      removedCommand === true,
      "command3 debe eliminarse correctamente."
    );

    console.log("17. Eliminar un Command:");
    console.log(commandManager.toJSON());

    commandManager.clearHistory();

    console.log("18. Limpiar unicamente el historial:");
    console.log(commandManager.getHistory());

    this.assert(
      commandManager.getHistory().length === 0,
      "El history debe quedar vacio."
    );

    console.log("19. Verificar que el historial quede vacio:");
    console.log(commandManager.getHistory());

    commandManager.clear();

    console.log("20. Limpiar completamente el CommandManager:");
    console.log(commandManager.toJSON());

    this.assert(
      commandManager.count() === 0,
      "CommandManager debe quedar sin Commands."
    );

    console.log("21. Verificar que count() sea 0:");
    console.log(commandManager.count());

    console.log("22. Mostrar todos los resultados por consola:");
    console.log({
      pendingCommands: pendingCommands.map(command =>
        command.toJSON()
      ),
      executedCommands: executedCommands.map(command =>
        command.toJSON()
      ),
      undoneCommands: undoneCommands.map(command =>
        command.toJSON()
      ),
      failedCommands: failedCommands.map(command =>
        command.toJSON()
      ),
      history,
      commandManagerJSON,
      events,
      finalCount: commandManager.count(),
    });

    console.log("===== COMMAND MANAGER SANDBOX OK =====");
  }
}

new CommandManagerSandbox();

export default CommandManagerSandbox;
