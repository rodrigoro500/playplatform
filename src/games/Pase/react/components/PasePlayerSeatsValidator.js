class PasePlayerSeatsValidator {
  static validatePlayers(players) {
    if (!Array.isArray(players)) {
      throw new Error(
        "PasePlayerSeats players debe ser un Array."
      );
    }
  }

  static validateSeat(seat) {
    if (seat === null || typeof seat !== "object") {
      throw new Error(
        "PasePlayerSeats seat debe ser un objeto valido."
      );
    }

    if (!Object.prototype.hasOwnProperty.call(seat, "id")) {
      throw new Error(
        "PasePlayerSeats seat debe contener id."
      );
    }
  }

  static validatePlayerName(playerName) {
    if (playerName === null || playerName === undefined) {
      throw new Error(
        "PasePlayerSeats playerName debe existir."
      );
    }
  }

  static validatePlayerWallet(playerWallet) {
    if (playerWallet === undefined) {
      throw new Error(
        "PasePlayerSeats playerWallet no puede ser undefined."
      );
    }
  }

  static validatePasePlayerSeats(rendered, players = []) {
    PasePlayerSeatsValidator.validatePlayers(players);

    if (rendered === null || rendered === undefined) {
      throw new Error(
        "PasePlayerSeats render debe existir."
      );
    }

    const source =
      typeof rendered === "string"
        ? rendered
        : JSON.stringify(rendered);

    if (players.length === 0) {
      if (!source.includes("Sin jugadores")) {
        throw new Error(
          "PasePlayerSeats debe renderizar Sin jugadores cuando no existen jugadores."
        );
      }

      return;
    }

    if (!source.includes("pase-player-seats")) {
      throw new Error(
        "PasePlayerSeats debe contener pase-player-seats."
      );
    }

    if (!source.includes("pase-player-seat")) {
      throw new Error(
        "PasePlayerSeats debe contener pase-player-seat."
      );
    }

    if (!source.includes("pase-player-name")) {
      throw new Error(
        "PasePlayerSeats debe contener pase-player-name."
      );
    }

    if (!source.includes("pase-player-wallet")) {
      throw new Error(
        "PasePlayerSeats debe contener pase-player-wallet."
      );
    }

    players.forEach((player) => {
      PasePlayerSeatsValidator.validateSeat(player);
      PasePlayerSeatsValidator.validatePlayerName(
        player.name ?? player.id
      );
      PasePlayerSeatsValidator.validatePlayerWallet(
        player.wallet
      );
    });
  }
}

export default PasePlayerSeatsValidator;
