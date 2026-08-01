import Timer from "./Timer";
import TimerEvents from "./TimerEvents";

class TimerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== TIMER SANDBOX =====");

    const timer =
      new Timer();

    console.log("1. Crear una instancia de Timer:");
    console.log(timer.toJSON());

    let callbackCount = 0;

    const timer1 =
      timer.createTimer(
        "timer1",
        1000,
        () => {
          callbackCount += 1;
        }
      );

    console.log("2. Crear timer1:");
    console.log(timer1);

    const timer2 =
      timer.createTimer(
        "timer2",
        500
      );

    console.log("3. Crear timer2:");
    console.log(timer2);

    this.assert(
      timer.hasTimer("timer1") === true,
      "timer1 debe existir."
    );

    this.assert(
      timer.hasTimer("timer2") === true,
      "timer2 debe existir."
    );

    console.log("4. Verificar hasTimer():");
    console.log({
      timer1: timer.hasTimer("timer1"),
      timer2: timer.hasTimer("timer2"),
    });

    const foundTimer1 =
      timer.getTimer("timer1");

    console.log("5. Obtener timer1:");
    console.log(foundTimer1);

    timer.startTimer("timer1");

    console.log("6. Iniciar timer1:");
    console.log(timer.getTimer("timer1"));

    timer.pauseTimer("timer1");

    console.log("7. Pausar timer1:");
    console.log(timer.getTimer("timer1"));

    timer.resumeTimer("timer1");

    console.log("8. Reanudar timer1:");
    console.log(timer.getTimer("timer1"));

    timer.completeTimer("timer1");

    console.log("9. Completar timer1:");
    console.log(timer.getTimer("timer1"));

    this.assert(
      callbackCount === 1,
      "El callback debe ejecutarse exactamente una vez."
    );

    console.log("10. Verificar que el callback se ejecute exactamente una vez:");
    console.log(callbackCount);

    timer.cancelTimer("timer2");

    console.log("11. Cancelar timer2:");
    console.log(timer.getTimer("timer2"));

    const completedTimers =
      timer.getTimersByStatus("COMPLETED");

    this.assert(
      completedTimers.length === 1,
      "Debe existir un timer COMPLETED."
    );

    console.log("12. Obtener Timers por estado COMPLETED:");
    console.log(completedTimers);

    const cancelledTimers =
      timer.getTimersByStatus("CANCELLED");

    this.assert(
      cancelledTimers.length === 1,
      "Debe existir un timer CANCELLED."
    );

    console.log("13. Obtener Timers por estado CANCELLED:");
    console.log(cancelledTimers);

    const timers =
      timer.getTimers();

    console.log("14. Obtener todos los Timers:");
    console.log(timers);

    const timerCount =
      timer.count();

    this.assert(
      timerCount === 2,
      "Deben existir dos timers."
    );

    console.log("15. Contar Timers:");
    console.log(timerCount);

    const timerJSON =
      timer.toJSON();

    console.log("16. Serializar Timer utilizando toJSON():");
    console.log(timerJSON);

    const events = [
      TimerEvents.createTimerCreatedEvent(timer1),
      TimerEvents.createTimerCreatedEvent(timer2),
      TimerEvents.createTimerStartedEvent("timer1"),
      TimerEvents.createTimerPausedEvent("timer1"),
      TimerEvents.createTimerResumedEvent("timer1"),
      TimerEvents.createTimerCompletedEvent("timer1"),
      TimerEvents.createTimerCancelledEvent("timer2"),
      TimerEvents.createTimerRemovedEvent("timer2"),
      TimerEvents.createTimersClearedEvent(),
    ];

    console.log("17. Crear eventos utilizando TimerEvents:");
    console.log(events);

    const removedTimer2 =
      timer.removeTimer("timer2");

    this.assert(
      removedTimer2 === true,
      "timer2 debe eliminarse correctamente."
    );

    console.log("18. Eliminar timer2:");
    console.log(timer.toJSON());

    timer.clear();

    console.log("19. Limpiar completamente Timer:");
    console.log(timer.toJSON());

    this.assert(
      timer.count() === 0,
      "Timer debe quedar sin timers."
    );

    console.log("20. Verificar que count() sea 0:");
    console.log(timer.count());

    console.log("21. Mostrar todos los resultados por consola:");
    console.log({
      callbackCount,
      completedTimers,
      cancelledTimers,
      timers,
      timerCount,
      timerJSON,
      events,
      finalCount: timer.count(),
    });

    console.log("===== TIMER SANDBOX OK =====");
  }
}

new TimerSandbox();

export default TimerSandbox;
