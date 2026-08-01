import ActionEvents from "../action/ActionEvents";
import ActionManager from "../action/ActionManager";
import ActionSandbox from "../action/ActionSandbox";
import BetEvents from "../bet/BetEvents";
import BetManager from "../bet/BetManager";
import BetSandbox from "../bet/BetSandbox";
import Command from "../command/Command";
import CommandSandbox from "../command/CommandSandbox";
import EventBus from "../eventbus/EventBus";
import EventBusSandbox from "../eventbus/EventBusSandbox";
import GameManager from "../game/GameManager";
import LobbyManager from "../lobby/LobbyManager";
import Logger from "../logger/Logger";
import LoggerSandbox from "../logger/LoggerSandbox";
import PlayerManager from "../player/PlayerManager";
import RoundEvents from "../round/RoundEvents";
import RoundManager from "../round/RoundManager";
import RoundSandbox from "../round/RoundSandbox";
import SessionEvents from "../session/SessionEvents";
import SessionManager from "../session/SessionManager";
import SessionSandbox from "../session/SessionSandbox";
import Statistics from "../statistics/Statistics";
import StatisticsSandbox from "../statistics/StatisticsSandbox";
import StateMachine from "../statemachine/StateMachine";
import StateMachineSandbox from "../statemachine/StateMachineSandbox";
import TableManager from "../table/TableManager";
import Timer from "../timer/Timer";
import TimerSandbox from "../timer/TimerSandbox";
import TransactionManager from "../transaction/TransactionManager";
import TransactionSandbox from "../transaction/TransactionSandbox";
import TurnEvents from "../turn/TurnEvents";
import TurnManager from "../turn/TurnManager";
import TurnSandbox from "../turn/TurnSandbox";
import WalletManager from "../Wallet/WalletManager";

class BaseGameEngine {
  constructor({
    eventManager = null,
    } = {}) {
    this.eventManager = eventManager;
    this.eventBus =
      new EventBus();
    this.logger =
      new Logger();
    this.statistics =
      new Statistics();
    this.stateMachine =
      new StateMachine();
    this.commands =
      new Map();
    this.actionManager =
      new ActionManager();
    this.betManager =
      new BetManager();
    this.gameManager =
      new GameManager();
    this.lobbyManager =
      new LobbyManager();
    this.sessionManager =
      new SessionManager();
    this.tableManager =
      new TableManager();
    this.timer =
      new Timer();
    this.transactionManager =
      new TransactionManager();
    this.playerManager =
      new PlayerManager();
    this.roundManager =
      new RoundManager();
    this.turnManager =
      new TurnManager();
    this.walletManager =
      new WalletManager();

    this.initialized = false;
    this.running = false;
    this.finished = false;

    this.currentRound = null;
  }

  initialize() {
    this.initialized = true;
  }

  startGame() {
    if (!this.initialized) {
      throw new Error(
        "El motor debe inicializarse antes de comenzar."
      );
    }

    this.running = true;
    this.finished = false;
  }

  playRound() {
    throw new Error(
      "playRound() debe implementarse en el juego."
    );
  }

  finishGame() {
    this.running = false;
    this.finished = true;
  }

  reset() {
    this.initialized = false;
    this.running = false;
    this.finished = false;
    this.currentRound = null;
  }

  getCurrentRound() {
    return this.currentRound;
  }

  setCurrentRound(round) {
    this.currentRound = round;
  }

  getEventBus() {
    return this.eventBus;
  }

  subscribe(eventType, callback) {
    return this
      .getEventBus()
      .subscribe(
        eventType,
        callback
      );
  }

  unsubscribe(eventType, callback) {
    return this
      .getEventBus()
      .unsubscribe(
        eventType,
        callback
      );
  }

  publish(event) {
    return this
      .getEventBus()
      .publish(event);
  }

  publishCoreEvent(event) {
    if (!this.eventBus) {
      throw new Error(
        "EventBus no esta disponible."
      );
    }

    return this
      .getEventBus()
      .publish(event);
  }

  clearEventBus() {
    return this
      .getEventBus()
      .clear();
  }

  getListeners(eventType) {
    return this
      .getEventBus()
      .getListeners(eventType);
  }

  hasListeners(eventType) {
    return this
      .getEventBus()
      .hasListeners(eventType);
  }

  getEventTypes() {
    return this
      .getEventBus()
      .getEventTypes();
  }

  countListeners(eventType) {
    return this
      .getEventBus()
      .countListeners(eventType);
  }

  countAllListeners() {
    return this
      .getEventBus()
      .countAllListeners();
  }

  getLogger() {
    return this.logger;
  }

  log(
    level,
    message,
    context = {}
  ) {
    return this
      .getLogger()
      .log(
        level,
        message,
        context
      );
  }

  info(
    message,
    context = {}
  ) {
    return this
      .getLogger()
      .info(
        message,
        context
      );
  }

  warn(
    message,
    context = {}
  ) {
    return this
      .getLogger()
      .warn(
        message,
        context
      );
  }

  error(
    message,
    context = {}
  ) {
    return this
      .getLogger()
      .error(
        message,
        context
      );
  }

  debug(
    message,
    context = {}
  ) {
    return this
      .getLogger()
      .debug(
        message,
        context
      );
  }

  clearLogs() {
    return this
      .getLogger()
      .clear();
  }

  logCoreEvent(
    level,
    message,
    context = {}
  ) {
    if (!this.logger) {
      throw new Error(
        "Logger no esta disponible."
      );
    }

    return this
      .getLogger()
      .log(
        level,
        message,
        context
      );
  }

