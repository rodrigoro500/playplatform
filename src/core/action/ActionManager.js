import Action from "./Action";
import ActionValidator from "./ActionValidator";

class ActionManager {
  constructor() {
    this.actions = new Map();
  }

  createAction(
    id,
    turnId,
    roundId,
    sessionId,
    gameId,
    playerId,
    type,
    metadata = {}
  ) {
    ActionValidator.validateId(id);
    ActionValidator.validateTurnId(turnId);
    ActionValidator.validateRoundId(roundId);
    ActionValidator.validateSessionId(sessionId);
    ActionValidator.validateGameId(gameId);
    ActionValidator.validatePlayerId(playerId);
    ActionValidator.validateType(type);
    ActionValidator.validateMetadata(metadata);

    if (this.hasAction(id)) {
      throw new Error(
        "Ya existe una acción con ese id."
      );
    }

    const action =
      new Action(
        id,
        turnId,
        roundId,
        sessionId,
        gameId,
        playerId,
        type,
        metadata
      );

    this.actions.set(
      id,
      action
    );

    return action;
  }

  getAction(id) {
    ActionValidator.validateId(id);

    const action =
      this.actions.get(id);

    if (!action) {
      throw new Error(
        "No existe una acción con ese id."
      );
    }

    return action;
  }

  hasAction(id) {
    ActionValidator.validateId(id);

    return this.actions.has(id);
  }

  removeAction(id) {
    ActionValidator.validateId(id);

    if (!this.hasAction(id)) {
      throw new Error(
        "No existe una acción para eliminar."
      );
    }

    return this.actions.delete(id);
  }

  startAction(id) {
    return this
      .getAction(id)
      .start();
  }

  pauseAction(id) {
    return this
      .getAction(id)
      .pause();
  }

  resumeAction(id) {
    return this
      .getAction(id)
      .resume();
  }

  finishAction(id) {
    return this
      .getAction(id)
      .finish();
  }

  cancelAction(id) {
    return this
      .getAction(id)
      .cancel();
  }

  getActions() {
    return Array.from(
      this.actions.values()
    );
  }

  getActionsByTurn(turnId) {
    ActionValidator.validateTurnId(turnId);

    return this
      .getActions()
      .filter(action =>
        action.getTurnId() === turnId
      );
  }

  getActionsByRound(roundId) {
    ActionValidator.validateRoundId(roundId);

    return this
      .getActions()
      .filter(action =>
        action.getRoundId() === roundId
      );
  }

  getActionsBySession(sessionId) {
    ActionValidator.validateSessionId(sessionId);

    return this
      .getActions()
      .filter(action =>
        action.getSessionId() === sessionId
      );
  }

  getActionsByGame(gameId) {
    ActionValidator.validateGameId(gameId);

    return this
      .getActions()
      .filter(action =>
        action.getGameId() === gameId
      );
  }

  getActionsByPlayer(playerId) {
    ActionValidator.validatePlayerId(playerId);

    return this
      .getActions()
      .filter(action =>
        action.getPlayerId() === playerId
      );
  }

  getActionsByType(type) {
    ActionValidator.validateType(type);

    return this
      .getActions()
      .filter(action =>
        action.getType() === type
      );
  }

  getActionsByStatus(status) {
    ActionValidator.validateStatus(status);

    return this
      .getActions()
      .filter(action =>
        action.getStatus() === status
      );
  }

  getRunningActions() {
    return this.getActionsByStatus("RUNNING");
  }

  getPausedActions() {
    return this.getActionsByStatus("PAUSED");
  }

  getFinishedActions() {
    return this.getActionsByStatus("FINISHED");
  }

  getCancelledActions() {
    return this.getActionsByStatus("CANCELLED");
  }

  clear() {
    this.actions.clear();
  }

  toJSON() {
    return this
      .getActions()
      .map(action => action.toJSON());
  }
}

export default ActionManager;
