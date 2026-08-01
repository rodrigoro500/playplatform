class PaseEventsManager {
  constructor(eventManager = null) {
    this.eventManager = eventManager;
  }

  emit(eventName, payload = {}) {
    if (!this.eventManager) {
      return;
    }

    this.eventManager.emit(eventName, payload);
  }

  gameStarted(game) {
    this.emit("GAME_STARTED", {
      gameId: game.getId?.(),
      tableId: game.getTable()?.getId?.(),
    });
  }

  roundStarted(round) {
    this.emit("ROUND_STARTED", {
      roundId: round.getId?.(),
      number: round.getNumber(),
    });
  }

  roundFinished(round) {
    this.emit("ROUND_FINISHED", {
      roundId: round.getId?.(),
      winnerId: round.getWinnerId(),
      result: round.getResult(),
    });
  }

  gameFinished(game) {
    this.emit("GAME_FINISHED", {
      gameId: game.getId?.(),
    });
  }
}

export default PaseEventsManager;