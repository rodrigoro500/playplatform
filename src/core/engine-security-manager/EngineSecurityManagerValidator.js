class EngineSecurityManagerValidator {
  static validateObject(
    value,
    message
  ) {
    if (
      value === null ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      throw new Error(message);
    }
  }

  static validateManager(manager) {
    EngineSecurityManagerValidator.validateObject(
      manager,
      "El manager de EngineSecurityManager debe ser un objeto valido."
    );
  }

  static validateHealthManager(healthManager) {
    EngineSecurityManagerValidator.validateObject(
      healthManager,
      "El healthManager de EngineSecurityManager debe ser un objeto valido."
    );
  }

  static validateRecoveryManager(recoveryManager) {
    EngineSecurityManagerValidator.validateObject(
      recoveryManager,
      "El recoveryManager de EngineSecurityManager debe ser un objeto valido."
    );
  }

  static validateBoolean(
    value,
    fieldName
  ) {
    if (typeof value !== "boolean") {
      throw new Error(
        `${fieldName} de security check debe ser boolean.`
      );
    }
  }

  static validateSecurityCheck(check) {
    EngineSecurityManagerValidator.validateObject(
      check,
      "El security check debe ser un objeto valido."
    );

    if (
      typeof check.id !== "number" ||
      !Number.isFinite(check.id) ||
      check.id <= 0
    ) {
      throw new Error(
        "El id de security check debe ser un numero mayor que cero."
      );
    }

    if (
      typeof check.timestamp !== "string" ||
      check.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp de security check debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(check.timestamp).getTime())) {
      throw new Error(
        "El timestamp de security check debe representar una fecha valida."
      );
    }

    EngineSecurityManagerValidator.validateBoolean(
      check.enabled,
      "enabled"
    );
    EngineSecurityManagerValidator.validateBoolean(
      check.passed,
      "passed"
    );
    EngineSecurityManagerValidator.validateBoolean(
      check.manager,
      "manager"
    );
    EngineSecurityManagerValidator.validateBoolean(
      check.healthManager,
      "healthManager"
    );
    EngineSecurityManagerValidator.validateBoolean(
      check.recoveryManager,
      "recoveryManager"
    );
  }

  static validateSecurityChecks(checks) {
    if (!Array.isArray(checks)) {
      throw new Error(
        "securityChecks debe ser un Array."
      );
    }

    checks.forEach(check =>
      EngineSecurityManagerValidator.validateSecurityCheck(check)
    );
  }

  static validateEngineSecurityManager(engineSecurityManager) {
    EngineSecurityManagerValidator.validateObject(
      engineSecurityManager,
      "EngineSecurityManager debe ser un objeto valido."
    );

    EngineSecurityManagerValidator.validateManager(
      engineSecurityManager.manager
    );
    EngineSecurityManagerValidator.validateHealthManager(
      engineSecurityManager.healthManager
    );
    EngineSecurityManagerValidator.validateRecoveryManager(
      engineSecurityManager.recoveryManager
    );

    if (typeof engineSecurityManager.securityEnabled !== "boolean") {
      throw new Error(
        "securityEnabled de EngineSecurityManager debe ser boolean."
      );
    }

    EngineSecurityManagerValidator.validateSecurityChecks(
      engineSecurityManager.securityChecks
    );

    if (engineSecurityManager.lastSecurityCheck !== null) {
      EngineSecurityManagerValidator.validateSecurityCheck(
        engineSecurityManager.lastSecurityCheck
      );
    }
  }
}

export default EngineSecurityManagerValidator;
