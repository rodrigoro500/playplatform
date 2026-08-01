import BaseGameEngine from "../Engine/BaseGameEngine";
import EventManager from "../Engine/EventManager";
import TableEvents from "./TableEvents";
import TableManager from "./TableManager";

class TableSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== TABLE SANDBOX =====");

    const tableManager =
      new TableManager();

    console.log("1. Crear TableManager:");
    console.log(tableManager.toJSON());

    const table1 =
      tableManager.createTable(
        "table1",
        "Mesa Pase",
        "PASE"
      );

    console.log("2. Crear table1 tipo PASE:");
    console.log(table1.toJSON());

    const table2 =
      tableManager.createTable(
        "table2",
        "Mesa Poker",
        "POKER"
      );

    console.log("3. Crear table2 tipo POKER:");
    console.log(table2.toJSON());

    this.assert(
      tableManager.hasTable("table1") === true,
      "table1 debe existir."
    );

    this.assert(
      tableManager.hasTable("table2") === true,
      "table2 debe existir."
    );

    console.log("4. Verificar hasTable():");
    console.log({
      table1: tableManager.hasTable("table1"),
      table2: tableManager.hasTable("table2"),
    });

    const foundTable1 =
      tableManager.getTable("table1");

    const foundTable2 =
      tableManager.getTable("table2");

    console.log("5. Obtener ambas mesas:");
    console.log([
      foundTable1.toJSON(),
      foundTable2.toJSON(),
    ]);

    tableManager.addPlayer(
      "table1",
      "player1"
    );

    console.log("6. Agregar player1:");
    console.log(
      tableManager
        .getTable("table1")
        .toJSON()
    );

    tableManager.addPlayer(
      "table1",
      "player2"
    );

    console.log("7. Agregar player2:");
    console.log(
      tableManager
        .getTable("table1")
        .toJSON()
    );

    this.assert(
      tableManager
        .getTable("table1")
        .getPlayerCount() === 2,
      "table1 debe tener dos jugadores."
    );

    console.log("8. Verificar cantidad de jugadores:");
    console.log(
      tableManager
        .getTable("table1")
        .getPlayerCount()
    );

    tableManager.removePlayer(
      "table1",
      "player2"
    );

    console.log("9. Eliminar player2:");
    console.log(
      tableManager
        .getTable("table1")
        .toJSON()
    );

    tableManager.openTable("table1");

    console.log("10. Abrir table1:");
    console.log(
      tableManager
        .getTable("table1")
        .toJSON()
    );

    tableManager.startTable("table1");

    console.log("11. Iniciar table1:");
    console.log(
      tableManager
        .getTable("table1")
        .toJSON()
    );

    tableManager.closeTable("table2");

    console.log("12. Cerrar table2:");
    console.log(
      tableManager
        .getTable("table2")
        .toJSON()
    );

    const openTables =
      tableManager.getOpenTables();

    console.log("13. Obtener mesas OPEN:");
    console.log(
      openTables.map(table => table.toJSON())
    );

    const playingTables =
      tableManager.getPlayingTables();

    this.assert(
      playingTables.length === 1,
      "Debe haber una mesa en juego."
    );

    console.log("14. Obtener mesas PLAYING:");
    console.log(
      playingTables.map(table => table.toJSON())
    );

    const closedTables =
      tableManager.getClosedTables();

    this.assert(
      closedTables.length === 1,
      "Debe haber una mesa cerrada."
    );

    console.log("15. Obtener mesas CLOSED:");
    console.log(
      closedTables.map(table => table.toJSON())
    );

    const paseTables =
      tableManager.getTablesByGameType("PASE");

    this.assert(
      paseTables.length === 1,
      "Debe haber una mesa tipo PASE."
    );

    console.log("16. Obtener mesas por tipo de juego:");
    console.log(
      paseTables.map(table => table.toJSON())
    );

    const events = [
      TableEvents.createTableCreatedEvent(table1),
      TableEvents.createTableCreatedEvent(table2),
      TableEvents.createPlayerJoinedTableEvent(
        "table1",
        "player1"
      ),
      TableEvents.createPlayerJoinedTableEvent(
        "table1",
        "player2"
      ),
      TableEvents.createPlayerLeftTableEvent(
        "table1",
        "player2"
      ),
      TableEvents.createTableOpenedEvent("table1"),
      TableEvents.createTableStartedEvent("table1"),
      TableEvents.createTableClosedEvent("table2"),
      TableEvents.createTableRemovedEvent("table2"),
    ];

    console.log("17. Crear eventos utilizando TableEvents:");
    console.log(events);

    console.log("18. Serializar Table:");
    console.log(
      tableManager
        .getTable("table1")
        .toJSON()
    );

    console.log("19. Serializar TableManager:");
    console.log(tableManager.toJSON());

    const removedTable2 =
      tableManager.removeTable("table2");

    this.assert(
      removedTable2 === true,
      "table2 debe eliminarse correctamente."
    );

    console.log("20. Eliminar table2:");
    console.log(tableManager.toJSON());

    tableManager.clear();

    console.log("21. Limpiar TableManager:");
    console.log(tableManager.toJSON());

    console.log("22. Mostrar todos los resultados:");
    console.log({
      events,
      openTables: openTables.map(table =>
        table.toJSON()
      ),
      playingTables: playingTables.map(table =>
        table.toJSON()
      ),
      closedTables: closedTables.map(table =>
        table.toJSON()
      ),
      paseTables: paseTables.map(table =>
        table.toJSON()
      ),
      tableManager: tableManager.toJSON(),
    });

    console.log("===== TABLE SANDBOX OK =====");

    this.runEngineIntegration();
  }

  runEngineIntegration() {
    console.log(
      "===== TABLE + GAME + PLAYER + WALLET + ENGINE SANDBOX ====="
    );

    const eventManager =
      new EventManager();

    const engine =
      new BaseGameEngine({
        eventManager,
      });

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

    const table =
      engine.createTable(
        "table1",
        "Mesa Pase",
        "PASE"
      );

    console.log("2. Crear Table:");
    console.log(table.toJSON());

    const game =
      engine.createGame(
        "game1",
        "PASE"
      );

    console.log("3. Crear Game:");
    console.log(game.toJSON());

    engine.assignGameToTable(
      "table1",
      "game1"
    );

    this.assert(
      engine.tableHasGame("table1") === true,
      "La Table debe tener un Game asignado."
    );

    console.log("4. Asignar Game a la Table:");
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

    console.log("5. Crear player1:");
    console.log(player1.toJSON());

    const player2 =
      engine.createPlayer(
        "player2",
        "Player Two"
      );

    console.log("6. Crear player2:");
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

    console.log("7. Verificar creación automática de Wallets:");
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

    console.log("8. Depositar 5000 a player1:");
    console.log(player1Deposit);

    const player2Deposit =
      engine.depositToPlayer(
        "player2",
        3000
      );

    console.log("9. Depositar 3000 a player2:");
    console.log(player2Deposit);

    engine.addPlayerToTable(
      "table1",
      "player1"
    );

    engine.addPlayerToTable(
      "table1",
      "player2"
    );

    console.log("10. Agregar ambos jugadores a la Table:");
    console.log(
      engine
        .getTable("table1")
        .toJSON()
    );

    const tablePlayers =
      engine.getTablePlayers("table1");

    this.assert(
      tablePlayers.length === 2,
      "La Table debe tener dos jugadores."
    );

    console.log("11. Obtener jugadores de la Table:");
    console.log(
      tablePlayers.map(player =>
        player.toJSON()
      )
    );

    engine.addToGamePot(
      "game1",
      "player1",
      1000
    );

    const potAfterBets =
      engine.addToGamePot(
        "game1",
        "player2",
        1000
      );

    console.log("12. Crear una apuesta utilizando addToGamePot():");
    console.log(potAfterBets);

    this.assert(
      engine.getGamePot("game1") === 2000,
      "El pozo esperado es 2000."
    );

    console.log("13. Verificar el pozo:");
    console.log(engine.getGamePot("game1"));

    const potAfterRefund =
      engine.refundFromGamePot(
        "game1",
        "player2",
        1000
      );

    console.log("14. Ejecutar refundFromGamePot() para player2:");
    console.log(potAfterRefund);

    const potAfterPrize =
      engine.creditGamePrize(
        "game1",
        "player1",
        1000
      );

    console.log("15. Ejecutar creditGamePrize() para player1:");
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

    console.log("16. Verificar saldos finales:");
    console.log({
      player1: player1FinalBalance,
      player2: player2FinalBalance,
    });

    this.assert(
      engine.getGamePot("game1") === 0,
      "El pozo final debe ser 0."
    );

    console.log("17. Verificar pozo final = 0:");
    console.log(engine.getGamePot("game1"));

    const serializedTable =
      engine
        .getTable("table1")
        .toJSON();

    console.log("18. Mostrar Table serializada:");
    console.log(serializedTable);

    const serializedGame =
      engine
        .getGame("game1")
        .toJSON();

    console.log("19. Mostrar Game serializado:");
    console.log(serializedGame);

    const serializedPlayers =
      engine
        .getAllPlayers()
        .map(player => player.toJSON());

    console.log("20. Mostrar Players serializados:");
    console.log(serializedPlayers);

    const serializedWallets =
      engine
        .getWalletManager()
        .toJSON();

    console.log("21. Mostrar Wallets serializadas:");
    console.log(serializedWallets);

    const transactions =
      engine
        .getWalletManager()
        .toTransactionsJSON();

    console.log("22. Mostrar historial de transacciones:");
    console.log(transactions);

    const events =
      eventManager.getEvents();

    console.log("23. Mostrar eventos emitidos:");
    console.log(events);

    engine.removeGameFromTable("table1");

    this.assert(
      engine.tableHasGame("table1") === false,
      "La Table no debe tener Game asignado."
    );

    console.log("24. Remover Game de la Table:");
    console.log(
      engine
        .getTable("table1")
        .toJSON()
    );

    const removedTable =
      engine.removeTable("table1");

    this.assert(
      removedTable === true,
      "La Table debe eliminarse correctamente."
    );

    console.log("25. Eliminar Table:");
    console.log(engine.getTables());

    console.log("26. Mostrar todos los resultados por consola:");
    console.log({
      table: serializedTable,
      game: serializedGame,
      players: serializedPlayers,
      wallets: serializedWallets,
      transactions,
      events: eventManager.getEvents(),
      removedTable,
    });

    console.log(
      "===== TABLE + GAME + PLAYER + WALLET + ENGINE SANDBOX OK ====="
    );
  }
}

new TableSandbox();

export default TableSandbox;
