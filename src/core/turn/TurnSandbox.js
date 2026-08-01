import TurnEvents from "./TurnEvents";
import TurnManager from "./TurnManager";

class TurnSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== TURN SANDBOX =====");

    const turnManager =
      new TurnManager();

    console.log("1. Crear TurnManager:");
    console.log(turnManager.toJSON());

    const turn1 =
      turnManager.createTurn(
        "turn1",
        "round1",
        "session1",
        "game1",
        "player1",
        1
      );

    console.log("2. Crear turn1:");
    console.log(turn1.toJSON());

    const turn2 =
      turnManager.createTurn(
        "turn2",
        "round1",
        "session1",
        "game1",
        "player2",
        2
      );

    console.log("3. Crear turn2:");
    console.log(turn2.toJSON());

    this.assert(
      turnManager.hasTurn("turn1") === true,
      "turn1 debe existir."
    );

    this.assert(
      turnManager.hasTurn("turn2") === true,
      "turn2 debe existir."
    );

    console.log("4. Verificar hasTurn():");
    console.log({
      turn1: turnManager.hasTurn("turn1"),
      turn2: turnManager.hasTurn("turn2"),
    });

    const foundTurn1 =
      turnManager.getTurn("turn1");

    const foundTurn2 =
      turnManager.getTurn("turn2");

    console.log("5. Obtener ambos Turn:");
    console.log([
      foundTurn1.toJSON(),
      foundTurn2.toJSON(),
    ]);

    turnManager.startTurn("turn1");

    console.log("6. Iniciar turn1:");
    console.log(
      turnManager
        .getTurn("turn1")
        .toJSON()
    );

    turnManager.pauseTurn("turn1");

    console.log("7. Pausar turn1:");
    console.log(
      turnManager
        .getTurn("turn1")
        .toJSON()
    );

    turnManager.resumeTurn("turn1");

    console.log("8. Reanudar turn1:");
    console.log(
      turnManager
        .getTurn("turn1")
        .toJSON()
    );

    turnManager.finishTurn("turn1");

    console.log("9. Finalizar turn1:");
    console.log(
      turnManager
        .getTurn("turn1")
        .toJSON()
    );

    turnManager.cancelTurn("turn2");

    console.log("10. Cancelar turn2:");
    console.log(
      turnManager
        .getTurn("turn2")
        .toJSON()
    );

    const runningTurns =
      turnManager.getRunningTurns();

    console.log("11. Obtener Turn RUNNING:");
    console.log(
      runningTurns.map(turn =>
        turn.toJSON()
      )
    );

    const pausedTurns =
      turnManager.getPausedTurns();

    console.log("12. Obtener Turn PAUSED:");
    console.log(
      pausedTurns.map(turn =>
        turn.toJSON()
      )
    );

    const finishedTurns =
      turnManager.getFinishedTurns();

    this.assert(
      finishedTurns.length === 1,
      "Debe haber un turno finalizado."
    );

    console.log("13. Obtener Turn FINISHED:");
    console.log(
      finishedTurns.map(turn =>
        turn.toJSON()
      )
    );

    const cancelledTurns =
      turnManager.getCancelledTurns();

    this.assert(
      cancelledTurns.length === 1,
      "Debe haber un turno cancelado."
    );

    console.log("14. Obtener Turn CANCELLED:");
    console.log(
      cancelledTurns.map(turn =>
        turn.toJSON()
      )
    );

    const roundTurns =
      turnManager.getTurnsByRound("round1");

    this.assert(
      roundTurns.length === 2,
      "Debe haber dos turnos para round1."
    );

    console.log("15. Obtener Turn por Round:");
    console.log(
      roundTurns.map(turn =>
        turn.toJSON()
      )
    );

    const sessionTurns =
      turnManager.getTurnsBySession("session1");

    this.assert(
      sessionTurns.length === 2,
      "Debe haber dos turnos para session1."
    );

    console.log("16. Obtener Turn por Session:");
    console.log(
      sessionTurns.map(turn =>
        turn.toJSON()
      )
    );

    const gameTurns =
      turnManager.getTurnsByGame("game1");

    this.assert(
      gameTurns.length === 2,
      "Debe haber dos turnos para game1."
    );

    console.log("17. Obtener Turn por Game:");
    console.log(
      gameTurns.map(turn =>
        turn.toJSON()
      )
    );

    const playerTurns =
      turnManager.getTurnsByPlayer("player1");

    this.assert(
      playerTurns.length === 1,
      "Debe haber un turno para player1."
    );

    console.log("18. Obtener Turn por Player:");
    console.log(
      playerTurns.map(turn =>
        turn.toJSON()
      )
    );

    const events = [
      TurnEvents.createTurnCreatedEvent(turn1),
      TurnEvents.createTurnCreatedEvent(turn2),
      TurnEvents.createTurnStartedEvent("turn1"),
      TurnEvents.createTurnPausedEvent("turn1"),
      TurnEvents.createTurnResumedEvent("turn1"),
      TurnEvents.createTurnFinishedEvent("turn1"),
      TurnEvents.createTurnCancelledEvent("turn2"),
      TurnEvents.createTurnRemovedEvent("turn2"),
    ];

    console.log("19. Crear eventos utilizando TurnEvents:");
    console.log(events);

    console.log("20. Serializar Turn:");
    console.log(
      turnManager
        .getTurn("turn1")
        .toJSON()
    );

    console.log("21. Serializar TurnManager:");
    console.log(turnManager.toJSON());

    const removedTurn2 =
      turnManager.removeTurn("turn2");

    this.assert(
      removedTurn2 === true,
      "turn2 debe eliminarse correctamente."
    );

    console.log("22. Eliminar turn2:");
    console.log(turnManager.toJSON());

    turnManager.clear();

    console.log("23. Limpiar TurnManager:");
    console.log(turnManager.toJSON());

    console.log("24. Mostrar todos los resultados por consola:");
    console.log({
      events,
      runningTurns: runningTurns.map(turn =>
        turn.toJSON()
      ),
      pausedTurns: pausedTurns.map(turn =>
        turn.toJSON()
      ),
      finishedTurns: finishedTurns.map(turn =>
        turn.toJSON()
      ),
      cancelledTurns: cancelledTurns.map(turn =>
        turn.toJSON()
      ),
      roundTurns: roundTurns.map(turn =>
        turn.toJSON()
      ),
      sessionTurns: sessionTurns.map(turn =>
        turn.toJSON()
      ),
      gameTurns: gameTurns.map(turn =>
        turn.toJSON()
      ),
      playerTurns: playerTurns.map(turn =>
        turn.toJSON()
      ),
      turnManager: turnManager.toJSON(),
    });

    console.log("===== TURN SANDBOX OK =====");
  }
}

new TurnSandbox();

export default TurnSandbox;
