import Player from "./Player";

class PlayerValidator {
  static validateId(id) {
    if (typeof id !== "string") {
      throw new Error(
        "El id del jugador debe ser un string."
      );
    }

    if (id.trim() === "") {
      throw new Error(
        "El id del jugador no puede estar vacío."
      );
    }
  }

  static validateName(name) {
    if (typeof name !== "string") {
      throw new Error(
        "El nombre del jugador debe ser un string."
      );
    }

    if (name.trim() === "") {
      throw new Error(
        "El nombre del jugador no puede estar vacío."
      );
    }
  }

  static validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del jugador debe ser un objeto válido."
      );
    }
  }

  static validatePlayer(player) {
    if (!(player instanceof Player)) {
      throw new Error(
        "El jugador debe ser una instancia de Player."
      );
    }
  }
}

export default PlayerValidator;
