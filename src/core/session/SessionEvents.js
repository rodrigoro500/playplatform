class SessionEvents {
  static SESSION_CREATED = "SESSION_CREATED";

  static SESSION_REMOVED = "SESSION_REMOVED";

  static SESSION_STARTED = "SESSION_STARTED";

  static SESSION_PAUSED = "SESSION_PAUSED";

  static SESSION_RESUMED = "SESSION_RESUMED";

  static SESSION_FINISHED = "SESSION_FINISHED";

  static SESSION_CANCELLED = "SESSION_CANCELLED";

  static createEvent(type, payload) {
    return {
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
  }

  static createSessionCreatedEvent(session) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_CREATED,
      {
        session: session.toJSON(),
      }
    );
  }

  static createSessionRemovedEvent(sessionId) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_REMOVED,
      {
        sessionId,
      }
    );
  }

  static createSessionStartedEvent(sessionId) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_STARTED,
      {
        sessionId,
      }
    );
  }

  static createSessionPausedEvent(sessionId) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_PAUSED,
      {
        sessionId,
      }
    );
  }

  static createSessionResumedEvent(sessionId) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_RESUMED,
      {
        sessionId,
      }
    );
  }

  static createSessionFinishedEvent(sessionId) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_FINISHED,
      {
        sessionId,
      }
    );
  }

  static createSessionCancelledEvent(sessionId) {
    return SessionEvents.createEvent(
      SessionEvents.SESSION_CANCELLED,
      {
        sessionId,
      }
    );
  }
}

export default SessionEvents;
