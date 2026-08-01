class GameEvents {
  static GAME_CREATED = "GAME_CREATED";

  static GAME_REMOVED = "GAME_REMOVED";

  static GAME_STARTED = "GAME_STARTED";

  static GAME_FINISHED = "GAME_FINISHED";

  static GAME_CANCELLED = "GAME_CANCELLED";

  static PLAYER_JOINED_GAME = "PLAYER_JOINED_GAME";

  static PLAYER_LEFT_GAME = "PLAYER_LEFT_GAME";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createGameCreatedEvent(game) {
    return GameEvents.createEvent(
      GameEvents.GAME_CREATED,
      {
        game: game.toJSON(),
      }
    );
  }

  static createGameRemovedEvent(gameId) {
    return GameEvents.createEvent(
      GameEvents.GAME_REMOVED,
      {
        gameId,
      }
    );
  }

  static createGameStartedEvent(gameId) {
    return GameEvents.createEvent(
      GameEvents.GAME_STARTED,
      {
        gameId,
      }
    );
  }

  static createGameFinishedEvent(gameId) {
    return GameEvents.createEvent(
      GameEvents.GAME_FINISHED,
      {
        gameId,
      }
    );
  }

  static createGameCancelledEvent(gameId) {
    return GameEvents.createEvent(
      GameEvents.GAME_CANCELLED,
      {
        gameId,
      }
    );
  }

  static createPlayerJoinedGameEvent(
    gameId,
    playerId
  ) {
    return GameEvents.createEvent(
      GameEvents.PLAYER_JOINED_GAME,
      {
        gameId,
        playerId,
      }
    );
  }

  static createPlayerLeftGameEvent(
    gameId,
    playerId
  ) {
    return GameEvents.createEvent(
      GameEvents.PLAYER_LEFT_GAME,
      {
        gameId,
        playerId,
      }
    );
  }
}

export default GameEvents;
