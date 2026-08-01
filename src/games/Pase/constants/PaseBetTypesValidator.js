import {
  PaseBetLabels,
  PaseBetTypes,
  isValidPaseBetType,
} from "./PaseBetTypes";

class PaseBetTypesValidator {
  static validateBetTypes() {
    if (PaseBetTypes.PASE !== "PASE") {
      throw new Error(
        "PaseBetTypes debe contener PASE."
      );
    }

    if (PaseBetTypes.KULO !== "KULO") {
      throw new Error(
        "PaseBetTypes debe contener KULO."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseBetTypes, "NO_PASE")) {
      throw new Error(
        "PaseBetTypes no debe contener NO_PASE."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseBetTypes, "DON'T_PASS")) {
      throw new Error(
        "PaseBetTypes no debe contener DON'T_PASS."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseBetTypes, "DONT_PASS")) {
      throw new Error(
        "PaseBetTypes no debe contener DONT_PASS."
      );
    }
  }

  static validateLabels() {
    if (PaseBetLabels.PASE !== "PASE") {
      throw new Error(
        "PaseBetLabels debe contener PASE."
      );
    }

    if (PaseBetLabels.KULO !== "KULO (Mala)") {
      throw new Error(
        "PaseBetLabels debe contener KULO."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseBetLabels, "NO_PASE")) {
      throw new Error(
        "PaseBetLabels no debe contener NO_PASE."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseBetLabels, "DON'T_PASS")) {
      throw new Error(
        "PaseBetLabels no debe contener DON'T_PASS."
      );
    }

    if (Object.prototype.hasOwnProperty.call(PaseBetLabels, "DONT_PASS")) {
      throw new Error(
        "PaseBetLabels no debe contener DONT_PASS."
      );
    }
  }

  static validateType(type) {
    if (!isValidPaseBetType(type)) {
      throw new Error(
        "PaseBetTypes type debe ser PASE o KULO."
      );
    }
  }
}

export default PaseBetTypesValidator;
