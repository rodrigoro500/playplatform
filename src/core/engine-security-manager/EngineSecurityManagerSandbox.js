import EngineSecurityManager from "./EngineSecurityManager";
import EngineSecurityManagerEvents from "./EngineSecurityManagerEvents";

class EngineSecurityManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE SECURITY MANAGER SANDBOX =====");

    const manager = {};
    const healthManager = {};
    const recoveryManager = {};

    console.log("1. Crear objetos simulados:");
    console.log({
      manager,
      healthManager,
      recoveryManager,
    });

    const securityManager =
      new EngineSecurityManager();

    console.log("2. Crear una instancia de EngineSecurityManager:");
    console.log(securityManager.toJSON());

    this.assert(
      securityManager.isEnabled() === true,
      "EngineSecurityManager debe iniciar habilitado."
    );

    const initialStatus =
      securityManager.getStatus();

    this.assert(
      initialStatus.manager === false &&
        initialStatus.healthManager === false &&
        initialStatus.recoveryManager === false &&
        initialStatus.securityChecks === 0,
      "EngineSecurityManager debe iniciar sin dependencias ni checks."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      enabled: securityManager.isEnabled(),
      status: initialStatus,
    });

    securityManager
      .setManager(manager)
      .setHealthManager(healthManager)
      .setRecoveryManager(recoveryManager);

    const statusWithDependencies =
      securityManager.getStatus();

    this.assert(
      statusWithDependencies.manager === true &&
        statusWithDependencies.healthManager === true &&
        statusWithDependencies.recoveryManager === true,
      "Todas las dependencias deben estar asignadas."
    );

    console.log("4. Asignar dependencias:");
    console.log(statusWithDependencies);

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithDependencies);

    const securityCheck =
      securityManager.runSecurityCheck();

    this.assert(
      securityCheck.passed === true,
      "runSecurityCheck() debe devolver passed true cuando securityEnabled es true."
    );

    console.log("6. Ejecutar runSecurityCheck():");
    console.log(securityCheck);

    this.assert(
      securityManager.getLastSecurityCheck() === securityCheck,
      "Debe devolver el ultimo security check generado."
    );
    this.assert(
      securityManager.getSecurityChecks().length === 1,
      "Debe existir un security check registrado."
    );

    console.log("7. Verificar getLastSecurityCheck() y getSecurityChecks():");
    console.log({
      lastSecurityCheck: securityManager.getLastSecurityCheck(),
      securityChecks: securityManager.getSecurityChecks(),
    });

    const disabled =
      securityManager.disable();

    this.assert(
      disabled === true,
      "disable() debe devolver true."
    );
    this.assert(
      securityManager.isEnabled() === false,
      "EngineSecurityManager debe quedar deshabilitado."
    );

    console.log("8. Ejecutar disable() y verificar isEnabled():");
    console.log({
      disabled,
      enabled: securityManager.isEnabled(),
    });

    const enabled =
      securityManager.enable();

    this.assert(
      enabled === true,
      "enable() debe devolver true."
    );
    this.assert(
      securityManager.isEnabled() === true,
      "EngineSecurityManager debe quedar habilitado."
    );

    console.log("9. Ejecutar enable() y verificar isEnabled():");
    console.log({
      enabledResult: enabled,
      enabled: securityManager.isEnabled(),
    });

    const statusAfterSecurity =
      securityManager.getStatus();

    console.log("10. Obtener getStatus():");
    console.log(statusAfterSecurity);

    const securityManagerJSON =
      securityManager.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(securityManagerJSON);

    const events = [
      EngineSecurityManagerEvents.createEngineSecurityCheckStartedEvent(),
      EngineSecurityManagerEvents.createEngineSecurityCheckCompletedEvent(
        securityCheck
      ),
      EngineSecurityManagerEvents.createEngineSecurityCheckFailedEvent(
        "Error simulado"
      ),
      EngineSecurityManagerEvents.createEngineSecurityEnabledEvent(),
      EngineSecurityManagerEvents.createEngineSecurityDisabledEvent(),
      EngineSecurityManagerEvents.createEngineSecurityManagerResetEvent(),
      EngineSecurityManagerEvents.createEngineSecurityHistoryClearedEvent(),
    ];

    console.log("12. Crear eventos utilizando EngineSecurityManagerEvents:");
    console.log(events);

    const clearedSecurityChecks =
      securityManager.clearSecurityChecks();

    this.assert(
      clearedSecurityChecks === true,
      "clearSecurityChecks() debe devolver true."
    );
    this.assert(
      securityManager.getSecurityChecks().length === 0,
      "securityChecks debe quedar vacio."
    );
    this.assert(
      securityManager.getLastSecurityCheck() === null,
      "lastSecurityCheck debe quedar null."
    );

    console.log("13. Ejecutar clearSecurityChecks():");
    console.log({
      securityChecks: securityManager.getSecurityChecks(),
      lastSecurityCheck: securityManager.getLastSecurityCheck(),
    });

    const reset =
      securityManager.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("14. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      securityManager.getStatus();

    this.assert(
      securityManager.isEnabled() === true,
      "EngineSecurityManager debe quedar habilitado tras reset."
    );
    this.assert(
      resetStatus.manager === false &&
        resetStatus.healthManager === false &&
        resetStatus.recoveryManager === false &&
        resetStatus.securityChecks === 0,
      "EngineSecurityManager debe limpiar dependencias y checks tras reset."
    );
    this.assert(
      securityManager.getSecurityChecks().length === 0,
      "securityChecks debe quedar vacio tras reset."
    );
    this.assert(
      securityManager.getLastSecurityCheck() === null,
      "lastSecurityCheck debe quedar null tras reset."
    );

    console.log("15. Verificar nuevamente isEnabled(), getStatus(), getSecurityChecks() y getLastSecurityCheck():");
    console.log({
      enabled: securityManager.isEnabled(),
      status: resetStatus,
      securityChecks: securityManager.getSecurityChecks(),
      lastSecurityCheck: securityManager.getLastSecurityCheck(),
    });

    console.log("16. Mostrar todos los resultados por consola:");
    console.log({
      initialStatus,
      statusWithDependencies,
      securityCheck,
      disabled,
      enabled,
      statusAfterSecurity,
      securityManagerJSON,
      events,
      clearedSecurityChecks,
      resetStatus,
    });

    console.log("===== ENGINE SECURITY MANAGER SANDBOX OK =====");
  }
}

new EngineSecurityManagerSandbox();

export default EngineSecurityManagerSandbox;
