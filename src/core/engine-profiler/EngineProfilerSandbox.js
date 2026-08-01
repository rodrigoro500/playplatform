import EngineProfiler from "./EngineProfiler";
import EngineProfilerEvents from "./EngineProfilerEvents";

class EngineProfilerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  wait(milliseconds) {
    const endTime = Date.now() + milliseconds;

    while (Date.now() < endTime) {
      // Simulacion simple para generar duracion medible.
    }
  }

  run() {
    console.log("===== ENGINE PROFILER SANDBOX =====");

    const manager = {};

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const profiler =
      new EngineProfiler();

    console.log("2. Crear una instancia de EngineProfiler:");
    console.log(profiler.toJSON());

    this.assert(
      profiler.isInitialized() === false,
      "EngineProfiler debe iniciar sin inicializar."
    );

    const initialJSON =
      profiler.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.profiles === 0,
      "EngineProfiler debe iniciar sin perfiles."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: profiler.isInitialized(),
      json: initialJSON,
    });

    profiler.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(profiler.getStatus());

    const initialized =
      profiler.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      profiler.isInitialized() === true,
      "EngineProfiler debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: profiler.isInitialized(),
    });

    const startedProfile =
      profiler.startProfile("engine-startup");

    this.assert(
      startedProfile.name === "engine-startup" &&
        startedProfile.endTime === null &&
        startedProfile.duration === null,
      "startProfile() debe crear un perfil abierto."
    );

    console.log("6. Ejecutar startProfile(\"engine-startup\"):");
    console.log(startedProfile);

    this.wait(5);

    console.log("7. Esperar unos milisegundos:");
    console.log({
      waited: true,
    });

    const finishedProfile =
      profiler.endProfile("engine-startup");

    this.assert(
      finishedProfile === startedProfile,
      "endProfile() debe finalizar el perfil abierto."
    );
    this.assert(
      typeof finishedProfile.endTime === "number" &&
        typeof finishedProfile.duration === "number" &&
        finishedProfile.duration >= 0,
      "El perfil finalizado debe tener endTime y duration."
    );

    console.log("8. Ejecutar endProfile(\"engine-startup\"):");
    console.log(finishedProfile);

    const profiles =
      profiler.getProfiles();

    this.assert(
      profiles.length === 1,
      "getProfiles() debe devolver un perfil."
    );

    console.log("9. Obtener getProfiles():");
    console.log(profiles);

    const status =
      profiler.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(status);

    const profilerJSON =
      profiler.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(profilerJSON);

    const clearedProfiles =
      profiler.clearProfiles();

    this.assert(
      clearedProfiles === true,
      "clearProfiles() debe devolver true."
    );
    this.assert(
      profiler.getProfiles().length === 0,
      "profiles debe quedar vacio."
    );

    console.log("12. Ejecutar clearProfiles() y verificar getProfiles():");
    console.log({
      clearedProfiles,
      profiles: profiler.getProfiles(),
    });

    const events = [
      EngineProfilerEvents.createEngineProfilerInitializedEvent(),
      EngineProfilerEvents.createEngineProfileStartedEvent(startedProfile),
      EngineProfilerEvents.createEngineProfileFinishedEvent(finishedProfile),
      EngineProfilerEvents.createEngineProfilesClearedEvent(),
      EngineProfilerEvents.createEngineProfilerResetEvent(),
    ];

    console.log("13. Crear eventos utilizando EngineProfilerEvents:");
    console.log(events);

    const reset =
      profiler.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      profiler.toJSON();

    this.assert(
      profiler.isInitialized() === false,
      "EngineProfiler debe quedar sin inicializar tras reset."
    );
    this.assert(
      profiler.getProfiles().length === 0,
      "profiles debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.profiles === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("15. Verificar nuevamente isInitialized(), getProfiles() y toJSON():");
    console.log({
      initialized: profiler.isInitialized(),
      profiles: profiler.getProfiles(),
      json: resetJSON,
    });

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      startedProfile,
      finishedProfile,
      profiles,
      status,
      profilerJSON,
      clearedProfiles,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE PROFILER SANDBOX OK =====");
  }
}

new EngineProfilerSandbox();

export default EngineProfilerSandbox;
