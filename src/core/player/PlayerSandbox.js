import BaseGameEngine from "../Engine/BaseGameEngine";
import EventManager from "../Engine/EventManager";
import PlayerEvents from "./PlayerEvents";
import PlayerManager from "./PlayerManager";

class PlayerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PLAYER SANDBOX =====");

    const playerManager =
      new PlayerManager();

    console.log("1. PlayerManager creado:");
    console.log(playerManager.toJSON());

    const player1 =
      playerManager.createPlayer(
        "player1",
        "Player One",
        {
          seat: 1,
        }
      );

    console.log("2. player1 creado:");
    console.log(player1.toJSON());

    const player2 =
      playerManager.createPlayer(
        "player2",
        "Player Two",
        {
          seat: 2,
        }
      );

    console.log("3. player2 creado:");
    console.log(player2.toJSON());

    this.assert(
      playerManager.hasPlayer("player1") === true,
      "player1 debe existir."
    );

    this.assert(
      playerManager.hasPlayer("player2") === true,
      "player2 debe existir."
    );

    console.log("4. Verificar hasPlayer():");
    console.log({
      player1: playerManager.hasPlayer("player1"),
      player2: playerManager.hasPlayer("player2"),
    });

    const foundPlayer1 =
      playerManager.getPlayer("player1");

    const foundPlayer2 =
      playerManager.getPlayer("player2");

    console.log("5. Obtener ambos jugadores:");
    console.log([
      foundPlayer1.toJSON(),
      foundPlayer2.toJSON(),
    ]);

    playerManager.updatePlayerName(
      "player1",
      "Player One Updated"
    );

    console.log("6. Cambiar el nombre de player1:");
    console.log(
      playerManager
        .getPlayer("player1")
        .toJSON()
    );

    playerManager.updatePlayerMetadata(
      "player1",
      {
        level: 3,
      }
    );

    console.log("7. Actualizar metadata:");
    console.log(
      playerManager
        .getPlayer("player1")
        .toJSON()
    );

    playerManager.disconnectPlayer("player2");

    console.log("8. Desconectar player2:");
    console.log(
      playerManager
        .getPlayer("player2")
        .toJSON()
    );

    playerManager.deactivatePlayer("player2");

    console.log("9. Desactivar player2:");
    console.log(
      playerManager
        .getPlayer("player2")
        .toJSON()
    );

    const connectedPlayers =
      playerManager.getConnectedPlayers();

    this.assert(
      connectedPlayers.length === 1,
      "Debe haber un jugador conectado."
    );

    console.log("10. Obtener jugadores conectados:");
    console.log(
      connectedPlayers.map(player =>
        player.toJSON()
      )
    );

    const activePlayers =
      playerManager.getActivePlayers();

    this.assert(
      activePlayers.length === 1,
      "Debe haber un jugador activo."
    );

    console.log("11. Obtener jugadores activos:");
    console.log(
      activePlayers.map(player =>
        player.toJSON()
      )
    );

    const events = [
      PlayerEvents.createPlayerCreatedEvent(player1),
      PlayerEvents.createPlayerCreatedEvent(player2),
      PlayerEvents.createPlayerUpdatedEvent(
        playerManager.getPlayer("player1")
      ),
      PlayerEvents.createPlayerDisconnectedEvent(
        "player2"
      ),
      PlayerEvents.createPlayerDeactivatedEvent(
        "player2"
      ),
      PlayerEvents.createPlayerConnectedEvent("player2"),
      PlayerEvents.createPlayerActivatedEvent("player2"),
      PlayerEvents.createPlayerRemovedEvent("player2"),
    ];

    console.log("12. Crear eventos utilizando PlayerEvents:");
    console.log(events);

    console.log("13. Serializar Player:");
    console.log(
      playerManager
        .getPlayer("player1")
        .toJSON()
    );

    console.log("14. Serializar PlayerManager:");
    console.log(playerManager.toJSON());

    const removedPlayer2 =
      playerManager.removePlayer("player2");

    this.assert(
      removedPlayer2 === true,
      "player2 debe eliminarse correctamente."
    );

    console.log("15. Eliminar player2:");
    console.log(playerManager.toJSON());

    playerManager.clear();

    console.log("16. Limpiar PlayerManager:");
    console.log(playerManager.toJSON());

    console.log("17. Resultados finales:");
    console.log({
      events,
      connectedPlayers: connectedPlayers.map(player =>
        player.toJSON()
      ),
      activePlayers: activePlayers.map(player =>
        player.toJSON()
      ),
      playerManager: playerManager.toJSON(),
    });

    console.log("===== PLAYER SANDBOX OK =====");

    this.runEngineIntegration();
  }

  runEngineIntegration() {
    console.log(
      "===== PLAYER + WALLET + ENGINE SANDBOX ====="
    );

    const eventManager =
      new EventManager();

    const engine =
      new BaseGameEngine({
        eventManager,
      });

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

    const player =
      engine.createPlayer(
        "player1",
        "Player One",
        {
          seat: 1,
        }
      );

    console.log("2. Crear player1:");
    console.log(player.toJSON());

    const wallet =
      engine.getPlayerWallet("player1");

    this.assert(
      wallet.getPlayerId() === "player1",
      "El Wallet automático debe pertenecer a player1."
    );

    console.log("3. Verificar creación automática del Wallet:");
    console.log(wallet.toJSON());

    const balanceAfterDeposit =
      engine.depositToPlayer(
        "player1",
        5000
      );

    console.log("4. Depositar 5000:");
    console.log(balanceAfterDeposit);

    this.assert(
      engine.getPlayerBalance("player1") === 5000,
      "El saldo esperado después del depósito es 5000."
    );

    console.log("5. Verificar saldo = 5000:");
    console.log(engine.getPlayerBalance("player1"));

    const balanceAfterBet =
      engine.placeBet(
        "player1",
        1000
      );

    console.log("6. Ejecutar placeBet(1000):");
    console.log(balanceAfterBet);

    this.assert(
      engine.getPlayerBalance("player1") === 4000,
      "El saldo esperado después de placeBet es 4000."
    );

    console.log("7. Verificar saldo = 4000:");
    console.log(engine.getPlayerBalance("player1"));

    const balanceAfterRefund =
      engine.refundBet(
        "player1",
        500
      );

    console.log("8. Ejecutar refundBet(500):");
    console.log(balanceAfterRefund);

    this.assert(
      engine.getPlayerBalance("player1") === 4500,
      "El saldo esperado después de refundBet es 4500."
    );

    console.log("9. Verificar saldo = 4500:");
    console.log(engine.getPlayerBalance("player1"));

    const balanceAfterPrize =
      engine.creditPrize(
        "player1",
        2000
      );

    console.log("10. Ejecutar creditPrize(2000):");
    console.log(balanceAfterPrize);

    this.assert(
      engine.getPlayerBalance("player1") === 6500,
      "El saldo esperado después de creditPrize es 6500."
    );

    console.log("11. Verificar saldo = 6500:");
    console.log(engine.getPlayerBalance("player1"));

    const updatedName =
      engine
        .getPlayerManager()
        .updatePlayerName(
          "player1",
          "Player One Updated"
        );

    console.log("12. Actualizar nombre del jugador:");
    console.log(updatedName);

    const updatedMetadata =
      engine
        .getPlayerManager()
        .updatePlayerMetadata(
          "player1",
          {
            level: 5,
          }
        );

    console.log("13. Actualizar metadata:");
    console.log(updatedMetadata);

    console.log("14. Mostrar Player serializado:");
    console.log(
      engine
        .getPlayer("player1")
        .toJSON()
    );

    console.log("15. Mostrar Wallet serializado:");
    console.log(
      engine
        .getPlayerWallet("player1")
        .toJSON()
    );

    console.log("16. Mostrar historial de transacciones:");
    console.log(
      engine
        .getWalletManager()
        .toTransactionsJSON()
    );

    console.log("17. Mostrar eventos emitidos:");
    console.log(eventManager.getEvents());

    const removedPlayer =
      engine.removePlayer("player1");

    this.assert(
      removedPlayer === true,
      "player1 debe eliminarse correctamente."
    );

    console.log("18. Eliminar el Player:");
    console.log(engine.getAllPlayers());

    const walletRemoved =
      engine
        .getWalletManager()
        .hasWallet("player1") === false;

    this.assert(
      walletRemoved === true,
      "El Wallet de player1 debe eliminarse automáticamente."
    );

    console.log("19. Verificar eliminación automática del Wallet:");
    console.log(walletRemoved);

    console.log("20. Mostrar todos los resultados:");
    console.log({
      players: engine
        .getAllPlayers()
        .map(currentPlayer =>
          currentPlayer.toJSON()
        ),
      wallets: engine
        .getWalletManager()
        .toJSON(),
      transactions: engine
        .getWalletManager()
        .toTransactionsJSON(),
      events: eventManager.getEvents(),
    });

    console.log(
      "===== PLAYER + WALLET + ENGINE SANDBOX OK ====="
    );
  }
}

new PlayerSandbox();

export default PlayerSandbox;
