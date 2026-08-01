class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  validateEventType(eventType) {
    if (
      typeof eventType !== "string" ||
      eventType.trim() === ""
    ) {
      throw new Error(
        "El tipo de evento debe ser un string no vacio."
      );
    }
  }

  validateCallback(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "El callback del evento debe ser una funcion."
      );
    }
  }

  validateEvent(event) {
    if (
      event === null ||
      typeof event !== "object" ||
      Array.isArray(event)
    ) {
      throw new Error(
        "El evento debe ser un objeto valido."
      );
    }

    this.validateEventType(event.type);

    if (
      typeof event.timestamp !== "string" ||
      event.timestamp.trim() === ""
    ) {
      throw new Error(
        "El timestamp del evento debe ser un string no vacio."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(event, "payload")) {
      throw new Error(
        "El evento debe incluir payload."
      );
    }
  }

  subscribe(eventType, callback) {
    this.validateEventType(eventType);
    this.validateCallback(callback);

    if (!this.listeners.has(eventType)) {
      this.listeners.set(
        eventType,
        new Set()
      );
    }

    this.listeners
      .get(eventType)
      .add(callback);

    return callback;
  }

  unsubscribe(eventType, callback) {
    this.validateEventType(eventType);
    this.validateCallback(callback);

    if (!this.listeners.has(eventType)) {
      return false;
    }

    const callbacks =
      this.listeners.get(eventType);

    const removed =
      callbacks.delete(callback);

    if (callbacks.size === 0) {
      this.listeners.delete(eventType);
    }

    return removed;
  }

  publish(event) {
    this.validateEvent(event);

    const callbacks =
      this.getListeners(event.type);

    callbacks.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        return error;
      }

      return null;
    });

    return event;
  }

  clear() {
    this.listeners.clear();
  }

  getListeners(eventType) {
    this.validateEventType(eventType);

    if (!this.listeners.has(eventType)) {
      return [];
    }

    return Array.from(
      this.listeners.get(eventType)
    );
  }

  hasListeners(eventType) {
    return this.countListeners(eventType) > 0;
  }

  getEventTypes() {
    return Array.from(
      this.listeners.keys()
    );
  }

  countListeners(eventType) {
    this.validateEventType(eventType);

    if (!this.listeners.has(eventType)) {
      return 0;
    }

    return this.listeners
      .get(eventType)
      .size;
  }

  countAllListeners() {
    return this
      .getEventTypes()
      .reduce(
        (total, eventType) =>
          total + this.countListeners(eventType),
        0
      );
  }
}

export default EventBus;
