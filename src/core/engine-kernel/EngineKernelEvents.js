class EngineKernelEvents {
  static ENGINE_KERNEL_STARTED = "ENGINE_KERNEL_STARTED";

  static ENGINE_KERNEL_STOPPED = "ENGINE_KERNEL_STOPPED";

  static ENGINE_KERNEL_RESTARTED = "ENGINE_KERNEL_RESTARTED";

  static ENGINE_KERNEL_RESET = "ENGINE_KERNEL_RESET";

  static ENGINE_KERNEL_DEPENDENCY_SET = "ENGINE_KERNEL_DEPENDENCY_SET";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createEngineKernelStartedEvent(status) {
    return EngineKernelEvents.createEvent(
      EngineKernelEvents.ENGINE_KERNEL_STARTED,
      {
        status,
      }
    );
  }

  static createEngineKernelStoppedEvent() {
    return EngineKernelEvents.createEvent(
      EngineKernelEvents.ENGINE_KERNEL_STOPPED,
      {}
    );
  }

  static createEngineKernelRestartedEvent(status) {
    return EngineKernelEvents.createEvent(
      EngineKernelEvents.ENGINE_KERNEL_RESTARTED,
      {
        status,
      }
    );
  }

  static createEngineKernelResetEvent() {
    return EngineKernelEvents.createEvent(
      EngineKernelEvents.ENGINE_KERNEL_RESET,
      {}
    );
  }

  static createEngineKernelDependencySetEvent(
    dependency,
    value
  ) {
    return EngineKernelEvents.createEvent(
      EngineKernelEvents.ENGINE_KERNEL_DEPENDENCY_SET,
      {
        dependency,
        value,
      }
    );
  }
}

export default EngineKernelEvents;
