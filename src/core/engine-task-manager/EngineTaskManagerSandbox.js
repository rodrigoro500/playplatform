import EngineTaskManager from "./EngineTaskManager";
import EngineTaskManagerEvents from "./EngineTaskManagerEvents";

class EngineTaskManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE TASK MANAGER SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const taskManager =
      new EngineTaskManager();

    console.log("2. Crear una instancia de EngineTaskManager:");
    console.log(taskManager.toJSON());

    this.assert(
      taskManager.isInitialized() === false,
      "EngineTaskManager debe iniciar sin inicializar."
    );

    const initialJSON =
      taskManager.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.tasks === 0,
      "EngineTaskManager debe iniciar sin tareas."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: taskManager.isInitialized(),
      json: initialJSON,
    });

    taskManager.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(taskManager.getStatus());

    const initialized =
      taskManager.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      taskManager.isInitialized() === true,
      "EngineTaskManager debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: taskManager.isInitialized(),
    });

    taskManager
      .registerTask("sum", (a, b) => a + b)
      .registerTask("multiply", (a, b) => a * b)
      .registerTask("hello", name => `Hola ${name}`);

    this.assert(
      taskManager.size() === 3,
      "Deben registrarse tres tareas."
    );

    console.log("6. Registrar tareas:");
    console.log(taskManager.getAll());

    const sumResult =
      taskManager.executeTask("sum", 10, 5);

    this.assert(
      sumResult === 15,
      "executeTask(\"sum\", 10, 5) debe devolver 15."
    );

    console.log("7. Ejecutar executeTask(\"sum\", 10, 5):");
    console.log(sumResult);

    const multiplyResult =
      taskManager.executeTask("multiply", 4, 6);

    this.assert(
      multiplyResult === 24,
      "executeTask(\"multiply\", 4, 6) debe devolver 24."
    );

    console.log("8. Ejecutar executeTask(\"multiply\", 4, 6):");
    console.log(multiplyResult);

    const helloResult =
      taskManager.executeTask("hello", "ORION");

    this.assert(
      helloResult === "Hola ORION",
      "executeTask(\"hello\", \"ORION\") debe devolver Hola ORION."
    );

    console.log("9. Ejecutar executeTask(\"hello\", \"ORION\"):");
    console.log(helloResult);

    const hasSum =
      taskManager.hasTask("sum");
    const hasUnknown =
      taskManager.hasTask("unknown");

    this.assert(
      hasSum === true,
      "hasTask(\"sum\") debe devolver true."
    );
    this.assert(
      hasUnknown === false,
      "hasTask(\"unknown\") debe devolver false."
    );

    console.log("10. Ejecutar hasTask():");
    console.log({
      sum: hasSum,
      unknown: hasUnknown,
    });

    const sizeAfterRegister =
      taskManager.size();

    console.log("11. Obtener size():");
    console.log(sizeAfterRegister);

    const allTasks =
      taskManager.getAll();

    console.log("12. Obtener getAll():");
    console.log(allTasks);

    const status =
      taskManager.getStatus();

    console.log("13. Obtener getStatus():");
    console.log(status);

    const taskManagerJSON =
      taskManager.toJSON();

    console.log("14. Serializar utilizando toJSON():");
    console.log(taskManagerJSON);

    const removedTask =
      taskManager.removeTask("multiply");

    this.assert(
      removedTask === true,
      "removeTask(\"multiply\") debe devolver true."
    );
    this.assert(
      taskManager.size() === 2 &&
        taskManager.hasTask("multiply") === false,
      "multiply debe quedar removida."
    );

    console.log("15. Ejecutar removeTask(\"multiply\") y verificar size() y getAll():");
    console.log({
      removedTask,
      size: taskManager.size(),
      tasks: taskManager.getAll(),
    });

    const cleared =
      taskManager.clear();

    this.assert(
      cleared === true,
      "clear() debe devolver true."
    );
    this.assert(
      taskManager.size() === 0 &&
        Object.keys(taskManager.getAll()).length === 0,
      "tasks debe quedar vacio tras clear."
    );

    console.log("16. Ejecutar clear() y verificar size() y getAll():");
    console.log({
      cleared,
      size: taskManager.size(),
      tasks: taskManager.getAll(),
    });

    const events = [
      EngineTaskManagerEvents.createEngineTaskManagerInitializedEvent(),
      EngineTaskManagerEvents.createEngineTaskRegisteredEvent("sum"),
      EngineTaskManagerEvents.createEngineTaskExecutedEvent("sum", sumResult),
      EngineTaskManagerEvents.createEngineTaskRemovedEvent("multiply"),
      EngineTaskManagerEvents.createEngineTaskManagerClearedEvent(),
      EngineTaskManagerEvents.createEngineTaskManagerResetEvent(),
    ];

    console.log("17. Crear eventos utilizando EngineTaskManagerEvents:");
    console.log(events);

    const reset =
      taskManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("18. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      taskManager.toJSON();

    this.assert(
      taskManager.isInitialized() === false,
      "EngineTaskManager debe quedar sin inicializar tras reset."
    );
    this.assert(
      taskManager.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      Object.keys(taskManager.getAll()).length === 0,
      "getAll() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.tasks === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("19. Verificar nuevamente isInitialized(), size(), getAll() y toJSON():");
    console.log({
      initialized: taskManager.isInitialized(),
      size: taskManager.size(),
      tasks: taskManager.getAll(),
      json: resetJSON,
    });

    console.log("20. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      sumResult,
      multiplyResult,
      helloResult,
      hasSum,
      hasUnknown,
      sizeAfterRegister,
      allTasks,
      status,
      taskManagerJSON,
      removedTask,
      cleared,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE TASK MANAGER SANDBOX OK =====");
  }
}

new EngineTaskManagerSandbox();

export default EngineTaskManagerSandbox;