  getLogs() {
    return this
      .getLogger()
      .getLogs();
  }

  getLogsByLevel(level) {
    return this
      .getLogger()
      .getLogsByLevel(level);
  }

  getLastLog() {
    return this
      .getLogger()
      .getLastLog();
  }

  countLogs() {
    return this
      .getLogger()
      .count();
  }

  getStatistics() {
    return this.statistics;
  }

  incrementStatistic(
    key,
    amount = 1
  ) {
    return this
      .getStatistics()
      .increment(
        key,
        amount
      );
  }

  decrementStatistic(
    key,
    amount = 1
  ) {
    return this
      .getStatistics()
      .decrement(
        key,
        amount
      );
  }

  setStatistic(
    key,
    value
  ) {
    return this
      .getStatistics()
      .set(
        key,
        value
      );
  }

  getStatistic(key) {
    return this
      .getStatistics()
      .get(key);
  }

  hasStatistic(key) {
    return this
      .getStatistics()
      .has(key);
  }

  removeStatistic(key) {
    return this
      .getStatistics()
      .remove(key);
  }

  resetStatistic(key) {
    return this
      .getStatistics()
      .reset(key);
  }

  clearStatistics() {
    return this
      .getStatistics()
      .clear();
  }

  updateCoreStatistic(
    key,
    amount = 1
  ) {
    if (!this.statistics) {
      throw new Error(
        "Statistics no esta disponible."
      );
    }

    return this
      .getStatistics()
      .increment(
        key,
        amount
      );
  }

  getAllStatistics() {
    return this
      .getStatistics()
      .getAll();
  }

  getStatisticKeys() {
    return this
      .getStatistics()
      .getKeys();
  }

  countStatistics() {
    return this
      .getStatistics()
      .count();
  }

  getStatisticsJSON() {
    return this
      .getStatistics()
      .toJSON();
  }

  getStateMachine() {
    return this.stateMachine;
  }

  addState(state) {
    return this
      .getStateMachine()
      .addState(state);
  }

  removeState(state) {
    return this
      .getStateMachine()
      .removeState(state);
  }

  hasState(state) {
    return this
      .getStateMachine()
      .hasState(state);
  }

  setInitialState(state) {
    return this
      .getStateMachine()
      .setInitialState(state);
  }

  getCurrentState() {
    return this
      .getStateMachine()
      .getCurrentState();
  }

  addTransition(
    fromState,
    toState
  ) {
    return this
      .getStateMachine()
      .addTransition(
        fromState,
        toState
      );
  }

  removeTransition(
    fromState,
    toState
  ) {
    return this
      .getStateMachine()
      .removeTransition(
        fromState,
        toState
      );
  }

  transition(toState) {
    return this
      .getStateMachine()
      .transition(toState);
  }

  canTransition(toState) {
    return this
      .getStateMachine()
      .canTransition(toState);
  }

  getStates() {
    return this
      .getStateMachine()
      .getStates();
  }

  getTransitions() {
    return this
      .getStateMachine()
      .getTransitions();
  }

  getTransitionsFrom(state) {
    return this
      .getStateMachine()
      .getTransitionsFrom(state);
  }

  clearStateMachine() {
    return this
      .getStateMachine()
      .clear();
  }

  getStateMachineJSON() {
    return this
      .getStateMachine()
      .toJSON();
  }

  executeStateTransition(toState) {
    if (!this.stateMachine) {
      throw new Error(
        "StateMachine no esta disponible."
      );
    }

    return this
      .getStateMachine()
      .transition(toState);
  }

  createCommand(
    id,
    name,
    executeCallback,
    undoCallback = null,
    metadata = {}
  ) {
    if (this.hasCommand(id)) {
      throw new Error(
        "Ya existe un Command con ese id."
      );
    }

    const command =
      new Command(
        id,
        name,
        executeCallback,
        undoCallback,
        metadata
      );

    this.commands.set(
      id,
      command
    );

    return command;
  }

  getCommand(id) {
    const command =
      this.commands.get(id);

    if (!command) {
      throw new Error(
        "No existe un Command con ese id."
      );
    }

    return command;
  }

  hasCommand(id) {
    return this.commands.has(id);
  }

  removeCommand(id) {
    if (!this.hasCommand(id)) {
      throw new Error(
        "No existe un Command para eliminar."
      );
    }

    return this.commands.delete(id);
  }

  executeCommand(id) {
    return this
      .getCommand(id)
      .execute();
  }

  undoCommand(id) {
    return this
      .getCommand(id)
      .undo();
  }

  getCommands() {
    return Array.from(
      this.commands.values()
    );
  }

  getCommandsByStatus(status) {
    return this
      .getCommands()
      .filter(command =>
        command.getStatus() === status
      );
  }

  countCommands() {
    return this.commands.size;
  }

  clearCommands() {
    this.commands.clear();
  }

  getCommandsJSON() {
    return this
      .getCommands()
      .map(command =>
        command.toJSON()
      );
  }

  executeCoreCommand(commandId) {
    this.getCommand(commandId);

    return this.executeCommand(commandId);
  }

  undoCoreCommand(commandId) {
    this.getCommand(commandId);

    return this.undoCommand(commandId);
  }

  getTimer() {
    return this.timer;
  }

  createTimer(
    id,
    duration,
    callback = null
  ) {
    return this
      .getTimer()
      .createTimer(
        id,
        duration,
        callback
      );
  }

