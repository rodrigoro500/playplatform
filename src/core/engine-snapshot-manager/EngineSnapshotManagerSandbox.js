import EngineSnapshotManager from "./EngineSnapshotManager";
import EngineSnapshotManagerEvents from "./EngineSnapshotManagerEvents";

class EngineSnapshotManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE SNAPSHOT MANAGER SANDBOX =====");

    const manager = {};

    console.log("1. Crear un objeto simulado:");
    console.log({
      manager,
    });

    const snapshotManager =
      new EngineSnapshotManager();

    console.log("2. Crear una instancia de EngineSnapshotManager:");
    console.log(snapshotManager.toJSON());

    const initialStatus =
      snapshotManager.getStatus();

    this.assert(
      initialStatus.manager === false &&
        initialStatus.snapshotCount === 0 &&
        initialStatus.hasLastSnapshot === false,
      "EngineSnapshotManager debe iniciar sin manager ni snapshots."
    );
    this.assert(
      snapshotManager.getSnapshots().length === 0,
      "snapshots debe iniciar vacio."
    );
    this.assert(
      snapshotManager.getLastSnapshot() === null,
      "lastSnapshot debe iniciar null."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      status: initialStatus,
      snapshots: snapshotManager.getSnapshots(),
      lastSnapshot: snapshotManager.getLastSnapshot(),
    });

    snapshotManager.setManager(manager);

    console.log("4. Asignar dependencia:");
    console.log(snapshotManager.getStatus());

    const statusWithManager =
      snapshotManager.getStatus();

    this.assert(
      statusWithManager.manager === true,
      "Manager debe estar asignado."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithManager);

    const snapshot =
      snapshotManager.createSnapshot({
        engine: "Core",
        version: "1.0.0",
        state: "READY",
      });

    this.assert(
      snapshot.id === 1,
      "El primer snapshot debe tener id 1."
    );

    console.log("6. Ejecutar createSnapshot():");
    console.log(snapshot);

    this.assert(
      snapshotManager.getLastSnapshot() === snapshot,
      "Debe devolver el ultimo snapshot creado."
    );
    this.assert(
      snapshotManager.getSnapshots().length === 1,
      "Debe existir un snapshot registrado."
    );

    console.log("7. Verificar getLastSnapshot() y getSnapshots():");
    console.log({
      lastSnapshot: snapshotManager.getLastSnapshot(),
      snapshots: snapshotManager.getSnapshots(),
    });

    const foundSnapshot =
      snapshotManager.getSnapshot(snapshot.id);

    this.assert(
      foundSnapshot === snapshot,
      "getSnapshot() debe devolver el mismo snapshot."
    );

    console.log("8. Ejecutar getSnapshot(snapshot.id):");
    console.log(foundSnapshot);

    const restoredSnapshot =
      snapshotManager.restoreSnapshot(snapshot.id);

    this.assert(
      restoredSnapshot === snapshot,
      "restoreSnapshot() debe devolver el snapshot restaurado."
    );
    this.assert(
      snapshotManager.getLastSnapshot() === snapshot,
      "lastSnapshot debe ser el snapshot restaurado."
    );

    console.log("9. Ejecutar restoreSnapshot(snapshot.id):");
    console.log({
      restoredSnapshot,
      lastSnapshot: snapshotManager.getLastSnapshot(),
    });

    const deletedSnapshot =
      snapshotManager.deleteSnapshot(snapshot.id);

    this.assert(
      deletedSnapshot === true,
      "deleteSnapshot() debe devolver true."
    );
    this.assert(
      snapshotManager.getSnapshots().length === 0,
      "snapshots debe quedar vacio tras eliminar."
    );
    this.assert(
      snapshotManager.getLastSnapshot() === null,
      "lastSnapshot debe quedar null si se elimina el ultimo snapshot."
    );

    console.log("10. Ejecutar deleteSnapshot(snapshot.id):");
    console.log({
      deletedSnapshot,
      snapshots: snapshotManager.getSnapshots(),
      lastSnapshot: snapshotManager.getLastSnapshot(),
    });

    const snapshotA =
      snapshotManager.createSnapshot({
        engine: "Core",
        state: "RUNNING",
      });
    const snapshotB =
      snapshotManager.createSnapshot({
        engine: "Core",
        state: "PAUSED",
      });

    this.assert(
      snapshotManager.getSnapshots().length === 2,
      "Deben existir dos nuevos snapshots."
    );

    console.log("11. Crear dos nuevos snapshots:");
    console.log({
      snapshotA,
      snapshotB,
    });

    const clearedSnapshots =
      snapshotManager.clearSnapshots();

    this.assert(
      clearedSnapshots === true,
      "clearSnapshots() debe devolver true."
    );
    this.assert(
      snapshotManager.getSnapshots().length === 0,
      "snapshots debe quedar vacio."
    );
    this.assert(
      snapshotManager.getLastSnapshot() === null,
      "lastSnapshot debe quedar null."
    );

    console.log("12. Ejecutar clearSnapshots():");
    console.log({
      snapshots: snapshotManager.getSnapshots(),
      lastSnapshot: snapshotManager.getLastSnapshot(),
    });

    const snapshotManagerJSON =
      snapshotManager.toJSON();

    console.log("13. Serializar utilizando toJSON():");
    console.log(snapshotManagerJSON);

    const events = [
      EngineSnapshotManagerEvents.createEngineSnapshotCreatedEvent(snapshot),
      EngineSnapshotManagerEvents.createEngineSnapshotRestoredEvent(snapshot),
      EngineSnapshotManagerEvents.createEngineSnapshotDeletedEvent(snapshot.id),
      EngineSnapshotManagerEvents.createEngineSnapshotsClearedEvent(),
      EngineSnapshotManagerEvents.createEngineSnapshotManagerResetEvent(),
    ];

    console.log("14. Crear eventos utilizando EngineSnapshotManagerEvents:");
    console.log(events);

    const reset =
      snapshotManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("15. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      snapshotManager.getStatus();

    this.assert(
      resetStatus.manager === false &&
        resetStatus.snapshotCount === 0 &&
        resetStatus.hasLastSnapshot === false,
      "EngineSnapshotManager debe limpiar manager y snapshots tras reset."
    );
    this.assert(
      snapshotManager.getSnapshots().length === 0,
      "snapshots debe quedar vacio tras reset."
    );
    this.assert(
      snapshotManager.getLastSnapshot() === null,
      "lastSnapshot debe quedar null tras reset."
    );

    console.log("16. Verificar nuevamente getStatus(), getSnapshots() y getLastSnapshot():");
    console.log({
      status: resetStatus,
      snapshots: snapshotManager.getSnapshots(),
      lastSnapshot: snapshotManager.getLastSnapshot(),
    });

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      initialStatus,
      statusWithManager,
      snapshot,
      foundSnapshot,
      restoredSnapshot,
      deletedSnapshot,
      snapshotA,
      snapshotB,
      clearedSnapshots,
      snapshotManagerJSON,
      events,
      resetStatus,
    });

    console.log("===== ENGINE SNAPSHOT MANAGER SANDBOX OK =====");
  }
}

new EngineSnapshotManagerSandbox();

export default EngineSnapshotManagerSandbox;
