import {
  PaseRoundEventTypes,
  isValidPaseRoundEventType,
} from "./PaseRoundEventTypes";

class PaseRoundEventTypesValidator {
  static validateEvents() {
    if (PaseRoundEventTypes.ROUND_CREATED !== "ROUND_CREATED") {
      throw new Error(
        "PaseRoundEventTypes debe contener ROUND_CREATED."
      );
    }

    if (PaseRoundEventTypes.BETTING_OPENED !== "BETTING_OPENED") {
      throw new Error(
        "PaseRoundEventTypes debe contener BETTING_OPENED."
      );
    }

    if (PaseRoundEventTypes.BETTING_CLOSED !== "BETTING_CLOSED") {
      throw new Error(
        "PaseRoundEventTypes debe contener BETTING_CLOSED."
      );
    }

    if (PaseRoundEventTypes.DICE_ROLLED !== "DICE_ROLLED") {
      throw new Error(
        "PaseRoundEventTypes debe contener DICE_ROLLED."
      );
    }

    if (PaseRoundEventTypes.ROUND_RESOLVED !== "ROUND_RESOLVED") {
      throw new Error(
        "PaseRoundEventTypes debe contener ROUND_RESOLVED."
      );
    }

    if (PaseRoundEventTypes.ROUND_SETTLED !== "ROUND_SETTLED") {
      throw new Error(
        "PaseRoundEventTypes debe contener ROUND_SETTLED."
      );
    }

    if (PaseRoundEventTypes.ROUND_FINISHED !== "ROUND_FINISHED") {
      throw new Error(
        "PaseRoundEventTypes debe contener ROUND_FINISHED."
      );
    }
  }

  static validateEvent(type) {
    if (!isValidPaseRoundEventType(type)) {
      throw new Error(
        "PaseRoundEventTypes type no es valido."
      );
    }
  }
}

export default PaseRoundEventTypesValidator;
