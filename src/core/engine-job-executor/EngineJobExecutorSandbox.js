import EngineJobExecutor from "./EngineJobExecutor";
import EngineJobExecutorEvents from "./EngineJobExecutorEvents";

class EngineJobExecutorSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createQueue() {
    const jobs = [];

    return {
      enqueue(job) {
        jobs.push(job);

        return job;
      },

      dequeue() {
        return jobs.shift();
      },

      hasJobs() {
        return jobs.length > 0;
      },

      getJobs() {
        return [...jobs];
      },
    };
  }

  run() {
    console.log("===== ENGINE JOB EXECUTOR SANDBOX =====");

    const manager = {};

    console.log("1. Crear manager simulado:");
    console.log(manager);

    const queue = this.createQueue();

    console.log("2. Crear una cola simulada:");
    console.log({
      hasJobs: queue.hasJobs(),
      jobs: queue.getJobs(),
    });

    const executor =
      new EngineJobExecutor();

    console.log("3. Crear EngineJobExecutor:");
    console.log(executor.toJSON());

    this.assert(
      executor.isInitialized() === false,
      "EngineJobExecutor debe iniciar sin inicializar."
    );

    const initialJSON =
      executor.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.hasQueue === false,
      "EngineJobExecutor debe iniciar sin queue."
    );

    console.log("4. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: executor.isInitialized(),
      json: initialJSON,
    });

    executor.setManager(manager);

    console.log("5. Ejecutar setManager():");
    console.log(executor.getStatus());

    executor.setQueue(queue);

    console.log("6. Ejecutar setQueue():");
    console.log(executor.getStatus());

    const initialized =
      executor.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      executor.isInitialized() === true,
      "EngineJobExecutor debe quedar inicializado."
    );

    console.log("7. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: executor.isInitialized(),
    });

    const job1 =
      queue.enqueue(() => "Job 1");
    const job2 =
      queue.enqueue(() => "Job 2");
    const job3 =
      queue.enqueue({
        execute() {
          return "Job 3";
        },
      });

    console.log("8. Agregar tres trabajos:");
    console.log({
      job1,
      job2,
      job3,
      jobs: queue.getJobs(),
    });

    const nextResult =
      executor.executeNext();

    this.assert(
      nextResult === "Job 1",
      "executeNext() debe ejecutar el primer trabajo."
    );

    console.log("9. Ejecutar executeNext():");
    console.log(nextResult);

    const allResults =
      executor.executeAll();

    this.assert(
      allResults.length === 2 &&
        allResults[0] === "Job 2" &&
        allResults[1] === "Job 3",
      "executeAll() debe ejecutar los trabajos restantes."
    );

    console.log("10. Ejecutar executeAll():");
    console.log(allResults);

    const returnedQueue =
      executor.getQueue();

    this.assert(
      returnedQueue === queue,
      "getQueue() debe devolver la queue asignada."
    );

    console.log("11. Ejecutar getQueue():");
    console.log({
      sameQueue: returnedQueue === queue,
      hasJobs: returnedQueue.hasJobs(),
      jobs: returnedQueue.getJobs(),
    });

    const status =
      executor.getStatus();

    console.log("12. Ejecutar getStatus():");
    console.log(status);

    const executorJSON =
      executor.toJSON();

    console.log("13. Ejecutar toJSON():");
    console.log(executorJSON);

    const events = [
      EngineJobExecutorEvents.createEngineJobExecutorInitializedEvent(),
      EngineJobExecutorEvents.createEngineJobExecutedEvent(nextResult),
      EngineJobExecutorEvents.createAllJobsExecutedEvent(allResults),
      EngineJobExecutorEvents.createEngineJobExecutorResetEvent(),
    ];

    console.log("14. Crear eventos:");
    console.log(events);

    const reset =
      executor.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      executor.getStatus();
    const resetJSON =
      executor.toJSON();

    this.assert(
      executor.isInitialized() === false,
      "EngineJobExecutor debe quedar sin inicializar tras reset."
    );
    this.assert(
      resetStatus.hasQueue === false &&
        resetJSON.hasQueue === false,
      "EngineJobExecutor debe limpiar la queue tras reset."
    );

    console.log("16. Verificar nuevamente isInitialized(), getStatus() y toJSON():");
    console.log({
      initialized: executor.isInitialized(),
      status: resetStatus,
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      nextResult,
      allResults,
      status,
      executorJSON,
      events,
      reset,
      resetStatus,
      resetJSON,
    });

    console.log("===== ENGINE JOB EXECUTOR SANDBOX OK =====");
  }
}

new EngineJobExecutorSandbox();

export default EngineJobExecutorSandbox;
