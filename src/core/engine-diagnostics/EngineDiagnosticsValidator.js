class EngineDiagnosticsValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineDiagnostics manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineDiagnostics manager debe ser un objeto."
      );
    }

    if (typeof manager.getSystemStatus !== "function") {
      throw new Error(
        "EngineDiagnostics manager debe implementar getSystemStatus()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineDiagnostics initialized debe ser boolean."
      );
    }
  }

  static validateEngineDiagnostics(engineDiagnostics) {
    if (
      engineDiagnostics === null ||
      typeof engineDiagnostics !== "object"
    ) {
      throw new Error(
        "EngineDiagnostics debe ser un objeto valido."
      );
    }

    EngineDiagnosticsValidator.validateManager(
      engineDiagnostics.manager
    );
    EngineDiagnosticsValidator.validateInitialized(
      engineDiagnostics.initialized
    );
  }
}

export default EngineDiagnosticsValidator;
