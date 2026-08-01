import RoundEngine from "../../core/Engine/RoundEngine";
import BaseGameEngine from "../../core/Engine/BaseGameEngine";
import GameLifecycle from "../../core/Engine/GameLifecycle";
import Round from "../../core/Rounds/Round";
import PaseRoundFlow from "./PaseRoundFlow";
import PaseEventsManager from "./PaseEventsManager";
import PaseBetManager from "./PaseBetManager";
import PaseRoundResolver from "./PaseRoundResolver";
import PaseDiceEngine from "./PaseDiceEngine";
import PaseResolver from "./PaseResolver";
import PasePotFunding from "./PasePotFunding";
import PaseFundingManager from "./PaseFundingManager";
import PaseInstantBetPoolManager from "./PaseInstantBetPoolManager";

class PaseEngine extends BaseGameEngine {
  constructor({
    eventManager = null,
    table = null,
    turnManager = null,
    resolver = null,
    settlementResolver = null,
    funding = null,
  } = {}) {
    super({
      eventManager,
    });

    this.roundEngine = new RoundEngine();

    this.table = table;
    this.turnManager = turnManager;
    this.resolver = resolver;
    this.settlementResolver = settlementResolver;
    this.funding = funding;

    this.roundFlow = new PaseRoundFlow(this);

    this.paseEvents =
  new PaseEventsManager(eventManager);

  this.betManager =
  new PaseBetManager(this);

  this.roundResolver =
  new PaseRoundResolver(this);

  this.diceEngine = new PaseDiceEngine();
  
  this.paseResolver = new PaseResolver();

  this.potFunding = new PasePotFunding();

this.fundingManager =
  new PaseFundingManager();

  this.instantBetPoolManager =
  new PaseInstantBetPoolManager();

}


  initialize() {
    super.initialize();

    return true;
  }

  getTable() {
    return this.table;
  }

  getTurnManager() {
    return this.turnManager;
  }

  getResolver() {
    return this.resolver;
  }

  getSettlementResolver() {
    return this.settlementResolver;
  }

  getFunding() {
    return this.funding;
  }

  getRoundEngine() {
    return this.roundEngine;
  }

  getSessionId() {
    const table =
      this.getTable();

    if (!table) {
      throw new Error(
        "No existe una mesa asociada al motor."
      );
    }

    if (
      typeof table.getId ===
      "function"
    ) {
      return table.getId();
    }

    if (table.id) {
      return table.id;
    }

    throw new Error(
      "No se pudo determinar la sesión de la ronda."
    );
  }

  requireActiveRound() {
    const currentRound =
      this.getCurrentRound();

    if (!currentRound) {
      throw new Error(
        "No existe una ronda activa."
      );
    }

    return currentRound;
  }

  prepareGame() {
    const table =
      this.getTable();

    if (!table) {
      throw new Error(
        "No existe una mesa asociada al motor."
      );
    }

    const players =
      table.getPlayers();

    if (
      !players ||
      players.length < 2
    ) {
      throw new Error(
        "Se requieren al menos dos jugadores."
      );
    }

    return players;
  }

  selectShooter(players) {
    const shooterId =
      players[0];

    this.getTable().setShooter(
      shooterId
    );

    if (
      this.getTurnManager()
    ) {
      this.getTurnManager().setPlayers(
        players
      );

      this.getTurnManager().setShooter(
        shooterId
      );
    }

    return shooterId;
  }

  initializeFirstRound(
    shooterId,
    players
  ) {
    const round =
      new Round({
        id: crypto.randomUUID(),
        sessionId:
          this.getSessionId(),
        number: 1,
        shooterId,
        players,
      });

    this.setCurrentRound(
      round
    );

    this.roundEngine.startRound(
      round
    );

    return round;
  }

  startGame() {
    if (
      !this.isInitialized()
    ) {
      this.initialize();
    }

    if (this.isRunning()) {
      throw new Error(
        "La partida de Pase ya está iniciada."
      );
    }

    const players =
      this.prepareGame();

    super.startGame();

    const shooter =
      this.selectShooter(
        players
      );

    const round =
      this.initializeFirstRound(
        shooter,
        players
      );

    this.getTable().setStatus(
      GameLifecycle.WAITING_BETS
    );

    return {
      shooter,
      round,
      players,
      status:
        this.getTable().getStatus(),
    };
  }

