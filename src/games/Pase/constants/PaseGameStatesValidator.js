import {
  PaseGameStateLabels,
  PaseGameStates,
  isValidPaseGameState,
} from "./PaseGameStates";

class PaseGameStatesValidator {
  static validateStates() {
    if (PaseGameStates.CREATED !== "CREATED") {
      throw new Error(
        "PaseGameStates debe contener CREATED."
      );
    }

    if (PaseGameStates.WAITING_PLAYERS !== "WAITING_PLAYERS") {
      throw new Error(
        "PaseGameStates debe contener WAITING_PLAYERS."
      );
    }

    if (PaseGameStates.READY !== "READY") {
      throw new Error(
        "PaseGameStates debe contener READY."
      );
    }

    if (PaseGameStates.RUNNING !== "RUNNING") {
      throw new Error(
        "PaseGameStates debe contener RUNNING."
      );
    }

    if (PaseGameStates.PAUSED !== "PAUSED") {
      throw new Error(
        "PaseGameStates debe contener PAUSED."
      );
    }

    if (PaseGameStates.FINISHED !== "FINISHED") {
      throw new Error(
        "PaseGameStates debe contener FINISHED."
      );
    }

    if (PaseGameStates.CLOSED !== "CLOSED") {
      throw new Error(
        "PaseGameStates debe contener CLOSED."
      );
    }
  }

  static validateLabels() {
    if (PaseGameStateLabels.CREATED !== "Creada") {
      throw new Error(
        "PaseGameStateLabels debe contener CREATED."
      );
    }

    if (PaseGameStateLabels.WAITING_PLAYERS !== "Esperando jugadores") {
      throw new Error(
        "PaseGameStateLabels debe contener WAITING_PLAYERS."
      );
    }

    if (PaseGameStateLabels.READY !== "Lista") {
      throw new Error(
        "PaseGameStateLabels debe contener READY."
      );
    }

    if (PaseGameStateLabels.RUNNING !== "En juego") {
      throw new Error(
        "PaseGameStateLabels debe contener RUNNING."
      );
    }

    if (PaseGameStateLabels.PAUSED !== "Pausada") {
      throw new Error(
        "PaseGameStateLabels debe contener PAUSED."
      );
    }

    if (PaseGameStateLabels.FINISHED !== "Finalizada") {
      throw new Error(
        "PaseGameStateLabels debe contener FINISHED."
      );
    }

    if (PaseGameStateLabels.CLOSED !== "Cerrada") {
      throw new Error(
        "PaseGameStateLabels debe contener CLOSED."
      );
    }
  }

  static validateState(state) {
    if (!isValidPaseGameState(state)) {
      throw new Error(
        "PaseGameStates state no es valido."
      );
    }
  }
}

export default PaseGameStatesValidator;
