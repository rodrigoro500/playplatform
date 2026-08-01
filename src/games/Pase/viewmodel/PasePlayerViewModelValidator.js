class PasePlayerViewModelValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PasePlayerViewModel manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PasePlayerViewModel manager debe ser un objeto."
      );
    }
  }

  static validateTableRuntime(tableRuntime) {
    if (tableRuntime === null) {
      throw new Error(
        "PasePlayerViewModel tableRuntime no puede ser null."
      );
    }

    if (typeof tableRuntime !== "object") {
      throw new Error(
        "PasePlayerViewModel tableRuntime debe ser un objeto."
      );
    }

    if (typeof tableRuntime.getPlayers !== "function") {
      throw new Error(
        "PasePlayerViewModel tableRuntime debe implementar getPlayers()."
      );
    }

    if (typeof tableRuntime.getPlayerCount !== "function") {
      throw new Error(
        "PasePlayerViewModel tableRuntime debe implementar getPlayerCount()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PasePlayerViewModel initialized debe ser boolean."
      );
    }
  }

  static validatePasePlayerViewModel(pasePlayerViewModel) {
    if (
      pasePlayerViewModel === null ||
      typeof pasePlayerViewModel !== "object"
    ) {
      throw new Error(
        "PasePlayerViewModel debe ser un objeto valido."
      );
    }

    PasePlayerViewModelValidator.validateManager(
      pasePlayerViewModel.manager
    );
    PasePlayerViewModelValidator.validateTableRuntime(
      pasePlayerViewModel.tableRuntime
    );
    PasePlayerViewModelValidator.validateInitialized(
      pasePlayerViewModel.initialized
    );
  }
}

export default PasePlayerViewModelValidator;
