import PlayerEvents from "./PlayerEvents";
import Player from "./Player";
import PlayerValidator from "./PlayerValidator";

class PlayerManager {
  constructor(eventManager = null) {
    this.players = new Map();
    this.eventManager = eventManager;
  }

  createPlayer(
    id,
    name,
    metadata = {}
  ) {
    PlayerValidator.validateId(id);
    PlayerValidator.validateName(name);
    PlayerValidator.validateMetadata(metadata);

    if (this.hasPlayer(id)) {
      throw new Error(
        "Ya existe un jugador con ese id."
      );
    }

    const player =
      new Player(
        id,
        name,
        metadata
      );

    this.players.set(
      id,
      player
    );

    this.emitPlayerEvent(
      PlayerEvents.createPlayerCreatedEvent(
        player
      )
    );

    return player;
  }

  getPlayer(id) {
    PlayerValidator.validateId(id);

    const player =
      this.players.get(id);

    if (!player) {
      throw new Error(
        "No existe un jugador con ese id."
      );
    }

    return player;
  }

  hasPlayer(id) {
    PlayerValidator.validateId(id);

    return this.players.has(id);
  }

  removePlayer(id) {
    PlayerValidator.validateId(id);

    if (!this.hasPlayer(id)) {
      throw new Error(
        "No existe un jugador para eliminar."
      );
    }

    const removed =
      this.players.delete(id);

    this.emitPlayerEvent(
      PlayerEvents.createPlayerRemovedEvent(id)
    );

    return removed;
  }

  connectPlayer(id) {
    const player =
      this.getPlayer(id);

    const connected =
      player.connect();

    this.emitPlayerEvent(
      PlayerEvents.createPlayerConnectedEvent(id)
    );

    return connected;
  }

  disconnectPlayer(id) {
    const player =
      this.getPlayer(id);

    const connected =
      player.disconnect();

    this.emitPlayerEvent(
      PlayerEvents.createPlayerDisconnectedEvent(id)
    );

    return connected;
  }

  activatePlayer(id) {
    const player =
      this.getPlayer(id);

    const active =
      player.activate();

    this.emitPlayerEvent(
      PlayerEvents.createPlayerActivatedEvent(id)
    );

    return active;
  }

  deactivatePlayer(id) {
    const player =
      this.getPlayer(id);

    const active =
      player.deactivate();

    this.emitPlayerEvent(
      PlayerEvents.createPlayerDeactivatedEvent(id)
    );

    return active;
  }

  updatePlayerName(id, name) {
    PlayerValidator.validateName(name);

    const player =
      this.getPlayer(id);

    const updatedName =
      player.setName(name);

    this.emitPlayerEvent(
      PlayerEvents.createPlayerUpdatedEvent(player)
    );

    return updatedName;
  }

  updatePlayerMetadata(id, data) {
    PlayerValidator.validateMetadata(data);

    const player =
      this.getPlayer(id);

    const metadata =
      player.updateMetadata(data);

    this.emitPlayerEvent(
      PlayerEvents.createPlayerUpdatedEvent(player)
    );

    return metadata;
  }

  getAllPlayers() {
    return Array.from(
      this.players.values()
    );
  }

  getConnectedPlayers() {
    return this
      .getAllPlayers()
      .filter(player => player.isConnected());
  }

  getActivePlayers() {
    return this
      .getAllPlayers()
      .filter(player => player.isActive());
  }

  clear() {
    this.players.clear();
  }

  setEventManager(eventManager) {
    this.eventManager = eventManager;
  }

  getEventManager() {
    return this.eventManager;
  }

  emitPlayerEvent(event) {
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
      .getAllPlayers()
      .map(player => player.toJSON());
  }
}

export default PlayerManager;
