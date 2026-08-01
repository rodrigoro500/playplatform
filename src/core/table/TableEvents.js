class TableEvents {
  static TABLE_CREATED = "TABLE_CREATED";

  static TABLE_REMOVED = "TABLE_REMOVED";

  static TABLE_OPENED = "TABLE_OPENED";

  static TABLE_CLOSED = "TABLE_CLOSED";

  static TABLE_STARTED = "TABLE_STARTED";

  static PLAYER_JOINED_TABLE = "PLAYER_JOINED_TABLE";

  static PLAYER_LEFT_TABLE = "PLAYER_LEFT_TABLE";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createTableCreatedEvent(table) {
    return TableEvents.createEvent(
      TableEvents.TABLE_CREATED,
      {
        table: table.toJSON(),
      }
    );
  }

  static createTableRemovedEvent(tableId) {
    return TableEvents.createEvent(
      TableEvents.TABLE_REMOVED,
      {
        tableId,
      }
    );
  }

  static createTableOpenedEvent(tableId) {
    return TableEvents.createEvent(
      TableEvents.TABLE_OPENED,
      {
        tableId,
      }
    );
  }

  static createTableClosedEvent(tableId) {
    return TableEvents.createEvent(
      TableEvents.TABLE_CLOSED,
      {
        tableId,
      }
    );
  }

  static createTableStartedEvent(tableId) {
    return TableEvents.createEvent(
      TableEvents.TABLE_STARTED,
      {
        tableId,
      }
    );
  }

  static createPlayerJoinedTableEvent(
    tableId,
    playerId
  ) {
    return TableEvents.createEvent(
      TableEvents.PLAYER_JOINED_TABLE,
      {
        tableId,
        playerId,
      }
    );
  }

  static createPlayerLeftTableEvent(
    tableId,
    playerId
  ) {
    return TableEvents.createEvent(
      TableEvents.PLAYER_LEFT_TABLE,
      {
        tableId,
        playerId,
      }
    );
  }
}

export default TableEvents;
