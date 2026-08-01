class SchedulerEvents {
  static TASK_SCHEDULED = "TASK_SCHEDULED";

  static TASK_STARTED = "TASK_STARTED";

  static TASK_COMPLETED = "TASK_COMPLETED";

  static TASK_CANCELLED = "TASK_CANCELLED";

  static ALL_TASKS_CANCELLED = "ALL_TASKS_CANCELLED";

  static SCHEDULER_CLEARED = "SCHEDULER_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createTaskScheduledEvent(task) {
    return SchedulerEvents.createEvent(
      SchedulerEvents.TASK_SCHEDULED,
      {
        task,
      }
    );
  }

  static createTaskStartedEvent(taskId) {
    return SchedulerEvents.createEvent(
      SchedulerEvents.TASK_STARTED,
      {
        taskId,
      }
    );
  }

  static createTaskCompletedEvent(taskId) {
    return SchedulerEvents.createEvent(
      SchedulerEvents.TASK_COMPLETED,
      {
        taskId,
      }
    );
  }

  static createTaskCancelledEvent(taskId) {
    return SchedulerEvents.createEvent(
      SchedulerEvents.TASK_CANCELLED,
      {
        taskId,
      }
    );
  }

  static createAllTasksCancelledEvent() {
    return SchedulerEvents.createEvent(
      SchedulerEvents.ALL_TASKS_CANCELLED,
      {}
    );
  }

  static createSchedulerClearedEvent() {
    return SchedulerEvents.createEvent(
      SchedulerEvents.SCHEDULER_CLEARED,
      {}
    );
  }
}

export default SchedulerEvents;
