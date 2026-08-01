class PaseBetViewModelValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseBetViewModel manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseBetViewModel manager debe ser un objeto."
      );
    }
  }

  static validateBetRuntime(betRuntime) {
    if (betRuntime === null) {
      throw new Error(
        "PaseBetViewModel betRuntime no puede ser null."
      );
    }

    if (typeof betRuntime !== "object") {
      throw new Error(
        "PaseBetViewModel betRuntime debe ser un objeto."
      );
    }

    if (typeof betRuntime.getBets !== "function") {
      throw new Error(
        "PaseBetViewModel betRuntime debe implementar getBets()."
      );
    }

    if (typeof betRuntime.getBet !== "function") {
      throw new Error(
        "PaseBetViewModel betRuntime debe implementar getBet()."
      );
    }

    if (typeof betRuntime.getBetCount !== "function") {
      throw new Error(
        "PaseBetViewModel betRuntime debe implementar getBetCount()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseBetViewModel initialized debe ser boolean."
      );
    }
  }

  static validatePaseBetViewModel(paseBetViewModel) {
    if (
      paseBetViewModel === null ||
      typeof paseBetViewModel !== "object"
    ) {
      throw new Error(
        "PaseBetViewModel debe ser un objeto valido."
      );
    }

    PaseBetViewModelValidator.validateManager(
      paseBetViewModel.manager
    );
    PaseBetViewModelValidator.validateBetRuntime(
      paseBetViewModel.betRuntime
    );
    PaseBetViewModelValidator.validateInitialized(
      paseBetViewModel.initialized
    );
  }
}

export default PaseBetViewModelValidator;
