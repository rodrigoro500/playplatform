import {
  PaseGameEventTypes,
  isValidPaseGameEventType,
} from "./PaseGameEventTypes";

class PaseGameEventTypesValidator {
  static validateEvents() {
    if (PaseGameEventTypes.GAME_CREATED !== "GAME_CREATED") {
      throw new Error(
        "PaseGameEventTypes debe contener GAME_CREATED."
      );
    }

    if (PaseGameEventTypes.PLAYERS_READY !== "PLAYERS_READY") {
      throw new Error(
        "PaseGameEventTypes debe contener PLAYERS_READY."
      );
    }

    if (PaseGameEventTypes.GAME_STARTED !== "GAME_STARTED") {
      throw new Error(
        "PaseGameEventTypes debe contener GAME_STARTED."
      );
    }

    if (PaseGameEventTypes.GAME_PAUSED !== "GAME_PAUSED") {
      throw new Error(
        "PaseGameEventTypes debe contener GAME_PAUSED."
      );
    }

    if (PaseGameEventTypes.GAME_RESUMED !== "GAME_RESUMED") {
      throw new Error(
        "PaseGameEventTypes debe contener GAME_RESUMED."
      );
    }

    if (PaseGameEventTypes.GAME_FINISHED !== "GAME_FINISHED") {
      throw new Error(
        "PaseGameEventTypes debe contener GAME_FINISHED."
      );
    }

    if (PaseGameEventTypes.GAME_CLOSED !== "GAME_CLOSED") {
      throw new Error(
        "PaseGameEventTypes debe contener GAME_CLOSED."
      );
    }
  }

  static validateEvent(type) {
    if (!isValidPaseGameEventType(type)) {
      throw new Error(
        "PaseGameEventTypes type no es valido."
      );
    }
  }
}

export default PaseGameEventTypesValidator;
