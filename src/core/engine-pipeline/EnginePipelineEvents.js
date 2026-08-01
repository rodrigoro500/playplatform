class EnginePipelineEvents {
  static ENGINE_PIPELINE_INITIALIZED = "ENGINE_PIPELINE_INITIALIZED";
  static ENGINE_STAGE_ADDED = "ENGINE_STAGE_ADDED";
  static ENGINE_STAGE_REMOVED = "ENGINE_STAGE_REMOVED";
  static ENGINE_PIPELINE_CLEARED = "ENGINE_PIPELINE_CLEARED";
  static ENGINE_PIPELINE_RESET = "ENGINE_PIPELINE_RESET";

  static createEnginePipelineInitializedEvent() {
    return {
      type: this.ENGINE_PIPELINE_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineStageAddedEvent(stage) {
    return {
      type: this.ENGINE_STAGE_ADDED,
      timestamp: new Date().toISOString(),
      payload: {
        stage,
      },
    };
  }

  static createEngineStageRemovedEvent(stage) {
    return {
      type: this.ENGINE_STAGE_REMOVED,
      timestamp: new Date().toISOString(),
      payload: {
        stage,
      },
    };
  }

  static createEnginePipelineClearedEvent() {
    return {
      type: this.ENGINE_PIPELINE_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEnginePipelineResetEvent() {
    return {
      type: this.ENGINE_PIPELINE_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EnginePipelineEvents;
