import ActionEvents from "./ActionEvents";
import ActionManager from "./ActionManager";

class ActionSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ACTION SANDBOX =====");

    const actionManager =
      new ActionManager();

    console.log("1. Crear ActionManager:");
    console.log(actionManager.toJSON());

    const action1 =
      actionManager.createAction(
        "action1",
        "turn1",
        "round1",
        "session1",
        "game1",
        "player1",
        "PLACE_BET"
      );

    console.log("2. Crear action1:");
    console.log(action1.toJSON());

    const action2 =
      actionManager.createAction(
        "action2",
        "turn1",
        "round1",
        "session1",
        "game1",
        "player2",
        "ROLL_DICE"
      );

    console.log("3. Crear action2:");
    console.log(action2.toJSON());

    this.assert(
      actionManager.hasAction("action1") === true,
      "action1 debe existir."
    );

    this.assert(
      actionManager.hasAction("action2") === true,
      "action2 debe existir."
    );

    console.log("4. Verificar hasAction():");
    console.log({
      action1: actionManager.hasAction("action1"),
      action2: actionManager.hasAction("action2"),
    });

    const foundAction1 =
      actionManager.getAction("action1");

    const foundAction2 =
      actionManager.getAction("action2");

    console.log("5. Obtener ambas Action:");
    console.log([
      foundAction1.toJSON(),
      foundAction2.toJSON(),
    ]);

    actionManager.startAction("action1");

    console.log("6. Iniciar action1:");
    console.log(
      actionManager
        .getAction("action1")
        .toJSON()
    );

    actionManager.pauseAction("action1");

    console.log("7. Pausar action1:");
    console.log(
      actionManager
        .getAction("action1")
        .toJSON()
    );

    actionManager.resumeAction("action1");

    console.log("8. Reanudar action1:");
    console.log(
      actionManager
        .getAction("action1")
        .toJSON()
    );

    actionManager.finishAction("action1");

    console.log("9. Finalizar action1:");
    console.log(
      actionManager
        .getAction("action1")
        .toJSON()
    );

    actionManager.cancelAction("action2");

    console.log("10. Cancelar action2:");
    console.log(
      actionManager
        .getAction("action2")
        .toJSON()
    );

    const runningActions =
      actionManager.getRunningActions();

    console.log("11. Obtener Action RUNNING:");
    console.log(
      runningActions.map(action =>
        action.toJSON()
      )
    );

    const pausedActions =
      actionManager.getPausedActions();

    console.log("12. Obtener Action PAUSED:");
    console.log(
      pausedActions.map(action =>
        action.toJSON()
      )
    );

    const finishedActions =
      actionManager.getFinishedActions();

    this.assert(
      finishedActions.length === 1,
      "Debe haber una acción finalizada."
    );

    console.log("13. Obtener Action FINISHED:");
    console.log(
      finishedActions.map(action =>
        action.toJSON()
      )
    );

    const cancelledActions =
      actionManager.getCancelledActions();

    this.assert(
      cancelledActions.length === 1,
      "Debe haber una acción cancelada."
    );

    console.log("14. Obtener Action CANCELLED:");
    console.log(
      cancelledActions.map(action =>
        action.toJSON()
      )
    );

    const turnActions =
      actionManager.getActionsByTurn("turn1");

    this.assert(
      turnActions.length === 2,
      "Debe haber dos acciones para turn1."
    );

    console.log("15. Obtener Action por Turn:");
    console.log(
      turnActions.map(action =>
        action.toJSON()
      )
    );

    const roundActions =
      actionManager.getActionsByRound("round1");

    this.assert(
      roundActions.length === 2,
      "Debe haber dos acciones para round1."
    );

    console.log("16. Obtener Action por Round:");
    console.log(
      roundActions.map(action =>
        action.toJSON()
      )
    );

    const sessionActions =
      actionManager.getActionsBySession("session1");

    this.assert(
      sessionActions.length === 2,
      "Debe haber dos acciones para session1."
    );

    console.log("17. Obtener Action por Session:");
    console.log(
      sessionActions.map(action =>
        action.toJSON()
      )
    );

    const gameActions =
      actionManager.getActionsByGame("game1");

    this.assert(
      gameActions.length === 2,
      "Debe haber dos acciones para game1."
    );

    console.log("18. Obtener Action por Game:");
    console.log(
      gameActions.map(action =>
        action.toJSON()
      )
    );

    const playerActions =
      actionManager.getActionsByPlayer("player1");

    this.assert(
      playerActions.length === 1,
      "Debe haber una acción para player1."
    );

    console.log("19. Obtener Action por Player:");
    console.log(
      playerActions.map(action =>
        action.toJSON()
      )
    );

    const typeActions =
      actionManager.getActionsByType("PLACE_BET");

    this.assert(
      typeActions.length === 1,
      "Debe haber una acción tipo PLACE_BET."
    );

    console.log("20. Obtener Action por Type:");
    console.log(
      typeActions.map(action =>
        action.toJSON()
      )
    );

    const events = [
      ActionEvents.createActionCreatedEvent(action1),
      ActionEvents.createActionCreatedEvent(action2),
      ActionEvents.createActionStartedEvent("action1"),
      ActionEvents.createActionPausedEvent("action1"),
      ActionEvents.createActionResumedEvent("action1"),
      ActionEvents.createActionFinishedEvent("action1"),
      ActionEvents.createActionCancelledEvent("action2"),
      ActionEvents.createActionRemovedEvent("action2"),
    ];

    console.log("21. Crear eventos utilizando ActionEvents:");
    console.log(events);

    console.log("22. Serializar Action:");
    console.log(
      actionManager
        .getAction("action1")
        .toJSON()
    );

    console.log("23. Serializar ActionManager:");
    console.log(actionManager.toJSON());

    const removedAction2 =
      actionManager.removeAction("action2");

    this.assert(
      removedAction2 === true,
      "action2 debe eliminarse correctamente."
    );

    console.log("24. Eliminar action2:");
    console.log(actionManager.toJSON());

    actionManager.clear();

    console.log("25. Limpiar ActionManager:");
    console.log(actionManager.toJSON());

    console.log("26. Mostrar todos los resultados por consola:");
    console.log({
      events,
      runningActions: runningActions.map(action =>
        action.toJSON()
      ),
      pausedActions: pausedActions.map(action =>
        action.toJSON()
      ),
      finishedActions: finishedActions.map(action =>
        action.toJSON()
      ),
      cancelledActions: cancelledActions.map(action =>
        action.toJSON()
      ),
      turnActions: turnActions.map(action =>
        action.toJSON()
      ),
      roundActions: roundActions.map(action =>
        action.toJSON()
      ),
      sessionActions: sessionActions.map(action =>
        action.toJSON()
      ),
      gameActions: gameActions.map(action =>
        action.toJSON()
      ),
      playerActions: playerActions.map(action =>
        action.toJSON()
      ),
      typeActions: typeActions.map(action =>
        action.toJSON()
      ),
      actionManager: actionManager.toJSON(),
    });

    console.log("===== ACTION SANDBOX OK =====");
  }
}

new ActionSandbox();

export default ActionSandbox;
