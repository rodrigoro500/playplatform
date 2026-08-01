import Session from "./Session";
import SessionValidator from "./SessionValidator";

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(
    id,
    gameId,
    tableId = null,
    lobbyId = null,
    metadata = {}
  ) {
    SessionValidator.validateId(id);
    SessionValidator.validateGameId(gameId);
    SessionValidator.validateTableId(tableId);
    SessionValidator.validateLobbyId(lobbyId);
    SessionValidator.validateMetadata(metadata);

    if (this.hasSession(id)) {
      throw new Error(
        "Ya existe una sesión con ese id."
      );
    }

    const session =
      new Session(
        id,
        gameId,
        tableId,
        lobbyId,
        metadata
      );

    this.sessions.set(
      id,
      session
    );

    return session;
  }

  getSession(id) {
    SessionValidator.validateId(id);

    const session =
      this.sessions.get(id);

    if (!session) {
      throw new Error(
        "No existe una sesión con ese id."
      );
    }

    return session;
  }

  hasSession(id) {
    SessionValidator.validateId(id);

    return this.sessions.has(id);
  }

  removeSession(id) {
    SessionValidator.validateId(id);

    if (!this.hasSession(id)) {
      throw new Error(
        "No existe una sesión para eliminar."
      );
    }

    return this.sessions.delete(id);
  }

  startSession(id) {
    return this
      .getSession(id)
      .start();
  }

  pauseSession(id) {
    return this
      .getSession(id)
      .pause();
  }

  resumeSession(id) {
    return this
      .getSession(id)
      .resume();
  }

  finishSession(id) {
    return this
      .getSession(id)
      .finish();
  }

  cancelSession(id) {
    return this
      .getSession(id)
      .cancel();
  }

  getSessions() {
    return Array.from(
      this.sessions.values()
    );
  }

  getSessionsByStatus(status) {
    SessionValidator.validateStatus(status);

    return this
      .getSessions()
      .filter(session =>
        session.getStatus() === status
      );
  }

  getRunningSessions() {
    return this.getSessionsByStatus("RUNNING");
  }

  getPausedSessions() {
    return this.getSessionsByStatus("PAUSED");
  }

  getFinishedSessions() {
    return this.getSessionsByStatus("FINISHED");
  }

  getCancelledSessions() {
    return this.getSessionsByStatus("CANCELLED");
  }

  clear() {
    this.sessions.clear();
  }

  toJSON() {
    return this
      .getSessions()
      .map(session => session.toJSON());
  }
}

export default SessionManager;
