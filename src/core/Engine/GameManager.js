class GameManager {
  constructor() {
    this.games = new Map();
    this.currentGame = null;
  }

  registerGame(name, game) {
    this.games.set(name, game);
  }

  selectGame(name) {
    if (!this.games.has(name)) {
      throw new Error(`El juego "${name}" no está registrado.`);
    }

    this.currentGame = this.games.get(name);
  }

  getCurrentGame() {
    return this.currentGame;
  }

  getAvailableGames() {
    return [...this.games.keys()];
  }
}

export default GameManager;