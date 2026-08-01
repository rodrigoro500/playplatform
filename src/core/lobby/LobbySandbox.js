import BaseGameEngine from "../Engine/BaseGameEngine";
import EventManager from "../Engine/EventManager";
import LobbyEvents from "./LobbyEvents";
import LobbyManager from "./LobbyManager";

class LobbySandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== LOBBY SANDBOX =====");

    const lobbyManager =
      new LobbyManager();

    console.log("1. Crear LobbyManager:");
    console.log(lobbyManager.toJSON());

    const lobby1 =
      lobbyManager.createLobby(
        "lobby1",
        "Lobby Pase",
        "PASE",
        2,
        4
      );

    console.log("2. Crear lobby1 tipo PASE:");
    console.log(lobby1.toJSON());

    const lobby2 =
      lobbyManager.createLobby(
        "lobby2",
        "Lobby Poker",
        "POKER"
      );

    console.log("3. Crear lobby2 tipo POKER:");
    console.log(lobby2.toJSON());

    this.assert(
      lobbyManager.hasLobby("lobby1") === true,
      "lobby1 debe existir."
    );

    this.assert(
      lobbyManager.hasLobby("lobby2") === true,
      "lobby2 debe existir."
    );

    console.log("4. Verificar hasLobby():");
    console.log({
      lobby1: lobbyManager.hasLobby("lobby1"),
      lobby2: lobbyManager.hasLobby("lobby2"),
    });

    const foundLobby1 =
      lobbyManager.getLobby("lobby1");

    const foundLobby2 =
      lobbyManager.getLobby("lobby2");

    console.log("5. Obtener ambos lobbies:");
    console.log([
      foundLobby1.toJSON(),
      foundLobby2.toJSON(),
    ]);

    lobbyManager.addPlayer(
      "lobby1",
      "player1"
    );

    console.log("6. Agregar player1:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    lobbyManager.addPlayer(
      "lobby1",
      "player2"
    );

    console.log("7. Agregar player2:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    this.assert(
      lobbyManager
        .getLobby("lobby1")
        .isReady() === true,
      "lobby1 debe estar listo."
    );

    console.log("8. Verificar isReady():");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .isReady()
    );

    lobbyManager.addPlayer(
      "lobby1",
      "player3"
    );

    lobbyManager.addPlayer(
      "lobby1",
      "player4"
    );

    console.log("9. Agregar más jugadores hasta completar el lobby:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    this.assert(
      lobbyManager
        .getLobby("lobby1")
        .isFull() === true,
      "lobby1 debe estar lleno."
    );

    console.log("10. Verificar isFull():");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .isFull()
    );

    lobbyManager.removePlayer(
      "lobby1",
      "player2"
    );

    console.log("11. Eliminar player2:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    lobbyManager.openLobby("lobby1");

    console.log("12. Abrir lobby1:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    lobbyManager.startLobby("lobby1");

    console.log("13. Iniciar lobby1:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    lobbyManager.closeLobby("lobby2");

    console.log("14. Cerrar lobby2:");
    console.log(
      lobbyManager
        .getLobby("lobby2")
        .toJSON()
    );

    const waitingLobbies =
      lobbyManager.getWaitingLobbies();

    console.log("15. Obtener lobbies WAITING:");
    console.log(
      waitingLobbies.map(lobby =>
        lobby.toJSON()
      )
    );

    const readyLobbies =
      lobbyManager.getReadyLobbies();

    console.log("16. Obtener lobbies READY:");
    console.log(
      readyLobbies.map(lobby =>
        lobby.toJSON()
      )
    );

    const startedLobbies =
      lobbyManager.getStartedLobbies();

    this.assert(
      startedLobbies.length === 1,
      "Debe haber un lobby iniciado."
    );

    console.log("17. Obtener lobbies STARTED:");
    console.log(
      startedLobbies.map(lobby =>
        lobby.toJSON()
      )
    );

    const closedLobbies =
      lobbyManager.getClosedLobbies();

    this.assert(
      closedLobbies.length === 1,
      "Debe haber un lobby cerrado."
    );

    console.log("18. Obtener lobbies CLOSED:");
    console.log(
      closedLobbies.map(lobby =>
        lobby.toJSON()
      )
    );

    const paseLobbies =
      lobbyManager.getLobbiesByGameType("PASE");

    this.assert(
      paseLobbies.length === 1,
      "Debe haber un lobby tipo PASE."
    );

    console.log("19. Obtener lobbies por tipo de juego:");
    console.log(
      paseLobbies.map(lobby =>
        lobby.toJSON()
      )
    );

    const events = [
      LobbyEvents.createLobbyCreatedEvent(lobby1),
      LobbyEvents.createLobbyCreatedEvent(lobby2),
      LobbyEvents.createPlayerJoinedLobbyEvent(
        "lobby1",
        "player1"
      ),
      LobbyEvents.createPlayerJoinedLobbyEvent(
        "lobby1",
        "player2"
      ),
      LobbyEvents.createLobbyReadyEvent("lobby1"),
      LobbyEvents.createPlayerJoinedLobbyEvent(
        "lobby1",
        "player3"
      ),
      LobbyEvents.createPlayerJoinedLobbyEvent(
        "lobby1",
        "player4"
      ),
      LobbyEvents.createPlayerLeftLobbyEvent(
        "lobby1",
        "player2"
      ),
      LobbyEvents.createLobbyOpenedEvent("lobby1"),
      LobbyEvents.createLobbyStartedEvent("lobby1"),
      LobbyEvents.createLobbyClosedEvent("lobby2"),
      LobbyEvents.createLobbyRemovedEvent("lobby2"),
    ];

    console.log("20. Crear eventos utilizando LobbyEvents:");
    console.log(events);

    console.log("21. Serializar Lobby:");
    console.log(
      lobbyManager
        .getLobby("lobby1")
        .toJSON()
    );

    console.log("22. Serializar LobbyManager:");
    console.log(lobbyManager.toJSON());

    const removedLobby2 =
      lobbyManager.removeLobby("lobby2");

    this.assert(
      removedLobby2 === true,
      "lobby2 debe eliminarse correctamente."
    );

    console.log("23. Eliminar lobby2:");
    console.log(lobbyManager.toJSON());

    lobbyManager.clear();

    console.log("24. Limpiar LobbyManager:");
    console.log(lobbyManager.toJSON());

    console.log("25. Mostrar todos los resultados por consola:");
    console.log({
      events,
      waitingLobbies: waitingLobbies.map(lobby =>
        lobby.toJSON()
      ),
      readyLobbies: readyLobbies.map(lobby =>
        lobby.toJSON()
      ),
      startedLobbies: startedLobbies.map(lobby =>
        lobby.toJSON()
      ),
      closedLobbies: closedLobbies.map(lobby =>
        lobby.toJSON()
      ),
      paseLobbies: paseLobbies.map(lobby =>
        lobby.toJSON()
      ),
      lobbyManager: lobbyManager.toJSON(),
    });

    console.log("===== LOBBY SANDBOX OK =====");

    this.runEngineIntegration();
  }

  runEngineIntegration() {
    console.log(
      "===== LOBBY + TABLE + GAME + PLAYER + WALLET + ENGINE SANDBOX ====="
    );

    const eventManager =
      new EventManager();

    const engine =
      new BaseGameEngine({
        eventManager,
      });

    engine
      .getLobbyManager()
      .setEventManager(eventManager);

    engine
      .getTableManager()
      .setEventManager(eventManager);

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

    const lobby =
      engine.createLobby(
        "lobby1",
        "Lobby Pase",
        "PASE",
        2,
        4
      );

    console.log("2. Crear Lobby:");
    console.log(lobby.toJSON());

    const table =
      engine.createTable(
        "table1",
        "Mesa Pase",
        "PASE"
      );

    console.log("3. Crear Table:");
    console.log(table.toJSON());

    engine.assignLobbyToTable(
      "lobby1",
      "table1"
    );

    this.assert(
      engine.tableHasLobby("table1") === true,
      "La Table debe tener un Lobby asignado."
    );

    console.log("4. Asignar Lobby a la Table:");
    console.log(
      engine
        .getTable("table1")
        .toJSON()
    );

    const game =
      engine.createGame(
        "game1",
        "PASE"
      );

    console.log("5. Crear Game:");
    console.log(game.toJSON());

    engine.assignGameToTable(
      "table1",
      "game1"
    );

    this.assert(
      engine.tableHasGame("table1") === true,
      "La Table debe tener un Game asignado."
    );

    console.log("6. Asignar Game a la Table:");
    console.log(
      engine
        .getTable("table1")
        .toJSON()
    );

    const player1 =
      engine.createPlayer(
        "player1",
        "Player One"
      );

    console.log("7. Crear player1:");
    console.log(player1.toJSON());

    const player2 =
      engine.createPlayer(
        "player2",
        "Player Two"
      );

    console.log("8. Crear player2:");
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

    console.log("9. Verificar creación automática de Wallets:");
    console.log([
      engine
        .getPlayerWallet("player1")
        .toJSON(),
      engine
        .getPlayerWallet("player2")
        .toJSON(),
    ]);

    engine.depositToPlayer(
      "player1",
      5000
    );

    engine.depositToPlayer(
      "player2",
      3000
    );

    console.log("10. Depositar saldo a ambos jugadores:");
    console.log({
      player1: engine.getPlayerBalance("player1"),
      player2: engine.getPlayerBalance("player2"),
    });

    engine.addPlayerToLobby(
      "lobby1",
      "player1"
    );

    engine.addPlayerToLobby(
      "lobby1",
      "player2"
    );

    console.log("11. Agregar ambos jugadores al Lobby:");
    console.log(
      engine
        .getLobby("lobby1")
        .toJSON()
    );

    this.assert(
      engine
        .getLobby("lobby1")
        .isReady() === true,
      "El Lobby debe estar READY."
    );

    console.log("12. Verificar Lobby READY:");
    console.log(
      engine
        .getLobby("lobby1")
        .getStatus()
    );

    const lobbyPlayers =
      engine.getLobbyPlayers("lobby1");

    console.log("13. Obtener jugadores del Lobby:");
    console.log(
      lobbyPlayers.map(player =>
        player.toJSON()
      )
    );

    engine.addPlayerToGame(
      "game1",
      "player1"
    );

    engine.addPlayerToGame(
      "game1",
      "player2"
    );

    console.log("14. Agregar ambos jugadores al Game:");
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

    engine.addToGamePot(
      "game1",
      "player2",
      1000
    );

    console.log("15. Ejecutar addToGamePot() para ambos jugadores:");
    console.log(engine.getGamePot("game1"));

    const potAfterRefund =
      engine.refundFromGamePot(
        "game1",
        "player2",
        1000
      );

    console.log("16. Ejecutar refundFromGamePot() para player2:");
    console.log(potAfterRefund);

    const potAfterPrize =
      engine.creditGamePrize(
        "game1",
        "player1",
        1000
      );

    console.log("17. Ejecutar creditGamePrize() para player1:");
    console.log(potAfterPrize);

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

    console.log("18. Verificar saldos finales:");
    console.log({
      player1: player1FinalBalance,
      player2: player2FinalBalance,
    });

    this.assert(
      engine.getGamePot("game1") === 0,
      "El pozo final debe ser 0."
    );

    console.log("19. Verificar pozo final = 0:");
    console.log(engine.getGamePot("game1"));

    const serializedLobby =
      engine
        .getLobby("lobby1")
        .toJSON();

    console.log("20. Mostrar Lobby serializado:");
    console.log(serializedLobby);

    const serializedTable =
      engine
        .getTable("table1")
        .toJSON();

    console.log("21. Mostrar Table serializada:");
    console.log(serializedTable);

    const serializedGame =
      engine
        .getGame("game1")
        .toJSON();

    console.log("22. Mostrar Game serializado:");
    console.log(serializedGame);

    const serializedPlayers =
      engine
        .getAllPlayers()
        .map(player => player.toJSON());

    console.log("23. Mostrar Players serializados:");
    console.log(serializedPlayers);

    const serializedWallets =
      engine
        .getWalletManager()
        .toJSON();

    console.log("24. Mostrar Wallets serializadas:");
    console.log(serializedWallets);

    const transactions =
      engine
        .getWalletManager()
        .toTransactionsJSON();

    console.log("25. Mostrar historial de transacciones:");
    console.log(transactions);

    const events =
      eventManager.getEvents();

    console.log("26. Mostrar eventos emitidos:");
    console.log(events);

    engine.removeLobbyFromTable("table1");

    this.assert(
      engine.tableHasLobby("table1") === false,
      "La Table no debe tener Lobby asignado."
    );

    console.log("27. Remover Lobby de la Table:");
    console.log(
      engine
        .getTable("table1")
        .toJSON()
    );

    const removedLobby =
      engine.removeLobby("lobby1");

    this.assert(
      removedLobby === true,
      "El Lobby debe eliminarse correctamente."
    );

    console.log("28. Eliminar Lobby:");
    console.log(engine.getLobbies());

    console.log("29. Mostrar todos los resultados por consola:");
    console.log({
      lobby: serializedLobby,
      table: serializedTable,
      game: serializedGame,
      players: serializedPlayers,
      wallets: serializedWallets,
      transactions,
      events: eventManager.getEvents(),
      removedLobby,
    });

    console.log(
      "===== LOBBY + TABLE + GAME + PLAYER + WALLET + ENGINE SANDBOX OK ====="
    );
  }
}

new LobbySandbox();

export default LobbySandbox;
