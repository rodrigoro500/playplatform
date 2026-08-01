import Game from "./Game";
import GameEvents from "./GameEvents";
import GameValidator from "./GameValidator";

class GameManager {
  constructor(eventManager = null) {
    this.games = new Map();
    this.eventManager = eventManager;
  }

  createGame(
    id,
    type,
    metadata = {}
  ) {
    GameValidator.validateId(id);
    GameValidator.validateType(type);
    GameValidator.validateMetadata(metadata);

    if (this.hasGame(id)) {
      throw new Error(
        "Ya existe una partida con ese id."
      );
    }

    const game =
      new Game(
        id,
        type,
        metadata
      );

    this.games.set(
      id,
      game
    );

    this.emitGameEvent(
      GameEvents.createGameCreatedEvent(game)
    );

    return game;
  }

  getGame(id) {
    GameValidator.validateId(id);

    const game =
      this.games.get(id);

    if (!game) {
      throw new Error(
        "No existe una partida con ese id."
      );
    }

    return game;
  }

  hasGame(id) {
    GameValidator.validateId(id);

    return this.games.has(id);
  }

  removeGame(id) {
    GameValidator.validateId(id);

    if (!this.hasGame(id)) {
      throw new Error(
        "No existe una partida para eliminar."
      );
    }

    const removed =
      this.games.delete(id);

    this.emitGameEvent(
      GameEvents.createGameRemovedEvent(id)
    );

    return removed;
  }

  startGame(id) {
    const status =
      this
        .getGame(id)
        .start();

    this.emitGameEvent(
      GameEvents.createGameStartedEvent(id)
    );

    return status;
  }

  finishGame(id) {
    const status =
      this
        .getGame(id)
        .finish();

    this.emitGameEvent(
      GameEvents.createGameFinishedEvent(id)
    );

    return status;
  }

  cancelGame(id) {
    const status =
      this
        .getGame(id)
        .cancel();

    this.emitGameEvent(
      GameEvents.createGameCancelledEvent(id)
    );

    return status;
  }

  addPlayer(gameId, playerId) {
    GameValidator.validatePlayerId(playerId);

    const players =
      this
        .getGame(gameId)
        .addPlayer(playerId);

    this.emitGameEvent(
      GameEvents.createPlayerJoinedGameEvent(
        gameId,
        playerId
      )
    );

    return players;
  }

  removePlayer(gameId, playerId) {
    GameValidator.validatePlayerId(playerId);

    const players =
      this
        .getGame(gameId)
        .removePlayer(playerId);

    this.emitGameEvent(
      GameEvents.createPlayerLeftGameEvent(
        gameId,
        playerId
      )
    );

    return players;
  }

  hasPlayer(gameId, playerId) {
    GameValidator.validatePlayerId(playerId);

    return this
      .getGame(gameId)
      .hasPlayer(playerId);
  }

  getGames() {
    return Array.from(
      this.games.values()
    );
  }

  getGamesByStatus(status) {
    GameValidator.validateStatus(status);

    return this
      .getGames()
      .filter(game =>
        game.getStatus() === status
      );
  }

  getRunningGames() {
    return this.getGamesByStatus("RUNNING");
  }

  getWaitingGames() {
    return this.getGamesByStatus("WAITING");
  }

  getFinishedGames() {
    return this.getGamesByStatus("FINISHED");
  }

  clear() {
    this.games.clear();
  }

  setEventManager(eventManager) {
    this.eventManager = eventManager;
  }

  getEventManager() {
    return this.eventManager;
  }

  emitGameEvent(event) {
    if (!this.eventManager) {
      return null;
    }

    return this.eventManager.emit(
      event.type,
      event.payload
    );
  }

  toJSON() {
    return this
      .getGames()
      .map(game => game.toJSON());
  }
}

export default GameManager;
