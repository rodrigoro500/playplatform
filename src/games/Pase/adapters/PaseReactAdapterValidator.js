class PaseReactAdapterValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseReactAdapter manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseReactAdapter manager debe ser un objeto."
      );
    }
  }

  static validateGameAdapter(gameAdapter) {
    if (gameAdapter === null) {
      throw new Error(
        "PaseReactAdapter gameAdapter no puede ser null."
      );
    }

    if (typeof gameAdapter !== "object") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe ser un objeto."
      );
    }

    if (typeof gameAdapter.getState !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar getState()."
      );
    }

    if (typeof gameAdapter.getTable !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar getTable()."
      );
    }

    if (typeof gameAdapter.getPlayers !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar getPlayers()."
      );
    }

    if (typeof gameAdapter.getBets !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar getBets()."
      );
    }

    if (typeof gameAdapter.getDice !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar getDice()."
      );
    }

    if (typeof gameAdapter.refresh !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar refresh()."
      );
    }

    if (typeof gameAdapter.getStatus !== "function") {
      throw new Error(
        "PaseReactAdapter gameAdapter debe implementar getStatus()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseReactAdapter initialized debe ser boolean."
      );
    }
  }

  static validatePaseReactAdapter(paseReactAdapter) {
    if (
      paseReactAdapter === null ||
      typeof paseReactAdapter !== "object"
    ) {
      throw new Error(
        "PaseReactAdapter debe ser un objeto valido."
      );
    }

    PaseReactAdapterValidator.validateManager(
      paseReactAdapter.manager
    );
    PaseReactAdapterValidator.validateGameAdapter(
      paseReactAdapter.gameAdapter
    );
    PaseReactAdapterValidator.validateInitialized(
      paseReactAdapter.initialized
    );
  }
}

export default PaseReactAdapterValidator;
