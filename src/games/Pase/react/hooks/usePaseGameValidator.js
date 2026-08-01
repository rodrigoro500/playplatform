class UsePaseGameValidator {
  static validateStore(store) {
    if (store === null) {
      throw new Error(
        "usePaseGame store no puede ser null."
      );
    }

    if (typeof store !== "object") {
      throw new Error(
        "usePaseGame store debe ser un objeto."
      );
    }
  }

  static validateState(state) {
    if (state !== null && typeof state !== "object") {
      throw new Error(
        "usePaseGame state debe ser null o un objeto."
      );
    }
  }

  static validateRefresh(refresh) {
    if (typeof refresh !== "function") {
      throw new Error(
        "usePaseGame refresh debe ser una funcion."
      );
    }
  }

  static validateGetState(getState) {
    if (typeof getState !== "function") {
      throw new Error(
        "usePaseGame getState debe ser una funcion."
      );
    }
  }

  static validateUsePaseGame(usePaseGameResult) {
    if (
      usePaseGameResult === null ||
      typeof usePaseGameResult !== "object"
    ) {
      throw new Error(
        "usePaseGame debe devolver un objeto valido."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "store")) {
      throw new Error(
        "usePaseGame debe contener store."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "state")) {
      throw new Error(
        "usePaseGame debe contener state."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "table")) {
      throw new Error(
        "usePaseGame debe contener table."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "players")) {
      throw new Error(
        "usePaseGame debe contener players."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "bets")) {
      throw new Error(
        "usePaseGame debe contener bets."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "dice")) {
      throw new Error(
        "usePaseGame debe contener dice."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(usePaseGameResult, "running")) {
      throw new Error(
        "usePaseGame debe contener running."
      );
    }

    UsePaseGameValidator.validateStore(
      usePaseGameResult.store
    );
    UsePaseGameValidator.validateState(
      usePaseGameResult.state
    );

    if (!Array.isArray(usePaseGameResult.players)) {
      throw new Error(
        "usePaseGame players debe ser un Array."
      );
    }

    if (!Array.isArray(usePaseGameResult.bets)) {
      throw new Error(
        "usePaseGame bets debe ser un Array."
      );
    }

    if (typeof usePaseGameResult.running !== "boolean") {
      throw new Error(
        "usePaseGame running debe ser boolean."
      );
    }

    UsePaseGameValidator.validateRefresh(
      usePaseGameResult.refresh
    );
    UsePaseGameValidator.validateGetState(
      usePaseGameResult.getState
    );
  }
}

export default UsePaseGameValidator;