  startTimer(id) {
    return this
      .getTimer()
      .startTimer(id);
  }

  pauseTimer(id) {
    return this
      .getTimer()
      .pauseTimer(id);
  }

  resumeTimer(id) {
    return this
      .getTimer()
      .resumeTimer(id);
  }

  completeTimer(id) {
    return this
      .getTimer()
      .completeTimer(id);
  }

  cancelTimer(id) {
    return this
      .getTimer()
      .cancelTimer(id);
  }

  removeTimer(id) {
    return this
      .getTimer()
      .removeTimer(id);
  }

  getTimerById(id) {
    return this
      .getTimer()
      .getTimer(id);
  }

  hasTimer(id) {
    return this
      .getTimer()
      .hasTimer(id);
  }

  getTimers() {
    return this
      .getTimer()
      .getTimers();
  }

  getTimersByStatus(status) {
    return this
      .getTimer()
      .getTimersByStatus(status);
  }

  countTimers() {
    return this
      .getTimer()
      .count();
  }

  getTimersJSON() {
    return this
      .getTimer()
      .toJSON();
  }

  executeCoreTimer(
    action,
    timerId,
    ...args
  ) {
    if (!this.timer) {
      throw new Error(
        "Timer no esta disponible."
      );
    }

    const actions = {
      create: () =>
        this
          .getTimer()
          .createTimer(
            timerId,
            ...args
          ),
      start: () =>
        this
          .getTimer()
          .startTimer(timerId),
      pause: () =>
        this
          .getTimer()
          .pauseTimer(timerId),
      resume: () =>
        this
          .getTimer()
          .resumeTimer(timerId),
      complete: () =>
        this
          .getTimer()
          .completeTimer(timerId),
      cancel: () =>
        this
          .getTimer()
          .cancelTimer(timerId),
      remove: () =>
        this
          .getTimer()
          .removeTimer(timerId),
    };

    if (!actions[action]) {
      throw new Error(
        "La accion del Timer no es valida."
      );
    }

    return actions[action]();
  }

  getGameManager() {
    return this.gameManager;
  }

  createGame(
    id,
    type,
    metadata = {}
  ) {
    return this
      .getGameManager()
      .createGame(
        id,
        type,
        metadata
      );
  }

  getGame(id) {
    return this
      .getGameManager()
      .getGame(id);
  }

  hasGame(id) {
    return this
      .getGameManager()
      .hasGame(id);
  }

  removeGame(id) {
    return this
      .getGameManager()
      .removeGame(id);
  }

  getGames() {
    return this
      .getGameManager()
      .getGames();
  }

  getLobbyManager() {
    return this.lobbyManager;
  }

  createLobby(
    id,
    name,
    gameType,
    minPlayers = 2,
    maxPlayers = 10,
    metadata = {}
  ) {
    return this
      .getLobbyManager()
      .createLobby(
        id,
        name,
        gameType,
        minPlayers,
        maxPlayers,
        metadata
      );
  }

  getLobby(id) {
    return this
      .getLobbyManager()
      .getLobby(id);
  }

  hasLobby(id) {
    return this
      .getLobbyManager()
      .hasLobby(id);
  }

  removeLobby(id) {
    return this
      .getLobbyManager()
      .removeLobby(id);
  }

  getLobbies() {
    return this
      .getLobbyManager()
      .getLobbies();
  }

  getSessionManager() {
    return this.sessionManager;
  }

  createSession(
    id,
    gameId,
    tableId = null,
    lobbyId = null,
    metadata = {}
  ) {
    return this
      .getSessionManager()
      .createSession(
        id,
        gameId,
        tableId,
        lobbyId,
        metadata
      );
  }

  getSession(id) {
    return this
      .getSessionManager()
      .getSession(id);
  }

  hasSession(id) {
    return this
      .getSessionManager()
      .hasSession(id);
  }

  removeSession(id) {
    return this
      .getSessionManager()
      .removeSession(id);
  }

  getSessions() {
    return this
      .getSessionManager()
      .getSessions();
  }

  getRunningSessions() {
    return this
      .getSessionManager()
      .getRunningSessions();
  }

  getPausedSessions() {
    return this
      .getSessionManager()
      .getPausedSessions();
  }

  getFinishedSessions() {
    return this
      .getSessionManager()
      .getFinishedSessions();
  }

  getCancelledSessions() {
    return this
      .getSessionManager()
      .getCancelledSessions();
  }

  clearSessions() {
    return this
      .getSessionManager()
      .clear();
  }

  toJSONSessions() {
    return this
      .getSessionManager()
      .toJSON();
  }

  startSession(sessionId) {
    return this
      .getSessionManager()
      .startSession(sessionId);
  }

  pauseSession(sessionId) {
    return this
      .getSessionManager()
      .pauseSession(sessionId);
  }

  resumeSession(sessionId) {
    return this
      .getSessionManager()
      .resumeSession(sessionId);
  }

  finishSession(sessionId) {
    return this
      .getSessionManager()
      .finishSession(sessionId);
  }

  cancelSession(sessionId) {
    return this
      .getSessionManager()
      .cancelSession(sessionId);
  }

  createSessionCreatedEvent(session) {
    return SessionEvents
      .createSessionCreatedEvent(session);
  }

  createSessionRemovedEvent(sessionId) {
    return SessionEvents
      .createSessionRemovedEvent(sessionId);
  }