  createRound({
    id = crypto.randomUUID(),
    number,
    shooterId = null,
    players = null,
  } = {}) {
    if (!this.isRunning()) {
      throw new Error(
        "La partida debe estar iniciada antes de crear una ronda."
      );
    }

    const currentRound =
      this.getCurrentRound();

    if (
      currentRound &&
      !currentRound.isTerminal()
    ) {
      throw new Error(
        "Ya existe una ronda activa."
      );
    }

    if (
      !Number.isInteger(number) ||
      number < 1
    ) {
      throw new Error(
        "Se debe proporcionar un número de ronda válido."
      );
    }

    const roundPlayers =
      players ??
      this.getTable().getPlayers();

    const activeShooter =
      shooterId ??
      this.getTable()
        .getShooter?.() ??
      null;

    const round =
      new Round({
        id,
        sessionId:
          this.getSessionId(),
        number,
        shooterId:
          activeShooter,
        players:
          roundPlayers,
      });

    this.setCurrentRound(
      round
    );

    this.roundEngine.startRound(
      round
    );

    this.getTable().setStatus(
      GameLifecycle.WAITING_BETS
    );

    return round;
  }

  acceptBet(bet) {
    const currentRound =
      this.requireActiveRound();

    if (
      !currentRound.isWaitingBets()
    ) {
      throw new Error(
        "La ronda no está aceptando apuestas."
      );
    }

    const validatedBet =
      this.roundEngine.validateBet(
        bet
      );

    currentRound.addBet(
      validatedBet
    );

    return validatedBet;
  }

  closeBetting() {
    const currentRound =
      this.requireActiveRound();

    const state =
      currentRound.closeBetting();

    return {
      roundId:
        currentRound.getId?.() ??
        currentRound.id,
      state,
      betCount:
        currentRound.getBets().length,
    };
  }

  startRoll() {
    const currentRound =
      this.requireActiveRound();

    const state =
      currentRound.startRolling();

    this.getTable().setStatus(
      GameLifecycle.ROLLING_DICE
    );

    return {
      roundId:
        currentRound.getId?.() ??
        currentRound.id,
      shooterId:
        currentRound.getShooterId(),
      state,
      gameStatus:
        this.getTable().getStatus(),
    };
  }

  beginResolution() {
    const currentRound =
      this.requireActiveRound();

    const state =
      currentRound.startResolving();

    this.getTable().setStatus(
      GameLifecycle.RESOLVING
    );

    return {
      roundId:
        currentRound.getId?.() ??
        currentRound.id,
      state,
      gameStatus:
        this.getTable().getStatus(),
    };
  }

  setRoundResult(
    result,
    winnerId = null
  ) {
    const currentRound =
      this.requireActiveRound();

    const savedResult =
      currentRound.setResult(
        result
      );

    let savedWinnerId =
      currentRound.getWinnerId();

    if (winnerId) {
      savedWinnerId =
        currentRound.setWinner(
          winnerId
        );
    }

    return {
      roundId:
        currentRound.getId?.() ??
        currentRound.id,
      result: savedResult,
      winnerId:
        savedWinnerId,
      state:
        currentRound.getState(),
    };
  }

  beginFunding() {
    const currentRound =
      this.requireActiveRound();

    const state =
      currentRound.startFunding();

    this.getTable().setStatus(
      GameLifecycle.FUNDING
    );

    return {
      roundId:
        currentRound.getId?.() ??
        currentRound.id,
      state,
      gameStatus:
        this.getTable().getStatus(),
    };
  }

  beginPayment() {
    const currentRound =
      this.requireActiveRound();

    const state =
      currentRound.startPayment();

    this.getTable().setStatus(
      GameLifecycle.PAYMENT
    );

    return {
      roundId:
        currentRound.getId?.() ??
        currentRound.id,
      state,
      gameStatus:
        this.getTable().getStatus(),
    };
  }

