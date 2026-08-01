import {
  PaseRoundStateLabels,
  PaseRoundStates,
  isValidPaseRoundState,
} from "./PaseRoundStates";
import PaseRoundStatesEvents from "./PaseRoundStatesEvents";

class PaseRoundStatesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE ROUND STATES SANDBOX =====");

    const waitingBets =
      PaseRoundStates.WAITING_BETS;
    const rollingDice =
      PaseRoundStates.ROLLING_DICE;
    const resolving =
      PaseRoundStates.RESOLVING;
    const settling =
      PaseRoundStates.SETTLING;
    const finished =
      PaseRoundStates.FINISHED;
    const waitingBetsValid =
      isValidPaseRoundState("WAITING_BETS");
    const rollingDiceValid =
      isValidPaseRoundState("ROLLING_DICE");
    const resolvingValid =
      isValidPaseRoundState("RESOLVING");
    const settlingValid =
      isValidPaseRoundState("SETTLING");
    const finishedValid =
      isValidPaseRoundState("FINISHED");
    const invalidValid =
      isValidPaseRoundState("INVALID");
    const events = [
      PaseRoundStatesEvents.createPaseRoundStatesInitializedEvent(),
      PaseRoundStatesEvents.createPaseRoundStatesValidatedEvent(),
    ];

    this.assert(
      waitingBets === "WAITING_BETS",
      "PaseRoundStates.WAITING_BETS debe ser WAITING_BETS."
    );
    this.assert(
      rollingDice === "ROLLING_DICE",
      "PaseRoundStates.ROLLING_DICE debe ser ROLLING_DICE."
    );
    this.assert(
      resolving === "RESOLVING",
      "PaseRoundStates.RESOLVING debe ser RESOLVING."
    );
    this.assert(
      settling === "SETTLING",
      "PaseRoundStates.SETTLING debe ser SETTLING."
    );
    this.assert(
      finished === "FINISHED",
      "PaseRoundStates.FINISHED debe ser FINISHED."
    );
    this.assert(
      waitingBetsValid === true,
      "WAITING_BETS debe ser valido."
    );
    this.assert(
      rollingDiceValid === true,
      "ROLLING_DICE debe ser valido."
    );
    this.assert(
      resolvingValid === true,
      "RESOLVING debe ser valido."
    );
    this.assert(
      settlingValid === true,
      "SETTLING debe ser valido."
    );
    this.assert(
      finishedValid === true,
      "FINISHED debe ser valido."
    );
    this.assert(
      invalidValid === false,
      "INVALID debe ser invalido."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      waitingBets,
      rollingDice,
      resolving,
      settling,
      finished,
      labels: PaseRoundStateLabels,
      waitingBetsValid,
      rollingDiceValid,
      resolvingValid,
      settlingValid,
      finishedValid,
      invalidValid,
      events,
    });

    console.log("===== PASE ROUND STATES SANDBOX OK =====");
  }
}

new PaseRoundStatesSandbox();

export default PaseRoundStatesSandbox;
