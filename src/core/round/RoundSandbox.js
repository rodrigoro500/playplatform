import RoundEvents from "./RoundEvents";
import RoundManager from "./RoundManager";

class RoundSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ROUND SANDBOX =====");

    const roundManager =
      new RoundManager();

    console.log("1. Crear RoundManager:");
    console.log(roundManager.toJSON());

    const round1 =
      roundManager.createRound(
        "round1",
        "session1",
        "game1",
        1
      );

    console.log("2. Crear round1:");
    console.log(round1.toJSON());

    const round2 =
      roundManager.createRound(
        "round2",
        "session1",
        "game1",
        2
      );

    console.log("3. Crear round2:");
    console.log(round2.toJSON());

    this.assert(
      roundManager.hasRound("round1") === true,
      "round1 debe existir."
    );

    this.assert(
      roundManager.hasRound("round2") === true,
      "round2 debe existir."
    );

    console.log("4. Verificar hasRound():");
    console.log({
      round1: roundManager.hasRound("round1"),
      round2: roundManager.hasRound("round2"),
    });

    const foundRound1 =
      roundManager.getRound("round1");

    const foundRound2 =
      roundManager.getRound("round2");

    console.log("5. Obtener ambas rondas:");
    console.log([
      foundRound1.toJSON(),
      foundRound2.toJSON(),
    ]);

    roundManager.startRound("round1");

    console.log("6. Iniciar round1:");
    console.log(
      roundManager
        .getRound("round1")
        .toJSON()
    );

    roundManager.pauseRound("round1");

    console.log("7. Pausar round1:");
    console.log(
      roundManager
        .getRound("round1")
        .toJSON()
    );

    roundManager.resumeRound("round1");

    console.log("8. Reanudar round1:");
    console.log(
      roundManager
        .getRound("round1")
        .toJSON()
    );

    roundManager.finishRound("round1");

    console.log("9. Finalizar round1:");
    console.log(
      roundManager
        .getRound("round1")
        .toJSON()
    );

    roundManager.cancelRound("round2");

    console.log("10. Cancelar round2:");
    console.log(
      roundManager
        .getRound("round2")
        .toJSON()
    );

    const runningRounds =
      roundManager.getRunningRounds();

    console.log("11. Obtener rondas RUNNING:");
    console.log(
      runningRounds.map(round =>
        round.toJSON()
      )
    );

    const pausedRounds =
      roundManager.getPausedRounds();

    console.log("12. Obtener rondas PAUSED:");
    console.log(
      pausedRounds.map(round =>
        round.toJSON()
      )
    );

    const finishedRounds =
      roundManager.getFinishedRounds();

    this.assert(
      finishedRounds.length === 1,
      "Debe haber una ronda finalizada."
    );

    console.log("13. Obtener rondas FINISHED:");
    console.log(
      finishedRounds.map(round =>
        round.toJSON()
      )
    );

    const cancelledRounds =
      roundManager.getCancelledRounds();

    this.assert(
      cancelledRounds.length === 1,
      "Debe haber una ronda cancelada."
    );

    console.log("14. Obtener rondas CANCELLED:");
    console.log(
      cancelledRounds.map(round =>
        round.toJSON()
      )
    );

    const sessionRounds =
      roundManager.getRoundsBySession("session1");

    this.assert(
      sessionRounds.length === 2,
      "Debe haber dos rondas para session1."
    );

    console.log("15. Obtener rondas por Session:");
    console.log(
      sessionRounds.map(round =>
        round.toJSON()
      )
    );

    const gameRounds =
      roundManager.getRoundsByGame("game1");

    this.assert(
      gameRounds.length === 2,
      "Debe haber dos rondas para game1."
    );

    console.log("16. Obtener rondas por Game:");
    console.log(
      gameRounds.map(round =>
        round.toJSON()
      )
    );

    const events = [
      RoundEvents.createRoundCreatedEvent(round1),
      RoundEvents.createRoundCreatedEvent(round2),
      RoundEvents.createRoundStartedEvent("round1"),
      RoundEvents.createRoundPausedEvent("round1"),
      RoundEvents.createRoundResumedEvent("round1"),
      RoundEvents.createRoundFinishedEvent("round1"),
      RoundEvents.createRoundCancelledEvent("round2"),
      RoundEvents.createRoundRemovedEvent("round2"),
    ];

    console.log("17. Crear eventos utilizando RoundEvents:");
    console.log(events);

    console.log("18. Serializar Round:");
    console.log(
      roundManager
        .getRound("round1")
        .toJSON()
    );

    console.log("19. Serializar RoundManager:");
    console.log(roundManager.toJSON());

    const removedRound2 =
      roundManager.removeRound("round2");

    this.assert(
      removedRound2 === true,
      "round2 debe eliminarse correctamente."
    );

    console.log("20. Eliminar round2:");
    console.log(roundManager.toJSON());

    roundManager.clear();

    console.log("21. Limpiar RoundManager:");
    console.log(roundManager.toJSON());

    console.log("22. Mostrar todos los resultados por consola:");
    console.log({
      events,
      runningRounds: runningRounds.map(round =>
        round.toJSON()
      ),
      pausedRounds: pausedRounds.map(round =>
        round.toJSON()
      ),
      finishedRounds: finishedRounds.map(round =>
        round.toJSON()
      ),
      cancelledRounds: cancelledRounds.map(round =>
        round.toJSON()
      ),
      sessionRounds: sessionRounds.map(round =>
        round.toJSON()
      ),
      gameRounds: gameRounds.map(round =>
        round.toJSON()
      ),
      roundManager: roundManager.toJSON(),
    });

    console.log("===== ROUND SANDBOX OK =====");
  }
}

new RoundSandbox();

export default RoundSandbox;
