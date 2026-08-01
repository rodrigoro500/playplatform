import EngineVersionManager from "./EngineVersionManager";
import EngineVersionManagerEvents from "./EngineVersionManagerEvents";

class EngineVersionManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE VERSION MANAGER SANDBOX =====");

    const manager = {};

    console.log("1. Crear un objeto simulado:");
    console.log({
      manager,
    });

    const versionManager =
      new EngineVersionManager();

    console.log("2. Crear una instancia de EngineVersionManager:");
    console.log(versionManager.toJSON());

    const initialStatus =
      versionManager.getStatus();

    this.assert(
      initialStatus.manager === false &&
        initialStatus.currentVersion === "1.0.0" &&
        initialStatus.supportedVersions === 1 &&
        initialStatus.registeredVersions === 0,
      "EngineVersionManager debe iniciar con version 1.0.0 y sin manager."
    );
    this.assert(
      versionManager.getCurrentVersion() === "1.0.0",
      "currentVersion debe iniciar en 1.0.0."
    );
    this.assert(
      versionManager.getSupportedVersions().length === 1 &&
        versionManager.getSupportedVersions().includes("1.0.0"),
      "supportedVersions debe iniciar con 1.0.0."
    );
    this.assert(
      versionManager.getVersionHistory().length === 0,
      "versionHistory debe iniciar vacio."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      status: initialStatus,
      currentVersion: versionManager.getCurrentVersion(),
      supportedVersions: versionManager.getSupportedVersions(),
      versionHistory: versionManager.getVersionHistory(),
    });

    versionManager.setManager(manager);

    console.log("4. Asignar dependencia:");
    console.log(versionManager.getStatus());

    const statusWithManager =
      versionManager.getStatus();

    this.assert(
      statusWithManager.manager === true,
      "Manager debe estar asignado."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithManager);

    versionManager.setCurrentVersion("1.1.0");

    this.assert(
      versionManager.getCurrentVersion() === "1.1.0",
      "setCurrentVersion() debe actualizar currentVersion."
    );

    console.log("6. Ejecutar setCurrentVersion(\"1.1.0\"):");
    console.log(versionManager.getCurrentVersion());

    versionManager
      .addSupportedVersion("1.1.0")
      .addSupportedVersion("2.0.0");

    const supportedVersionsAfterAdd =
      versionManager.getSupportedVersions();

    this.assert(
      supportedVersionsAfterAdd.includes("1.1.0") &&
        supportedVersionsAfterAdd.includes("2.0.0"),
      "Las versiones 1.1.0 y 2.0.0 deben quedar soportadas."
    );

    console.log("7. Ejecutar addSupportedVersion():");
    console.log(supportedVersionsAfterAdd);

    const supports110 =
      versionManager.isVersionSupported("1.1.0");
    const supports300 =
      versionManager.isVersionSupported("3.0.0");

    this.assert(
      supports110 === true,
      "1.1.0 debe estar soportada."
    );
    this.assert(
      supports300 === false,
      "3.0.0 no debe estar soportada."
    );

    console.log("8. Ejecutar isVersionSupported():");
    console.log({
      "1.1.0": supports110,
      "3.0.0": supports300,
    });

    const versionRecord =
      versionManager.registerVersion();

    this.assert(
      versionRecord.version === "1.1.0",
      "registerVersion() debe registrar la version actual."
    );

    console.log("9. Ejecutar registerVersion():");
    console.log(versionRecord);

    this.assert(
      versionManager.getVersionHistory().length === 1,
      "versionHistory debe contener un registro."
    );

    console.log("10. Verificar getVersionHistory():");
    console.log(versionManager.getVersionHistory());

    const removedSupportedVersion =
      versionManager.removeSupportedVersion("2.0.0");

    this.assert(
      removedSupportedVersion === true,
      "removeSupportedVersion() debe devolver true."
    );
    this.assert(
      !versionManager.getSupportedVersions().includes("2.0.0"),
      "2.0.0 debe quedar removida de supportedVersions."
    );

    console.log("11. Ejecutar removeSupportedVersion(\"2.0.0\"):");
    console.log(versionManager.getSupportedVersions());

    const statusAfterVersionChanges =
      versionManager.getStatus();

    console.log("12. Obtener getStatus():");
    console.log(statusAfterVersionChanges);

    const versionManagerJSON =
      versionManager.toJSON();

    console.log("13. Serializar utilizando toJSON():");
    console.log(versionManagerJSON);

    const events = [
      EngineVersionManagerEvents.createEngineVersionChangedEvent("1.1.0"),
      EngineVersionManagerEvents.createEngineSupportedVersionAddedEvent("1.1.0"),
      EngineVersionManagerEvents.createEngineSupportedVersionRemovedEvent("2.0.0"),
      EngineVersionManagerEvents.createEngineVersionRegisteredEvent(versionRecord),
      EngineVersionManagerEvents.createEngineVersionManagerResetEvent(),
    ];

    console.log("14. Crear eventos utilizando EngineVersionManagerEvents:");
    console.log(events);

    const reset =
      versionManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      versionManager.getStatus();

    this.assert(
      resetStatus.manager === false &&
        resetStatus.currentVersion === "1.0.0" &&
        resetStatus.supportedVersions === 1 &&
        resetStatus.registeredVersions === 0,
      "EngineVersionManager debe restaurar sus valores iniciales tras reset."
    );
    this.assert(
      versionManager.getCurrentVersion() === "1.0.0",
      "currentVersion debe volver a 1.0.0 tras reset."
    );
    this.assert(
      versionManager.getSupportedVersions().length === 1 &&
        versionManager.getSupportedVersions().includes("1.0.0"),
      "supportedVersions debe volver a contener solo 1.0.0 tras reset."
    );
    this.assert(
      versionManager.getVersionHistory().length === 0,
      "versionHistory debe quedar vacio tras reset."
    );

    console.log("16. Verificar nuevamente getStatus(), getCurrentVersion(), getSupportedVersions() y getVersionHistory():");
    console.log({
      status: resetStatus,
      currentVersion: versionManager.getCurrentVersion(),
      supportedVersions: versionManager.getSupportedVersions(),
      versionHistory: versionManager.getVersionHistory(),
    });

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      initialStatus,
      statusWithManager,
      supportedVersionsAfterAdd,
      supports110,
      supports300,
      versionRecord,
      removedSupportedVersion,
      statusAfterVersionChanges,
      versionManagerJSON,
      events,
      resetStatus,
    });

    console.log("===== ENGINE VERSION MANAGER SANDBOX OK =====");
  }
}

new EngineVersionManagerSandbox();

export default EngineVersionManagerSandbox;
