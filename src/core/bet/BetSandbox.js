import BetEvents from "./BetEvents";
import BetManager from "./BetManager";

class BetSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== BET SANDBOX =====");

    const betManager =
      new BetManager();

    console.log("1. Crear BetManager:");
    console.log(betManager.toJSON());

    const bet1 =
      betManager.createBet(
        "bet1",
        "action1",
        "turn1",
        "round1",
        "session1",
        "game1",
        "player1",
        "PASS",
        100
      );

    console.log("2. Crear bet1:");
    console.log(bet1.toJSON());

    const bet2 =
      betManager.createBet(
        "bet2",
        "action2",
        "turn2",
        "round1",
        "session1",
        "game1",
        "player2",
        "FIELD",
        200
      );

    console.log("3. Crear bet2:");
    console.log(bet2.toJSON());

    this.assert(
      betManager.hasBet("bet1") === true,
      "bet1 debe existir."
    );

    this.assert(
      betManager.hasBet("bet2") === true,
      "bet2 debe existir."
    );

    console.log("4. Verificar hasBet():");
    console.log({
      bet1: betManager.hasBet("bet1"),
      bet2: betManager.hasBet("bet2"),
    });

    const foundBet1 =
      betManager.getBet("bet1");

    const foundBet2 =
      betManager.getBet("bet2");

    console.log("5. Obtener ambas Bet:");
    console.log([
      foundBet1.toJSON(),
      foundBet2.toJSON(),
    ]);

    betManager.acceptBet("bet1");

    console.log("6. Aceptar bet1:");
    console.log(
      betManager
        .getBet("bet1")
        .toJSON()
    );

    betManager.winBet("bet1");

    console.log("7. Marcar bet1 como WON:");
    console.log(
      betManager
        .getBet("bet1")
        .toJSON()
    );

    betManager.refundBet("bet2");

    console.log("8. Marcar bet2 como REFUNDED:");
    console.log(
      betManager
        .getBet("bet2")
        .toJSON()
    );

    const acceptedBets =
      betManager.getAcceptedBets();

    console.log("9. Obtener Bet ACCEPTED:");
    console.log(
      acceptedBets.map(bet =>
        bet.toJSON()
      )
    );

    const wonBets =
      betManager.getWonBets();

    this.assert(
      wonBets.length === 1,
      "Debe haber una apuesta ganada."
    );

    console.log("10. Obtener Bet WON:");
    console.log(
      wonBets.map(bet =>
        bet.toJSON()
      )
    );

    const refundedBets =
      betManager.getRefundedBets();

    this.assert(
      refundedBets.length === 1,
      "Debe haber una apuesta devuelta."
    );

    console.log("11. Obtener Bet REFUNDED:");
    console.log(
      refundedBets.map(bet =>
        bet.toJSON()
      )
    );

    const actionBets =
      betManager.getBetsByAction("action1");

    this.assert(
      actionBets.length === 1,
      "Debe haber una apuesta para action1."
    );

    console.log("12. Obtener Bet por Action:");
    console.log(
      actionBets.map(bet =>
        bet.toJSON()
      )
    );

    const turnBets =
      betManager.getBetsByTurn("turn1");

    this.assert(
      turnBets.length === 1,
      "Debe haber una apuesta para turn1."
    );

    console.log("13. Obtener Bet por Turn:");
    console.log(
      turnBets.map(bet =>
        bet.toJSON()
      )
    );

    const roundBets =
      betManager.getBetsByRound("round1");

    this.assert(
      roundBets.length === 2,
      "Debe haber dos apuestas para round1."
    );

    console.log("14. Obtener Bet por Round:");
    console.log(
      roundBets.map(bet =>
        bet.toJSON()
      )
    );

    const sessionBets =
      betManager.getBetsBySession("session1");

    this.assert(
      sessionBets.length === 2,
      "Debe haber dos apuestas para session1."
    );

    console.log("15. Obtener Bet por Session:");
    console.log(
      sessionBets.map(bet =>
        bet.toJSON()
      )
    );

    const gameBets =
      betManager.getBetsByGame("game1");

    this.assert(
      gameBets.length === 2,
      "Debe haber dos apuestas para game1."
    );

    console.log("16. Obtener Bet por Game:");
    console.log(
      gameBets.map(bet =>
        bet.toJSON()
      )
    );

    const playerBets =
      betManager.getBetsByPlayer("player1");

    this.assert(
      playerBets.length === 1,
      "Debe haber una apuesta para player1."
    );

    console.log("17. Obtener Bet por Player:");
    console.log(
      playerBets.map(bet =>
        bet.toJSON()
      )
    );

    const typeBets =
      betManager.getBetsByType("PASS");

    this.assert(
      typeBets.length === 1,
      "Debe haber una apuesta tipo PASS."
    );

    console.log("18. Obtener Bet por Type:");
    console.log(
      typeBets.map(bet =>
        bet.toJSON()
      )
    );

    const events = [
      BetEvents.createBetCreatedEvent(bet1),
      BetEvents.createBetCreatedEvent(bet2),
      BetEvents.createBetAcceptedEvent("bet1"),
      BetEvents.createBetWonEvent("bet1"),
      BetEvents.createBetRefundedEvent("bet2"),
      BetEvents.createBetRemovedEvent("bet2"),
    ];

    console.log("19. Crear eventos utilizando BetEvents:");
    console.log(events);

    console.log("20. Serializar Bet:");
    console.log(
      betManager
        .getBet("bet1")
        .toJSON()
    );

    console.log("21. Serializar BetManager:");
    console.log(betManager.toJSON());

    const removedBet2 =
      betManager.removeBet("bet2");

    this.assert(
      removedBet2 === true,
      "bet2 debe eliminarse correctamente."
    );

    console.log("22. Eliminar bet2:");
    console.log(betManager.toJSON());

    betManager.clear();

    console.log("23. Limpiar BetManager:");
    console.log(betManager.toJSON());

    console.log("24. Mostrar todos los resultados por consola:");
    console.log({
      events,
      acceptedBets: acceptedBets.map(bet =>
        bet.toJSON()
      ),
      wonBets: wonBets.map(bet =>
        bet.toJSON()
      ),
      refundedBets: refundedBets.map(bet =>
        bet.toJSON()
      ),
      actionBets: actionBets.map(bet =>
        bet.toJSON()
      ),
      turnBets: turnBets.map(bet =>
        bet.toJSON()
      ),
      roundBets: roundBets.map(bet =>
        bet.toJSON()
      ),
      sessionBets: sessionBets.map(bet =>
        bet.toJSON()
      ),
      gameBets: gameBets.map(bet =>
        bet.toJSON()
      ),
      playerBets: playerBets.map(bet =>
        bet.toJSON()
      ),
      typeBets: typeBets.map(bet =>
        bet.toJSON()
      ),
      betManager: betManager.toJSON(),
    });

    console.log("===== BET SANDBOX OK =====");
  }
}

new BetSandbox();

export default BetSandbox;
