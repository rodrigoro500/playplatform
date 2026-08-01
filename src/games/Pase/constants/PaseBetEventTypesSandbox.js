import {
  PaseBetEventTypes,
  isValidPaseBetEventType,
} from "./PaseBetEventTypes";
import PaseBetEventTypesEvents from "./PaseBetEventTypesEvents";

class PaseBetEventTypesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE BET EVENT TYPES SANDBOX =====");

    const betCreated =
      PaseBetEventTypes.BET_CREATED;
    const betAccepted =
      PaseBetEventTypes.BET_ACCEPTED;
    const betRejected =
      PaseBetEventTypes.BET_REJECTED;
    const betCancelled =
      PaseBetEventTypes.BET_CANCELLED;
    const betResolved =
      PaseBetEventTypes.BET_RESOLVED;
    const betPaid =
      PaseBetEventTypes.BET_PAID;
    const betCreatedValid =
      isValidPaseBetEventType("BET_CREATED");
    const betAcceptedValid =
      isValidPaseBetEventType("BET_ACCEPTED");
    const betRejectedValid =
      isValidPaseBetEventType("BET_REJECTED");
    const betCancelledValid =
      isValidPaseBetEventType("BET_CANCELLED");
    const betResolvedValid =
      isValidPaseBetEventType("BET_RESOLVED");
    const betPaidValid =
      isValidPaseBetEventType("BET_PAID");
    const invalidValid =
      isValidPaseBetEventType("INVALID");
    const events = [
      PaseBetEventTypesEvents.createPaseBetEventTypesInitializedEvent(),
      PaseBetEventTypesEvents.createPaseBetEventTypesValidatedEvent(),
    ];

    this.assert(
      betCreated === "BET_CREATED",
      "PaseBetEventTypes.BET_CREATED debe ser BET_CREATED."
    );
    this.assert(
      betAccepted === "BET_ACCEPTED",
      "PaseBetEventTypes.BET_ACCEPTED debe ser BET_ACCEPTED."
    );
    this.assert(
      betRejected === "BET_REJECTED",
      "PaseBetEventTypes.BET_REJECTED debe ser BET_REJECTED."
    );
    this.assert(
      betCancelled === "BET_CANCELLED",
      "PaseBetEventTypes.BET_CANCELLED debe ser BET_CANCELLED."
    );
    this.assert(
      betResolved === "BET_RESOLVED",
      "PaseBetEventTypes.BET_RESOLVED debe ser BET_RESOLVED."
    );
    this.assert(
      betPaid === "BET_PAID",
      "PaseBetEventTypes.BET_PAID debe ser BET_PAID."
    );
    this.assert(
      betCreatedValid === true,
      "BET_CREATED debe ser valido."
    );
    this.assert(
      betAcceptedValid === true,
      "BET_ACCEPTED debe ser valido."
    );
    this.assert(
      betRejectedValid === true,
      "BET_REJECTED debe ser valido."
    );
    this.assert(
      betCancelledValid === true,
      "BET_CANCELLED debe ser valido."
    );
    this.assert(
      betResolvedValid === true,
      "BET_RESOLVED debe ser valido."
    );
    this.assert(
      betPaidValid === true,
      "BET_PAID debe ser valido."
    );
    this.assert(
      invalidValid === false,
      "INVALID debe ser invalido."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      betCreated,
      betAccepted,
      betRejected,
      betCancelled,
      betResolved,
      betPaid,
      betCreatedValid,
      betAcceptedValid,
      betRejectedValid,
      betCancelledValid,
      betResolvedValid,
      betPaidValid,
      invalidValid,
      events,
    });

    console.log("===== PASE BET EVENT TYPES SANDBOX OK =====");
  }
}

new PaseBetEventTypesSandbox();

export default PaseBetEventTypesSandbox;
