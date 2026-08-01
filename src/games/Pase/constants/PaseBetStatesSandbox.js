import {
  PaseBetStateLabels,
  PaseBetStates,
  isValidPaseBetState,
} from "./PaseBetStates";
import PaseBetStatesEvents from "./PaseBetStatesEvents";

class PaseBetStatesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE BET STATES SANDBOX =====");

    const created =
      PaseBetStates.CREATED;
    const accepted =
      PaseBetStates.ACCEPTED;
    const rejected =
      PaseBetStates.REJECTED;
    const resolved =
      PaseBetStates.RESOLVED;
    const paid =
      PaseBetStates.PAID;
    const cancelled =
      PaseBetStates.CANCELLED;
    const createdValid =
      isValidPaseBetState("CREATED");
    const acceptedValid =
      isValidPaseBetState("ACCEPTED");
    const rejectedValid =
      isValidPaseBetState("REJECTED");
    const resolvedValid =
      isValidPaseBetState("RESOLVED");
    const paidValid =
      isValidPaseBetState("PAID");
    const cancelledValid =
      isValidPaseBetState("CANCELLED");
    const invalidValid =
      isValidPaseBetState("INVALID");
    const events = [
      PaseBetStatesEvents.createPaseBetStatesInitializedEvent(),
      PaseBetStatesEvents.createPaseBetStatesValidatedEvent(),
    ];

    this.assert(
      created === "CREATED",
      "PaseBetStates.CREATED debe ser CREATED."
    );
    this.assert(
      accepted === "ACCEPTED",
      "PaseBetStates.ACCEPTED debe ser ACCEPTED."
    );
    this.assert(
      rejected === "REJECTED",
      "PaseBetStates.REJECTED debe ser REJECTED."
    );
    this.assert(
      resolved === "RESOLVED",
      "PaseBetStates.RESOLVED debe ser RESOLVED."
    );
    this.assert(
      paid === "PAID",
      "PaseBetStates.PAID debe ser PAID."
    );
    this.assert(
      cancelled === "CANCELLED",
      "PaseBetStates.CANCELLED debe ser CANCELLED."
    );
    this.assert(
      createdValid === true,
      "CREATED debe ser valido."
    );
    this.assert(
      acceptedValid === true,
      "ACCEPTED debe ser valido."
    );
    this.assert(
      rejectedValid === true,
      "REJECTED debe ser valido."
    );
    this.assert(
      resolvedValid === true,
      "RESOLVED debe ser valido."
    );
    this.assert(
      paidValid === true,
      "PAID debe ser valido."
    );
    this.assert(
      cancelledValid === true,
      "CANCELLED debe ser valido."
    );
    this.assert(
      invalidValid === false,
      "INVALID debe ser invalido."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      created,
      accepted,
      rejected,
      resolved,
      paid,
      cancelled,
      labels: PaseBetStateLabels,
      createdValid,
      acceptedValid,
      rejectedValid,
      resolvedValid,
      paidValid,
      cancelledValid,
      invalidValid,
      events,
    });

    console.log("===== PASE BET STATES SANDBOX OK =====");
  }
}

new PaseBetStatesSandbox();

export default PaseBetStatesSandbox;
