import {
  PaseGameEventTypes,
  isValidPaseGameEventType,
} from "./PaseGameEventTypes";
import PaseGameEventTypesEvents from "./PaseGameEventTypesEvents";

class PaseGameEventTypesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE GAME EVENT TYPES SANDBOX =====");

    const gameCreated =
      PaseGameEventTypes.GAME_CREATED;
    const playersReady =
      PaseGameEventTypes.PLAYERS_READY;
    const gameStarted =
      PaseGameEventTypes.GAME_STARTED;
    const gamePaused =
      PaseGameEventTypes.GAME_PAUSED;
    const gameResumed =
      PaseGameEventTypes.GAME_RESUMED;
    const gameFinished =
      PaseGameEventTypes.GAME_FINISHED;
    const gameClosed =
      PaseGameEventTypes.GAME_CLOSED;
    const gameCreatedValid =
      isValidPaseGameEventType("GAME_CREATED");
    const playersReadyValid =
      isValidPaseGameEventType("PLAYERS_READY");
    const gameStartedValid =
      isValidPaseGameEventType("GAME_STARTED");
    const gamePausedValid =
      isValidPaseGameEventType("GAME_PAUSED");
    const gameResumedValid =
      isValidPaseGameEventType("GAME_RESUMED");
    const gameFinishedValid =
      isValidPaseGameEventType("GAME_FINISHED");
    const gameClosedValid =
      isValidPaseGameEventType("GAME_CLOSED");
    const invalidValid =
      isValidPaseGameEventType("INVALID");
    const events = [
      PaseGameEventTypesEvents.createPaseGameEventTypesInitializedEvent(),
      PaseGameEventTypesEvents.createPaseGameEventTypesValidatedEvent(),
    ];

    this.assert(
      gameCreated === "GAME_CREATED",
      "PaseGameEventTypes.GAME_CREATED debe ser GAME_CREATED."
    );
    this.assert(
      playersReady === "PLAYERS_READY",
      "PaseGameEventTypes.PLAYERS_READY debe ser PLAYERS_READY."
    );
    this.assert(
      gameStarted === "GAME_STARTED",
      "PaseGameEventTypes.GAME_STARTED debe ser GAME_STARTED."
    );
    this.assert(
      gamePaused === "GAME_PAUSED",
      "PaseGameEventTypes.GAME_PAUSED debe ser GAME_PAUSED."
    );
    this.assert(
      gameResumed === "GAME_RESUMED",
      "PaseGameEventTypes.GAME_RESUMED debe ser GAME_RESUMED."
    );
    this.assert(
      gameFinished === "GAME_FINISHED",
      "PaseGameEventTypes.GAME_FINISHED debe ser GAME_FINISHED."
    );
    this.assert(
      gameClosed === "GAME_CLOSED",
      "PaseGameEventTypes.GAME_CLOSED debe ser GAME_CLOSED."
    );
    this.assert(
      gameCreatedValid === true,
      "GAME_CREATED debe ser valido."
    );
    this.assert(
      playersReadyValid === true,
      "PLAYERS_READY debe ser valido."
    );
    this.assert(
      gameStartedValid === true,
      "GAME_STARTED debe ser valido."
    );
    this.assert(
      gamePausedValid === true,
      "GAME_PAUSED debe ser valido."
    );
    this.assert(
      gameResumedValid === true,
      "GAME_RESUMED debe ser valido."
    );
    this.assert(
      gameFinishedValid === true,
      "GAME_FINISHED debe ser valido."
    );
    this.assert(
      gameClosedValid === true,
      "GAME_CLOSED debe ser valido."
    );
    this.assert(
      invalidValid === false,
      "INVALID debe ser invalido."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      gameCreated,
      playersReady,
      gameStarted,
      gamePaused,
      gameResumed,
      gameFinished,
      gameClosed,
      gameCreatedValid,
      playersReadyValid,
      gameStartedValid,
      gamePausedValid,
      gameResumedValid,
      gameFinishedValid,
      gameClosedValid,
      invalidValid,
      events,
    });

    console.log("===== PASE GAME EVENT TYPES SANDBOX OK =====");
  }
}

new PaseGameEventTypesSandbox();

export default PaseGameEventTypesSandbox;
