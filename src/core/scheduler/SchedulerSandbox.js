import Scheduler from "./Scheduler";
import SchedulerEvents from "./SchedulerEvents";

class SchedulerSandbox {
  constructor() {
    this.result = this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  wait(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  async run() {
    console.log("===== SCHEDULER SANDBOX =====");

    const scheduler =
      new Scheduler();

    console.log("1. Crear una instancia de Scheduler:");
    console.log(scheduler.toJSON());

    const executedTasks = [];

    const task1 =
      scheduler.schedule(
        "task1",
        () => {
          executedTasks.push("task1");
        },
        10
      );

    const task2 =
      scheduler.schedule(
        "task2",
        () => {
          executedTasks.push("task2");
        },
        20
      );

    const task3 =
      scheduler.schedule(
        "task3",
        () => {
          executedTasks.push("task3");
        },
        30
      );

    console.log("2. Programar tres tareas con distintos delays:");
    console.log([
      task1,
      task2,
      task3,
    ]);

    this.assert(
      scheduler.hasTask("task1") === true,
      "task1 debe existir."
    );

    console.log("3. Verificar hasTask():");
    console.log({
      task1: scheduler.hasTask("task1"),
      task2: scheduler.hasTask("task2"),
      task3: scheduler.hasTask("task3"),
    });

    const foundTask =
      scheduler.getTask("task1");

    console.log("4. Obtener una tarea por ID:");
    console.log(foundTask);

    const tasks =
      scheduler.getTasks();

    this.assert(
      tasks.length === 3,
      "Deben existir tres tareas."
    );

    console.log("5. Obtener todas las tareas:");
    console.log(tasks);

    const taskCount =
      scheduler.count();

    this.assert(
      taskCount === 3,
      "Scheduler debe tener tres tareas."
    );

    console.log("6. Verificar count():");
    console.log(taskCount);

    await this.wait(50);

    console.log("7. Esperar la ejecucion automatica de las tareas:");
    console.log(executedTasks);

    const completedTasks =
      scheduler.getCompletedTasks();

    this.assert(
      completedTasks.length === 3,
      "Deben existir tres tareas COMPLETED."
    );

    console.log("8. Verificar tareas COMPLETED:");
    console.log(completedTasks);

    const task4 =
      scheduler.schedule(
        "task4",
        () => {
          executedTasks.push("task4");
        },
        100
      );

    console.log("9. Programar una nueva tarea:");
    console.log(task4);

    scheduler.cancel("task4");

    console.log("10. Cancelarla antes de ejecutarse:");
    console.log(scheduler.getTask("task4"));

    const cancelledTasks =
      scheduler.getCancelledTasks();

    this.assert(
      cancelledTasks.length === 1,
      "Debe existir una tarea CANCELLED."
    );

    console.log("11. Verificar tareas CANCELLED:");
    console.log(cancelledTasks);

    scheduler.schedule(
      "task5",
      () => {
        executedTasks.push("task5");
      },
      100
    );

    scheduler.schedule(
      "task6",
      () => {
        executedTasks.push("task6");
      },
      100
    );

    console.log("12. Programar dos tareas adicionales:");
    console.log([
      scheduler.getTask("task5"),
      scheduler.getTask("task6"),
    ]);

    const cancelledByAll =
      scheduler.cancelAll();

    console.log("13. Ejecutar cancelAll():");
    console.log(cancelledByAll);

    const pendingTasks =
      scheduler.getPendingTasks();

    this.assert(
      pendingTasks.length === 0,
      "No deben quedar tareas PENDING."
    );

    console.log("14. Verificar que todas las tareas pendientes esten canceladas:");
    console.log({
      pendingTasks,
      cancelledTasks: scheduler.getCancelledTasks(),
    });

    const schedulerJSON =
      scheduler.toJSON();

    console.log("15. Serializar utilizando toJSON():");
    console.log(schedulerJSON);

    const events = [
      SchedulerEvents.createTaskScheduledEvent(task1),
      SchedulerEvents.createTaskStartedEvent("task1"),
      SchedulerEvents.createTaskCompletedEvent("task1"),
      SchedulerEvents.createTaskCancelledEvent("task4"),
      SchedulerEvents.createAllTasksCancelledEvent(),
      SchedulerEvents.createSchedulerClearedEvent(),
    ];

    console.log("16. Crear eventos utilizando SchedulerEvents:");
    console.log(events);

    scheduler.clear();

    console.log("17. Limpiar completamente el Scheduler:");
    console.log(scheduler.toJSON());

    this.assert(
      scheduler.count() === 0,
      "Scheduler debe quedar sin tareas."
    );

    console.log("18. Verificar que count() sea 0:");
    console.log(scheduler.count());

    console.log("19. Mostrar todos los resultados por consola:");
    console.log({
      executedTasks,
      completedTasks,
      cancelledTasks: scheduler.getCancelledTasks(),
      schedulerJSON,
      events,
      finalCount: scheduler.count(),
    });

    console.log("===== SCHEDULER SANDBOX OK =====");

    return {
      executedTasks,
      completedTasks,
      schedulerJSON,
      events,
    };
  }
}

new SchedulerSandbox();

export default SchedulerSandbox;