  resolveBet({
    bet,
    result,
    resolvedAmount,
  }) {
    this.requireActiveRound();

    return this.roundEngine.resolveBet({
      bet,
      result,
      resolvedAmount,
    });
  }

  completeRound({
    result = null,
    winnerId = null,
  } = {}) {
    const currentRound =
      this.requireActiveRound();

    const finalResult =
      result ??
      currentRound.getResult();

    const finalWinnerId =
      winnerId ??
      currentRound.getWinnerId();

    if (
      finalResult === undefined ||
      finalResult === null
    ) {
      throw new Error(
        "No se puede finalizar la ronda sin un resultado."
      );
    }

    const finishedRound =
      this.roundEngine.finishRound(
        currentRound,
        finalResult,
        finalWinnerId
      );

    this.getTable().setStatus(
      GameLifecycle.ROUND_FINISHED
    );

    this.setCurrentRound(
      null
    );

    return finishedRound;
  }

  finishRound(
    result,
    winnerId = null
  ) {
    return this.completeRound({
      result,
      winnerId,
    });
  }

  finishGame() {
    if (!this.isRunning()) {
      throw new Error(
        "No existe una partida activa."
      );
    }

    const currentRound =
      this.getCurrentRound();

    if (
      currentRound &&
      !currentRound.isTerminal()
    ) {
      currentRound.cancel(
        "La partida fue finalizada."
      );
    }

    this.setCurrentRound(
      null
    );

    if (this.getTable()) {
      this.getTable().setStatus(
        GameLifecycle.GAME_FINISHED
      );
    }

    super.finishGame();

    return true;
  }

  isGameRunning() {
    return this.isRunning();
  }

  reset() {
    super.reset();

    this.roundEngine =
      new RoundEngine();

    if (this.getTable()) {
      this.getTable().setStatus(
        GameLifecycle.WAITING_PLAYERS
      );
    }

    return true;
  }

  closeBetting() {
  return this.getRoundFlow().closeBetting();
}

startRoll() {
  return this.getRoundFlow().startRoll();
}

beginResolution() {
  return this.getRoundFlow().beginResolution();
}

setRoundResult(result, winnerId = null) {
  return this.getRoundFlow().setResult(
    result,
    winnerId
  );
}

beginFunding() {
  return this.getRoundFlow().beginFunding();
}

beginPayment() {
  return this.getRoundFlow().beginPayment();
}

completeRound() {
  return this.getRoundFlow().completeRound();
}

// ======================================================
// EVENTOS DE PASE
// ======================================================

getPaseEvents() {
  return this.paseEvents;
}

// ======================================================
// FLUJO DE RONDA
// ======================================================

getRoundFlow() {
  return this.roundFlow;
}

// ======================================================
// APUESTAS
// ======================================================

getBetManager() {
  return this.betManager;
}

placeBet(bet) {
  return this.getBetManager().placeBet(bet);
}

removeBet(betId) {
  return this.getBetManager().removeBet(
    betId
  );
}

clearBets() {
  return this.getBetManager().clearBets();
}

getBets() {
  return this.getBetManager().getBets();
}

getBetCount() {
  return this.getBetManager().getBetCount();
}

hasBets() {
  return this.getBetManager().hasBets();
}

resolveBet(bet, outcome) {
  return this.getBetManager().resolveBet(
    bet,
    outcome
  );
}

settleBets(outcome) {
  return this.getBetManager().settleBets(
    outcome
  );
}

// ======================================================
// RESOLUCIÓN DE RONDA
// ======================================================

getRoundResolver() {
  return this.roundResolver;
}

resolveRound() {
  return this.getRoundResolver().resolve();
}

// ======================================================
// MOTOR DE DADOS
// ======================================================

getDiceEngine() {
  return this.diceEngine;
}

rollDice() {
  return this.getDiceEngine().rollDice();
}

// ======================================================
// RESOLUCIÓN OFICIAL DE PASE
// ======================================================

getPaseResolver() {
  return this.paseResolver;
}

resolveDice(result) {
  return this.getPaseResolver().resolve(
    result
  );
}

// ======================================================
// FINANCIAMIENTO DEL POZO
// ======================================================

getPotFunding() {
  return this.potFunding;
}

startPotFunding(
  requiredAmount,
  priorityPlayerId = null
) {
  const potFunding =
    this.getPotFunding();

  potFunding.clear();

  potFunding.setRequiredAmount(
    requiredAmount
  );

  if (priorityPlayerId) {
    potFunding.setPriorityPlayer(
      priorityPlayerId
    );
  }

  return potFunding.toJSON();
}

registerPotContribution(
  playerId,
  amount
) {
  const potFunding =
    this.getPotFunding();

  potFunding.registerContribution(
    playerId,
    amount
  );

  return potFunding.toJSON();
}

// ======================================================
// FUNDING MANAGER
// ======================================================

getFundingManager() {
  return this.fundingManager;
}

calculateFunding(round) {
  return this
    .getFundingManager()
    .calculateFunding(round);
}

startFunding(
  requiredAmount,
  priorityPlayerId = null
){

  return this
    .getFundingManager()
    .startFunding(
      requiredAmount,
      priorityPlayerId
    );
}

registerFundingContribution(
  playerId,
  amount
) {
  return this

    .getFundingManager()
    .registerContribution(
      playerId,
      amount
    );
}

getFundingState() {
  return this
    .getFundingManager()
    .getFundingState();
}

getContributionByPlayer(playerId) {
  return this
    .getFundingManager()
    .getContributionByPlayer(playerId);
}

