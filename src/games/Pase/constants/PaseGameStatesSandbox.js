import {
  PaseGameStateLabels,
  PaseGameStates,
  isValidPaseGameState,
} from "./PaseGameStates";
import PaseGameStatesEvents from "./PaseGameStatesEvents";

class PaseGameStatesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE GAME STATES SANDBOX =====");

    const created =
      PaseGameStates.CREATED;
    const waitingPlayers =
      PaseGameStates.WAITING_PLAYERS;
    const ready =
      PaseGameStates.READY;
    const running =
      PaseGameStates.RUNNING;
    const paused =
      PaseGameStates.PAUSED;
    const finished =
      PaseGameStates.FINISHED;
    const closed =
      PaseGameStates.CLOSED;
    const createdValid =
      isValidPaseGameState("CREATED");
    const waitingPlayersValid =
      isValidPaseGameState("WAITING_PLAYERS");
    const readyValid =
      isValidPaseGameState("READY");
    const runningValid =
      isValidPaseGameState("RUNNING");
    const pausedValid =
      isValidPaseGameState("PAUSED");
    const finishedValid =
      isValidPaseGameState("FINISHED");
    const closedValid =
      isValidPaseGameState("CLOSED");
    const invalidValid =
      isValidPaseGameState("INVALID");
    const events = [
      PaseGameStatesEvents.createPaseGameStatesInitializedEvent(),
      PaseGameStatesEvents.createPaseGameStatesValidatedEvent(),
    ];

    this.assert(
      created === "CREATED",
      "PaseGameStates.CREATED debe ser CREATED."
    );
    this.assert(
      waitingPlayers === "WAITING_PLAYERS",
      "PaseGameStates.WAITING_PLAYERS debe ser WAITING_PLAYERS."
    );
    this.assert(
      ready === "READY",
      "PaseGameStates.READY debe ser READY."
    );
    this.assert(
      running === "RUNNING",
      "PaseGameStates.RUNNING debe ser RUNNING."
    );
    this.assert(
      paused === "PAUSED",
      "PaseGameStates.PAUSED debe ser PAUSED."
    );
    this.assert(
      finished === "FINISHED",
      "PaseGameStates.FINISHED debe ser FINISHED."
    );
    this.assert(
      closed === "CLOSED",
      "PaseGameStates.CLOSED debe ser CLOSED."
    );
    this.assert(
      createdValid === true,
      "CREATED debe ser valido."
    );
    this.assert(
      waitingPlayersValid === true,
      "WAITING_PLAYERS debe ser valido."
    );
    this.assert(
      readyValid === true,
      "READY debe ser valido."
    );
    this.assert(
      runningValid === true,
      "RUNNING debe ser valido."
    );
    this.assert(
      pausedValid === true,
      "PAUSED debe ser valido."
    );
    this.assert(
      finishedValid === true,
      "FINISHED debe ser valido."
    );
    this.assert(
      closedValid === true,
      "CLOSED debe ser valido."
    );
    this.assert(
      invalidValid === false,
      "INVALID debe ser invalido."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      created,
      waitingPlayers,
      ready,
      running,
      paused,
      finished,
      closed,
      labels: PaseGameStateLabels,
      createdValid,
      waitingPlayersValid,
      readyValid,
      runningValid,
      pausedValid,
      finishedValid,
      closedValid,
      invalidValid,
      events,
    });

    console.log("===== PASE GAME STATES SANDBOX OK =====");
  }
}

new PaseGameStatesSandbox();

export default PaseGameStatesSandbox;
