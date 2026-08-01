import {
  PaseBetEventTypes,
  isValidPaseBetEventType,
} from "./PaseBetEventTypes";

class PaseBetEventTypesValidator {
  static validateEvents() {
    if (PaseBetEventTypes.BET_CREATED !== "BET_CREATED") {
      throw new Error(
        "PaseBetEventTypes debe contener BET_CREATED."
      );
    }

    if (PaseBetEventTypes.BET_ACCEPTED !== "BET_ACCEPTED") {
      throw new Error(
        "PaseBetEventTypes debe contener BET_ACCEPTED."
      );
    }

    if (PaseBetEventTypes.BET_REJECTED !== "BET_REJECTED") {
      throw new Error(
        "PaseBetEventTypes debe contener BET_REJECTED."
      );
    }

    if (PaseBetEventTypes.BET_CANCELLED !== "BET_CANCELLED") {
      throw new Error(
        "PaseBetEventTypes debe contener BET_CANCELLED."
      );
    }

    if (PaseBetEventTypes.BET_RESOLVED !== "BET_RESOLVED") {
      throw new Error(
        "PaseBetEventTypes debe contener BET_RESOLVED."
      );
    }

    if (PaseBetEventTypes.BET_PAID !== "BET_PAID") {
      throw new Error(
        "PaseBetEventTypes debe contener BET_PAID."
      );
    }
  }

  static validateEvent(type) {
    if (!isValidPaseBetEventType(type)) {
      throw new Error(
        "PaseBetEventTypes type no es valido."
      );
    }
  }
}

export default PaseBetEventTypesValidator;
