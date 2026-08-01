import EngineRuntime from "./EngineRuntime";
import EngineRuntimeEvents from "./EngineRuntimeEvents";

class EngineRuntimeSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE RUNTIME SANDBOX =====");

    const kernel = {};
    const context = {};
    const scheduler = {};
    const eventBus = {};
    const logger = {};

    console.log("1. Crear instancias simuladas:");
    console.log({
      kernel,
      context,
      scheduler,
      eventBus,
      logger,
    });

    const engineRuntime =
      new EngineRuntime();

    console.log("2. Crear una instancia de EngineRuntime:");
    console.log(engineRuntime.toJSON());

    this.assert(
      engineRuntime.isRunning() === false,
      "EngineRuntime debe iniciar sin ejecutar."
    );
    this.assert(
      engineRuntime.isPaused() === false,
      "EngineRuntime debe iniciar sin pausa."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      running: engineRuntime.isRunning(),
      paused: engineRuntime.isPaused(),
      status: engineRuntime.getStatus(),
    });

    engineRuntime
      .setKernel(kernel)
      .setContext(context)
      .setScheduler(scheduler)
      .setEventBus(eventBus)
      .setLogger(logger);

    console.log("4. Asignar dependencias:");
    console.log(engineRuntime.getStatus());

    const statusWithDependencies =
      engineRuntime.getStatus();

    this.assert(
      statusWithDependencies.kernel === true &&
        statusWithDependencies.context === true &&
        statusWithDependencies.scheduler === true &&
        statusWithDependencies.eventBus === true &&
        statusWithDependencies.logger === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const started =
      engineRuntime.start();

    this.assert(
      started === true,
      "start() debe devolver true."
    );

    console.log("6. Ejecutar start():");
    console.log(started);

    const startedStatus =
      engineRuntime.getStatus();

    this.assert(
      engineRuntime.isRunning() === true,
      "EngineRuntime debe quedar running."
    );
    this.assert(
      engineRuntime.isPaused() === false,
      "EngineRuntime no debe quedar pausado tras start."
    );

    console.log("7. Verificar isRunning(), isPaused() y getStatus():");
    console.log({
      running: engineRuntime.isRunning(),
      paused: engineRuntime.isPaused(),
      status: startedStatus,
    });

    const paused =
      engineRuntime.pause();

    this.assert(
      paused === true,
      "pause() debe devolver true."
    );

    console.log("8. Ejecutar pause():");
    console.log(paused);

    const pausedStatus =
      engineRuntime.getStatus();

    this.assert(
      engineRuntime.isPaused() === true,
      "EngineRuntime debe quedar pausado."
    );

    console.log("9. Verificar isPaused() y getStatus():");
    console.log({
      paused: engineRuntime.isPaused(),
      status: pausedStatus,
    });

    const resumed =
      engineRuntime.resume();

    this.assert(
      resumed === true,
      "resume() debe devolver true."
    );

    console.log("10. Ejecutar resume():");
    console.log(resumed);

    const resumedStatus =
      engineRuntime.getStatus();

    this.assert(
      engineRuntime.isPaused() === false,
      "EngineRuntime no debe quedar pausado tras resume."
    );

    console.log("11. Verificar isPaused() y getStatus():");
    console.log({
      paused: engineRuntime.isPaused(),
      status: resumedStatus,
    });

    const uptime =
      engineRuntime.getUptime();

    console.log("12. Obtener getUptime():");
    console.log(uptime);

    const restarted =
      engineRuntime.restart();

    this.assert(
      restarted === true,
      "restart() debe devolver true."
    );

    console.log("13. Ejecutar restart():");
    console.log(restarted);

    const restartedStatus =
      engineRuntime.getStatus();

    this.assert(
      engineRuntime.isRunning() === true,
      "EngineRuntime debe seguir running tras restart."
    );

    console.log("14. Verificar isRunning() y getStatus():");
    console.log({
      running: engineRuntime.isRunning(),
      status: restartedStatus,
    });

    const engineRuntimeJSON =
      engineRuntime.toJSON();

    console.log("15. Serializar utilizando toJSON():");
    console.log(engineRuntimeJSON);

    const events = [
      EngineRuntimeEvents.createEngineRuntimeStartedEvent(startedStatus),
      EngineRuntimeEvents.createEngineRuntimeStoppedEvent({
        running: false,
      }),
      EngineRuntimeEvents.createEngineRuntimePausedEvent(pausedStatus),
      EngineRuntimeEvents.createEngineRuntimeResumedEvent(resumedStatus),
      EngineRuntimeEvents.createEngineRuntimeRestartedEvent(restartedStatus),
      EngineRuntimeEvents.createEngineRuntimeResetEvent(),
    ];

    console.log("16. Crear eventos utilizando EngineRuntimeEvents:");
    console.log(events);

    const stopped =
      engineRuntime.stop();

    this.assert(
      stopped === true,
      "stop() debe devolver true."
    );

    console.log("17. Ejecutar stop():");
    console.log(stopped);

    this.assert(
      engineRuntime.isRunning() === false,
      "EngineRuntime debe quedar detenido."
    );

    console.log("18. Verificar isRunning():");
    console.log(engineRuntime.isRunning());

    engineRuntime.reset();

    console.log("19. Ejecutar reset():");
    console.log(engineRuntime.toJSON());

    const resetStatus =
      engineRuntime.getStatus();

    this.assert(
      engineRuntime.isRunning() === false,
      "EngineRuntime debe quedar sin ejecutar tras reset."
    );
    this.assert(
      engineRuntime.isPaused() === false,
      "EngineRuntime debe quedar sin pausa tras reset."
    );
    this.assert(
      resetStatus.kernel === false &&
        resetStatus.context === false &&
        resetStatus.scheduler === false &&
        resetStatus.eventBus === false &&
        resetStatus.logger === false,
      "Las dependencias deben quedar limpias tras reset."
    );

    console.log("20. Verificar nuevamente getStatus(), isRunning() e isPaused():");
    console.log({
      status: resetStatus,
      running: engineRuntime.isRunning(),
      paused: engineRuntime.isPaused(),
    });

    console.log("21. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      startedStatus,
      pausedStatus,
      resumedStatus,
      uptime,
      restartedStatus,
      engineRuntimeJSON,
      events,
      stopped,
      resetStatus,
    });

    console.log("===== ENGINE RUNTIME SANDBOX OK =====");
  }
}

new EngineRuntimeSandbox();

export default EngineRuntimeSandbox;
