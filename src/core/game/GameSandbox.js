import BaseGameEngine from "../Engine/BaseGameEngine";
import EventManager from "../Engine/EventManager";
import GameEvents from "./GameEvents";
import GameManager from "./GameManager";

class GameSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== GAME SANDBOX =====");

    const gameManager =
      new GameManager();

    console.log("1. Crear GameManager:");
    console.log(gameManager.toJSON());

    const game1 =
      gameManager.createGame(
        "game1",
        "PASE"
      );

    console.log("2. Crear game1 tipo PASE:");
    console.log(game1.toJSON());

    const game2 =
      gameManager.createGame(
        "game2",
        "PRUEBA"
      );

    console.log("3. Crear game2 tipo PRUEBA:");
    console.log(game2.toJSON());

    this.assert(
      gameManager.hasGame("game1") === true,
      "game1 debe existir."
    );

    this.assert(
      gameManager.hasGame("game2") === true,
      "game2 debe existir."
    );

    console.log("4. Verificar hasGame():");
    console.log({
      game1: gameManager.hasGame("game1"),
      game2: gameManager.hasGame("game2"),
    });

    const foundGame1 =
      gameManager.getGame("game1");

    const foundGame2 =
      gameManager.getGame("game2");

    console.log("5. Obtener ambas partidas:");
    console.log([
      foundGame1.toJSON(),
      foundGame2.toJSON(),
    ]);

    gameManager.addPlayer(
      "game1",
      "player1"
    );

    console.log("6. Agregar player1:");
    console.log(
      gameManager
        .getGame("game1")
        .toJSON()
    );

    gameManager.addPlayer(
      "game1",
      "player2"
    );

    console.log("7. Agregar player2:");
    console.log(
      gameManager
        .getGame("game1")
        .toJSON()
    );

    this.assert(
      gameManager
        .getGame("game1")
        .getPlayerCount() === 2,
      "game1 debe tener dos jugadores."
    );

    console.log("8. Verificar cantidad de jugadores:");
    console.log(
      gameManager
        .getGame("game1")
        .getPlayerCount()
    );

    gameManager.removePlayer(
      "game1",
      "player2"
    );

    console.log("9. Eliminar player2:");
    console.log(
      gameManager
        .getGame("game1")
        .toJSON()
    );

    gameManager.startGame("game1");

    console.log("10. Iniciar game1:");
    console.log(
      gameManager
        .getGame("game1")
        .toJSON()
    );

    gameManager.finishGame("game1");

    console.log("11. Finalizar game1:");
    console.log(
      gameManager
        .getGame("game1")
        .toJSON()
    );

    gameManager.cancelGame("game2");

    console.log("12. Cancelar game2:");
    console.log(
      gameManager
        .getGame("game2")
        .toJSON()
    );

    const runningGames =
      gameManager.getRunningGames();

    console.log("13. Obtener partidas RUNNING:");
    console.log(
      runningGames.map(game => game.toJSON())
    );

    const finishedGames =
      gameManager.getFinishedGames();

    this.assert(
      finishedGames.length === 1,
      "Debe haber una partida finalizada."
    );

    console.log("14. Obtener partidas FINISHED:");
    console.log(
      finishedGames.map(game => game.toJSON())
    );

    const cancelledGames =
      gameManager.getGamesByStatus("CANCELLED");

    this.assert(
      cancelledGames.length === 1,
      "Debe haber una partida cancelada."
    );

    console.log("15. Obtener partidas CANCELLED:");
    console.log(
      cancelledGames.map(game => game.toJSON())
    );

    const events = [
      GameEvents.createGameCreatedEvent(game1),
      GameEvents.createGameCreatedEvent(game2),
      GameEvents.createPlayerJoinedGameEvent(
        "game1",
        "player1"
      ),
      GameEvents.createPlayerJoinedGameEvent(
        "game1",
        "player2"
      ),
      GameEvents.createPlayerLeftGameEvent(
        "game1",
        "player2"
      ),
      GameEvents.createGameStartedEvent("game1"),
      GameEvents.createGameFinishedEvent("game1"),
      GameEvents.createGameCancelledEvent("game2"),
      GameEvents.createGameRemovedEvent("game2"),
    ];

    console.log("16. Crear eventos utilizando GameEvents:");
    console.log(events);

    console.log("17. Serializar Game:");
    console.log(
      gameManager
        .getGame("game1")
        .toJSON()
    );

    console.log("18. Serializar GameManager:");
    console.log(gameManager.toJSON());

    const removedGame2 =
      gameManager.removeGame("game2");

    this.assert(
      removedGame2 === true,
      "game2 debe eliminarse correctamente."
    );

    console.log("19. Eliminar game2:");
    console.log(gameManager.toJSON());

    gameManager.clear();

    console.log("20. Limpiar GameManager:");
    console.log(gameManager.toJSON());

    console.log("21. Mostrar todos los resultados:");
    console.log({
      events,
      runningGames: runningGames.map(game =>
        game.toJSON()
      ),
      finishedGames: finishedGames.map(game =>
        game.toJSON()
      ),
      cancelledGames: cancelledGames.map(game =>
        game.toJSON()
      ),
      gameManager: gameManager.toJSON(),
    });

    console.log("===== GAME SANDBOX OK =====");

    this.runCompleteEngineIntegration();
  }

  runCompleteEngineIntegration() {
    console.log("===== COMPLETE ENGINE SANDBOX =====");

    const eventManager =
      new EventManager();

    const engine =
      new BaseGameEngine({
        eventManager,
      });

    engine
      .getGameManager()
      .setEventManager(eventManager);

    engine
      .getPlayerManager()
      .setEventManager(eventManager);

    engine
      .getWalletManager()
      .setEventManager(eventManager);

    console.log("1. Crear BaseGameEngine:");
    console.log({
      initialized: engine.isInitialized(),
      running: engine.isRunning(),
      finished: engine.isFinished(),
    });

    const game =
      engine.createGame(
        "game1",
        "PASE"
      );

    console.log("2. Crear game1:");
    console.log(game.toJSON());

    const player1 =
      engine.createPlayer(
        "player1",
        "Player One"
      );

    console.log("3. Crear player1:");
    console.log(player1.toJSON());

    const player2 =
      engine.createPlayer(
        "player2",
        "Player Two"
      );

    console.log("4. Crear player2:");
    console.log(player2.toJSON());

    this.assert(
      engine
        .getWalletManager()
        .hasWallet("player1") === true,
      "player1 debe tener Wallet automático."
    );

    this.assert(
      engine
        .getWalletManager()
        .hasWallet("player2") === true,
      "player2 debe tener Wallet automático."
    );

    console.log("5. Verificar creación automática de Wallets:");
    console.log([
      engine
        .getPlayerWallet("player1")
        .toJSON(),
      engine
        .getPlayerWallet("player2")
        .toJSON(),
    ]);

    const player1Deposit =
      engine.depositToPlayer(
        "player1",
        5000
      );

    console.log("6. Depositar 5000 a player1:");
    console.log(player1Deposit);

    const player2Deposit =
      engine.depositToPlayer(
        "player2",
        3000
      );

    console.log("7. Depositar 3000 a player2:");
    console.log(player2Deposit);

    engine.addPlayerToGame(
      "game1",
      "player1"
    );

    engine.addPlayerToGame(
      "game1",
      "player2"
    );

    console.log("8. Agregar ambos jugadores al Game:");
    console.log(
      engine
        .getGame("game1")
        .toJSON()
    );

    engine.addToGamePot(
      "game1",
      "player1",
      1000
    );

    const potAfterPlayer2 =
      engine.addToGamePot(
        "game1",
        "player2",
        1000
      );

    console.log("9. Ejecutar addToGamePot() con ambos jugadores:");
    console.log(potAfterPlayer2);

    this.assert(
      engine.getGamePot("game1") === 2000,
      "El pozo esperado es 2000."
    );

    console.log("10. Verificar el pozo:");
    console.log(engine.getGamePot("game1"));

    const potAfterRefund =
      engine.refundFromGamePot(
        "game1",
        "player2",
        1000
      );

    console.log("11. Ejecutar refundFromGamePot() para player2:");
    console.log(potAfterRefund);

    this.assert(
      engine.getGamePot("game1") === 1000,
      "El nuevo pozo esperado es 1000."
    );

    console.log("12. Verificar el nuevo pozo:");
    console.log(engine.getGamePot("game1"));

    const finalPot =
      engine.creditGamePrize(
        "game1",
        "player1",
        1000
      );

    console.log("13. Ejecutar creditGamePrize() para player1:");
    console.log(finalPot);

    const player1FinalBalance =
      engine.getPlayerBalance("player1");

    const player2FinalBalance =
      engine.getPlayerBalance("player2");

    this.assert(
      player1FinalBalance === 5000,
      "El saldo final esperado de player1 es 5000."
    );

    this.assert(
      player2FinalBalance === 3000,
      "El saldo final esperado de player2 es 3000."
    );

    console.log("14. Verificar saldo final de ambos jugadores:");
    console.log({
      player1: player1FinalBalance,
      player2: player2FinalBalance,
    });

    this.assert(
      engine.getGamePot("game1") === 0,
      "El pozo final debe ser 0."
    );

    console.log("15. Verificar pozo final = 0:");
    console.log(engine.getGamePot("game1"));

    console.log("16. Mostrar jugadores del Game:");
    console.log(
      engine
        .getGamePlayers("game1")
        .map(player => player.toJSON())
    );

    console.log("17. Mostrar historial de transacciones:");
    console.log(
      engine
        .getWalletManager()
        .toTransactionsJSON()
    );

    console.log("18. Mostrar eventos emitidos:");
    console.log(eventManager.getEvents());

    console.log("19. Serializar Game:");
    console.log(
      engine
        .getGame("game1")
        .toJSON()
    );

    const serializedEngine =
      typeof engine.toJSON === "function"
        ? engine.toJSON()
        : {
            initialized: engine.isInitialized(),
            running: engine.isRunning(),
            finished: engine.isFinished(),
            currentRound: engine.getCurrentRound(),
            games: engine
              .getGameManager()
              .toJSON(),
            players: engine
              .getPlayerManager()
              .toJSON(),
            wallets: engine
              .getWalletManager()
              .toJSON(),
            transactions: engine
              .getWalletManager()
              .toTransactionsJSON(),
          };

    console.log("20. Serializar BaseGameEngine:");
    console.log(serializedEngine);

    console.log("21. Mostrar todos los resultados:");
    console.log({
      game: engine
        .getGame("game1")
        .toJSON(),
      gamePlayers: engine
        .getGamePlayers("game1")
        .map(player => player.toJSON()),
      wallets: engine
        .getWalletManager()
        .toJSON(),
      transactions: engine
        .getWalletManager()
        .toTransactionsJSON(),
      events: eventManager.getEvents(),
      engine: serializedEngine,
    });

    console.log("===== COMPLETE ENGINE SANDBOX OK =====");
  }
}

new GameSandbox();

export default GameSandbox;
