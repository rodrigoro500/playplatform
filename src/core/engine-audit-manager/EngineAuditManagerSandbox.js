import EngineAuditManager from "./EngineAuditManager";
import EngineAuditManagerEvents from "./EngineAuditManagerEvents";

class EngineAuditManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE AUDIT MANAGER SANDBOX =====");

    const manager = {};
    const securityManager = {};

    console.log("1. Crear objetos simulados:");
    console.log({
      manager,
      securityManager,
    });

    const auditManager =
      new EngineAuditManager();

    console.log("2. Crear una instancia de EngineAuditManager:");
    console.log(auditManager.toJSON());

    this.assert(
      auditManager.isEnabled() === true,
      "EngineAuditManager debe iniciar habilitado."
    );

    const initialStatus =
      auditManager.getStatus();

    this.assert(
      initialStatus.manager === false &&
        initialStatus.securityManager === false &&
        initialStatus.auditCount === 0,
      "EngineAuditManager debe iniciar sin dependencias ni auditorias."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      enabled: auditManager.isEnabled(),
      status: initialStatus,
    });

    auditManager
      .setManager(manager)
      .setSecurityManager(securityManager);

    const statusWithDependencies =
      auditManager.getStatus();

    this.assert(
      statusWithDependencies.manager === true &&
        statusWithDependencies.securityManager === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("4. Asignar dependencias:");
    console.log(statusWithDependencies);

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const audit =
      auditManager.registerAudit("ENGINE_STARTED", {
        module: "EngineManager",
        success: true,
      });

    this.assert(
      audit.action === "ENGINE_STARTED",
      "registerAudit() debe registrar la accion indicada."
    );
    this.assert(
      audit.enabled === true,
      "registerAudit() debe registrar si audit esta habilitado."
    );

    console.log("6. Ejecutar registerAudit():");
    console.log(audit);

    this.assert(
      auditManager.getLastAudit() === audit,
      "Debe devolver la ultima auditoria generada."
    );
    this.assert(
      auditManager.getAuditLogs().length === 1,
      "Debe existir una auditoria registrada."
    );

    console.log("7. Verificar getLastAudit() y getAuditLogs():");
    console.log({
      lastAudit: auditManager.getLastAudit(),
      auditLogs: auditManager.getAuditLogs(),
    });

    const disabled =
      auditManager.disable();

    this.assert(
      disabled === true,
      "disable() debe devolver true."
    );
    this.assert(
      auditManager.isEnabled() === false,
      "EngineAuditManager debe quedar deshabilitado."
    );

    console.log("8. Ejecutar disable() y verificar isEnabled():");
    console.log({
      disabled,
      enabled: auditManager.isEnabled(),
    });

    const enabled =
      auditManager.enable();

    this.assert(
      enabled === true,
      "enable() debe devolver true."
    );
    this.assert(
      auditManager.isEnabled() === true,
      "EngineAuditManager debe quedar habilitado."
    );

    console.log("9. Ejecutar enable() y verificar isEnabled():");
    console.log({
      enabledResult: enabled,
      enabled: auditManager.isEnabled(),
    });

    const statusAfterAudit =
      auditManager.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(statusAfterAudit);

    const auditManagerJSON =
      auditManager.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(auditManagerJSON);

    const events = [
      EngineAuditManagerEvents.createEngineAuditRegisteredEvent(audit),
      EngineAuditManagerEvents.createEngineAuditEnabledEvent(),
      EngineAuditManagerEvents.createEngineAuditDisabledEvent(),
      EngineAuditManagerEvents.createEngineAuditLogsClearedEvent(),
      EngineAuditManagerEvents.createEngineAuditManagerResetEvent(),
    ];

    console.log("12. Crear eventos utilizando EngineAuditManagerEvents:");
    console.log(events);

    const clearedAuditLogs =
      auditManager.clearAuditLogs();

    this.assert(
      clearedAuditLogs === true,
      "clearAuditLogs() debe devolver true."
    );
    this.assert(
      auditManager.getAuditLogs().length === 0,
      "auditLogs debe quedar vacio."
    );
    this.assert(
      auditManager.getLastAudit() === null,
      "lastAudit debe quedar null."
    );

    console.log("13. Ejecutar clearAuditLogs():");
    console.log({
      auditLogs: auditManager.getAuditLogs(),
      lastAudit: auditManager.getLastAudit(),
    });

    const reset =
      auditManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      auditManager.getStatus();

    this.assert(
      auditManager.isEnabled() === true,
      "EngineAuditManager debe quedar habilitado tras reset."
    );
    this.assert(
      resetStatus.manager === false &&
        resetStatus.securityManager === false &&
        resetStatus.auditCount === 0,
      "EngineAuditManager debe limpiar dependencias y auditorias tras reset."
    );
    this.assert(
      auditManager.getAuditLogs().length === 0,
      "auditLogs debe quedar vacio tras reset."
    );
    this.assert(
      auditManager.getLastAudit() === null,
      "lastAudit debe quedar null tras reset."
    );

    console.log("15. Verificar nuevamente isEnabled(), getStatus(), getAuditLogs() y getLastAudit():");
    console.log({
      enabled: auditManager.isEnabled(),
      status: resetStatus,
      auditLogs: auditManager.getAuditLogs(),
      lastAudit: auditManager.getLastAudit(),
    });

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      initialStatus,
      statusWithDependencies,
      audit,
      disabled,
      enabled,
      statusAfterAudit,
      auditManagerJSON,
      events,
      clearedAuditLogs,
      resetStatus,
    });

    console.log("===== ENGINE AUDIT MANAGER SANDBOX OK =====");
  }
}

new EngineAuditManagerSandbox();

export default EngineAuditManagerSandbox;
