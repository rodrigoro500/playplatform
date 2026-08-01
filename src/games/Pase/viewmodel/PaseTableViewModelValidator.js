class PaseTableViewModelValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseTableViewModel manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseTableViewModel manager debe ser un objeto."
      );
    }
  }

  static validateTableRuntime(tableRuntime) {
    if (tableRuntime === null) {
      throw new Error(
        "PaseTableViewModel tableRuntime no puede ser null."
      );
    }

    if (typeof tableRuntime !== "object") {
      throw new Error(
        "PaseTableViewModel tableRuntime debe ser un objeto."
      );
    }

    if (typeof tableRuntime.getPlayers !== "function") {
      throw new Error(
        "PaseTableViewModel tableRuntime debe implementar getPlayers()."
      );
    }

    if (typeof tableRuntime.getPlayerCount !== "function") {
      throw new Error(
        "PaseTableViewModel tableRuntime debe implementar getPlayerCount()."
      );
    }

    if (typeof tableRuntime.getStatus !== "function") {
      throw new Error(
        "PaseTableViewModel tableRuntime debe implementar getStatus()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseTableViewModel initialized debe ser boolean."
      );
    }
  }

  static validatePaseTableViewModel(paseTableViewModel) {
    if (
      paseTableViewModel === null ||
      typeof paseTableViewModel !== "object"
    ) {
      throw new Error(
        "PaseTableViewModel debe ser un objeto valido."
      );
    }

    PaseTableViewModelValidator.validateManager(
      paseTableViewModel.manager
    );
    PaseTableViewModelValidator.validateTableRuntime(
      paseTableViewModel.tableRuntime
    );
    PaseTableViewModelValidator.validateInitialized(
      paseTableViewModel.initialized
    );
  }
}

export default PaseTableViewModelValidator;
