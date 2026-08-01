import {
  PaseDiceValues,
  PaseDiceFaces,
  isValidDiceValue,
} from "./PaseDiceValues";
import PaseDiceValuesEvents from "./PaseDiceValuesEvents";

class PaseDiceValuesSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PASE DICE VALUES SANDBOX =====");

    const min = PaseDiceValues.MIN;
    const max = PaseDiceValues.MAX;
    const faces = PaseDiceFaces;
    const oneValid = isValidDiceValue(1);
    const sixValid = isValidDiceValue(6);
    const zeroValid = isValidDiceValue(0);
    const sevenValid = isValidDiceValue(7);
    const events = [
      PaseDiceValuesEvents.createPaseDiceValuesInitializedEvent(),
      PaseDiceValuesEvents.createPaseDiceValuesValidatedEvent(),
    ];

    this.assert(
      min === 1,
      "PaseDiceValues.MIN debe ser 1."
    );
    this.assert(
      max === 6,
      "PaseDiceValues.MAX debe ser 6."
    );
    this.assert(
      faces[0] === 1,
      "PaseDiceFaces debe contener 1."
    );
    this.assert(
      faces[1] === 2,
      "PaseDiceFaces debe contener 2."
    );
    this.assert(
      faces[2] === 3,
      "PaseDiceFaces debe contener 3."
    );
    this.assert(
      faces[3] === 4,
      "PaseDiceFaces debe contener 4."
    );
    this.assert(
      faces[4] === 5,
      "PaseDiceFaces debe contener 5."
    );
    this.assert(
      faces[5] === 6,
      "PaseDiceFaces debe contener 6."
    );
    this.assert(
      oneValid === true,
      "isValidDiceValue(1) debe retornar true."
    );
    this.assert(
      sixValid === true,
      "isValidDiceValue(6) debe retornar true."
    );
    this.assert(
      zeroValid === false,
      "isValidDiceValue(0) debe retornar false."
    );
    this.assert(
      sevenValid === false,
      "isValidDiceValue(7) debe retornar false."
    );

    console.log("Mostrar resultados por consola:");
    console.log({
      min,
      max,
      faces,
      oneValid,
      sixValid,
      zeroValid,
      sevenValid,
      events,
    });

    console.log("===== PASE DICE VALUES SANDBOX OK =====");
  }
}

new PaseDiceValuesSandbox();

export default PaseDiceValuesSandbox;
