class EventBusEvents {
  static LISTENER_SUBSCRIBED = "LISTENER_SUBSCRIBED";

  static LISTENER_UNSUBSCRIBED = "LISTENER_UNSUBSCRIBED";

  static EVENT_PUBLISHED = "EVENT_PUBLISHED";

  static EVENTBUS_CLEARED = "EVENTBUS_CLEARED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createListenerSubscribedEvent(eventType) {
    return EventBusEvents.createEvent(
      EventBusEvents.LISTENER_SUBSCRIBED,
      {
        eventType,
      }
    );
  }

  static createListenerUnsubscribedEvent(eventType) {
    return EventBusEvents.createEvent(
      EventBusEvents.LISTENER_UNSUBSCRIBED,
      {
        eventType,
      }
    );
  }

  static createEventPublishedEvent(event) {
    return EventBusEvents.createEvent(
      EventBusEvents.EVENT_PUBLISHED,
      {
        event,
      }
    );
  }

  static createEventBusClearedEvent() {
    return EventBusEvents.createEvent(
      EventBusEvents.EVENTBUS_CLEARED,
      {}
    );
  }
}

export default EventBusEvents;
