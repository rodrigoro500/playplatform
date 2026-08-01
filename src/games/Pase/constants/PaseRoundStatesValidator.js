import {
  PaseRoundStateLabels,
  PaseRoundStates,
  isValidPaseRoundState,
} from "./PaseRoundStates";

class PaseRoundStatesValidator {
  static validateStates() {
    if (PaseRoundStates.WAITING_BETS !== "WAITING_BETS") {
      throw new Error(
        "PaseRoundStates debe contener WAITING_BETS."
      );
    }

    if (PaseRoundStates.ROLLING_DICE !== "ROLLING_DICE") {
      throw new Error(
        "PaseRoundStates debe contener ROLLING_DICE."
      );
    }

    if (PaseRoundStates.RESOLVING !== "RESOLVING") {
      throw new Error(
        "PaseRoundStates debe contener RESOLVING."
      );
    }

    if (PaseRoundStates.SETTLING !== "SETTLING") {
      throw new Error(
        "PaseRoundStates debe contener SETTLING."
      );
    }

    if (PaseRoundStates.FINISHED !== "FINISHED") {
      throw new Error(
        "PaseRoundStates debe contener FINISHED."
      );
    }
  }

  static validateLabels() {
    if (PaseRoundStateLabels.WAITING_BETS !== "Esperando apuestas") {
      throw new Error(
        "PaseRoundStateLabels debe contener WAITING_BETS."
      );
    }

    if (PaseRoundStateLabels.ROLLING_DICE !== "Lanzando dados") {
      throw new Error(
        "PaseRoundStateLabels debe contener ROLLING_DICE."
      );
    }

    if (PaseRoundStateLabels.RESOLVING !== "Resolviendo ronda") {
      throw new Error(
        "PaseRoundStateLabels debe contener RESOLVING."
      );
    }

    if (PaseRoundStateLabels.SETTLING !== "Liquidando apuestas") {
      throw new Error(
        "PaseRoundStateLabels debe contener SETTLING."
      );
    }

    if (PaseRoundStateLabels.FINISHED !== "Finalizada") {
      throw new Error(
        "PaseRoundStateLabels debe contener FINISHED."
      );
    }
  }

  static validateState(state) {
    if (!isValidPaseRoundState(state)) {
      throw new Error(
        "PaseRoundStates state no es valido."
      );
    }
  }
}

export default PaseRoundStatesValidator;
