class TimerEvents {
  static TIMER_CREATED = "TIMER_CREATED";

  static TIMER_STARTED = "TIMER_STARTED";

  static TIMER_PAUSED = "TIMER_PAUSED";

  static TIMER_RESUMED = "TIMER_RESUMED";

  static TIMER_COMPLETED = "TIMER_COMPLETED";

  static TIMER_CANCELLED = "TIMER_CANCELLED";

  static TIMER_REMOVED = "TIMER_REMOVED";

  static TIMERS_CLEARED = "TIMERS_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createTimerCreatedEvent(timer) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_CREATED,
      {
        timer,
      }
    );
  }

  static createTimerStartedEvent(timerId) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_STARTED,
      {
        timerId,
      }
    );
  }

  static createTimerPausedEvent(timerId) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_PAUSED,
      {
        timerId,
      }
    );
  }

  static createTimerResumedEvent(timerId) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_RESUMED,
      {
        timerId,
      }
    );
  }

  static createTimerCompletedEvent(timerId) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_COMPLETED,
      {
        timerId,
      }
    );
  }

  static createTimerCancelledEvent(timerId) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_CANCELLED,
      {
        timerId,
      }
    );
  }

  static createTimerRemovedEvent(timerId) {
    return TimerEvents.createEvent(
      TimerEvents.TIMER_REMOVED,
      {
        timerId,
      }
    );
  }

  static createTimersClearedEvent() {
    return TimerEvents.createEvent(
      TimerEvents.TIMERS_CLEARED,
      {}
    );
  }
}

export default TimerEvents;
