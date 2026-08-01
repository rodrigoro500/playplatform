import SessionEvents from "./SessionEvents";
import SessionManager from "./SessionManager";

class SessionSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== SESSION SANDBOX =====");

    const sessionManager =
      new SessionManager();

    console.log("1. Crear SessionManager:");
    console.log(sessionManager.toJSON());

    const session1 =
      sessionManager.createSession(
        "session1",
        "game1",
        "table1",
        "lobby1"
      );

    console.log("2. Crear session1:");
    console.log(session1.toJSON());

    const session2 =
      sessionManager.createSession(
        "session2",
        "game2"
      );

    console.log("3. Crear session2:");
    console.log(session2.toJSON());

    this.assert(
      sessionManager.hasSession("session1") === true,
      "session1 debe existir."
    );

    this.assert(
      sessionManager.hasSession("session2") === true,
      "session2 debe existir."
    );

    console.log("4. Verificar hasSession():");
    console.log({
      session1: sessionManager.hasSession("session1"),
      session2: sessionManager.hasSession("session2"),
    });

    const foundSession1 =
      sessionManager.getSession("session1");

    const foundSession2 =
      sessionManager.getSession("session2");

    console.log("5. Obtener ambas sesiones:");
    console.log([
      foundSession1.toJSON(),
      foundSession2.toJSON(),
    ]);

    sessionManager.startSession("session1");

    console.log("6. Iniciar session1:");
    console.log(
      sessionManager
        .getSession("session1")
        .toJSON()
    );

    sessionManager.pauseSession("session1");

    console.log("7. Pausar session1:");
    console.log(
      sessionManager
        .getSession("session1")
        .toJSON()
    );

    sessionManager.resumeSession("session1");

    console.log("8. Reanudar session1:");
    console.log(
      sessionManager
        .getSession("session1")
        .toJSON()
    );

    sessionManager.finishSession("session1");

    console.log("9. Finalizar session1:");
    console.log(
      sessionManager
        .getSession("session1")
        .toJSON()
    );

    sessionManager.cancelSession("session2");

    console.log("10. Cancelar session2:");
    console.log(
      sessionManager
        .getSession("session2")
        .toJSON()
    );

    const runningSessions =
      sessionManager.getRunningSessions();

    console.log("11. Obtener sesiones RUNNING:");
    console.log(
      runningSessions.map(session =>
        session.toJSON()
      )
    );

    const pausedSessions =
      sessionManager.getPausedSessions();

    console.log("12. Obtener sesiones PAUSED:");
    console.log(
      pausedSessions.map(session =>
        session.toJSON()
      )
    );

    const finishedSessions =
      sessionManager.getFinishedSessions();

    this.assert(
      finishedSessions.length === 1,
      "Debe haber una sesión finalizada."
    );

    console.log("13. Obtener sesiones FINISHED:");
    console.log(
      finishedSessions.map(session =>
        session.toJSON()
      )
    );

    const cancelledSessions =
      sessionManager.getCancelledSessions();

    this.assert(
      cancelledSessions.length === 1,
      "Debe haber una sesión cancelada."
    );

    console.log("14. Obtener sesiones CANCELLED:");
    console.log(
      cancelledSessions.map(session =>
        session.toJSON()
      )
    );

    const events = [
      SessionEvents.createSessionCreatedEvent(session1),
      SessionEvents.createSessionCreatedEvent(session2),
      SessionEvents.createSessionStartedEvent("session1"),
      SessionEvents.createSessionPausedEvent("session1"),
      SessionEvents.createSessionResumedEvent("session1"),
      SessionEvents.createSessionFinishedEvent("session1"),
      SessionEvents.createSessionCancelledEvent("session2"),
      SessionEvents.createSessionRemovedEvent("session2"),
    ];

    console.log("15. Crear eventos utilizando SessionEvents:");
    console.log(events);

    console.log("16. Serializar Session:");
    console.log(
      sessionManager
        .getSession("session1")
        .toJSON()
    );

    console.log("17. Serializar SessionManager:");
    console.log(sessionManager.toJSON());

    const removedSession2 =
      sessionManager.removeSession("session2");

    this.assert(
      removedSession2 === true,
      "session2 debe eliminarse correctamente."
    );

    console.log("18. Eliminar session2:");
    console.log(sessionManager.toJSON());

    sessionManager.clear();

    console.log("19. Limpiar SessionManager:");
    console.log(sessionManager.toJSON());

    console.log("20. Mostrar todos los resultados por consola:");
    console.log({
      events,
      runningSessions: runningSessions.map(session =>
        session.toJSON()
      ),
      pausedSessions: pausedSessions.map(session =>
        session.toJSON()
      ),
      finishedSessions: finishedSessions.map(session =>
        session.toJSON()
      ),
      cancelledSessions: cancelledSessions.map(session =>
        session.toJSON()
      ),
      sessionManager: sessionManager.toJSON(),
    });

    console.log("===== SESSION SANDBOX OK =====");
  }
}

new SessionSandbox();

export default SessionSandbox;
