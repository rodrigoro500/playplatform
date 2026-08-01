import EngineTaskScheduler from "./EngineTaskScheduler";
import EngineTaskSchedulerEvents from "./EngineTaskSchedulerEvents";

class EngineTaskSchedulerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE TASK SCHEDULER SANDBOX =====");

    const manager = {};

    console.log("1. Crear manager simulado:");
    console.log(manager);

    const scheduler =
      new EngineTaskScheduler();

    console.log("2. Crear EngineTaskScheduler:");
    console.log(scheduler.toJSON());

    this.assert(
      scheduler.isInitialized() === false,
      "EngineTaskScheduler debe iniciar sin inicializar."
    );

    const initialJSON =
      scheduler.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.tasks === 0 &&
        initialJSON.hasTasks === false &&
        initialJSON.tasksList.length === 0,
      "EngineTaskScheduler debe iniciar con tasks vacio."
    );

    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: scheduler.isInitialized(),
      json: initialJSON,
    });

    scheduler.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(scheduler.getStatus());

    const initialized =
      scheduler.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      scheduler.isInitialized() === true,
      "EngineTaskScheduler debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: scheduler.isInitialized(),
    });

    const taskA =
      scheduler.scheduleTask("Task A");
    const taskB =
      scheduler.scheduleTask("Task B");
    const taskC =
      scheduler.scheduleTask("Task C");

    console.log("6. Ejecutar scheduleTask():");
    console.log({
      taskA,
      taskB,
      taskC,
    });

    const peekedTask =
      scheduler.peek();

    this.assert(
      peekedTask === "Task A",
      "peek() debe devolver Task A."
    );

    console.log("7. Ejecutar peek():");
    console.log(peekedTask);

    const sizeAfterSchedule =
      scheduler.size();

    this.assert(
      sizeAfterSchedule === 3,
      "size() debe devolver 3 despues de scheduleTask."
    );

    console.log("8. Ejecutar size():");
    console.log(sizeAfterSchedule);

    const hasTasksAfterSchedule =
      scheduler.hasTasks();

    this.assert(
      hasTasksAfterSchedule === true,
      "hasTasks() debe devolver true con tareas programadas."
    );

    console.log("9. Ejecutar hasTasks():");
    console.log(hasTasksAfterSchedule);

    const tasksAfterSchedule =
      scheduler.getTasks();

    this.assert(
      tasksAfterSchedule.length === 3,
      "getTasks() debe devolver tres tareas."
    );

    console.log("10. Ejecutar getTasks():");
    console.log(tasksAfterSchedule);

    const status =
      scheduler.getStatus();

    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const schedulerJSON =
      scheduler.toJSON();

    console.log("12. Ejecutar toJSON():");
    console.log(schedulerJSON);

    const nextTask =
      scheduler.nextTask();

    this.assert(
      nextTask === "Task A",
      "nextTask() debe devolver Task A."
    );

    console.log("13. Ejecutar nextTask() y verificar Task A:");
    console.log(nextTask);

    const sizeAfterNext =
      scheduler.size();

    this.assert(
      sizeAfterNext === 2,
      "size() debe devolver 2 despues de nextTask."
    );

    console.log("14. Ejecutar size():");
    console.log(sizeAfterNext);

    const cleared =
      scheduler.clear();

    this.assert(
      cleared === true,
      "clear() debe devolver true."
    );

    console.log("15. Ejecutar clear():");
    console.log(cleared);

    const hasTasksAfterClear =
      scheduler.hasTasks();

    this.assert(
      hasTasksAfterClear === false,
      "hasTasks() debe devolver false despues de clear."
    );

    console.log("16. Ejecutar hasTasks():");
    console.log(hasTasksAfterClear);

    const sizeAfterClear =
      scheduler.size();

    this.assert(
      sizeAfterClear === 0,
      "size() debe devolver 0 despues de clear."
    );

    console.log("17. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineTaskSchedulerEvents.createEngineTaskSchedulerInitializedEvent(),
      EngineTaskSchedulerEvents.createEngineTaskScheduledEvent(taskA),
      EngineTaskSchedulerEvents.createNextTaskSelectedEvent(nextTask),
      EngineTaskSchedulerEvents.createEngineTaskSchedulerClearedEvent(),
      EngineTaskSchedulerEvents.createEngineTaskSchedulerResetEvent(),
    ];

    console.log("18. Crear eventos:");
    console.log(events);

    const reset =
      scheduler.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("19. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      scheduler.toJSON();

    this.assert(
      scheduler.isInitialized() === false,
      "EngineTaskScheduler debe quedar sin inicializar tras reset."
    );
    this.assert(
      scheduler.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      scheduler.getTasks().length === 0,
      "getTasks() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.tasks === 0 &&
        resetJSON.hasTasks === false &&
        resetJSON.tasksList.length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("20. Verificar nuevamente isInitialized(), size(), getTasks() y toJSON():");
    console.log({
      initialized: scheduler.isInitialized(),
      size: scheduler.size(),
      tasks: scheduler.getTasks(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      taskA,
      taskB,
      taskC,
      peekedTask,
      sizeAfterSchedule,
      hasTasksAfterSchedule,
      tasksAfterSchedule,
      status,
      schedulerJSON,
      nextTask,
      sizeAfterNext,
      cleared,
      hasTasksAfterClear,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE TASK SCHEDULER SANDBOX OK =====");
  }
}

new EngineTaskSchedulerSandbox();

export default EngineTaskSchedulerSandbox;
