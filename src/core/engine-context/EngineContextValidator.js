class EngineContextValidator {
  static validateText(value, message) {
    if (typeof value !== "string") {
      throw new Error(message);
    }

    if (value.trim() === "") {
      throw new Error(message);
    }
  }

  static validateEntry(entry) {
    if (
      entry === null ||
      typeof entry !== "object" ||
      Array.isArray(entry)
    ) {
      throw new Error(
        "La entrada de contexto debe ser un objeto valido."
      );
    }

    EngineContextValidator.validateText(
      entry.key,
      "La clave de contexto debe ser un string no vacio."
    );
    EngineContextValidator.validateMetadata(
      entry.metadata
    );
    EngineContextValidator.validateText(
      entry.createdAt,
      "El createdAt de contexto debe ser un string no vacio."
    );
    EngineContextValidator.validateText(
      entry.updatedAt,
      "El updatedAt de contexto debe ser un string no vacio."
    );
  }

  static validateContext(context) {
    if (!(context instanceof Map)) {
      throw new Error(
        "El contexto debe ser una instancia de Map."
      );
    }

    context.forEach(entry =>
      EngineContextValidator.validateEntry(entry)
    );
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata de contexto debe ser un objeto valido."
      );
    }
  }

  static validateEngineContext(engineContext) {
    if (
      engineContext === null ||
      typeof engineContext !== "object" ||
      Array.isArray(engineContext)
    ) {
      throw new Error(
        "El EngineContext debe ser un objeto valido."
      );
    }

    EngineContextValidator.validateContext(
      engineContext.context
    );
  }
}

export default EngineContextValidator;
