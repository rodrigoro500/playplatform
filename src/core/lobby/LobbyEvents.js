class LobbyEvents {
  static LOBBY_CREATED = "LOBBY_CREATED";

  static LOBBY_REMOVED = "LOBBY_REMOVED";

  static LOBBY_OPENED = "LOBBY_OPENED";

  static LOBBY_CLOSED = "LOBBY_CLOSED";

  static LOBBY_STARTED = "LOBBY_STARTED";

  static PLAYER_JOINED_LOBBY = "PLAYER_JOINED_LOBBY";

  static PLAYER_LEFT_LOBBY = "PLAYER_LEFT_LOBBY";

  static LOBBY_READY = "LOBBY_READY";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createLobbyCreatedEvent(lobby) {
    return LobbyEvents.createEvent(
      LobbyEvents.LOBBY_CREATED,
      {
        lobby: lobby.toJSON(),
      }
    );
  }

  static createLobbyRemovedEvent(lobbyId) {
    return LobbyEvents.createEvent(
      LobbyEvents.LOBBY_REMOVED,
      {
        lobbyId,
      }
    );
  }

  static createLobbyOpenedEvent(lobbyId) {
    return LobbyEvents.createEvent(
      LobbyEvents.LOBBY_OPENED,
      {
        lobbyId,
      }
    );
  }

  static createLobbyClosedEvent(lobbyId) {
    return LobbyEvents.createEvent(
      LobbyEvents.LOBBY_CLOSED,
      {
        lobbyId,
      }
    );
  }

  static createLobbyStartedEvent(lobbyId) {
    return LobbyEvents.createEvent(
      LobbyEvents.LOBBY_STARTED,
      {
        lobbyId,
      }
    );
  }

  static createPlayerJoinedLobbyEvent(
    lobbyId,
    playerId
  ) {
    return LobbyEvents.createEvent(
      LobbyEvents.PLAYER_JOINED_LOBBY,
      {
        lobbyId,
        playerId,
      }
    );
  }

  static createPlayerLeftLobbyEvent(
    lobbyId,
    playerId
  ) {
    return LobbyEvents.createEvent(
      LobbyEvents.PLAYER_LEFT_LOBBY,
      {
        lobbyId,
        playerId,
      }
    );
  }

  static createLobbyReadyEvent(lobbyId) {
    return LobbyEvents.createEvent(
      LobbyEvents.LOBBY_READY,
      {
        lobbyId,
      }
    );
  }
}

export default LobbyEvents;
