import EngineJobScheduler from "./EngineJobScheduler";
import EngineJobSchedulerEvents from "./EngineJobSchedulerEvents";

class EngineJobSchedulerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE JOB SCHEDULER SANDBOX =====");

    const manager = {};

    console.log("1. Crear manager simulado:");
    console.log(manager);

    const scheduler =
      new EngineJobScheduler();

    console.log("2. Crear EngineJobScheduler:");
    console.log(scheduler.toJSON());

    this.assert(
      scheduler.isInitialized() === false,
      "EngineJobScheduler debe iniciar sin inicializar."
    );

    const initialJSON =
      scheduler.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.jobs === 0 &&
        initialJSON.hasJobs === false &&
        initialJSON.schedule.length === 0,
      "EngineJobScheduler debe iniciar con schedule vacio."
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
      "EngineJobScheduler debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: scheduler.isInitialized(),
    });

    const jobA =
      scheduler.scheduleJob("Job A");
    const jobB =
      scheduler.scheduleJob("Job B");
    const jobC =
      scheduler.scheduleJob("Job C");

    console.log("6. Ejecutar scheduleJob():");
    console.log({
      jobA,
      jobB,
      jobC,
    });

    const peekedJob =
      scheduler.peek();

    this.assert(
      peekedJob === "Job A",
      "peek() debe devolver Job A."
    );

    console.log("7. Ejecutar peek():");
    console.log(peekedJob);

    const sizeAfterSchedule =
      scheduler.size();

    this.assert(
      sizeAfterSchedule === 3,
      "size() debe devolver 3 despues de scheduleJob."
    );

    console.log("8. Ejecutar size():");
    console.log(sizeAfterSchedule);

    const hasJobsAfterSchedule =
      scheduler.hasJobs();

    this.assert(
      hasJobsAfterSchedule === true,
      "hasJobs() debe devolver true con trabajos programados."
    );

    console.log("9. Ejecutar hasJobs():");
    console.log(hasJobsAfterSchedule);

    const scheduleAfterSchedule =
      scheduler.getSchedule();

    this.assert(
      scheduleAfterSchedule.length === 3,
      "getSchedule() debe devolver tres trabajos."
    );

    console.log("10. Ejecutar getSchedule():");
    console.log(scheduleAfterSchedule);

    const status =
      scheduler.getStatus();

    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const schedulerJSON =
      scheduler.toJSON();

    console.log("12. Ejecutar toJSON():");
    console.log(schedulerJSON);

    const nextJob =
      scheduler.nextJob();

    this.assert(
      nextJob === "Job A",
      "nextJob() debe devolver Job A."
    );

    console.log("13. Ejecutar nextJob() y verificar Job A:");
    console.log(nextJob);

    const sizeAfterNext =
      scheduler.size();

    this.assert(
      sizeAfterNext === 2,
      "size() debe devolver 2 despues de nextJob."
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

    const hasJobsAfterClear =
      scheduler.hasJobs();

    this.assert(
      hasJobsAfterClear === false,
      "hasJobs() debe devolver false despues de clear."
    );

    console.log("16. Ejecutar hasJobs():");
    console.log(hasJobsAfterClear);

    const sizeAfterClear =
      scheduler.size();

    this.assert(
      sizeAfterClear === 0,
      "size() debe devolver 0 despues de clear."
    );

    console.log("17. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineJobSchedulerEvents.createEngineJobSchedulerInitializedEvent(),
      EngineJobSchedulerEvents.createEngineJobScheduledEvent(jobA),
      EngineJobSchedulerEvents.createNextJobSelectedEvent(nextJob),
      EngineJobSchedulerEvents.createEngineJobSchedulerClearedEvent(),
      EngineJobSchedulerEvents.createEngineJobSchedulerResetEvent(),
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
      "EngineJobScheduler debe quedar sin inicializar tras reset."
    );
    this.assert(
      scheduler.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      scheduler.getSchedule().length === 0,
      "getSchedule() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.jobs === 0 &&
        resetJSON.hasJobs === false &&
        resetJSON.schedule.length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("20. Verificar nuevamente isInitialized(), size(), getSchedule() y toJSON():");
    console.log({
      initialized: scheduler.isInitialized(),
      size: scheduler.size(),
      schedule: scheduler.getSchedule(),
      json: resetJSON,
    });

    console.log("Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      jobA,
      jobB,
      jobC,
      peekedJob,
      sizeAfterSchedule,
      hasJobsAfterSchedule,
      scheduleAfterSchedule,
      status,
      schedulerJSON,
      nextJob,
      sizeAfterNext,
      cleared,
      hasJobsAfterClear,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE JOB SCHEDULER SANDBOX OK =====");
  }
}

new EngineJobSchedulerSandbox();

export default EngineJobSchedulerSandbox;
