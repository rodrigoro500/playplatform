class PaseGameContextValidator {
  static validateStore(store) {
    if (store === null) {
      throw new Error(
        "PaseGameContext store no puede ser null."
      );
    }

    if (typeof store !== "object") {
      throw new Error(
        "PaseGameContext store debe ser un objeto."
      );
    }

    if (typeof store.initialize !== "function") {
      throw new Error(
        "PaseGameContext store debe implementar initialize()."
      );
    }

    if (typeof store.getState !== "function") {
      throw new Error(
        "PaseGameContext store debe implementar getState()."
      );
    }

    if (typeof store.subscribe !== "function") {
      throw new Error(
        "PaseGameContext store debe implementar subscribe()."
      );
    }

    if (typeof store.unsubscribe !== "function") {
      throw new Error(
        "PaseGameContext store debe implementar unsubscribe()."
      );
    }
  }

  static validateProvider(provider) {
    if (typeof provider !== "function") {
      throw new Error(
        "PaseGameContext provider debe ser una funcion."
      );
    }
  }

  static validateUsePaseGame(usePaseGame) {
    if (typeof usePaseGame !== "function") {
      throw new Error(
        "PaseGameContext usePaseGame debe ser una funcion."
      );
    }
  }
}

export default PaseGameContextValidator;