  getContributorCount() {
  return this
    .getFundingManager()
    .getContributorCount();
}

getLastContributor() {
  return this
    .getFundingManager()
    .getLastContributor();
}

getRemainingFundingAmount() {
  return this
    .getFundingManager()
    .getRemainingAmount();
}

calculateRemainingFunding() {
  return this
    .getFundingManager()
    .calculateRemainingFunding();
}

isFundingCompleted() {
  return this
    .getFundingManager()
    .isFundingCompleted();
}

resetFunding() {
  return this
    .getFundingManager()
    .resetFunding();
}

getInstantBetPoolManager() {
  return this
    .instantBetPoolManager;
}

openInstantBetPool() {
  return this
    .getInstantBetPoolManager()
    .openPool();
}

registerInstantBet(
  playerId,
  selection,
  amount
) {
  return this
    .getInstantBetPoolManager()
    .registerBet(
      playerId,
      selection,
      amount
    );
}

closeInstantBetPool() {
  return this
    .getInstantBetPoolManager()
    .closePool();
}

getInstantBetById(id) {
  return this
    .getInstantBetPoolManager()
    .getBetById(id);
}

calculateInstantPayouts() {
  return this
    .getInstantBetPoolManager()
    .calculatePayouts();
}

resetInstantBetPool() {
  return this
    .getInstantBetPoolManager()
    .resetPool();
}

settleInstantBetPool() {
  return this
    .getInstantBetPoolManager()
    .settlePool();
}

getInstantRemainingPoolAmount() {
  return this
    .getInstantBetPoolManager()
    .getRemainingPoolAmount();
}

getInstantTotalPayout() {
  return this
    .getInstantBetPoolManager()
    .getTotalPayout();
}

getInstantTotalWinningAmount() {
  return this
    .getInstantBetPoolManager()
    .getTotalWinningAmount();
}

getInstantMatchedAmount() {
  return this
    .getInstantBetPoolManager()
    .getMatchedAmount();
}

setInstantBetResult(result) {
  return this
    .getInstantBetPoolManager()
    .setResult(result);
}

getInstantWinningBets() {
  return this
    .getInstantBetPoolManager()
    .getWinningBets();
}

getInstantBetPoolState() {
  return this
    .getInstantBetPoolManager()
    .getPoolState();
}

getInstantBetPoolTotal() {
  return this
    .getInstantBetPoolManager()
    .getTotalAmount();
}

}

export default PaseEngine;