  createSessionStartedEvent(sessionId) {
    return SessionEvents
      .createSessionStartedEvent(sessionId);
  }

  createSessionPausedEvent(sessionId) {
    return SessionEvents
      .createSessionPausedEvent(sessionId);
  }

  createSessionResumedEvent(sessionId) {
    return SessionEvents
      .createSessionResumedEvent(sessionId);
  }

  createSessionFinishedEvent(sessionId) {
    return SessionEvents
      .createSessionFinishedEvent(sessionId);
  }

  createSessionCancelledEvent(sessionId) {
    return SessionEvents
      .createSessionCancelledEvent(sessionId);
  }

  runSessionSandbox() {
    return new SessionSandbox();
  }

  runRoundSandbox() {
    return new RoundSandbox();
  }

  runTurnSandbox() {
    return new TurnSandbox();
  }

  runActionSandbox() {
    return new ActionSandbox();
  }

  runBetSandbox() {
    return new BetSandbox();
  }

  runTransactionSandbox() {
    return new TransactionSandbox();
  }

  runEventBusSandbox() {
    return new EventBusSandbox();
  }

  runLoggerSandbox() {
    return new LoggerSandbox();
  }

  runCommandSandbox() {
    return new CommandSandbox();
  }

  runStatisticsSandbox() {
    return new StatisticsSandbox();
  }

  runStateMachineSandbox() {
    return new StateMachineSandbox();
  }

  runTimerSandbox() {
    return new TimerSandbox();
  }

  getRoundManager() {
    return this.roundManager;
  }

  createRound(
    id,
    sessionId,
    gameId,
    number,
    metadata = {}
  ) {
    return this
      .getRoundManager()
      .createRound(
        id,
        sessionId,
        gameId,
        number,
        metadata
      );
  }

  getRound(id) {
    return this
      .getRoundManager()
      .getRound(id);
  }

  hasRound(id) {
    return this
      .getRoundManager()
      .hasRound(id);
  }

  removeRound(id) {
    return this
      .getRoundManager()
      .removeRound(id);
  }

  getRounds() {
    return this
      .getRoundManager()
      .getRounds();
  }

  getRoundsBySession(sessionId) {
    return this
      .getRoundManager()
      .getRoundsBySession(sessionId);
  }

  getRoundsByGame(gameId) {
    return this
      .getRoundManager()
      .getRoundsByGame(gameId);
  }

  getRoundsByStatus(status) {
    return this
      .getRoundManager()
      .getRoundsByStatus(status);
  }

  getRunningRounds() {
    return this
      .getRoundManager()
      .getRunningRounds();
  }

  getPausedRounds() {
    return this
      .getRoundManager()
      .getPausedRounds();
  }

  getFinishedRounds() {
    return this
      .getRoundManager()
      .getFinishedRounds();
  }

  getCancelledRounds() {
    return this
      .getRoundManager()
      .getCancelledRounds();
  }

  clearRounds() {
    return this
      .getRoundManager()
      .clear();
  }

  toJSONRounds() {
    return this
      .getRoundManager()
      .toJSON();
  }

  startRound(roundId) {
    return this
      .getRoundManager()
      .startRound(roundId);
  }

  pauseRound(roundId) {
    return this
      .getRoundManager()
      .pauseRound(roundId);
  }

  resumeRound(roundId) {
    return this
      .getRoundManager()
      .resumeRound(roundId);
  }

  finishRound(roundId) {
    return this
      .getRoundManager()
      .finishRound(roundId);
  }

  cancelRound(roundId) {
    return this
      .getRoundManager()
      .cancelRound(roundId);
  }

  createRoundCreatedEvent(round) {
    return RoundEvents
      .createRoundCreatedEvent(round);
  }

  createRoundRemovedEvent(roundId) {
    return RoundEvents
      .createRoundRemovedEvent(roundId);
  }

  createRoundStartedEvent(roundId) {
    return RoundEvents
      .createRoundStartedEvent(roundId);
  }

  createRoundPausedEvent(roundId) {
    return RoundEvents
      .createRoundPausedEvent(roundId);
  }

  createRoundResumedEvent(roundId) {
    return RoundEvents
      .createRoundResumedEvent(roundId);
  }

  createRoundFinishedEvent(roundId) {
    return RoundEvents
      .createRoundFinishedEvent(roundId);
  }

  createRoundCancelledEvent(roundId) {
    return RoundEvents
      .createRoundCancelledEvent(roundId);
  }

  getTurnManager() {
    return this.turnManager;
  }

  createTurn(
    id,
    roundId,
    sessionId,
    gameId,
    playerId,
    order,
    metadata = {}
  ) {
    return this
      .getTurnManager()
      .createTurn(
        id,
        roundId,
        sessionId,
        gameId,
        playerId,
        order,
        metadata
      );
  }

  getTurn(id) {
    return this
      .getTurnManager()
      .getTurn(id);
  }

  hasTurn(id) {
    return this
      .getTurnManager()
      .hasTurn(id);
  }

  removeTurn(id) {
    return this
      .getTurnManager()
      .removeTurn(id);
  }

  getTurns() {
    return this
      .getTurnManager()
      .getTurns();
  }

  getTurnsByRound(roundId) {
    return this
      .getTurnManager()
      .getTurnsByRound(roundId);
  }

  getTurnsBySession(sessionId) {
    return this
      .getTurnManager()
      .getTurnsBySession(sessionId);
  }

  getTurnsByGame(gameId) {
    return this
      .getTurnManager()
      .getTurnsByGame(gameId);
  }

