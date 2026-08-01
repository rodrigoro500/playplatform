import BaseEntity from "../Entities/BaseEntity";
import RoundLifecycle from "../Lifecycle/RoundLifecycle";
import RoundLifecycleStates from "../Lifecycle/RoundLifecycleStates";

class Round extends BaseEntity {
  constructor({
    id,
    sessionId,
    number,
    shooterId = null,
    players = [],
    lifecycle = null,
  }) {
    super(id);

    if (!sessionId) {
      throw new Error(
        "La ronda debe pertenecer a una sesión."
      );
    }

    if (
      !Number.isInteger(number) ||
      number < 1
    ) {
      throw new Error(
        "El número de ronda debe ser un entero mayor o igual a 1."
      );
    }

    if (!Array.isArray(players)) {
      throw new Error(
        "Los jugadores de la ronda deben estar en un arreglo."
      );
    }

    this.sessionId = sessionId;
    this.number = number;
    this.shooterId = shooterId;

    this.players = [...players];

    this.lifecycle =
      lifecycle ??
      new RoundLifecycle({
        roundId: this.id,
      });

    this.bets = [];
    this.events = [];
    this.history = [];

    this.winnerId = null;
    this.result = null;

    this.startedAt = null;
    this.finishedAt = null;
    this.cancelledAt = null;

    this.registerHistory(
      "ROUND_CREATED",
      {
        roundId: this.id,
        sessionId: this.sessionId,
        number: this.number,
        shooterId: this.shooterId,
      }
    );
  }

  start() {
    if (
      !this.lifecycle.is(
        RoundLifecycleStates.CREATED
      )
    ) {
      throw new Error(
        `No se puede iniciar una ronda en estado "${this.getState()}".`
      );
    }

    this.lifecycle.waitForBets({
      reason: "ROUND_OPENED_FOR_BETS",
      roundId: this.id,
      roundNumber: this.number,
      shooterId: this.shooterId,
    });

    this.startedAt =
      new Date().toISOString();

    this.updateTimestamp();

    this.registerHistory(
      "ROUND_STARTED",
      {
        roundId: this.id,
        startedAt: this.startedAt,
      }
    );

    return this.getState();
  }

  getLifecycle() {
    return this.lifecycle;
  }

  getStatus() {
    return this.lifecycle.getState();
  }

  getState() {
    return this.lifecycle.getState();
  }

  getSessionId() {
    return this.sessionId;
  }

  getNumber() {
    return this.number;
  }

  getShooterId() {
    return this.shooterId;
  }

  setShooterId(shooterId) {
    if (!shooterId) {
      throw new Error(
        "Se debe proporcionar un tirador válido."
      );
    }

    this.shooterId = shooterId;

    this.updateTimestamp();

    this.registerHistory(
      "ROUND_SHOOTER_CHANGED",
      {
        shooterId,
      }
    );

    return this.shooterId;
  }

  getPlayers() {
    return [...this.players];
  }

  getPlayerCount() {
    return this.players.length;
  }

  getBets() {
    return [...this.bets];
  }

  getEvents() {
    return [...this.events];
  }

  getHistory() {
    return [...this.history];
  }

  getWinnerId() {
    return this.winnerId;
  }

  getResult() {
    return this.result;
  }

  isCreated() {
    return this.lifecycle.is(
      RoundLifecycleStates.CREATED
    );
  }

  isWaitingBets() {
    return this.lifecycle.is(
      RoundLifecycleStates.WAITING_BETS
    );
  }

  isFinished() {
    return this.lifecycle.isFinished();
  }

  isCancelled() {
    return this.lifecycle.isCancelled();
  }

  isTerminal() {
    return this.lifecycle.isTerminal();
  }

