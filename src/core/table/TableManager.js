import Table from "./Table";
import TableEvents from "./TableEvents";
import TableValidator from "./TableValidator";

class TableManager {
  constructor(eventManager = null) {
    this.tables = new Map();
    this.eventManager = eventManager;
  }

  createTable(
    id,
    name,
    gameType,
    maxPlayers = 10,
    metadata = {}
  ) {
    TableValidator.validateId(id);
    TableValidator.validateName(name);
    TableValidator.validateGameType(gameType);
    TableValidator.validateMaxPlayers(maxPlayers);
    TableValidator.validateMetadata(metadata);

    if (this.hasTable(id)) {
      throw new Error(
        "Ya existe una mesa con ese id."
      );
    }

    const table =
      new Table(
        id,
        name,
        gameType,
        maxPlayers,
        metadata
      );

    this.tables.set(
      id,
      table
    );

    this.emitTableEvent(
      TableEvents.createTableCreatedEvent(table)
    );

    return table;
  }

  getTable(id) {
    TableValidator.validateId(id);

    const table =
      this.tables.get(id);

    if (!table) {
      throw new Error(
        "No existe una mesa con ese id."
      );
    }

    return table;
  }

  hasTable(id) {
    TableValidator.validateId(id);

    return this.tables.has(id);
  }

  removeTable(id) {
    TableValidator.validateId(id);

    if (!this.hasTable(id)) {
      throw new Error(
        "No existe una mesa para eliminar."
      );
    }

    const removed =
      this.tables.delete(id);

    this.emitTableEvent(
      TableEvents.createTableRemovedEvent(id)
    );

    return removed;
  }

  openTable(id) {
    const status =
      this
        .getTable(id)
        .setStatus("OPEN");

    this.emitTableEvent(
      TableEvents.createTableOpenedEvent(id)
    );

    return status;
  }

  closeTable(id) {
    const status =
      this
        .getTable(id)
        .setStatus("CLOSED");

    this.emitTableEvent(
      TableEvents.createTableClosedEvent(id)
    );

    return status;
  }

  startTable(id) {
    const status =
      this
        .getTable(id)
        .setStatus("PLAYING");

    this.emitTableEvent(
      TableEvents.createTableStartedEvent(id)
    );

    return status;
  }

  addPlayer(tableId, playerId) {
    TableValidator.validatePlayerId(playerId);

    const players =
      this
        .getTable(tableId)
        .addPlayer(playerId);

    this.emitTableEvent(
      TableEvents.createPlayerJoinedTableEvent(
        tableId,
        playerId
      )
    );

    return players;
  }

  removePlayer(tableId, playerId) {
    TableValidator.validatePlayerId(playerId);

    const players =
      this
        .getTable(tableId)
        .removePlayer(playerId);

    this.emitTableEvent(
      TableEvents.createPlayerLeftTableEvent(
        tableId,
        playerId
      )
    );

    return players;
  }

  hasPlayer(tableId, playerId) {
    TableValidator.validatePlayerId(playerId);

    return this
      .getTable(tableId)
      .hasPlayer(playerId);
  }

  getTables() {
    return Array.from(
      this.tables.values()
    );
  }

  getTablesByGameType(gameType) {
    TableValidator.validateGameType(gameType);

    return this
      .getTables()
      .filter(table =>
        table.getGameType() === gameType
      );
  }

  getOpenTables() {
    return this
      .getTables()
      .filter(table =>
        table.getStatus() === "OPEN"
      );
  }

  getClosedTables() {
    return this
      .getTables()
      .filter(table =>
        table.getStatus() === "CLOSED"
      );
  }

  getPlayingTables() {
    return this
      .getTables()
      .filter(table =>
        table.getStatus() === "PLAYING"
      );
  }

  clear() {
    this.tables.clear();
  }

  setEventManager(eventManager) {
    this.eventManager = eventManager;
  }

  getEventManager() {
    return this.eventManager;
  }

  emitTableEvent(event) {
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
      .getTables()
      .map(table => table.toJSON());
  }
}

export default TableManager;
