class EngineContextEvents {
  static CONTEXT_ENTRY_CREATED = "CONTEXT_ENTRY_CREATED";

  static CONTEXT_ENTRY_UPDATED = "CONTEXT_ENTRY_UPDATED";

  static CONTEXT_ENTRY_REMOVED = "CONTEXT_ENTRY_REMOVED";

  static CONTEXT_METADATA_UPDATED = "CONTEXT_METADATA_UPDATED";

  static ENGINE_CONTEXT_CLEARED = "ENGINE_CONTEXT_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createContextEntryCreatedEvent(entry) {
    return EngineContextEvents.createEvent(
      EngineContextEvents.CONTEXT_ENTRY_CREATED,
      {
        entry,
      }
    );
  }

  static createContextEntryUpdatedEvent(entry) {
    return EngineContextEvents.createEvent(
      EngineContextEvents.CONTEXT_ENTRY_UPDATED,
      {
        entry,
      }
    );
  }

  static createContextEntryRemovedEvent(key) {
    return EngineContextEvents.createEvent(
      EngineContextEvents.CONTEXT_ENTRY_REMOVED,
      {
        key,
      }
    );
  }

  static createContextMetadataUpdatedEvent(
    key,
    metadata
  ) {
    return EngineContextEvents.createEvent(
      EngineContextEvents.CONTEXT_METADATA_UPDATED,
      {
        key,
        metadata,
      }
    );
  }

  static createEngineContextClearedEvent() {
    return EngineContextEvents.createEvent(
      EngineContextEvents.ENGINE_CONTEXT_CLEARED,
      {}
    );
  }
}

export default EngineContextEvents;
