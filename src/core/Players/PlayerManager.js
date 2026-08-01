import Player from "./Player";

class PlayerManager {
  constructor() {
    this.players = new Map();
  }

  addPlayer(playerData) {
    const player =
      playerData instanceof Player
        ? playerData
        : new Player(playerData);

    if (this.players.has(player.getId())) {
      throw new Error(
        `El jugador "${player.getNickname()}" ya existe.`
      );
    }

    this.players.set(player.getId(), player);

    return player;
  }

  getPlayer(id) {
    return this.players.get(id) ?? null;
  }

  getPlayers() {
    return [...this.players.values()];
  }

  removePlayer(id) {
    return this.players.delete(id);
  }

  exists(id) {
    return this.players.has(id);
  }

  getCount() {
    return this.players.size;
  }

  clear() {
    this.players.clear();
  }
}

export default PlayerManager;