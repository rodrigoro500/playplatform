class EventManager {
  constructor() {
    this.events = [];
    this.listeners = new Map();
  }

  createId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random()
      .toString(16)
      .slice(2)}`;
  }

  validateEventType(type) {
    if (
      typeof type !== "string" ||
      !type.trim()
    ) {
      throw new Error(
        "El tipo del evento debe ser un texto válido."
      );
    }

    return type.trim();
  }

  validateListener(listener) {
    if (typeof listener !== "function") {
      throw new Error(
        "El listener del evento debe ser una función."
      );
    }
  }

  emit(type, data = {}) {
    const normalizedType =
      this.validateEventType(type);

    const event = Object.freeze({
      id: this.createId(),
      type: normalizedType,
      data: this.cloneValue(data),
      createdAt: new Date().toISOString(),
    });

    this.events.push(event);

    const listeners = [
      ...(this.listeners.get(normalizedType) ?? []),
    ];

    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error(
          `Error al ejecutar un listener de "${normalizedType}":`,
          error
        );
      }
    });

    return event;
  }

  subscribe(type, listener) {
    const normalizedType =
      this.validateEventType(type);

    this.validateListener(listener);

    const listeners =
      this.listeners.get(normalizedType) ?? [];

    if (!listeners.includes(listener)) {
      this.listeners.set(normalizedType, [
        ...listeners,
        listener,
      ]);
    }

    let isSubscribed = true;

    return () => {
      if (!isSubscribed) {
        return false;
      }

      isSubscribed = false;

      return this.unsubscribe(
        normalizedType,
        listener
      );
    };
  }

  once(type, listener) {
    const normalizedType =
      this.validateEventType(type);

    this.validateListener(listener);

    let unsubscribe = null;

    const onceListener = (event) => {
      unsubscribe?.();
      listener(event);
    };

    unsubscribe = this.subscribe(
      normalizedType,
      onceListener
    );

    return unsubscribe;
  }

  unsubscribe(type, listener) {
    const normalizedType =
      this.validateEventType(type);

    this.validateListener(listener);

    const listeners =
      this.listeners.get(normalizedType);

    if (!listeners) {
      return false;
    }

    const updatedListeners = listeners.filter(
      (currentListener) =>
        currentListener !== listener
    );

    if (
      updatedListeners.length ===
      listeners.length
    ) {
      return false;
    }

    if (updatedListeners.length === 0) {
      this.listeners.delete(normalizedType);
    } else {
      this.listeners.set(
        normalizedType,
        updatedListeners
      );
    }

    return true;
  }

  hasListeners(type) {
    const normalizedType =
      this.validateEventType(type);

    return (
      (this.listeners.get(normalizedType)?.length ??
        0) > 0
    );
  }

  getListenerCount(type) {
    const normalizedType =
      this.validateEventType(type);

    return (
      this.listeners.get(normalizedType)?.length ??
      0
    );
  }

  getEvents() {
    return this.events.map((event) =>
      this.cloneEvent(event)
    );
  }

  getEventsByType(type) {
    const normalizedType =
      this.validateEventType(type);

    return this.events
      .filter(
        (event) =>
          event.type === normalizedType
      )
      .map((event) => this.cloneEvent(event));
  }

  getLastEvent(type = null) {
    if (this.events.length === 0) {
      return null;
    }

    if (type === null) {
      return this.cloneEvent(
        this.events[this.events.length - 1]
      );
    }

    const normalizedType =
      this.validateEventType(type);

    for (
      let index = this.events.length - 1;
      index >= 0;
      index -= 1
    ) {
      if (
        this.events[index].type ===
        normalizedType
      ) {
        return this.cloneEvent(
          this.events[index]
        );
      }
    }

    return null;
  }

  clearEvents(type = null) {
    if (type === null) {
      const removedEvents =
        this.events.length;

      this.events = [];

      return removedEvents;
    }

    const normalizedType =
      this.validateEventType(type);

    const initialCount = this.events.length;

    this.events = this.events.filter(
      (event) =>
        event.type !== normalizedType
    );

    return initialCount - this.events.length;
  }

  clearListeners(type = null) {
    if (type === null) {
      const removedListeners =
        this.getTotalListenerCount();

      this.listeners.clear();

      return removedListeners;
    }

    const normalizedType =
      this.validateEventType(type);

    const removedListeners =
      this.listeners.get(normalizedType)?.length ??
      0;

    this.listeners.delete(normalizedType);

    return removedListeners;
  }

  getTotalListenerCount() {
    let total = 0;

    this.listeners.forEach((listeners) => {
      total += listeners.length;
    });

    return total;
  }

  cloneEvent(event) {
    return {
      ...event,
      data: this.cloneValue(event.data),
    };
  }

  cloneValue(value) {
    if (
      value === null ||
      typeof value !== "object"
    ) {
      return value;
    }

    if (
      typeof structuredClone === "function"
    ) {
      return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
  }

  toJSON() {
    return {
      events: this.getEvents(),
      eventCount: this.events.length,
      listenerCount:
        this.getTotalListenerCount(),
      listenerTypes: [
        ...this.listeners.keys(),
      ],
    };
  }
}

export default EventManager;