  addBet(bet) {
    if (!this.isWaitingBets()) {
      throw new Error(
        "Solo se pueden agregar apuestas durante WAITING_BETS."
      );
    }

    if (!bet) {
      throw new Error(
        "Se debe proporcionar una apuesta válida."
      );
    }

    const betId =
      typeof bet.getId === "function"
        ? bet.getId()
        : bet.id;

    if (!betId) {
      throw new Error(
        "La apuesta debe tener un ID."
      );
    }

    const alreadyExists =
      this.bets.some(
        (currentBet) => {
          const currentBetId =
            typeof currentBet.getId ===
            "function"
              ? currentBet.getId()
              : currentBet.id;

          return currentBetId === betId;
        }
      );

    if (alreadyExists) {
      throw new Error(
        `La apuesta "${betId}" ya pertenece a la ronda.`
      );
    }

    this.bets.push(bet);

    this.updateTimestamp();

    this.registerHistory(
      "BET_ADDED",
      {
        betId,
      }
    );

    return bet;
  }

  removeBet(betId) {
    if (!this.isWaitingBets()) {
      throw new Error(
        "Solo se pueden eliminar apuestas durante WAITING_BETS."
      );
    }

    const betIndex =
      this.bets.findIndex(
        (bet) => {
          const currentBetId =
            typeof bet.getId ===
            "function"
              ? bet.getId()
              : bet.id;

          return currentBetId === betId;
        }
      );

    if (betIndex === -1) {
      throw new Error(
        `La apuesta "${betId}" no existe en la ronda.`
      );
    }

    const [removedBet] =
      this.bets.splice(
        betIndex,
        1
      );

    this.updateTimestamp();

    this.registerHistory(
      "BET_REMOVED",
      {
        betId,
      }
    );

    return removedBet;
  }

  closeBetting() {
    this.lifecycle.markReadyToRoll({
      reason: "BETTING_CLOSED",
      roundId: this.id,
    });

    this.registerHistory(
      "BETTING_CLOSED",
      {
        roundId: this.id,
        betCount: this.bets.length,
      }
    );

    return this.getState();
  }

  startRolling() {
    this.lifecycle.startRolling({
      reason: "ROUND_ROLLING_STARTED",
      roundId: this.id,
      shooterId: this.shooterId,
    });

    this.registerHistory(
      "ROUND_ROLLING_STARTED",
      {
        roundId: this.id,
        shooterId: this.shooterId,
      }
    );

    return this.getState();
  }

  startResolving() {
    this.lifecycle.startResolving({
      reason: "ROUND_RESOLUTION_STARTED",
      roundId: this.id,
    });

    this.registerHistory(
      "ROUND_RESOLUTION_STARTED",
      {
        roundId: this.id,
      }
    );

    return this.getState();
  }

  setResult(result) {
    if (
      !this.lifecycle.is(
        RoundLifecycleStates.RESOLVING
      )
    ) {
      throw new Error(
        "El resultado solo puede definirse durante RESOLVING."
      );
    }

    if (
      result === undefined ||
      result === null
    ) {
      throw new Error(
        "Se debe proporcionar un resultado válido."
      );
    }

    this.result = result;

    this.updateTimestamp();

    this.registerHistory(
      "ROUND_RESULT_SET",
      {
        result,
      }
    );

    return this.result;
  }

  setWinner(playerId) {
    if (
      !this.lifecycle.is(
        RoundLifecycleStates.RESOLVING
      )
    ) {
      throw new Error(
        "El ganador solo puede definirse durante RESOLVING."
      );
    }

    if (!playerId) {
      throw new Error(
        "Se debe proporcionar el ID del ganador."
      );
    }

    const playerExists =
      this.players.some(
        (player) => {
          if (typeof player === "string") {
            return player === playerId;
          }

          if (
            player &&
            typeof player.getId ===
              "function"
          ) {
            return (
              player.getId() === playerId
            );
          }

          return player?.id === playerId;
        }
      );

    if (!playerExists) {
      throw new Error(
        "El jugador ganador no pertenece a la ronda."
      );
    }

    this.winnerId = playerId;

    this.updateTimestamp();

    this.registerHistory(
      "ROUND_WINNER_SET",
      {
        winnerId: playerId,
      }
    );

    return this.winnerId;
  }