  getTurnsByPlayer(playerId) {
    return this
      .getTurnManager()
      .getTurnsByPlayer(playerId);
  }

  getTurnsByStatus(status) {
    return this
      .getTurnManager()
      .getTurnsByStatus(status);
  }

  getRunningTurns() {
    return this
      .getTurnManager()
      .getRunningTurns();
  }

  getPausedTurns() {
    return this
      .getTurnManager()
      .getPausedTurns();
  }

  getFinishedTurns() {
    return this
      .getTurnManager()
      .getFinishedTurns();
  }

  getCancelledTurns() {
    return this
      .getTurnManager()
      .getCancelledTurns();
  }

  clearTurns() {
    return this
      .getTurnManager()
      .clear();
  }

  toJSONTurns() {
    return this
      .getTurnManager()
      .toJSON();
  }

  startTurn(turnId) {
    return this
      .getTurnManager()
      .startTurn(turnId);
  }

  pauseTurn(turnId) {
    return this
      .getTurnManager()
      .pauseTurn(turnId);
  }

  resumeTurn(turnId) {
    return this
      .getTurnManager()
      .resumeTurn(turnId);
  }

  finishTurn(turnId) {
    return this
      .getTurnManager()
      .finishTurn(turnId);
  }

  cancelTurn(turnId) {
    return this
      .getTurnManager()
      .cancelTurn(turnId);
  }

  createTurnCreatedEvent(turn) {
    return TurnEvents
      .createTurnCreatedEvent(turn);
  }

  createTurnRemovedEvent(turnId) {
    return TurnEvents
      .createTurnRemovedEvent(turnId);
  }

  createTurnStartedEvent(turnId) {
    return TurnEvents
      .createTurnStartedEvent(turnId);
  }

  createTurnPausedEvent(turnId) {
    return TurnEvents
      .createTurnPausedEvent(turnId);
  }

  createTurnResumedEvent(turnId) {
    return TurnEvents
      .createTurnResumedEvent(turnId);
  }

  createTurnFinishedEvent(turnId) {
    return TurnEvents
      .createTurnFinishedEvent(turnId);
  }

  createTurnCancelledEvent(turnId) {
    return TurnEvents
      .createTurnCancelledEvent(turnId);
  }

  getActionManager() {
    return this.actionManager;
  }

  createAction(
    id,
    turnId,
    roundId,
    sessionId,
    gameId,
    playerId,
    type,
    metadata = {}
  ) {
    return this
      .getActionManager()
      .createAction(
        id,
        turnId,
        roundId,
        sessionId,
        gameId,
        playerId,
        type,
        metadata
      );
  }

  getAction(id) {
    return this
      .getActionManager()
      .getAction(id);
  }

  hasAction(id) {
    return this
      .getActionManager()
      .hasAction(id);
  }

  removeAction(id) {
    return this
      .getActionManager()
      .removeAction(id);
  }

  getActions() {
    return this
      .getActionManager()
      .getActions();
  }

  getActionsByTurn(turnId) {
    return this
      .getActionManager()
      .getActionsByTurn(turnId);
  }

  getActionsByRound(roundId) {
    return this
      .getActionManager()
      .getActionsByRound(roundId);
  }

  getActionsBySession(sessionId) {
    return this
      .getActionManager()
      .getActionsBySession(sessionId);
  }

  getActionsByGame(gameId) {
    return this
      .getActionManager()
      .getActionsByGame(gameId);
  }

  getActionsByPlayer(playerId) {
    return this
      .getActionManager()
      .getActionsByPlayer(playerId);
  }

  getActionsByType(type) {
    return this
      .getActionManager()
      .getActionsByType(type);
  }

  getActionsByStatus(status) {
    return this
      .getActionManager()
      .getActionsByStatus(status);
  }

  getRunningActions() {
    return this
      .getActionManager()
      .getRunningActions();
  }

  getPausedActions() {
    return this
      .getActionManager()
      .getPausedActions();
  }

  getFinishedActions() {
    return this
      .getActionManager()
      .getFinishedActions();
  }

  getCancelledActions() {
    return this
      .getActionManager()
      .getCancelledActions();
  }

  clearActions() {
    return this
      .getActionManager()
      .clear();
  }

  toJSONActions() {
    return this
      .getActionManager()
      .toJSON();
  }

  startAction(actionId) {
    return this
      .getActionManager()
      .startAction(actionId);
  }

  pauseAction(actionId) {
    return this
      .getActionManager()
      .pauseAction(actionId);
  }

  resumeAction(actionId) {
    return this
      .getActionManager()
      .resumeAction(actionId);
  }

  finishAction(actionId) {
    return this
      .getActionManager()
      .finishAction(actionId);
  }

  cancelAction(actionId) {
    return this
      .getActionManager()
      .cancelAction(actionId);
  }

  createActionCreatedEvent(action) {
    return ActionEvents
      .createActionCreatedEvent(action);
  }

  createActionRemovedEvent(actionId) {
    return ActionEvents
      .createActionRemovedEvent(actionId);
  }

  createActionStartedEvent(actionId) {
    return ActionEvents
      .createActionStartedEvent(actionId);
  }

  createActionPausedEvent(actionId) {
    return ActionEvents
      .createActionPausedEvent(actionId);
  }

  createActionResumedEvent(actionId) {
    return ActionEvents
      .createActionResumedEvent(actionId);
  }

  createActionFinishedEvent(actionId) {
    return ActionEvents
      .createActionFinishedEvent(actionId);
  }

