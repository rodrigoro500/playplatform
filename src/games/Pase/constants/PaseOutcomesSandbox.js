import {
  PaseOutcomeLabels,
  PaseOutcomes,
  isValidPaseOutcome,
} from "./PaseOutcomes";
import PaseOutcomesEvents from "./PaseOutcomesEvents";

class PaseOutcomesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE OUTCOMES SANDBOX =====");

    const paseOutcome =
      PaseOutcomes.PASE;
    const kuloOutcome =
      PaseOutcomes.KULO;
    const paseLabel =
      PaseOutcomeLabels.PASE;
    const kuloLabel =
      PaseOutcomeLabels.KULO;
    const paseValid =
      isValidPaseOutcome("PASE");
    const kuloValid =
      isValidPaseOutcome("KULO");
    const noPaseValid =
      isValidPaseOutcome("NO_PASE");
    const events = [
      PaseOutcomesEvents.createPaseOutcomesInitializedEvent(),
      PaseOutcomesEvents.createPaseOutcomesValidatedEvent(),
    ];

    this.assert(
      paseOutcome === "PASE",
      "PaseOutcomes.PASE debe ser PASE."
    );
    this.assert(
      kuloOutcome === "KULO",
      "PaseOutcomes.KULO debe ser KULO."
    );
    this.assert(
      paseLabel === "PASE",
      "PaseOutcomeLabels.PASE debe ser PASE."
    );
    this.assert(
      kuloLabel === "KULO (Mala)",
      "PaseOutcomeLabels.KULO debe ser KULO (Mala)."
    );
    this.assert(
      paseValid === true,
      "isValidPaseOutcome(\"PASE\") debe retornar true."
    );
    this.assert(
      kuloValid === true,
      "isValidPaseOutcome(\"KULO\") debe retornar true."
    );
    this.assert(
      noPaseValid === false,
      "isValidPaseOutcome(\"NO_PASE\") debe retornar false."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      paseOutcome,
      kuloOutcome,
      paseLabel,
      kuloLabel,
      paseValid,
      kuloValid,
      noPaseValid,
      events,
    });

    console.log("===== PASE OUTCOMES SANDBOX OK =====");
  }
}

new PaseOutcomesSandbox();

export default PaseOutcomesSandbox;
