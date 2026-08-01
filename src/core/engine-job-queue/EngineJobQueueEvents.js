class EngineJobQueueEvents {
  static ENGINE_JOB_QUEUE_INITIALIZED = "ENGINE_JOB_QUEUE_INITIALIZED";
  static ENGINE_JOB_ENQUEUED = "ENGINE_JOB_ENQUEUED";
  static ENGINE_JOB_DEQUEUED = "ENGINE_JOB_DEQUEUED";
  static ENGINE_JOB_QUEUE_CLEARED = "ENGINE_JOB_QUEUE_CLEARED";
  static ENGINE_JOB_QUEUE_RESET = "ENGINE_JOB_QUEUE_RESET";

  static createEngineJobQueueInitializedEvent() {
    return {
      type: this.ENGINE_JOB_QUEUE_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineJobEnqueuedEvent(job) {
    return {
      type: this.ENGINE_JOB_ENQUEUED,
      timestamp: new Date().toISOString(),
      payload: {
        job,
      },
    };
  }

  static createEngineJobDequeuedEvent(job) {
    return {
      type: this.ENGINE_JOB_DEQUEUED,
      timestamp: new Date().toISOString(),
      payload: {
        job,
      },
    };
  }

  static createEngineJobQueueClearedEvent() {
    return {
      type: this.ENGINE_JOB_QUEUE_CLEARED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createEngineJobQueueResetEvent() {
    return {
      type: this.ENGINE_JOB_QUEUE_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default EngineJobQueueEvents;
