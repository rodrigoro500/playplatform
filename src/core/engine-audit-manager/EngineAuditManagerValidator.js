class EngineAuditManagerValidator {
  static validateObject(
    value,
    message
  ) {
    if (
      value === null ||
      typeof value !== "object"
    ) {
      throw new Error(message);
    }
  }

  static validateManager(manager) {
    EngineAuditManagerValidator.validateObject(
      manager,
      "El manager de EngineAuditManager debe ser un objeto valido."
    );
  }

  static validateSecurityManager(securityManager) {
    EngineAuditManagerValidator.validateObject(
      securityManager,
      "El securityManager de EngineAuditManager debe ser un objeto valido."
    );
  }

  static validateBoolean(
    value,
    fieldName
  ) {
    if (typeof value !== "boolean") {
      throw new Error(
        `${fieldName} de audit debe ser boolean.`
      );
    }
  }

  static validateAudit(audit) {
    EngineAuditManagerValidator.validateObject(
      audit,
      "El audit debe ser un objeto valido."
    );

    if (
      typeof audit.id !== "number" ||
      !Number.isFinite(audit.id) ||
      audit.id <= 0
    ) {
      throw new Error(
        "El id de audit debe ser un numero mayor que cero."
      );
    }

    if (
      typeof audit.timestamp !== "string" ||
      audit.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp de audit debe ser un string no vacio."
      );
    }

    if (Number.isNaN(new Date(audit.timestamp).getTime())) {
      throw new Error(
        "El timestamp de audit debe representar una fecha valida."
      );
    }

    if (
      typeof audit.action !== "string" ||
      audit.action.trim() === ""
    ) {
      throw new Error(
        "La accion de audit debe ser un string no vacio."
      );
    }

    EngineAuditManagerValidator.validateObject(
      audit.data,
      "La data de audit debe ser un objeto no nulo."
    );

    EngineAuditManagerValidator.validateBoolean(
      audit.enabled,
      "enabled"
    );
  }

  static validateAuditLogs(auditLogs) {
    if (!Array.isArray(auditLogs)) {
      throw new Error(
        "auditLogs debe ser un Array."
      );
    }

    auditLogs.forEach(audit =>
      EngineAuditManagerValidator.validateAudit(audit)
    );
  }

  static validateEngineAuditManager(engineAuditManager) {
    EngineAuditManagerValidator.validateObject(
      engineAuditManager,
      "EngineAuditManager debe ser un objeto valido."
    );

    EngineAuditManagerValidator.validateManager(
      engineAuditManager.manager
    );
    EngineAuditManagerValidator.validateSecurityManager(
      engineAuditManager.securityManager
    );

    if (typeof engineAuditManager.auditEnabled !== "boolean") {
      throw new Error(
        "auditEnabled de EngineAuditManager debe ser boolean."
      );
    }

    EngineAuditManagerValidator.validateAuditLogs(
      engineAuditManager.auditLogs
    );

    if (engineAuditManager.lastAudit !== null) {
      EngineAuditManagerValidator.validateAudit(
        engineAuditManager.lastAudit
      );
    }
  }
}

export default EngineAuditManagerValidator;
