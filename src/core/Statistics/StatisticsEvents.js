class StatisticsEvents {
  static STATISTIC_INCREMENTED = "STATISTIC_INCREMENTED";

  static STATISTIC_DECREMENTED = "STATISTIC_DECREMENTED";

  static STATISTIC_SET = "STATISTIC_SET";

  static STATISTIC_RESET = "STATISTIC_RESET";

  static STATISTIC_REMOVED = "STATISTIC_REMOVED";

  static STATISTICS_CLEARED = "STATISTICS_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createStatisticIncrementedEvent(
    key,
    value
  ) {
    return StatisticsEvents.createEvent(
      StatisticsEvents.STATISTIC_INCREMENTED,
      {
        key,
        value,
      }
    );
  }

  static createStatisticDecrementedEvent(
    key,
    value
  ) {
    return StatisticsEvents.createEvent(
      StatisticsEvents.STATISTIC_DECREMENTED,
      {
        key,
        value,
      }
    );
  }

  static createStatisticSetEvent(
    key,
    value
  ) {
    return StatisticsEvents.createEvent(
      StatisticsEvents.STATISTIC_SET,
      {
        key,
        value,
      }
    );
  }

  static createStatisticResetEvent(key) {
    return StatisticsEvents.createEvent(
      StatisticsEvents.STATISTIC_RESET,
      {
        key,
      }
    );
  }

  static createStatisticRemovedEvent(key) {
    return StatisticsEvents.createEvent(
      StatisticsEvents.STATISTIC_REMOVED,
      {
        key,
      }
    );
  }

  static createStatisticsClearedEvent() {
    return StatisticsEvents.createEvent(
      StatisticsEvents.STATISTICS_CLEARED,
      {}
    );
  }
}

export default StatisticsEvents;