  createActionCancelledEvent(actionId) {
    return ActionEvents
      .createActionCancelledEvent(actionId);
  }

  getBetManager() {
    return this.betManager;
  }

  createBet(
    id,
    actionId,
    turnId,
    roundId,
    sessionId,
    gameId,
    playerId,
    betType,
    amount,
    metadata = {}
  ) {
    return this
      .getBetManager()
      .createBet(
        id,
        actionId,
        turnId,
        roundId,
        sessionId,
        gameId,
        playerId,
        betType,
        amount,
        metadata
      );
  }

  getBet(id) {
    return this
      .getBetManager()
      .getBet(id);
  }

  hasBet(id) {
    return this
      .getBetManager()
      .hasBet(id);
  }

  removeBet(id) {
    return this
      .getBetManager()
      .removeBet(id);
  }

  getBets() {
    return this
      .getBetManager()
      .getBets();
  }

  getBetsByAction(actionId) {
    return this
      .getBetManager()
      .getBetsByAction(actionId);
  }

  getBetsByTurn(turnId) {
    return this
      .getBetManager()
      .getBetsByTurn(turnId);
  }

  getBetsByRound(roundId) {
    return this
      .getBetManager()
      .getBetsByRound(roundId);
  }

  getBetsBySession(sessionId) {
    return this
      .getBetManager()
      .getBetsBySession(sessionId);
  }

  getBetsByGame(gameId) {
    return this
      .getBetManager()
      .getBetsByGame(gameId);
  }

  getBetsByPlayer(playerId) {
    return this
      .getBetManager()
      .getBetsByPlayer(playerId);
  }

  getBetsByType(betType) {
    return this
      .getBetManager()
      .getBetsByType(betType);
  }

  getBetsByStatus(status) {
    return this
      .getBetManager()
      .getBetsByStatus(status);
  }

  getAcceptedBets() {
    return this
      .getBetManager()
      .getAcceptedBets();
  }

  getRejectedBets() {
    return this
      .getBetManager()
      .getRejectedBets();
  }

  getCancelledBets() {
    return this
      .getBetManager()
      .getCancelledBets();
  }

  getWonBets() {
    return this
      .getBetManager()
      .getWonBets();
  }

  getLostBets() {
    return this
      .getBetManager()
      .getLostBets();
  }

  getPushBets() {
    return this
      .getBetManager()
      .getPushBets();
  }

  getRefundedBets() {
    return this
      .getBetManager()
      .getRefundedBets();
  }

  clearBets() {
    return this
      .getBetManager()
      .clear();
  }

  toJSONBets() {
    return this
      .getBetManager()
      .toJSON();
  }

  acceptBet(betId) {
    return this
      .getBetManager()
      .acceptBet(betId);
  }

  rejectBet(betId) {
    return this
      .getBetManager()
      .rejectBet(betId);
  }

  cancelBet(betId) {
    return this
      .getBetManager()
      .cancelBet(betId);
  }

  winBet(betId) {
    return this
      .getBetManager()
      .winBet(betId);
  }

  loseBet(betId) {
    return this
      .getBetManager()
      .loseBet(betId);
  }

  pushBet(betId) {
    return this
      .getBetManager()
      .pushBet(betId);
  }

  refundBet(betId) {
    return this
      .getBetManager()
      .refundBet(betId);
  }

  createBetCreatedEvent(bet) {
    return BetEvents
      .createBetCreatedEvent(bet);
  }

  createBetRemovedEvent(betId) {
    return BetEvents
      .createBetRemovedEvent(betId);
  }

  createBetAcceptedEvent(betId) {
    return BetEvents
      .createBetAcceptedEvent(betId);
  }

  createBetRejectedEvent(betId) {
    return BetEvents
      .createBetRejectedEvent(betId);
  }

  createBetCancelledEvent(betId) {
    return BetEvents
      .createBetCancelledEvent(betId);
  }

  createBetWonEvent(betId) {
    return BetEvents
      .createBetWonEvent(betId);
  }

  createBetLostEvent(betId) {
    return BetEvents
      .createBetLostEvent(betId);
  }

  createBetPushEvent(betId) {
    return BetEvents
      .createBetPushEvent(betId);
  }

  createBetRefundedEvent(betId) {
    return BetEvents
      .createBetRefundedEvent(betId);
  }

  getTransactionManager() {
    return this.transactionManager;
  }

  createTransaction(
    id,
    walletId,
    playerId,
    gameId,
    sessionId,
    roundId,
    turnId,
    actionId,
    betId,
    type,
    amount,
    balanceBefore,
    balanceAfter,
    metadata = {}
  ) {
    return this
      .getTransactionManager()
      .createTransaction(
        id,
        walletId,
        playerId,
        gameId,
        sessionId,
        roundId,
        turnId,
        actionId,
        betId,
        type,
        amount,
        balanceBefore,
        balanceAfter,
        metadata
      );
  }

  getTransaction(id) {
    return this
      .getTransactionManager()
      .getTransaction(id);
  }

  hasTransaction(id) {
    return this
      .getTransactionManager()
      .hasTransaction(id);
  }

  removeTransaction(id) {
    return this
      .getTransactionManager()
      .removeTransaction(id);
  }

  getTransactions() {
    return this
      .getTransactionManager()
      .getTransactions();
  }

  getTransactionsByWallet(walletId) {
    return this
      .getTransactionManager()
      .getTransactionsByWallet(walletId);
  }

