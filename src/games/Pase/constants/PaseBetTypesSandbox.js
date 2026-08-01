import {
  PaseBetLabels,
  PaseBetTypes,
  isValidPaseBetType,
} from "./PaseBetTypes";
import PaseBetTypesEvents from "./PaseBetTypesEvents";

class PaseBetTypesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE BET TYPES SANDBOX =====");

    const paseType =
      PaseBetTypes.PASE;
    const kuloType =
      PaseBetTypes.KULO;
    const paseLabel =
      PaseBetLabels.PASE;
    const kuloLabel =
      PaseBetLabels.KULO;
    const paseValid =
      isValidPaseBetType("PASE");
    const kuloValid =
      isValidPaseBetType("KULO");
    const noPaseValid =
      isValidPaseBetType("NO_PASE");
    const events = [
      PaseBetTypesEvents.createPaseBetTypesInitializedEvent(),
      PaseBetTypesEvents.createPaseBetTypesValidatedEvent(),
    ];

    this.assert(
      paseType === "PASE",
      "PaseBetTypes.PASE debe ser PASE."
    );
    this.assert(
      kuloType === "KULO",
      "PaseBetTypes.KULO debe ser KULO."
    );
    this.assert(
      paseLabel === "PASE",
      "PaseBetLabels.PASE debe ser PASE."
    );
    this.assert(
      kuloLabel === "KULO (Mala)",
      "PaseBetLabels.KULO debe ser KULO (Mala)."
    );
    this.assert(
      paseValid === true,
      "isValidPaseBetType(\"PASE\") debe retornar true."
    );
    this.assert(
      kuloValid === true,
      "isValidPaseBetType(\"KULO\") debe retornar true."
    );
    this.assert(
      noPaseValid === false,
      "isValidPaseBetType(\"NO_PASE\") debe retornar false."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      paseType,
      kuloType,
      paseLabel,
      kuloLabel,
      paseValid,
      kuloValid,
      noPaseValid,
      events,
    });

    console.log("===== PASE BET TYPES SANDBOX OK =====");
  }
}

new PaseBetTypesSandbox();

export default PaseBetTypesSandbox;
