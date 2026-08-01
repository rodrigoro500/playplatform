class EngineProfilerEvents {
  static ENGINE_PROFILER_INITIALIZED = "ENGINE_PROFILER_INITIALIZED";
  static ENGINE_PROFILE_STARTED = "ENGINE_PROFILE_STARTED";
  static ENGINE_PROFILE_FINISHED = "ENGINE_PROFILE_FINISHED";
  static ENGINE_PROFILES_CLEARED = "ENGINE_PROFILES_CLEARED";
  static ENGINE_PROFILER_RESET = "ENGINE_PROFILER_RESET";

  static createEngineProfilerInitializedEvent() {
    return {
      type: this.ENGINE_PROFILER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineProfileStartedEvent(profile) {
    return {
      type: this.ENGINE_PROFILE_STARTED,
      timestamp: new Date().toISOString(),
      payload: {
        profile,
      },
    };
  }

  static createEngineProfileFinishedEvent(profile) {
    return {
      type: this.ENGINE_PROFILE_FINISHED,
      timestamp: new Date().toISOString(),
      payload: {
        profile,
      },
    };
  }

  static createEngineProfilesClearedEvent() {
    return {
      type: this.ENGINE_PROFILES_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineProfilerResetEvent() {
    return {
      type: this.ENGINE_PROFILER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineProfilerEvents;
