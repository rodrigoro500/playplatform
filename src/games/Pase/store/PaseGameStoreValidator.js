class PaseGameStoreValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "PaseGameStore manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "PaseGameStore manager debe ser un objeto."
      );
    }
  }

  static validateReactAdapter(reactAdapter) {
    if (reactAdapter === null) {
      throw new Error(
        "PaseGameStore reactAdapter no puede ser null."
      );
    }

    if (typeof reactAdapter !== "object") {
      throw new Error(
        "PaseGameStore reactAdapter debe ser un objeto."
      );
    }

    if (typeof reactAdapter.getGameState !== "function") {
      throw new Error(
        "PaseGameStore reactAdapter debe implementar getGameState()."
      );
    }

    if (typeof reactAdapter.refresh !== "function") {
      throw new Error(
        "PaseGameStore reactAdapter debe implementar refresh()."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "PaseGameStore initialized debe ser boolean."
      );
    }
  }

  static validatePaseGameStore(paseGameStore) {
    if (
      paseGameStore === null ||
      typeof paseGameStore !== "object"
    ) {
      throw new Error(
        "PaseGameStore debe ser un objeto valido."
      );
    }

    PaseGameStoreValidator.validateManager(
      paseGameStore.manager
    );
    PaseGameStoreValidator.validateReactAdapter(
      paseGameStore.reactAdapter
    );
    PaseGameStoreValidator.validateInitialized(
      paseGameStore.initialized
    );
  }
}

export default PaseGameStoreValidator;
