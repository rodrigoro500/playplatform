class EngineSerializerValidator {
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
    EngineSerializerValidator.validateObject(
      manager,
      "El manager de EngineSerializer debe ser un objeto valido."
    );
  }

  static validateSerializedData(serializedData) {
    if (serializedData === null) {
      return;
    }

    if (
      typeof serializedData !== "string" ||
      serializedData.trim() === ""
    ) {
      throw new Error(
        "serializedData debe ser null o un string no vacio."
      );
    }

    try {
      JSON.parse(serializedData);
    } catch (error) {
      throw new Error(
        "serializedData debe contener JSON valido."
      );
    }
  }

  static validateTimestamp(
    timestamp,
    fieldName
  ) {
    if (timestamp === null) {
      return;
    }

    if (
      typeof timestamp !== "string" ||
      timestamp.trim() === ""
    ) {
      throw new Error(
        `${fieldName} debe ser null o un string no vacio.`
      );
    }

    if (Number.isNaN(new Date(timestamp).getTime())) {
      throw new Error(
        `${fieldName} debe representar una fecha valida.`
      );
    }
  }

  static validateExportTimestamp(timestamp) {
    EngineSerializerValidator.validateTimestamp(
      timestamp,
      "lastExport"
    );
  }

  static validateImportTimestamp(timestamp) {
    EngineSerializerValidator.validateTimestamp(
      timestamp,
      "lastImport"
    );
  }

  static validateEngineSerializer(engineSerializer) {
    EngineSerializerValidator.validateObject(
      engineSerializer,
      "EngineSerializer debe ser un objeto valido."
    );

    EngineSerializerValidator.validateManager(
      engineSerializer.manager
    );
    EngineSerializerValidator.validateSerializedData(
      engineSerializer.serializedData
    );
    EngineSerializerValidator.validateExportTimestamp(
      engineSerializer.lastExport
    );
    EngineSerializerValidator.validateImportTimestamp(
      engineSerializer.lastImport
    );
  }
}

export default EngineSerializerValidator;
