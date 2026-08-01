class PaseBetAreasValidator {
  static getSource(element) {
    if (typeof element === "string") {
      return element;
    }

    return JSON.stringify(element);
  }

  static validateContainer(container) {
    if (container === null || container === undefined) {
      throw new Error(
        "PaseBetAreas container debe existir."
      );
    }

    const source =
      PaseBetAreasValidator.getSource(container);

    if (!source.includes("pase-bet-areas")) {
      throw new Error(
        "PaseBetAreas debe contener pase-bet-areas."
      );
    }
  }

  static validatePaseArea(area) {
    if (area === null || area === undefined) {
      throw new Error(
        "PaseBetAreas area PASE debe existir."
      );
    }

    const source =
      PaseBetAreasValidator.getSource(area);

    if (!source.includes("pase-bet-area-pase")) {
      throw new Error(
        "PaseBetAreas debe contener pase-bet-area-pase."
      );
    }

    if (!source.includes("data-bet-type=\"PASE\"")) {
      throw new Error(
        "PaseBetAreas area PASE debe tener data-bet-type=\"PASE\"."
      );
    }
  }

  static validateKuloArea(area) {
    if (area === null || area === undefined) {
      throw new Error(
        "PaseBetAreas area KULO debe existir."
      );
    }

    const source =
      PaseBetAreasValidator.getSource(area);

    if (!source.includes("pase-bet-area-kulo")) {
      throw new Error(
        "PaseBetAreas debe contener pase-bet-area-kulo."
      );
    }

    if (!source.includes("data-bet-type=\"KULO\"")) {
      throw new Error(
        "PaseBetAreas area KULO debe tener data-bet-type=\"KULO\"."
      );
    }
  }

  static validateBetTypes(areas) {
    if (areas === null || areas === undefined) {
      throw new Error(
        "PaseBetAreas areas debe existir."
      );
    }

    const source =
      PaseBetAreasValidator.getSource(areas);

    if (source.includes("data-bet-type=\"NO_PASE\"")) {
      throw new Error(
        "PaseBetAreas no debe contener data-bet-type=\"NO_PASE\"."
      );
    }
  }

  static validatePaseBetAreas(component) {
    PaseBetAreasValidator.validateContainer(component);
    PaseBetAreasValidator.validatePaseArea(component);
    PaseBetAreasValidator.validateKuloArea(component);
    PaseBetAreasValidator.validateBetTypes(component);
  }
}

export default PaseBetAreasValidator;
