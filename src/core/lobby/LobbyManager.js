import Lobby from "./Lobby";
import LobbyEvents from "./LobbyEvents";
import LobbyValidator from "./LobbyValidator";

class LobbyManager {
  constructor(eventManager = null) {
    this.lobbies = new Map();
    this.eventManager = eventManager;
  }

  createLobby(
    id,
    name,
    gameType,
    minPlayers = 2,
    maxPlayers = 10,
    metadata = {}
  ) {
    LobbyValidator.validateId(id);
    LobbyValidator.validateName(name);
    LobbyValidator.validateGameType(gameType);
    LobbyValidator.validateMinPlayers(minPlayers);
    LobbyValidator.validateMaxPlayers(
      maxPlayers,
      minPlayers
    );
    LobbyValidator.validateMetadata(metadata);

    if (this.hasLobby(id)) {
      throw new Error(
        "Ya existe un lobby con ese id."
      );
    }

    const lobby =
      new Lobby(
        id,
        name,
        gameType,
        minPlayers,
        maxPlayers,
        metadata
      );

    this.lobbies.set(
      id,
      lobby
    );

    this.emitLobbyEvent(
      LobbyEvents.createLobbyCreatedEvent(lobby)
    );

    return lobby;
  }

  getLobby(id) {
    LobbyValidator.validateId(id);

    const lobby =
      this.lobbies.get(id);

    if (!lobby) {
      throw new Error(
        "No existe un lobby con ese id."
      );
    }

    return lobby;
  }

  hasLobby(id) {
    LobbyValidator.validateId(id);

    return this.lobbies.has(id);
  }

  removeLobby(id) {
    LobbyValidator.validateId(id);

    if (!this.hasLobby(id)) {
      throw new Error(
        "No existe un lobby para eliminar."
      );
    }

    const removed =
      this.lobbies.delete(id);

    this.emitLobbyEvent(
      LobbyEvents.createLobbyRemovedEvent(id)
    );

    return removed;
  }

  openLobby(id) {
    const status =
      this
        .getLobby(id)
        .setStatus("WAITING");

    this.emitLobbyEvent(
      LobbyEvents.createLobbyOpenedEvent(id)
    );

    return status;
  }

  closeLobby(id) {
    const status =
      this
        .getLobby(id)
        .setStatus("CLOSED");

    this.emitLobbyEvent(
      LobbyEvents.createLobbyClosedEvent(id)
    );

    return status;
  }

  startLobby(id) {
    const status =
      this
        .getLobby(id)
        .setStatus("STARTED");

    this.emitLobbyEvent(
      LobbyEvents.createLobbyStartedEvent(id)
    );

    return status;
  }

  addPlayer(lobbyId, playerId) {
    LobbyValidator.validatePlayerId(playerId);

    const players =
      this
        .getLobby(lobbyId)
        .addPlayer(playerId);

    const lobby =
      this.getLobby(lobbyId);

    if (lobby.isReady()) {
      lobby.setStatus("READY");
    }

    this.emitLobbyEvent(
      LobbyEvents.createPlayerJoinedLobbyEvent(
        lobbyId,
        playerId
      )
    );

    if (lobby.isReady()) {
      this.emitLobbyEvent(
        LobbyEvents.createLobbyReadyEvent(lobbyId)
      );
    }

    return players;
  }

  removePlayer(lobbyId, playerId) {
    LobbyValidator.validatePlayerId(playerId);

    const lobby =
      this.getLobby(lobbyId);

    const players =
      lobby.removePlayer(playerId);

    if (
      lobby.getStatus() === "READY" &&
      !lobby.isReady()
    ) {
      lobby.setStatus("WAITING");
    }

    this.emitLobbyEvent(
      LobbyEvents.createPlayerLeftLobbyEvent(
        lobbyId,
        playerId
      )
    );

    return players;
  }

  hasPlayer(lobbyId, playerId) {
    LobbyValidator.validatePlayerId(playerId);

    return this
      .getLobby(lobbyId)
      .hasPlayer(playerId);
  }

  getLobbies() {
    return Array.from(
      this.lobbies.values()
    );
  }

  getLobbiesByGameType(gameType) {
    LobbyValidator.validateGameType(gameType);

    return this
      .getLobbies()
      .filter(lobby =>
        lobby.getGameType() === gameType
      );
  }

  getWaitingLobbies() {
    return this
      .getLobbies()
      .filter(lobby =>
        lobby.getStatus() === "WAITING"
      );
  }

  getReadyLobbies() {
    return this
      .getLobbies()
      .filter(lobby =>
        lobby.getStatus() === "READY"
      );
  }

  getStartedLobbies() {
    return this
      .getLobbies()
      .filter(lobby =>
        lobby.getStatus() === "STARTED"
      );
  }

  getClosedLobbies() {
    return this
      .getLobbies()
      .filter(lobby =>
        lobby.getStatus() === "CLOSED"
      );
  }

  clear() {
    this.lobbies.clear();
  }

  setEventManager(eventManager) {
    this.eventManager = eventManager;
  }

  getEventManager() {
    return this.eventManager;
  }

  emitLobbyEvent(event) {
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
      .getLobbies()
      .map(lobby => lobby.toJSON());
  }
}

export default LobbyManager;
