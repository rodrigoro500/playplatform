class PlayerEvents {
  static PLAYER_CREATED = "PLAYER_CREATED";

  static PLAYER_REMOVED = "PLAYER_REMOVED";

  static PLAYER_CONNECTED = "PLAYER_CONNECTED";

  static PLAYER_DISCONNECTED = "PLAYER_DISCONNECTED";

  static PLAYER_ACTIVATED = "PLAYER_ACTIVATED";

  static PLAYER_DEACTIVATED = "PLAYER_DEACTIVATED";

  static PLAYER_UPDATED = "PLAYER_UPDATED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createPlayerCreatedEvent(player) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_CREATED,
      {
        player: player.toJSON(),
      }
    );
  }

  static createPlayerRemovedEvent(playerId) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_REMOVED,
      {
        playerId,
      }
    );
  }

  static createPlayerConnectedEvent(playerId) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_CONNECTED,
      {
        playerId,
      }
    );
  }

  static createPlayerDisconnectedEvent(playerId) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_DISCONNECTED,
      {
        playerId,
      }
    );
  }

  static createPlayerActivatedEvent(playerId) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_ACTIVATED,
      {
        playerId,
      }
    );
  }

  static createPlayerDeactivatedEvent(playerId) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_DEACTIVATED,
      {
        playerId,
      }
    );
  }

  static createPlayerUpdatedEvent(player) {
    return PlayerEvents.createEvent(
      PlayerEvents.PLAYER_UPDATED,
      {
        player: player.toJSON(),
      }
    );
  }
}

export default PlayerEvents;
