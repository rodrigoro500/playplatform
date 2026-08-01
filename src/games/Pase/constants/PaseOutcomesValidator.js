import {
  PaseOutcomeLabels,
  PaseOutcomes,
  isValidPaseOutcome,
} from "./PaseOutcomes";

class PaseOutcomesValidator {
  static validateOutcomes() {
    if (PaseOutcomes.PASE !== "PASE") {
      throw new Error(
        "PaseOutcomes debe contener PASE."
      );
    }

    if (PaseOutcomes.KULO !== "KULO") {
      throw new Error(
        "PaseOutcomes debe contener KULO."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseOutcomes, "NO_PASE")) {
      throw new Error(
        "PaseOutcomes no debe contener NO_PASE."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseOutcomes, "DON'T_PASS")) {
      throw new Error(
        "PaseOutcomes no debe contener DON'T_PASS."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseOutcomes, "DONT_PASS")) {
      throw new Error(
        "PaseOutcomes no debe contener DONT_PASS."
      );
    }
  }

  static validateLabels() {
    if (PaseOutcomeLabels.PASE !== "PASE") {
      throw new Error(
        "PaseOutcomeLabels debe contener PASE."
      );
    }

    if (PaseOutcomeLabels.KULO !== "KULO (Mala)") {
      throw new Error(
        "PaseOutcomeLabels debe contener KULO."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseOutcomeLabels, "NO_PASE")) {
      throw new Error(
        "PaseOutcomeLabels no debe contener NO_PASE."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseOutcomeLabels, "DON'T_PASS")) {
      throw new Error(
        "PaseOutcomeLabels no debe contener DON'T_PASS."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseOutcomeLabels, "DONT_PASS")) {
      throw new Error(
        "PaseOutcomeLabels no debe contener DONT_PASS."
      );
    }
  }

  static validateOutcome(outcome) {
    if (!isValidPaseOutcome(outcome)) {
      throw new Error(
        "PaseOutcomes outcome debe ser PASE o KULO."
      );
    }
  }
}

export default PaseOutcomesValidator;
