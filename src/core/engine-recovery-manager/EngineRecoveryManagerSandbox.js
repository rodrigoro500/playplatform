import EngineRecoveryManager from "./EngineRecoveryManager";
import EngineRecoveryManagerEvents from "./EngineRecoveryManagerEvents";

class EngineRecoveryManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE RECOVERY MANAGER SANDBOX =====");

    const manager = {};
    const healthManager = {};
    const snapshotManager = {};

    console.log("1. Crear objetos simulados:");
    console.log({
      manager,
      healthManager,
      snapshotManager,
    });

    const recoveryManager =
      new EngineRecoveryManager();

    console.log("2. Crear una instancia de EngineRecoveryManager:");
    console.log(recoveryManager.toJSON());

    this.assert(
      recoveryManager.canRecover() === false,
      "EngineRecoveryManager no debe poder recuperar sin dependencias."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      canRecover: recoveryManager.canRecover(),
      status: recoveryManager.getStatus(),
    });

    recoveryManager
      .setManager(manager)
      .setHealthManager(healthManager)
      .setSnapshotManager(snapshotManager);

    console.log("4. Asignar dependencias:");
    console.log(recoveryManager.getStatus());

    const statusWithDependencies =
      recoveryManager.getStatus();

    this.assert(
      statusWithDependencies.manager === true &&
        statusWithDependencies.healthManager === true &&
        statusWithDependencies.snapshotManager === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const recovery =
      recoveryManager.recover();

    this.assert(
      recovery.success === true,
      "recover() debe devolver success true."
    );

    console.log("6. Ejecutar recover():");
    console.log(recovery);

    this.assert(
      recoveryManager.canRecover() === true,
      "EngineRecoveryManager debe poder recuperar."
    );
    this.assert(
      recoveryManager.getLastRecovery() === recovery,
      "Debe devolver el ultimo recovery generado."
    );
    this.assert(
      recoveryManager.getRecoveryHistory().length === 1,
      "El historial debe tener un recovery."
    );

    console.log("7. Verificar canRecover(), getLastRecovery() y getRecoveryHistory():");
    console.log({
      canRecover: recoveryManager.canRecover(),
      lastRecovery: recoveryManager.getLastRecovery(),
      recoveryHistory: recoveryManager.getRecoveryHistory(),
    });

    const statusAfterRecovery =
      recoveryManager.getStatus();

    console.log("8. Obtener getStatus():");
    console.log(statusAfterRecovery);

    const recoveryManagerJSON =
      recoveryManager.toJSON();

    console.log("9. Serializar utilizando toJSON():");
    console.log(recoveryManagerJSON);

    const events = [
      EngineRecoveryManagerEvents.createEngineRecoveryStartedEvent(),
      EngineRecoveryManagerEvents.createEngineRecoveryCompletedEvent(recovery),
      EngineRecoveryManagerEvents.createEngineRecoveryFailedEvent(
        "Error simulado"
      ),
      EngineRecoveryManagerEvents.createEngineRecoveryManagerResetEvent(),
      EngineRecoveryManagerEvents.createEngineRecoveryHistoryClearedEvent(),
    ];

    console.log("10. Crear eventos utilizando EngineRecoveryManagerEvents:");
    console.log(events);

    const clearedHistory =
      recoveryManager.clearHistory();

    this.assert(
      clearedHistory === true,
      "clearHistory() debe devolver true."
    );
    this.assert(
      recoveryManager.getRecoveryHistory().length === 0,
      "El historial debe quedar vacio."
    );
    this.assert(
      recoveryManager.getLastRecovery() === null,
      "lastRecovery debe quedar null."
    );

    console.log("11. Ejecutar clearHistory():");
    console.log({
      recoveryHistory: recoveryManager.getRecoveryHistory(),
      lastRecovery: recoveryManager.getLastRecovery(),
    });

    const reset =
      recoveryManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("12. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      recoveryManager.getStatus();

    this.assert(
      recoveryManager.canRecover() === false,
      "EngineRecoveryManager no debe poder recuperar tras reset."
    );
    this.assert(
      recoveryManager.getRecoveryHistory().length === 0,
      "El historial debe quedar vacio tras reset."
    );
    this.assert(
      recoveryManager.getLastRecovery() === null,
      "lastRecovery debe quedar null tras reset."
    );

    console.log("13. Verificar nuevamente canRecover(), getStatus(), getRecoveryHistory() y getLastRecovery():");
    console.log({
      canRecover: recoveryManager.canRecover(),
      status: resetStatus,
      recoveryHistory: recoveryManager.getRecoveryHistory(),
      lastRecovery: recoveryManager.getLastRecovery(),
    });

    console.log("14. Mostrar todos los resultados por consola:");
    console.log({
      statusWithDependencies,
      recovery,
      statusAfterRecovery,
      recoveryManagerJSON,
      events,
      clearedHistory,
      resetStatus,
    });

    console.log("===== ENGINE RECOVERY MANAGER SANDBOX OK =====");
  }
}

new EngineRecoveryManagerSandbox();

export default EngineRecoveryManagerSandbox;
