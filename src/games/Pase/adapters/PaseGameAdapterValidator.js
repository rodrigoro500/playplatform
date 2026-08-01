class PaseGameAdapterValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseGameAdapter manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseGameAdapter manager debe ser un objeto."
      );
    }
  }

  static validateGameViewModel(gameViewModel) {
    if (gameViewModel === null) {
      throw new Error(
        "PaseGameAdapter gameViewModel no puede ser null."
      );
    }

    if (typeof gameViewModel !== "object") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe ser un objeto."
      );
    }

    if (typeof gameViewModel.getGameState !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar getGameState()."
      );
    }

    if (typeof gameViewModel.getTable !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar getTable()."
      );
    }

    if (typeof gameViewModel.getPlayers !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar getPlayers()."
      );
    }

    if (typeof gameViewModel.getBets !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar getBets()."
      );
    }

    if (typeof gameViewModel.getDice !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar getDice()."
      );
    }

    if (typeof gameViewModel.refresh !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar refresh()."
      );
    }

    if (typeof gameViewModel.getStatus !== "function") {
      throw new Error(
        "PaseGameAdapter gameViewModel debe implementar getStatus()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseGameAdapter initialized debe ser boolean."
      );
    }
  }

  static validatePaseGameAdapter(paseGameAdapter) {
    if (
      paseGameAdapter === null ||
      typeof paseGameAdapter !== "object"
    ) {
      throw new Error(
        "PaseGameAdapter debe ser un objeto valido."
      );
    }

    PaseGameAdapterValidator.validateManager(
      paseGameAdapter.manager
    );
    PaseGameAdapterValidator.validateGameViewModel(
      paseGameAdapter.gameViewModel
    );
    PaseGameAdapterValidator.validateInitialized(
      paseGameAdapter.initialized
    );
  }
}

export default PaseGameAdapterValidator;