  getTransactionsByPlayer(playerId) {
    return this
      .getTransactionManager()
      .getTransactionsByPlayer(playerId);
  }

  getTransactionsByGame(gameId) {
    return this
      .getTransactionManager()
      .getTransactionsByGame(gameId);
  }

  getTransactionsBySession(sessionId) {
    return this
      .getTransactionManager()
      .getTransactionsBySession(sessionId);
  }

  getTransactionsByRound(roundId) {
    return this
      .getTransactionManager()
      .getTransactionsByRound(roundId);
  }

  getTransactionsByTurn(turnId) {
    return this
      .getTransactionManager()
      .getTransactionsByTurn(turnId);
  }

  getTransactionsByAction(actionId) {
    return this
      .getTransactionManager()
      .getTransactionsByAction(actionId);
  }

  getTransactionsByBet(betId) {
    return this
      .getTransactionManager()
      .getTransactionsByBet(betId);
  }

  getTransactionsByType(type) {
    return this
      .getTransactionManager()
      .getTransactionsByType(type);
  }

  getTransactionsByStatus(status) {
    return this
      .getTransactionManager()
      .getTransactionsByStatus(status);
  }

  getPendingTransactions() {
    return this
      .getTransactionManager()
      .getPendingTransactions();
  }

  getCompletedTransactions() {
    return this
      .getTransactionManager()
      .getCompletedTransactions();
  }

  getFailedTransactions() {
    return this
      .getTransactionManager()
      .getFailedTransactions();
  }

  getCancelledTransactions() {
    return this
      .getTransactionManager()
      .getCancelledTransactions();
  }

  completeTransaction(transactionId) {
    return this
      .getTransactionManager()
      .completeTransaction(transactionId);
  }

  failTransaction(transactionId) {
    return this
      .getTransactionManager()
      .failTransaction(transactionId);
  }

  cancelTransaction(transactionId) {
    return this
      .getTransactionManager()
      .cancelTransaction(transactionId);
  }

  addPlayerToLobby(lobbyId, playerId) {
    this.getLobby(lobbyId);
    this.getPlayer(playerId);

    return this
      .getLobbyManager()
      .addPlayer(
        lobbyId,
        playerId
      );
  }

  removePlayerFromLobby(lobbyId, playerId) {
    this.getLobby(lobbyId);
    this.getPlayer(playerId);

    return this
      .getLobbyManager()
      .removePlayer(
        lobbyId,
        playerId
      );
  }

  lobbyHasPlayer(lobbyId, playerId) {
    return this
      .getLobbyManager()
      .hasPlayer(
        lobbyId,
        playerId
      );
  }

  getLobbyPlayers(lobbyId) {
    const lobby =
      this.getLobby(lobbyId);

    return lobby
      .getPlayers()
      .map(playerId =>
        this.getPlayer(playerId)
      );
  }

  getTableManager() {
    return this.tableManager;
  }

  createTable(
    id,
    name,
    gameType,
    maxPlayers = 10,
    metadata = {}
  ) {
    return this
      .getTableManager()
      .createTable(
        id,
        name,
        gameType,
        maxPlayers,
        metadata
      );
  }

  getTable(id) {
    return this
      .getTableManager()
      .getTable(id);
  }

  hasTable(id) {
    return this
      .getTableManager()
      .hasTable(id);
  }

  removeTable(id) {
    return this
      .getTableManager()
      .removeTable(id);
  }

  getTables() {
    return this
      .getTableManager()
      .getTables();
  }

  addPlayerToTable(tableId, playerId) {
    this.getTable(tableId);
    this.getPlayer(playerId);

    return this
      .getTableManager()
      .addPlayer(
        tableId,
        playerId
      );
  }

  removePlayerFromTable(tableId, playerId) {
    this.getTable(tableId);
    this.getPlayer(playerId);

    return this
      .getTableManager()
      .removePlayer(
        tableId,
        playerId
      );
  }

  tableHasPlayer(tableId, playerId) {
    return this
      .getTableManager()
      .hasPlayer(
        tableId,
        playerId
      );
  }

  getTablePlayers(tableId) {
    const table =
      this.getTable(tableId);

    return table
      .getPlayers()
      .map(playerId =>
        this.getPlayer(playerId)
      );
  }

  assignLobbyToTable(lobbyId, tableId) {
    this.getLobby(lobbyId);

    const table =
      this.getTable(tableId);

    const currentLobby =
      this.getTableLobby(tableId);

    if (
      currentLobby &&
      currentLobby.getStatus() === "STARTED"
    ) {
      throw new Error(
        "No se puede reemplazar un Lobby activo en la Table."
      );
    }

    table.updateMetadata({
      lobbyId,
    });

    return table;
  }

  removeLobbyFromTable(tableId) {
    const table =
      this.getTable(tableId);

    const metadata =
      table.getMetadata();

    delete metadata.lobbyId;

    table.setMetadata(metadata);

    return table;
  }

  getTableLobby(tableId) {
    const table =
      this.getTable(tableId);

    const metadata =
      table.getMetadata();

    if (!metadata.lobbyId) {
      return null;
    }

    return this.getLobby(metadata.lobbyId);
  }

  tableHasLobby(tableId) {
    const table =
      this.getTable(tableId);

    const metadata =
      table.getMetadata();

    return Boolean(metadata.lobbyId);
  }

