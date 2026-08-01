import Session from "./Session";

class SessionValidator {
  static STATUSES = [
    "CREATED",
    "RUNNING",
    "PAUSED",
    "FINISHED",
    "CANCELLED",
  ];

  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id de la sesión debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id de la sesión no puede estar vacío."
      );
    }
  }

  static validateGameId(gameId) {
    if (typeof gameId !== "string") {
      throw new Error(
        "El id del juego de la sesión debe ser un string."
      );
    }

    if (gameId.trim() === "") {
      throw new Error(
        "El id del juego de la sesión no puede estar vacío."
      );
    }
  }

  static validateTableId(tableId) {
    if (tableId === null) {
      return;
    }

    if (typeof tableId !== "string") {
      throw new Error(
        "El id de la mesa de la sesión debe ser un string."
      );
    }

    if (tableId.trim() === "") {
      throw new Error(
        "El id de la mesa de la sesión no puede estar vacío."
      );
    }
  }

  static validateLobbyId(lobbyId) {
    if (lobbyId === null) {
      return;
    }

    if (typeof lobbyId !== "string") {
      throw new Error(
        "El id del lobby de la sesión debe ser un string."
      );
    }

    if (lobbyId.trim() === "") {
      throw new Error(
        "El id del lobby de la sesión no puede estar vacío."
      );
    }
  }

  static validateStatus(status) {
    if (!SessionValidator.STATUSES.includes(status)) {
      throw new Error(
        "El estado de la sesión no es válido."
      );
    }
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata de la sesión debe ser un objeto válido."
      );
    }
  }

  static validateSession(session) {
    if (!(session instanceof Session)) {
      throw new Error(
        "La sesión debe ser una instancia de Session."
      );
    }
  }
}

export default SessionValidator;
