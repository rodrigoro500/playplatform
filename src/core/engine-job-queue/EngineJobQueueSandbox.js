import EngineJobQueue from "./EngineJobQueue";
import EngineJobQueueEvents from "./EngineJobQueueEvents";

class EngineJobQueueSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE JOB QUEUE SANDBOX =====");

    const manager = {};

    console.log("1. Crear manager simulado:");
    console.log(manager);

    const jobQueue =
      new EngineJobQueue();

    console.log("2. Crear EngineJobQueue:");
    console.log(jobQueue.toJSON());

    this.assert(
      jobQueue.isInitialized() === false,
      "EngineJobQueue debe iniciar sin inicializar."
    );

    const initialJSON =
      jobQueue.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.jobs === 0 &&
        initialJSON.hasJobs === false &&
        initialJSON.queue.length === 0,
      "EngineJobQueue debe iniciar con cola vacia."
    );

    console.log("3. Verificar isInitialized() y toJSON():");
    console.log({
      initialized: jobQueue.isInitialized(),
      json: initialJSON,
    });

    jobQueue.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(jobQueue.getStatus());

    const initialized =
      jobQueue.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      jobQueue.isInitialized() === true,
      "EngineJobQueue debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize():");
    console.log({
      initialized,
      isInitialized: jobQueue.isInitialized(),
    });

    const jobA =
      jobQueue.enqueue("Job A");
    const jobB =
      jobQueue.enqueue("Job B");
    const jobC =
      jobQueue.enqueue("Job C");

    console.log("6. Ejecutar enqueue():");
    console.log({
      jobA,
      jobB,
      jobC,
    });

    const peekedJob =
      jobQueue.peek();

    this.assert(
      peekedJob === "Job A",
      "peek() debe devolver el primer job sin removerlo."
    );

    console.log("7. Ejecutar peek():");
    console.log(peekedJob);

    const sizeAfterEnqueue =
      jobQueue.size();

    this.assert(
      sizeAfterEnqueue === 3,
      "size() debe devolver 3 despues de enqueue."
    );

    console.log("8. Ejecutar size():");
    console.log(sizeAfterEnqueue);

    const hasJobsAfterEnqueue =
      jobQueue.hasJobs();

    this.assert(
      hasJobsAfterEnqueue === true,
      "hasJobs() debe devolver true con trabajos en cola."
    );

    console.log("9. Ejecutar hasJobs():");
    console.log(hasJobsAfterEnqueue);

    const jobsAfterEnqueue =
      jobQueue.getJobs();

    this.assert(
      jobsAfterEnqueue.length === 3,
      "getJobs() debe devolver tres trabajos."
    );

    console.log("10. Ejecutar getJobs():");
    console.log(jobsAfterEnqueue);

    const status =
      jobQueue.getStatus();

    console.log("11. Ejecutar getStatus():");
    console.log(status);

    const queueJSON =
      jobQueue.toJSON();

    console.log("12. Ejecutar toJSON():");
    console.log(queueJSON);

    const dequeuedJob =
      jobQueue.dequeue();

    this.assert(
      dequeuedJob === "Job A",
      "dequeue() debe respetar FIFO y devolver Job A."
    );

    console.log("13. Ejecutar dequeue() y verificar FIFO:");
    console.log(dequeuedJob);

    const sizeAfterDequeue =
      jobQueue.size();

    this.assert(
      sizeAfterDequeue === 2,
      "size() debe devolver 2 despues de dequeue."
    );

    console.log("14. Ejecutar size():");
    console.log(sizeAfterDequeue);

    const cleared =
      jobQueue.clear();

    this.assert(
      cleared === true,
      "clear() debe devolver true."
    );

    console.log("15. Ejecutar clear():");
    console.log(cleared);

    const hasJobsAfterClear =
      jobQueue.hasJobs();

    this.assert(
      hasJobsAfterClear === false,
      "hasJobs() debe devolver false despues de clear."
    );

    console.log("16. Ejecutar hasJobs():");
    console.log(hasJobsAfterClear);

    const sizeAfterClear =
      jobQueue.size();

    this.assert(
      sizeAfterClear === 0,
      "size() debe devolver 0 despues de clear."
    );

    console.log("17. Ejecutar size():");
    console.log(sizeAfterClear);

    const events = [
      EngineJobQueueEvents.createEngineJobQueueInitializedEvent(),
      EngineJobQueueEvents.createEngineJobEnqueuedEvent(jobA),
      EngineJobQueueEvents.createEngineJobDequeuedEvent(dequeuedJob),
      EngineJobQueueEvents.createEngineJobQueueClearedEvent(),
      EngineJobQueueEvents.createEngineJobQueueResetEvent(),
    ];

    console.log("18. Crear eventos:");
    console.log(events);

    const reset =
      jobQueue.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("19. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      jobQueue.toJSON();

    this.assert(
      jobQueue.isInitialized() === false,
      "EngineJobQueue debe quedar sin inicializar tras reset."
    );
    this.assert(
      jobQueue.size() === 0,
      "size() debe quedar en 0 tras reset."
    );
    this.assert(
      jobQueue.getJobs().length === 0,
      "getJobs() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.jobs === 0 &&
        resetJSON.hasJobs === false &&
        resetJSON.queue.length === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("20. Verificar nuevamente isInitialized(), size(), getJobs() y toJSON():");
    console.log({
      initialized: jobQueue.isInitialized(),
      size: jobQueue.size(),
      jobs: jobQueue.getJobs(),
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
      sizeAfterEnqueue,
      hasJobsAfterEnqueue,
      jobsAfterEnqueue,
      status,
      queueJSON,
      dequeuedJob,
      sizeAfterDequeue,
      cleared,
      hasJobsAfterClear,
      sizeAfterClear,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE JOB QUEUE SANDBOX OK =====");
  }
}

new EngineJobQueueSandbox();

export default EngineJobQueueSandbox;
