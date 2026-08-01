class EventBusValidator {
  static validateEventType(eventType) {
    if (typeof eventType !== "string") {
      throw new Error(
        "El tipo de evento debe ser un string."
      );
    }

    if (eventType.trim() === "") {
      throw new Error(
        "El tipo de evento no puede estar vacio."
      );
    }
  }

  static validateCallback(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "El callback del evento debe ser una funcion."
      );
    }
  }

  static validateEvent(event) {
    if (
      event === null ||
      typeof event !== "object" ||
      Array.isArray(event)
    ) {
      throw new Error(
        "El evento debe ser un objeto valido."
      );
    }

    EventBusValidator.validateEventType(event.type);

    if (typeof event.timestamp !== "string") {
      throw new Error(
        "El timestamp del evento debe ser un string."
      );
    }

    if (event.timestamp.trim() === "") {
      throw new Error(
        "El timestamp del evento no puede estar vacio."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(event, "payload")) {
      throw new Error(
        "El evento debe incluir payload."
      );
    }

    if (event.payload === undefined) {
      throw new Error(
        "El payload del evento no puede ser undefined."
      );
    }
  }

  static validateListeners(listeners) {
    if (!(listeners instanceof Map)) {
      throw new Error(
        "Los listeners deben ser una instancia de Map."
      );
    }
  }
}

export default EventBusValidator;
