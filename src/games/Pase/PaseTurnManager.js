class PaseTurnManager {
  constructor(players = []) {
    this.players = [...players];

    this.currentShooterId = null;
    this.priorityPlayerId = null;
    this.currentCandidatePlayerId = null;

    this.rejectedPlayers = new Set();
    this.visitedPlayers = new Set();
  }

  setPlayers(players) {
    this.players = [...players];
  }

  getPlayers() {
    return [...this.players];
  }

  setShooter(playerId) {
    this.currentShooterId = playerId;
  }

  getShooter() {
    return this.currentShooterId;
  }

  setPriorityPlayer(playerId) {
    this.priorityPlayerId = playerId;
  }

  getPriorityPlayer() {
    return this.priorityPlayerId;
  }

  setCurrentCandidate(playerId) {
    this.currentCandidatePlayerId = playerId;
  }

  getCurrentCandidate() {
    return this.currentCandidatePlayerId;
  }

  clearRejectedPlayers() {
    this.rejectedPlayers.clear();
  }

  getRejectedPlayers() {
    return [...this.rejectedPlayers];
  }

  rejectPlayer(playerId) {
    this.rejectedPlayers.add(playerId);
  }

  hasPlayerRejected(playerId) {
    return this.rejectedPlayers.has(playerId);
  }

  clearVisitedPlayers() {
    this.visitedPlayers.clear();
  }

  registerVisitedPlayer(playerId) {
    this.visitedPlayers.add(playerId);
  }

  hasVisitedPlayer(playerId) {
    return this.visitedPlayers.has(playerId);
  }

  reset() {
    this.priorityPlayerId = null;
    this.currentCandidatePlayerId = null;

    this.clearRejectedPlayers();
    this.clearVisitedPlayers();
  }

  toJSON() {
    return {
      players: [...this.players],
      currentShooterId: this.currentShooterId,
      priorityPlayerId: this.priorityPlayerId,
      currentCandidatePlayerId: this.currentCandidatePlayerId,
      rejectedPlayers: [...this.rejectedPlayers],
      visitedPlayers: [...this.visitedPlayers],
    };
  }

  getPlayerIndex(playerId) {
    return this.players.findIndex(
      (player) => player === playerId
    );
  }

  playerExists(playerId) {
    return this.getPlayerIndex(playerId) !== -1;
  }

  isShooter(playerId) {
    return this.currentShooterId === playerId;
  }

  isPriorityPlayer(playerId) {
    return this.priorityPlayerId === playerId;
  }

  getNextPlayer(playerId) {
    const index = this.getPlayerIndex(playerId);

    if (index === -1) {
      throw new Error(
        `El jugador "${playerId}" no pertenece a la mesa.`
      );
    }

    if (this.players.length === 0) {
      throw new Error("La mesa no tiene jugadores.");
    }

    const nextIndex =
      (index + 1) % this.players.length;

    return this.players[nextIndex];
  }

  getPreviousPlayer(playerId) {
    const index = this.getPlayerIndex(playerId);

    if (index === -1) {
      throw new Error(
        `El jugador "${playerId}" no pertenece a la mesa.`
      );
    }

    if (this.players.length === 0) {
      throw new Error("La mesa no tiene jugadores.");
    }

    const previousIndex =
      (index - 1 + this.players.length) %
      this.players.length;

    return this.players[previousIndex];
  }

  getTableOrder() {
    return [...this.players];
  }
    getNextEligiblePlayer(fromPlayerId) {
    if (this.players.length === 0) {
      return null;
    }

    let currentPlayer = fromPlayerId;

    for (let i = 0; i < this.players.length; i++) {
      currentPlayer = this.getNextPlayer(currentPlayer);

      if (this.isShooter(currentPlayer)) {
        continue;
      }

      if (this.hasPlayerRejected(currentPlayer)) {
        continue;
      }

      return currentPlayer;
    }

    return null;
  }

  startFundingRound() {
    this.clearRejectedPlayers();
    this.clearVisitedPlayers();

    if (
      this.priorityPlayerId &&
      !this.isShooter(this.priorityPlayerId)
    ) {
      this.currentCandidatePlayerId =
        this.priorityPlayerId;

      return this.priorityPlayerId;
    }

    const firstPlayer =
      this.getNextEligiblePlayer(
        this.currentShooterId
      );

    this.currentCandidatePlayerId =
      firstPlayer;

    return firstPlayer;
  }

  continueFundingRound() {
    if (!this.currentCandidatePlayerId) {
      return null;
    }

    this.registerVisitedPlayer(
      this.currentCandidatePlayerId
    );

    const nextPlayer =
      this.getNextEligiblePlayer(
        this.currentCandidatePlayerId
      );

    this.currentCandidatePlayerId =
      nextPlayer;

    return nextPlayer;
  }
    setLastContributor(playerId) {
    this.priorityPlayerId = playerId;
  }

  getLastContributor() {
    return this.priorityPlayerId;
  }

  clearPriorityPlayer() {
    this.priorityPlayerId = null;
  }

  hasPriorityPlayer() {
    return this.priorityPlayerId !== null;
  }

  acceptContribution(playerId) {
    this.priorityPlayerId = playerId;

    this.currentCandidatePlayerId = playerId;

    this.rejectedPlayers.delete(playerId);

    this.visitedPlayers.add(playerId);

    return playerId;
  }
}

export default PaseTurnManager;