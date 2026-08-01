class EngineSerializerEvents {
  static ENGINE_SERIALIZER_EXPORT_COMPLETED = "ENGINE_SERIALIZER_EXPORT_COMPLETED";
  static ENGINE_SERIALIZER_IMPORT_COMPLETED = "ENGINE_SERIALIZER_IMPORT_COMPLETED";
  static ENGINE_SERIALIZER_CLEARED = "ENGINE_SERIALIZER_CLEARED";
  static ENGINE_SERIALIZER_RESET = "ENGINE_SERIALIZER_RESET";

  static createEngineSerializerExportCompletedEvent(serializedData) {
    return {
      type: this.ENGINE_SERIALIZER_EXPORT_COMPLETED,
      timestamp: new Date().toISOString(),
      payload: {
        serializedData,
      },
    };
  }

  static createEngineSerializerImportCompletedEvent(data) {
    return {
      type: this.ENGINE_SERIALIZER_IMPORT_COMPLETED,
      timestamp: new Date().toISOString(),
      payload: {
        data,
      },
    };
  }

  static createEngineSerializerClearedEvent() {
    return {
      type: this.ENGINE_SERIALIZER_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineSerializerResetEvent() {
    return {
      type: this.ENGINE_SERIALIZER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineSerializerEvents;
