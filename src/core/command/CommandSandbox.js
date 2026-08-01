import Command from "./Command";
import CommandEvents from "./CommandEvents";

class CommandSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== COMMAND SANDBOX =====");

    let executed = false;
    let undone = false;

    const command =
      new Command(
        "command1",
        "Test Command",
        () => {
          executed = true;

          return "executed";
        },
        () => {
          undone = true;

          return "undone";
        },
        {
          source: "sandbox",
        }
      );

    console.log("1. Crear una instancia de Command con execute y undo:");
    console.log(command.toJSON());

    this.assert(
      command.getStatus() === "PENDING",
      "El estado inicial debe ser PENDING."
    );

    console.log("2. Verificar estado inicial PENDING:");
    console.log(command.getStatus());

    const executeResult =
      command.execute();

    this.assert(
      executeResult === "executed" &&
        executed === true,
      "execute() debe ejecutarse correctamente."
    );

    console.log("3. Ejecutar execute():");
    console.log({
      executeResult,
      executed,
    });

    this.assert(
      command.getStatus() === "EXECUTED",
      "El estado debe ser EXECUTED."
    );

    console.log("4. Verificar estado EXECUTED:");
    console.log(command.getStatus());

    const undoResult =
      command.undo();

    this.assert(
      undoResult === "undone" &&
        undone === true,
      "undo() debe ejecutarse correctamente."
    );

    console.log("5. Ejecutar undo():");
    console.log({
      undoResult,
      undone,
    });

    this.assert(
      command.getStatus() === "UNDONE",
      "El estado debe ser UNDONE."
    );

    console.log("6. Verificar estado UNDONE:");
    console.log(command.getStatus());

    const commandWithoutUndo =
      new Command(
        "command2",
        "Command Without Undo",
        () => "executed-without-undo"
      );

    console.log("7. Crear un Command sin undoCallback:");
    console.log(commandWithoutUndo.toJSON());

    const commandWithoutUndoResult =
      commandWithoutUndo.execute();

    this.assert(
      commandWithoutUndoResult === "executed-without-undo",
      "El command sin undo debe ejecutarse correctamente."
    );

    console.log("8. Ejecutarlo correctamente:");
    console.log(commandWithoutUndo.toJSON());

    let undoError = null;

    try {
      commandWithoutUndo.undo();
    } catch (error) {
      undoError = error;
    }

    this.assert(
      undoError instanceof Error,
      "undo() sin undoCallback debe lanzar Error."
    );

    console.log("9. Intentar undo() y verificar que lance Error:");
    console.log(undoError.message);

    const failingCommand =
      new Command(
        "command3",
        "Failing Command",
        () => {
          throw new Error(
            "Error esperado del command."
          );
        }
      );

    let executionError = null;

    try {
      failingCommand.execute();
    } catch (error) {
      executionError = error;
    }

    this.assert(
      executionError instanceof Error,
      "El command fallido debe lanzar Error."
    );

    console.log("10. Crear un Command cuyo executeCallback lance una excepcion:");
    console.log(executionError.message);

    this.assert(
      failingCommand.getStatus() === "FAILED",
      "El estado debe ser FAILED."
    );

    console.log("11. Verificar estado FAILED:");
    console.log(failingCommand.getStatus());

    console.log("12. Verificar isPending():");
    console.log(command.isPending());

    console.log("13. Verificar isExecuted():");
    console.log(commandWithoutUndo.isExecuted());

    console.log("14. Verificar isUndone():");
    console.log(command.isUndone());

    console.log("15. Verificar isFailed():");
    console.log(failingCommand.isFailed());

    const metadataValue =
      command.setMetadata(
        "validated",
        true
      );

    console.log("16. Probar setMetadata():");
    console.log(metadataValue);

    const metadata =
      command.getMetadata("validated");

    this.assert(
      metadata === true,
      "La metadata validated debe ser true."
    );

    console.log("17. Probar getMetadata():");
    console.log(metadata);

    const allMetadata =
      command.getAllMetadata();

    console.log("18. Probar getAllMetadata():");
    console.log(allMetadata);

    const commandJSON =
      command.toJSON();

    console.log("19. Serializar utilizando toJSON():");
    console.log(commandJSON);

    const events = [
      CommandEvents.createCommandCreatedEvent(commandJSON),
      CommandEvents.createCommandExecutedEvent("command1"),
      CommandEvents.createCommandUndoneEvent("command1"),
      CommandEvents.createCommandFailedEvent(
        "command3",
        executionError.message
      ),
    ];

    console.log("20. Crear eventos utilizando CommandEvents:");
    console.log(events);

    console.log("21. Mostrar todos los resultados por consola:");
    console.log({
      command: commandJSON,
      commandWithoutUndo: commandWithoutUndo.toJSON(),
      failingCommand: failingCommand.toJSON(),
      allMetadata,
      events,
    });

    console.log("===== COMMAND SANDBOX OK =====");
  }
}

new CommandSandbox();

export default CommandSandbox;
