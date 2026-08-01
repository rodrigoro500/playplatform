import EventBus from "./EventBus";
import EventBusEvents from "./EventBusEvents";

class EventBusSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== EVENTBUS SANDBOX =====");

    const eventBus =
      new EventBus();

    console.log("1. Crear una instancia de EventBus:");
    console.log(eventBus.getEventTypes());

    const executionOrder = [];

    const listener1 = event => {
      executionOrder.push("listener1");

      return event;
    };

    const listener2 = event => {
      executionOrder.push("listener2");

      return event;
    };

    const listener3 = event => {
      executionOrder.push("listener3");

      return event;
    };

    eventBus.subscribe(
      "TEST_EVENT",
      listener1
    );
    eventBus.subscribe(
      "TEST_EVENT",
      listener2
    );
    eventBus.subscribe(
      "OTHER_EVENT",
      listener3
    );

    console.log("2. Registrar varios listeners para distintos tipos de eventos:");
    console.log(eventBus.getEventTypes());

    this.assert(
      eventBus.hasListeners("TEST_EVENT") === true,
      "TEST_EVENT debe tener listeners."
    );

    console.log("3. Verificar hasListeners():");
    console.log({
      testEvent: eventBus.hasListeners("TEST_EVENT"),
      otherEvent: eventBus.hasListeners("OTHER_EVENT"),
    });

    this.assert(
      eventBus.countListeners("TEST_EVENT") === 2,
      "TEST_EVENT debe tener dos listeners."
    );

    console.log("4. Verificar countListeners():");
    console.log({
      testEvent: eventBus.countListeners("TEST_EVENT"),
      otherEvent: eventBus.countListeners("OTHER_EVENT"),
    });

    this.assert(
      eventBus.countAllListeners() === 3,
      "Debe haber tres listeners registrados."
    );

    console.log("5. Verificar countAllListeners():");
    console.log(eventBus.countAllListeners());

    const testListeners =
      eventBus.getListeners("TEST_EVENT");

    console.log("6. Obtener getListeners():");
    console.log(testListeners);

    const eventTypes =
      eventBus.getEventTypes();

    console.log("7. Obtener getEventTypes():");
    console.log(eventTypes);

    const event = {
      type: "TEST_EVENT",
      timestamp: new Date().toISOString(),
      payload: {
        value: 1,
      },
    };

    eventBus.publish(event);

    console.log("8. Publicar un evento valido:");
    console.log(event);

    this.assert(
      executionOrder.join(",") === "listener1,listener2",
      "Los callbacks deben ejecutarse en el orden correcto."
    );

    console.log("9. Verificar que todos los callbacks registrados se ejecuten en el orden correcto:");
    console.log(executionOrder);

    const errorListener = () => {
      executionOrder.push("errorListener");

      throw new Error(
        "Error esperado del listener."
      );
    };

    const listener4 = eventToHandle => {
      executionOrder.push("listener4");

      return eventToHandle;
    };

    eventBus.subscribe(
      "TEST_EVENT",
      errorListener
    );
    eventBus.subscribe(
      "TEST_EVENT",
      listener4
    );

    executionOrder.length = 0;

    eventBus.publish(event);

    this.assert(
      executionOrder.join(",") === "listener1,listener2,errorListener,listener4",
      "Los callbacks deben continuar despues de una excepcion."
    );

    console.log("10. Agregar un callback que lance una excepcion y verificar que los demas continuen ejecutandose:");
    console.log(executionOrder);

    const removedListener =
      eventBus.unsubscribe(
        "TEST_EVENT",
        listener2
      );

    this.assert(
      removedListener === true,
      "listener2 debe eliminarse correctamente."
    );

    console.log("11. Eliminar un listener:");
    console.log(removedListener);

    this.assert(
      eventBus.countListeners("TEST_EVENT") === 3,
      "TEST_EVENT debe tener tres listeners despues de unsubscribe()."
    );

    console.log("12. Verificar que unsubscribe() funcione correctamente:");
    console.log(eventBus.countListeners("TEST_EVENT"));

    executionOrder.length = 0;

    eventBus.publish(event);

    this.assert(
      executionOrder.join(",") === "listener1,errorListener,listener4",
      "El listener eliminado no debe ejecutarse."
    );

    console.log("13. Publicar nuevamente el evento:");
    console.log(executionOrder);

    eventBus.clear();

    console.log("14. Limpiar completamente el EventBus:");
    console.log(eventBus.getEventTypes());

    this.assert(
      eventBus.countAllListeners() === 0,
      "No deben existir listeners registrados."
    );

    console.log("15. Verificar que no existan listeners registrados:");
    console.log(eventBus.countAllListeners());

    const events = [
      EventBusEvents.createListenerSubscribedEvent("TEST_EVENT"),
      EventBusEvents.createListenerUnsubscribedEvent("TEST_EVENT"),
      EventBusEvents.createEventPublishedEvent(event),
      EventBusEvents.createEventBusClearedEvent(),
    ];

    console.log("16. Crear eventos utilizando EventBusEvents:");
    console.log(events);

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      eventTypes,
      events,
      finalListenerCount: eventBus.countAllListeners(),
    });

    console.log("===== EVENTBUS SANDBOX OK =====");
  }
}

new EventBusSandbox();

export default EventBusSandbox;
