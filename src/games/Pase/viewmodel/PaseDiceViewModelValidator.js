class PaseDiceViewModelValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseDiceViewModel manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseDiceViewModel manager debe ser un objeto."
      );
    }
  }

  static validateDiceEngine(diceEngine) {
    if (diceEngine === null) {
      throw new Error(
        "PaseDiceViewModel diceEngine no puede ser null."
      );
    }

    if (typeof diceEngine !== "object") {
      throw new Error(
        "PaseDiceViewModel diceEngine debe ser un objeto."
      );
    }

    if (typeof diceEngine.getDice !== "function") {
      throw new Error(
        "PaseDiceViewModel diceEngine debe implementar getDice()."
      );
    }

    if (typeof diceEngine.getTotal !== "function") {
      throw new Error(
        "PaseDiceViewModel diceEngine debe implementar getTotal()."
      );
    }

    if (typeof diceEngine.getOutcome !== "function") {
      throw new Error(
        "PaseDiceViewModel diceEngine debe implementar getOutcome()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseDiceViewModel initialized debe ser boolean."
      );
    }
  }

  static validatePaseDiceViewModel(paseDiceViewModel) {
    if (
      paseDiceViewModel === null ||
      typeof paseDiceViewModel !== "object"
    ) {
      throw new Error(
        "PaseDiceViewModel debe ser un objeto valido."
      );
    }

    PaseDiceViewModelValidator.validateManager(
      paseDiceViewModel.manager
    );
    PaseDiceViewModelValidator.validateDiceEngine(
      paseDiceViewModel.diceEngine
    );
    PaseDiceViewModelValidator.validateInitialized(
      paseDiceViewModel.initialized
    );
  }
}

export default PaseDiceViewModelValidator;
