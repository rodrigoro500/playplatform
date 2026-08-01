import {
  PaseDiceValues,
  PaseDiceFaces,
  isValidDiceValue,
} from "./PaseDiceValues";

class PaseDiceValuesValidator {
  static validateLimits() {
    if (PaseDiceValues.MIN !== 1) {
      throw new Error("PaseDiceValues.MIN debe ser 1.");
    }

    if (PaseDiceValues.MAX !== 6) {
      throw new Error("PaseDiceValues.MAX debe ser 6.");
    }
  }

  static validateFaces() {
    const expectedFaces = [1, 2, 3, 4, 5, 6];

    if (!Array.isArray(PaseDiceFaces)) {
      throw new Error("PaseDiceFaces debe ser un Array.");
    }

    if (PaseDiceFaces.length !== expectedFaces.length) {
      throw new Error("PaseDiceFaces debe contener seis caras.");
    }

    expectedFaces.forEach((face, index) => {
      if (PaseDiceFaces[index] !== face) {
        throw new Error(
          "PaseDiceFaces debe contener las caras 1, 2, 3, 4, 5 y 6."
        );
      }
    });
  }

  static validateValue(value) {
    const valid = isValidDiceValue(value);

    if (value === 1 && valid !== true) {
      throw new Error("El valor 1 debe ser valido.");
    }

    if (value === 6 && valid !== true) {
      throw new Error("El valor 6 debe ser valido.");
    }

    if (value === 0 && valid !== false) {
      throw new Error("El valor 0 debe ser invalido.");
    }

    if (value === 7 && valid !== false) {
      throw new Error("El valor 7 debe ser invalido.");
    }

    return valid;
  }
}

export default PaseDiceValuesValidator;
