class PaseTableProviderValidator {
  static validateStore(store) {
    if (store === null) {
      throw new Error(
        "PaseTableProvider store no puede ser null."
      );
    }

    if (typeof store !== "object") {
      throw new Error(
        "PaseTableProvider store debe ser un objeto."
      );
    }
  }

  static validateChildren(children) {
    if (children === null || children === undefined) {
      throw new Error(
        "PaseTableProvider children debe existir."
      );
    }
  }

  static validateProvider(provider) {
    if (typeof provider !== "function") {
      throw new Error(
        "PaseTableProvider provider debe ser una funcion."
      );
    }
  }
}

export default PaseTableProviderValidator;