  startFunding() {
    this.lifecycle.startFunding({
      reason: "ROUND_FUNDING_STARTED",
      roundId: this.id,
    });

    this.registerHistory(
      "ROUND_FUNDING_STARTED",
      {
        roundId: this.id,
      }
    );

    return this.getState();
  }

  startPayment() {
    this.lifecycle.startPayment({
      reason: "ROUND_PAYMENT_STARTED",
      roundId: this.id,
    });

    this.registerHistory(
      "ROUND_PAYMENT_STARTED",
      {
        roundId: this.id,
      }
    );

    return this.getState();
  }

  finish(
    result = null,
    winnerId = null
  ) {
    if (this.isFinished()) {
      throw new Error(
        "La ronda ya está finalizada."
      );
    }

    if (this.isCancelled()) {
      throw new Error(
        "No se puede finalizar una ronda cancelada."
      );
    }

    if (
      result !== undefined &&
      result !== null
    ) {
      this.result = result;
    }

    if (winnerId) {
      this.winnerId = winnerId;
    }

    this.lifecycle.finish({
      reason: "ROUND_FINISHED",
      roundId: this.id,
      result: this.result,
      winnerId: this.winnerId,
    });

    this.finishedAt =
      new Date().toISOString();

    this.updateTimestamp();

    this.registerHistory(
      "ROUND_FINISHED",
      {
        roundId: this.id,
        result: this.result,
        winnerId: this.winnerId,
        finishedAt: this.finishedAt,
      }
    );

    return this.getState();
  }

  cancel(
    reason = "Sin motivo especificado"
  ) {
    if (
      typeof reason !== "string" ||
      !reason.trim()
    ) {
      throw new Error(
        "El motivo de cancelación debe ser válido."
      );
    }

    this.lifecycle.cancel({
      reason: reason.trim(),
      roundId: this.id,
    });

    this.cancelledAt =
      new Date().toISOString();

    this.updateTimestamp();

    this.registerHistory(
      "ROUND_CANCELLED",
      {
        roundId: this.id,
        reason: reason.trim(),
        cancelledAt:
          this.cancelledAt,
      }
    );

    return this.getState();
  }

  registerEvent(
    type,
    payload = {}
  ) {
    if (
      !type ||
      typeof type !== "string"
    ) {
      throw new Error(
        "El evento debe tener un tipo válido."
      );
    }

    const event = {
      id:
        typeof crypto !==
          "undefined" &&
        typeof crypto.randomUUID ===
          "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,

      type,
      payload,
      roundId: this.id,
      timestamp:
        new Date().toISOString(),
    };

    this.events.push(event);

    this.updateTimestamp();

    return event;
  }

  registerHistory(
    type,
    payload = {}
  ) {
    const entry = {
      type,
      payload,
      state: this.getState(),
      timestamp:
        new Date().toISOString(),
    };

    this.history.push(entry);

    return entry;
  }

  toJSON() {
    return {
      ...super.toJSON(),

      sessionId: this.sessionId,
      number: this.number,
      shooterId: this.shooterId,

      state: this.getState(),
      status: this.getStatus(),

      playerCount:
        this.getPlayerCount(),

      players: this.players.map(
        (player) =>
          player &&
          typeof player.toJSON ===
            "function"
            ? player.toJSON()
            : player
      ),

      bets: this.bets.map(
        (bet) =>
          bet &&
          typeof bet.toJSON ===
            "function"
            ? bet.toJSON()
            : bet
      ),

      events: this.getEvents(),
      history: this.getHistory(),

      winnerId: this.winnerId,
      result: this.result,

      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      cancelledAt:
        this.cancelledAt,

      lifecycle:
        this.lifecycle.getSnapshot(),
    };
  }
}

export default Round;