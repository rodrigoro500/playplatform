import {
  PaseBetStateLabels,
  PaseBetStates,
  isValidPaseBetState,
} from "./PaseBetStates";

class PaseBetStatesValidator {
  static validateStates() {
    if (PaseBetStates.CREATED !== "CREATED") {
      throw new Error(
        "PaseBetStates debe contener CREATED."
      );
    }

    if (PaseBetStates.ACCEPTED !== "ACCEPTED") {
      throw new Error(
        "PaseBetStates debe contener ACCEPTED."
      );
    }

    if (PaseBetStates.REJECTED !== "REJECTED") {
      throw new Error(
        "PaseBetStates debe contener REJECTED."
      );
    }

    if (PaseBetStates.RESOLVED !== "RESOLVED") {
      throw new Error(
        "PaseBetStates debe contener RESOLVED."
      );
    }

    if (PaseBetStates.PAID !== "PAID") {
      throw new Error(
        "PaseBetStates debe contener PAID."
      );
    }

    if (PaseBetStates.CANCELLED !== "CANCELLED") {
      throw new Error(
        "PaseBetStates debe contener CANCELLED."
      );
    }
  }

  static validateLabels() {
    if (PaseBetStateLabels.CREATED !== "Creada") {
      throw new Error(
        "PaseBetStateLabels debe contener CREATED."
      );
    }

    if (PaseBetStateLabels.ACCEPTED !== "Aceptada") {
      throw new Error(
        "PaseBetStateLabels debe contener ACCEPTED."
      );
    }

    if (PaseBetStateLabels.REJECTED !== "Rechazada") {
      throw new Error(
        "PaseBetStateLabels debe contener REJECTED."
      );
    }

    if (PaseBetStateLabels.RESOLVED !== "Resuelta") {
      throw new Error(
        "PaseBetStateLabels debe contener RESOLVED."
      );
    }

    if (PaseBetStateLabels.PAID !== "Pagada") {
      throw new Error(
        "PaseBetStateLabels debe contener PAID."
      );
    }

    if (PaseBetStateLabels.CANCELLED !== "Cancelada") {
      throw new Error(
        "PaseBetStateLabels debe contener CANCELLED."
      );
    }
  }

  static validateState(state) {
    if (!isValidPaseBetState(state)) {
      throw new Error(
        "PaseBetStates state no es valido."
      );
    }
  }
}

export default PaseBetStatesValidator;