  assignGameToTable(tableId, gameId) {
    const table =
      this.getTable(tableId);

    this.getGame(gameId);

    const currentGame =
      this.getTableGame(tableId);

    if (
      currentGame &&
      currentGame.getStatus() === "RUNNING"
    ) {
      throw new Error(
        "No se puede reemplazar un Game activo en la Table."
      );
    }

    table.updateMetadata({
      gameId,
    });

    return table;
  }

  removeGameFromTable(tableId) {
    const table =
      this.getTable(tableId);

    const metadata =
      table.getMetadata();

    delete metadata.gameId;

    table.setMetadata(metadata);

    return table;
  }

  getTableGame(tableId) {
    const table =
      this.getTable(tableId);

    const metadata =
      table.getMetadata();

    if (!metadata.gameId) {
      return null;
    }

    return this.getGame(metadata.gameId);
  }

  tableHasGame(tableId) {
    const table =
      this.getTable(tableId);

    const metadata =
      table.getMetadata();

    return Boolean(metadata.gameId);
  }

  addPlayerToGame(gameId, playerId) {
    this.getGame(gameId);
    this.getPlayer(playerId);

    return this
      .getGameManager()
      .addPlayer(
        gameId,
        playerId
      );
  }

  removePlayerFromGame(gameId, playerId) {
    this.getGame(gameId);
    this.getPlayer(playerId);

    return this
      .getGameManager()
      .removePlayer(
        gameId,
        playerId
      );
  }

  gameHasPlayer(gameId, playerId) {
    return this
      .getGameManager()
      .hasPlayer(
        gameId,
        playerId
      );
  }

  getGamePlayers(gameId) {
    const game =
      this.getGame(gameId);

    return game
      .getPlayers()
      .map(playerId =>
        this.getPlayer(playerId)
      );
  }

  getGamePot(gameId) {
    const game =
      this.getGame(gameId);

    const metadata =
      game.getMetadata();

    return metadata.pot ?? 0;
  }

  addToGamePot(gameId, playerId, amount) {
    const game =
      this.getGame(gameId);

    this.getPlayer(playerId);
    this.playerHasFunds(
      playerId,
      amount
    );

    this.placeBet(
      playerId,
      amount
    );

    const pot =
      this.getGamePot(gameId) + amount;

    game.updateMetadata({
      pot,
    });

    return pot;
  }

  refundFromGamePot(gameId, playerId, amount) {
    const game =
      this.getGame(gameId);

    this.getPlayer(playerId);

    const pot =
      this.getGamePot(gameId) - amount;

    if (pot < 0) {
      throw new Error(
        "El pot del Game no tiene saldo suficiente para devolver ese monto."
      );
    }

    this.refundBet(
      playerId,
      amount
    );

    game.updateMetadata({
      pot,
    });

    return pot;
  }

  creditGamePrize(gameId, playerId, amount) {
    const game =
      this.getGame(gameId);

    this.getPlayer(playerId);

    const pot =
      this.getGamePot(gameId) - amount;

    if (pot < 0) {
      throw new Error(
        "El pot del Game no tiene saldo suficiente para acreditar ese premio."
      );
    }

    this.creditPrize(
      playerId,
      amount
    );

    game.updateMetadata({
      pot,
    });

    return pot;
  }

  getPlayerManager() {
    return this.playerManager;
  }

  createPlayer(
    id,
    name,
    metadata = {}
  ) {
    const playerManager =
      this.getPlayerManager();

    const walletManager =
      this.getWalletManager();

    if (walletManager.hasWallet(id)) {
      throw new Error(
        "No puede crearse un Player porque ya existe un Wallet para ese jugador."
      );
    }

    const player =
      playerManager
        .createPlayer(
          id,
          name,
          metadata
        );

    walletManager.createWallet(id);

    return player;
  }

  getPlayer(id) {
    return this
      .getPlayerManager()
      .getPlayer(id);
  }

  hasPlayer(id) {
    return this
      .getPlayerManager()
      .hasPlayer(id);
  }

  removePlayer(id) {
    this
      .getWalletManager()
      .removeWallet(id);

    return this
      .getPlayerManager()
      .removePlayer(id);
  }

  getAllPlayers() {
    return this
      .getPlayerManager()
      .getAllPlayers();
  }

  getPlayerWallet(playerId) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .getWallet(playerId);
  }

  getWalletManager() {
    return this.walletManager;
  }

  createPlayerWallet(playerId) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .createWallet(playerId);
  }

  depositToPlayer(playerId, amount) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .deposit(
        playerId,
        amount
      );
  }

  withdrawFromPlayer(playerId, amount) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .withdraw(
        playerId,
        amount
      );
  }

  getPlayerBalance(playerId) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .getBalance(playerId);
  }

  playerHasFunds(playerId, amount) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .hasFunds(
        playerId,
        amount
      );
  }

  placeBet(playerId, amount) {
    this.getPlayer(playerId);

    const walletManager =
      this.getWalletManager();

    walletManager.getWallet(playerId);
    walletManager.hasFunds(
      playerId,
      amount
    );

    return walletManager.withdraw(
      playerId,
      amount
    );
  }

  creditPrize(playerId, amount) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .deposit(
        playerId,
        amount
      );
  }

  refundBet(playerId, amount) {
    this.getPlayer(playerId);

    return this
      .getWalletManager()
      .deposit(
        playerId,
        amount
      );
  }

  isInitialized() {
    return this.initialized;
  }

  isRunning() {
    return this.running;
  }

  isFinished() {
    return this.finished;
  }
}

export default BaseGameEngine;
