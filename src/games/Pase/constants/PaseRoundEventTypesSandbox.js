import {
  PaseRoundEventTypes,
  isValidPaseRoundEventType,
} from "./PaseRoundEventTypes";
import PaseRoundEventTypesEvents from "./PaseRoundEventTypesEvents";

class PaseRoundEventTypesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE ROUND EVENT TYPES SANDBOX =====");

    const roundCreated =
      PaseRoundEventTypes.ROUND_CREATED;
    const bettingOpened =
      PaseRoundEventTypes.BETTING_OPENED;
    const bettingClosed =
      PaseRoundEventTypes.BETTING_CLOSED;
    const diceRolled =
      PaseRoundEventTypes.DICE_ROLLED;
    const roundResolved =
      PaseRoundEventTypes.ROUND_RESOLVED;
    const roundSettled =
      PaseRoundEventTypes.ROUND_SETTLED;
    const roundFinished =
      PaseRoundEventTypes.ROUND_FINISHED;
    const roundCreatedValid =
      isValidPaseRoundEventType("ROUND_CREATED");
    const bettingOpenedValid =
      isValidPaseRoundEventType("BETTING_OPENED");
    const bettingClosedValid =
      isValidPaseRoundEventType("BETTING_CLOSED");
    const diceRolledValid =
      isValidPaseRoundEventType("DICE_ROLLED");
    const roundResolvedValid =
      isValidPaseRoundEventType("ROUND_RESOLVED");
    const roundSettledValid =
      isValidPaseRoundEventType("ROUND_SETTLED");
    const roundFinishedValid =
      isValidPaseRoundEventType("ROUND_FINISHED");
    const invalidValid =
      isValidPaseRoundEventType("INVALID");
    const events = [
      PaseRoundEventTypesEvents.createPaseRoundEventTypesInitializedEvent(),
      PaseRoundEventTypesEvents.createPaseRoundEventTypesValidatedEvent(),
    ];

    this.assert(
      roundCreated === "ROUND_CREATED",
      "PaseRoundEventTypes.ROUND_CREATED debe ser ROUND_CREATED."
    );
    this.assert(
      bettingOpened === "BETTING_OPENED",
      "PaseRoundEventTypes.BETTING_OPENED debe ser BETTING_OPENED."
    );
    this.assert(
      bettingClosed === "BETTING_CLOSED",
      "PaseRoundEventTypes.BETTING_CLOSED debe ser BETTING_CLOSED."
    );
    this.assert(
      diceRolled === "DICE_ROLLED",
      "PaseRoundEventTypes.DICE_ROLLED debe ser DICE_ROLLED."
    );
    this.assert(
      roundResolved === "ROUND_RESOLVED",
      "PaseRoundEventTypes.ROUND_RESOLVED debe ser ROUND_RESOLVED."
    );
    this.assert(
      roundSettled === "ROUND_SETTLED",
      "PaseRoundEventTypes.ROUND_SETTLED debe ser ROUND_SETTLED."
    );
    this.assert(
      roundFinished === "ROUND_FINISHED",
      "PaseRoundEventTypes.ROUND_FINISHED debe ser ROUND_FINISHED."
    );
    this.assert(
      roundCreatedValid === true,
      "ROUND_CREATED debe ser valido."
    );
    this.assert(
      bettingOpenedValid === true,
      "BETTING_OPENED debe ser valido."
    );
    this.assert(
      bettingClosedValid === true,
      "BETTING_CLOSED debe ser valido."
    );
    this.assert(
      diceRolledValid === true,
      "DICE_ROLLED debe ser valido."
    );
    this.assert(
      roundResolvedValid === true,
      "ROUND_RESOLVED debe ser valido."
    );
    this.assert(
      roundSettledValid === true,
      "ROUND_SETTLED debe ser valido."
    );
    this.assert(
      roundFinishedValid === true,
      "ROUND_FINISHED debe ser valido."
    );
    this.assert(
      invalidValid === false,
      "INVALID debe ser invalido."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      roundCreated,
      bettingOpened,
      bettingClosed,
      diceRolled,
      roundResolved,
      roundSettled,
      roundFinished,
      roundCreatedValid,
      bettingOpenedValid,
      bettingClosedValid,
      diceRolledValid,
      roundResolvedValid,
      roundSettledValid,
      roundFinishedValid,
      invalidValid,
      events,
    });

    console.log("===== PASE ROUND EVENT TYPES SANDBOX OK =====");
  }
}

new PaseRoundEventTypesSandbox();

export default PaseRoundEventTypesSandbox;
