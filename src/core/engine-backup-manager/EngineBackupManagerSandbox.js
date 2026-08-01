import EngineBackupManager from "./EngineBackupManager";
import EngineBackupManagerEvents from "./EngineBackupManagerEvents";

class EngineBackupManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE BACKUP MANAGER SANDBOX =====");

    const manager = {
      toJSON() {
        return {
          engine: "running",
          version: "1.0.0",
          modules: 41,
        };
      },
    };

    console.log("1. Crear un EngineManager simulado:");
    console.log(manager);

    const backupManager =
      new EngineBackupManager();

    console.log("2. Crear una instancia de EngineBackupManager:");
    console.log(backupManager.toJSON());

    this.assert(
      backupManager.isInitialized() === false,
      "EngineBackupManager debe iniciar sin inicializar."
    );

    const initialJSON =
      backupManager.toJSON();

    this.assert(
      initialJSON.initialized === false &&
        initialJSON.backups === 0,
      "EngineBackupManager debe iniciar sin backups."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      initialized: backupManager.isInitialized(),
      json: initialJSON,
    });

    backupManager.setManager(manager);

    console.log("4. Ejecutar setManager():");
    console.log(backupManager.getStatus());

    const initialized =
      backupManager.initialize();

    this.assert(
      initialized === true,
      "initialize() debe devolver true."
    );
    this.assert(
      backupManager.isInitialized() === true,
      "EngineBackupManager debe quedar inicializado."
    );

    console.log("5. Ejecutar initialize() y verificar isInitialized():");
    console.log({
      initialized,
      isInitialized: backupManager.isInitialized(),
    });

    const backup =
      backupManager.createBackup();

    this.assert(
      backup.id === 1,
      "El primer backup debe tener id 1."
    );
    this.assert(
      backup.snapshot.engine === "running" &&
        backup.snapshot.version === "1.0.0" &&
        backup.snapshot.modules === 41,
      "createBackup() debe guardar el snapshot del manager."
    );

    console.log("6. Ejecutar createBackup():");
    console.log(backup);

    const backups =
      backupManager.getBackups();

    this.assert(
      backups.length === 1,
      "getBackups() debe devolver un backup."
    );

    console.log("7. Obtener getBackups():");
    console.log(backups);

    const restoredSnapshot =
      backupManager.restoreBackup(1);

    this.assert(
      restoredSnapshot === backup.snapshot,
      "restoreBackup(1) debe devolver el snapshot almacenado."
    );

    console.log("8. Ejecutar restoreBackup(1):");
    console.log(restoredSnapshot);

    const status =
      backupManager.getStatus();

    console.log("9. Obtener getStatus():");
    console.log(status);

    const backupManagerJSON =
      backupManager.toJSON();

    console.log("10. Serializar utilizando toJSON():");
    console.log(backupManagerJSON);

    const removedBackup =
      backupManager.removeBackup(1);

    this.assert(
      removedBackup === true,
      "removeBackup(1) debe devolver true."
    );
    this.assert(
      backupManager.getBackups().length === 0,
      "getBackups() debe quedar vacio tras remover."
    );

    console.log("11. Ejecutar removeBackup(1) y verificar getBackups():");
    console.log({
      removedBackup,
      backups: backupManager.getBackups(),
    });

    const events = [
      EngineBackupManagerEvents.createEngineBackupManagerInitializedEvent(),
      EngineBackupManagerEvents.createEngineBackupCreatedEvent(backup),
      EngineBackupManagerEvents.createEngineBackupRestoredEvent(backup),
      EngineBackupManagerEvents.createEngineBackupRemovedEvent(1),
      EngineBackupManagerEvents.createEngineBackupManagerResetEvent(),
    ];

    console.log("12. Crear eventos utilizando EngineBackupManagerEvents:");
    console.log(events);

    const reset =
      backupManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("13. Ejecutar reset():");
    console.log(reset);

    const resetJSON =
      backupManager.toJSON();

    this.assert(
      backupManager.isInitialized() === false,
      "EngineBackupManager debe quedar sin inicializar tras reset."
    );
    this.assert(
      backupManager.getBackups().length === 0,
      "getBackups() debe quedar vacio tras reset."
    );
    this.assert(
      resetJSON.initialized === false &&
        resetJSON.backups === 0,
      "toJSON() debe reflejar el estado reiniciado."
    );

    console.log("14. Verificar nuevamente isInitialized(), getBackups() y toJSON():");
    console.log({
      initialized: backupManager.isInitialized(),
      backups: backupManager.getBackups(),
      json: resetJSON,
    });

    console.log("15. Mostrar todos los resultados por consola:");
    console.log({
      initialJSON,
      initialized,
      backup,
      backups,
      restoredSnapshot,
      status,
      backupManagerJSON,
      removedBackup,
      events,
      reset,
      resetJSON,
    });

    console.log("===== ENGINE BACKUP MANAGER SANDBOX OK =====");
  }
}

new EngineBackupManagerSandbox();

export default EngineBackupManagerSandbox;
