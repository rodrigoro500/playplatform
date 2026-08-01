class PaseGameViewModelValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseGameViewModel manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseGameViewModel manager debe ser un objeto."
      );
    }
  }

  static validateTableViewModel(tableViewModel) {
    if (tableViewModel === null) {
      throw new Error(
        "PaseGameViewModel tableViewModel no puede ser null."
      );
    }

    if (typeof tableViewModel !== "object") {
      throw new Error(
        "PaseGameViewModel tableViewModel debe ser un objeto."
      );
    }

    if (typeof tableViewModel.getTableState !== "function") {
      throw new Error(
        "PaseGameViewModel tableViewModel debe implementar getTableState()."
      );
    }

    if (typeof tableViewModel.isRunning !== "function") {
      throw new Error(
        "PaseGameViewModel tableViewModel debe implementar isRunning()."
      );
    }
  }

  static validatePlayerViewModel(playerViewModel) {
    if (playerViewModel === null) {
      throw new Error(
        "PaseGameViewModel playerViewModel no puede ser null."
      );
    }

    if (typeof playerViewModel !== "object") {
      throw new Error(
        "PaseGameViewModel playerViewModel debe ser un objeto."
      );
    }

    if (typeof playerViewModel.getPlayers !== "function") {
      throw new Error(
        "PaseGameViewModel playerViewModel debe implementar getPlayers()."
      );
    }

    if (typeof playerViewModel.getPlayerCount !== "function") {
      throw new Error(
        "PaseGameViewModel playerViewModel debe implementar getPlayerCount()."
      );
    }
  }

  static validateBetViewModel(betViewModel) {
    if (betViewModel === null) {
      throw new Error(
        "PaseGameViewModel betViewModel no puede ser null."
      );
    }

    if (typeof betViewModel !== "object") {
      throw new Error(
        "PaseGameViewModel betViewModel debe ser un objeto."
      );
    }

    if (typeof betViewModel.getBets !== "function") {
      throw new Error(
        "PaseGameViewModel betViewModel debe implementar getBets()."
      );
    }

    if (typeof betViewModel.getBetCount !== "function") {
      throw new Error(
        "PaseGameViewModel betViewModel debe implementar getBetCount()."
      );
    }
  }

  static validateDiceViewModel(diceViewModel) {
    if (diceViewModel === null) {
      throw new Error(
        "PaseGameViewModel diceViewModel no puede ser null."
      );
    }

    if (typeof diceViewModel !== "object") {
      throw new Error(
        "PaseGameViewModel diceViewModel debe ser un objeto."
      );
    }

    if (typeof diceViewModel.getDice !== "function") {
      throw new Error(
        "PaseGameViewModel diceViewModel debe implementar getDice()."
      );
    }

    if (typeof diceViewModel.getTotal !== "function") {
      throw new Error(
        "PaseGameViewModel diceViewModel debe implementar getTotal()."
      );
    }

    if (typeof diceViewModel.getOutcome !== "function") {
      throw new Error(
        "PaseGameViewModel diceViewModel debe implementar getOutcome()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseGameViewModel initialized debe ser boolean."
      );
    }
  }

  static validatePaseGameViewModel(paseGameViewModel) {
    if (
      paseGameViewModel === null ||
      typeof paseGameViewModel !== "object"
    ) {
      throw new Error(
        "PaseGameViewModel debe ser un objeto valido."
      );
    }

    PaseGameViewModelValidator.validateManager(
      paseGameViewModel.manager
    );
    PaseGameViewModelValidator.validateTableViewModel(
      paseGameViewModel.tableViewModel
    );
    PaseGameViewModelValidator.validatePlayerViewModel(
      paseGameViewModel.playerViewModel
    );
    PaseGameViewModelValidator.validateBetViewModel(
      paseGameViewModel.betViewModel
    );
    PaseGameViewModelValidator.validateDiceViewModel(
      paseGameViewModel.diceViewModel
    );
    PaseGameViewModelValidator.validateInitialized(
      paseGameViewModel.initialized
    );
  }
}

export default PaseGameViewModelValidator;
