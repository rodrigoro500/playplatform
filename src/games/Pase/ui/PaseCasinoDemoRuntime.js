import PaseDiceEngine from "../PaseDiceEngine";
import PaseResolver from "../PaseResolver";

const initialPlayers = [
  { id: "P1", name: "Carlos89", wallet: 600000 },
  { id: "P2", name: "LuisMG", wallet: 750000 },
  { id: "P3", name: "RRVisionHD", wallet: 1250000 },
  { id: "P4", name: "LaJefa", wallet: 850000 },
  { id: "P5", name: "Mely11", wallet: 430000 },
  { id: "P6", name: "Santi_07", wallet: 320000 },
];

function formatMoney(value) {
  return new Intl.NumberFormat("es-PY").format(value);
}

function normalizeWinner(winner) {
  if (winner === "MALA") {
    return "KULO";
  }

  return winner;
}

function createCoverageQueue(shooterId, sourcePlayers = initialPlayers) {
  if (sourcePlayers.length === 0) {
    return [];
  }

  const shooterIndex =
    sourcePlayers.findIndex((player) => player.id === shooterId);

  if (shooterIndex < 0) {
    return sourcePlayers.map((player) => player.id);
  }

  return sourcePlayers
    .map((_, offset) => sourcePlayers[(shooterIndex + offset + 1) % sourcePlayers.length])
    .filter((player) => player.id !== shooterId)
    .map((player) => player.id);
}

function findPlayer(players, playerId) {
  return players.find((player) => player.id === playerId) ?? null;
}

function createPlayers(activeShooterId = "P1", sourcePlayers = initialPlayers) {
  return sourcePlayers.map((player, index) => ({
    ...player,
    seat: index + 1,
    connected: true,
    isShooter: player.id === activeShooterId,
    formattedWallet: formatMoney(player.wallet),
  }));
}

function createInitialState(sourcePlayers = initialPlayers, tableInfo = {}) {
  const shooterId = sourcePlayers[0]?.id ?? null;

  return {
    table: {
      running: false,
      phase: "WAITING_TABLE",
      round: tableInfo.round ?? 1024,
      tableId: tableInfo.id ?? null,
      tableName: tableInfo.name ?? "Pase VIP",
      tableCode: tableInfo.code ?? "#1024",
      shooterId,
      point: null,
      mainPot: {
        suerte: 0,
        kulo: 0,
        total: 0,
        target: 0,
        shooterStake: 0,
        coverStake: 0,
        shooterId,
        coverPlayerId: null,
        requiredCover: 0,
        promptedCoverPlayerId: null,
        coverageQueue: createCoverageQueue(shooterId, sourcePlayers),
        coverageRound: 0,
        declinedCoverPlayerIds: [],
        coverageLog: [],
        shooterWinCount: 0,
        status: "ESPERANDO_TIRADOR",
      },
      instantPool: {
        suerte: 0,
        kulo: 0,
        total: 0,
      },
      currentBet: null,
      betFeed: [],
      settlementFeed: [],
      chatMessages: [],
    },
    players: createPlayers(shooterId, sourcePlayers),
    dice: {
      values: [],
      total: null,
      outcome: null,
      finished: false,
    },
    history: [],
  };
}

function updatePlayerWallet(players, playerId, amount) {
  return createPlayers(
    players.find((player) => player.isShooter)?.id ?? "P1",
    players.map((player) => (
      player.id === playerId ?
        {
          ...player,
          wallet: player.wallet + amount,
        } :
        player
    ))
  );
}

function refundCoverageContributions(players, coverageLog) {
  return (coverageLog ?? [])
    .filter((item) => item.action === "CUBRIO" && item.amount > 0)
    .reduce(
      (nextPlayers, item) => updatePlayerWallet(nextPlayers, item.playerId, item.amount),
      players
    );
}

function settleExpiredCoverage(players, mainPot) {
  const refundedPlayers =
    refundCoverageContributions(players, mainPot.coverageLog);

  return updatePlayerWallet(refundedPlayers, mainPot.shooterId, mainPot.suerte);
}

function createEmptyMainPot(
  shooterId,
  sourcePlayers = initialPlayers,
  status = "ESPERANDO_TIRADOR",
  promptKind = "CONTINUAR"
) {
  return {
    suerte: 0,
    kulo: 0,
    total: 0,
    target: 0,
    shooterStake: 0,
    coverStake: 0,
    shooterId,
    coverPlayerId: null,
    requiredCover: 0,
    promptedCoverPlayerId: null,
    coverageQueue: createCoverageQueue(shooterId, sourcePlayers),
    coverageRound: 0,
    declinedCoverPlayerIds: [],
    coverageLog: [],
    shooterWinCount: 0,
    status,
    promptKind,
  };
}

function getNextShooterId(players, currentShooterId) {
  if (players.length === 0) {
    return null;
  }

  const currentIndex =
    players.findIndex((player) => player.id === currentShooterId);
  const nextIndex =
    currentIndex < 0 ? 0 : (currentIndex + 1) % players.length;

  return players[nextIndex]?.id ?? null;
}

function getInstantPoolFromBets(betFeed, round) {
  const pool = betFeed
    .filter((bet) => bet.round === round && bet.status === "CONFIRMADA")
    .reduce((totals, bet) => {
      const key = bet.selection === "KULO" ? "kulo" : "suerte";

      return {
        ...totals,
        [key]: totals[key] + bet.amount,
      };
    }, {
      suerte: 0,
      kulo: 0,
    });

  return {
    ...pool,
    total: pool.suerte + pool.kulo,
  };
}

function balanceInstantBets({
  betFeed,
  players,
  round,
}) {
  let nextBetFeed = betFeed;
  let nextPlayers = players;
  const pool = getInstantPoolFromBets(nextBetFeed, round);

  if (pool.suerte === 0 || pool.kulo === 0 || pool.suerte === pool.kulo) {
    return {
      betFeed: nextBetFeed,
      players: nextPlayers,
      instantPool: pool,
    };
  }

  const overSelection =
    pool.suerte > pool.kulo ? "SUERTE" : "KULO";
  let pendingRefund =
    Math.abs(pool.suerte - pool.kulo);

  nextBetFeed = nextBetFeed.map((bet) => {
    if (
      pendingRefund <= 0 ||
      bet.round !== round ||
      bet.status !== "CONFIRMADA" ||
      bet.selection !== overSelection ||
      bet.amount <= 0
    ) {
      return bet;
    }

    const refund =
      Math.min(pendingRefund, bet.amount);
    pendingRefund -= refund;
    nextPlayers =
      updatePlayerWallet(nextPlayers, bet.playerId, refund);

    const amount =
      bet.amount - refund;

    return {
      ...bet,
      amount,
      refundedAmount: (bet.refundedAmount ?? 0) + refund,
      status: amount > 0 ? "CONFIRMADA" : "DEVUELTA",
    };
  });

  return {
    betFeed: nextBetFeed,
    players: nextPlayers,
    instantPool: getInstantPoolFromBets(nextBetFeed, round),
  };
}

class PaseCasinoDemoRuntime {
  constructor({
    players = initialPlayers,
    table = {},
  } = {}) {
    this.diceEngine = new PaseDiceEngine();
    this.resolver = new PaseResolver();
    this.state = createInitialState(players, table);
  }

  getState() {
    return this.state;
  }

  hydrateState(state) {
    if (state) {
      this.state = state;
      if (state.table?.point) {
        this.resolver.setPoint(state.table.point);
      } else {
        this.resolver.clearPoint();
      }
    }

    return this.getState();
  }

  startTable() {
    const shooterId = this.state.table.shooterId;
    const mainPot =
      this.state.table.mainPot.total > 0 ?
        this.state.table.mainPot :
        {
          ...this.state.table.mainPot,
          shooterId,
        };

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        running: true,
        phase: "WAITING_ROLL",
        round: this.state.table.round || 1024,
        mainPot,
        instantPool: {
          suerte: this.state.table.instantPool.suerte,
          kulo: this.state.table.instantPool.kulo,
          total: this.state.table.instantPool.total,
        },
      },
      players: createPlayers(shooterId, this.state.players),
    };

    return this.getState();
  }

  selectShooter(playerId) {
    if (!playerId) {
      return this.getState();
    }

    const currentStake =
      this.state.table.mainPot.shooterStake;
    const mainPot = {
      ...this.state.table.mainPot,
      shooterId: playerId,
      status: currentStake > 0 ? "ESPERANDO_COBERTURA" : "ESPERANDO_TIRADOR",
    };

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        shooterId: playerId,
        mainPot,
      },
      players: createPlayers(playerId, this.state.players),
    };

    return this.getState();
  }

  setShooterStake(amount) {
    const shooterAmount =
      Number(amount) || 0;
    const shooterId =
      this.state.table.shooterId;
    const shooter =
      findPlayer(this.state.players, shooterId);

    if (!shooterId || !shooter || shooterAmount < 20000 || shooterAmount > shooter.wallet) {
      return this.getState();
    }

    const coverageQueue =
      createCoverageQueue(shooterId, this.state.players);
    const mainPot = {
      ...this.state.table.mainPot,
      suerte: shooterAmount,
      kulo: 0,
      total: shooterAmount,
      target: shooterAmount * 2,
      shooterStake: shooterAmount,
      coverStake: 0,
      shooterId,
      coverPlayerId: null,
      requiredCover: shooterAmount,
      promptedCoverPlayerId: coverageQueue[0] ?? null,
      coverageQueue,
      coverageRound: 0,
      declinedCoverPlayerIds: [],
      coverageLog: [],
      shooterWinCount: 0,
      status: "ESPERANDO_COBERTURA",
    };

    this.state = {
      ...this.state,
      players: updatePlayerWallet(this.state.players, shooterId, -shooterAmount),
      table: {
        ...this.state.table,
        running: true,
        phase: "WAITING_MAIN_POT",
        mainPot,
      },
    };

    return this.getState();
  }

  coverMainPot(playerId = null, amount = null) {
    const mainPot =
      this.state.table.mainPot;
    const activePlayerId =
      playerId ?? mainPot.promptedCoverPlayerId;

    if (!activePlayerId) {
      return this.getState();
    }

    const requestedCoverAmount =
      amount ?? mainPot.requiredCover;
    const activePlayer =
      findPlayer(this.state.players, activePlayerId);

    if (!activePlayer) {
      return this.getState();
    }

    const coverAmount =
      Math.max(0, Math.min(requestedCoverAmount, mainPot.requiredCover, activePlayer.wallet));

    if (coverAmount <= 0) {
      return this.getState();
    }
    const nextCoverStake =
      mainPot.coverStake + coverAmount;
    const requiredCover =
      Math.max(mainPot.target - mainPot.suerte - nextCoverStake, 0);
    const remainingQueue =
      mainPot.coverageQueue.filter(
        (queuedPlayerId) => queuedPlayerId !== activePlayerId
      );
    const nextCoverageRound =
      requiredCover === 0 ?
        mainPot.coverageRound ?? 0 :
        remainingQueue.length > 0 ?
          mainPot.coverageRound ?? 0 :
          (mainPot.coverageRound ?? 0) + 1;
    const restartedQueue =
      requiredCover > 0 && remainingQueue.length === 0 && nextCoverageRound < 3 ?
        createCoverageQueue(mainPot.shooterId, this.state.players) :
        remainingQueue;
    const nextPromptedCoverPlayerId =
      requiredCover === 0 ? null : restartedQueue[0] ?? null;
    const coverageExpired =
      requiredCover > 0 && remainingQueue.length === 0 && nextCoverageRound >= 3;
    const updatedMainPot = {
      ...mainPot,
      kulo: nextCoverStake,
      total: mainPot.suerte + nextCoverStake,
      coverStake: nextCoverStake,
      coverPlayerId: activePlayerId,
      requiredCover,
      promptedCoverPlayerId: nextPromptedCoverPlayerId,
      coverageQueue: restartedQueue,
      coverageRound: nextCoverageRound,
      coverageLog: [
        {
          id: crypto.randomUUID(),
          playerId: activePlayerId,
          amount: coverAmount,
          action: "CUBRIO",
        },
        ...mainPot.coverageLog,
      ].slice(0, 10),
      shooterWinCount: mainPot.shooterWinCount ?? 0,
      status:
        requiredCover === 0 ?
          "COPADO" :
          coverageExpired ?
            "SIN_COBERTURA" :
          nextPromptedCoverPlayerId ?
            "ESPERANDO_COBERTURA" :
            "SIN_COBERTURA",
    };
    const nextPlayers =
      updatePlayerWallet(this.state.players, activePlayerId, -coverAmount);
    const startsFreshRoll =
      requiredCover === 0 && (updatedMainPot.shooterWinCount ?? 0) > 0;

    if (startsFreshRoll || coverageExpired) {
      this.resolver.clearPoint();
    }

    this.state = {
      ...this.state,
      players: coverageExpired ?
        settleExpiredCoverage(nextPlayers, updatedMainPot) :
        nextPlayers,
      table: {
        ...this.state.table,
        phase: requiredCover === 0 ? "WAITING_ROLL" : "WAITING_MAIN_POT",
        point: startsFreshRoll || coverageExpired ? null : this.state.table.point,
        mainPot: coverageExpired ?
          createEmptyMainPot(mainPot.shooterId, this.state.players, "PREGUNTAR_TIRADOR", "CONTINUAR") :
          updatedMainPot,
      },
    };

    return this.getState();
  }

  passMainPotCoverage(playerId = null) {
    const mainPot =
      this.state.table.mainPot;
    const activePlayerId =
      playerId ?? mainPot.promptedCoverPlayerId;

    if (!activePlayerId) {
      return this.getState();
    }

    const remainingQueue =
      mainPot.coverageQueue.filter(
        (queuedPlayerId) => queuedPlayerId !== activePlayerId
      );
    const nextPromptedCoverPlayerId =
      remainingQueue[0] ?? null;
    const nextCoverageRound =
      nextPromptedCoverPlayerId ?
        mainPot.coverageRound ?? 0 :
        (mainPot.coverageRound ?? 0) + 1;
    const restartedQueue =
      !nextPromptedCoverPlayerId && nextCoverageRound < 3 ?
        createCoverageQueue(mainPot.shooterId, this.state.players) :
        remainingQueue;
    const coverageExpired =
      !nextPromptedCoverPlayerId && nextCoverageRound >= 3;

    if (coverageExpired) {
      this.resolver.clearPoint();
    }

    this.state = {
      ...this.state,
      players: coverageExpired ?
        settleExpiredCoverage(this.state.players, mainPot) :
        this.state.players,
      table: {
        ...this.state.table,
        phase: "WAITING_MAIN_POT",
        point: coverageExpired ? null : this.state.table.point,
        mainPot: coverageExpired ? createEmptyMainPot(mainPot.shooterId, this.state.players, "PREGUNTAR_TIRADOR", "CONTINUAR") : {
          ...mainPot,
          promptedCoverPlayerId: restartedQueue[0] ?? null,
          coverageQueue: restartedQueue,
          coverageRound: nextCoverageRound,
          declinedCoverPlayerIds: [
            activePlayerId,
            ...mainPot.declinedCoverPlayerIds,
          ],
          coverageLog: [
            {
              id: crypto.randomUUID(),
              playerId: activePlayerId,
              amount: 0,
              action: "PASO",
            },
            ...mainPot.coverageLog,
          ].slice(0, 10),
          status:
            restartedQueue[0] ?
              "ESPERANDO_COBERTURA" :
              "SIN_COBERTURA",
        },
      },
    };

    return this.getState();
  }

  requestDoubleMainPotCoverage() {
    const mainPot =
      this.state.table.mainPot;
    const shooterAmount =
      Math.max(mainPot.total, mainPot.suerte);
    const nextTarget =
      shooterAmount * 2;
    const requiredCover =
      shooterAmount;
    const coverageQueue =
      createCoverageQueue(this.state.table.shooterId, this.state.players);

    this.resolver.clearPoint();

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        phase: "WAITING_MAIN_POT",
        point: null,
        mainPot: {
          ...mainPot,
          suerte: shooterAmount,
          kulo: 0,
          total: shooterAmount,
          target: nextTarget,
          shooterStake: shooterAmount,
          coverStake: 0,
          coverPlayerId: null,
          requiredCover,
          promptedCoverPlayerId: coverageQueue[0] ?? null,
          coverageQueue,
          coverageRound: 0,
          declinedCoverPlayerIds: [],
          coverageLog: [],
          shooterWinCount: (mainPot.shooterWinCount ?? 0) + 1,
          status: "SOLICITANDO_DOBLE",
        },
      },
    };

    return this.getState();
  }

  acceptShooterTurn() {
    const shooterId =
      this.state.table.shooterId;

    if (!shooterId) {
      return this.getState();
    }

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        phase: "WAITING_MAIN_POT",
        mainPot: createEmptyMainPot(shooterId, this.state.players, "ESPERANDO_TIRADOR"),
      },
      players: createPlayers(shooterId, this.state.players),
      dice: {
        values: [],
        total: null,
        outcome: null,
        finished: false,
      },
    };

    this.resolver.clearPoint();

    return this.getState();
  }

  passShooterTurn() {
    const nextShooterId =
      getNextShooterId(this.state.players, this.state.table.shooterId);

    if (!nextShooterId) {
      return this.getState();
    }

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        phase: "WAITING_MAIN_POT",
        shooterId: nextShooterId,
        point: null,
        mainPot: createEmptyMainPot(nextShooterId, this.state.players, "PREGUNTAR_TIRADOR", "NUEVO_TIRADOR"),
        currentBet: null,
        instantPool: {
          suerte: 0,
          kulo: 0,
          total: 0,
        },
      },
      players: createPlayers(nextShooterId, this.state.players),
      dice: {
        values: [],
        total: null,
        outcome: null,
        finished: false,
      },
    };

    this.resolver.clearPoint();

    return this.getState();
  }

  placeQuickBet({
    playerId = "P3",
    selection = "SUERTE",
    amount = 50000,
  } = {}) {
    if (!playerId) {
      return this.getState();
    }

    const betAmount =
      Number(amount) || 0;
    const player =
      findPlayer(this.state.players, playerId);

    if (!player || betAmount < 1000 || betAmount > player.wallet) {
      return this.getState();
    }

    if (!this.state.table.running) {
      this.startTable();
    }

    const currentBet = {
      id: crypto.randomUUID(),
      playerId,
      selection: selection === "KULO" ? "KULO" : "SUERTE",
      amount: betAmount,
      requestedAmount: betAmount,
      refundedAmount: 0,
      round: this.state.table.round,
      status: "CONFIRMADA",
    };
    const betFeed = [
      currentBet,
      ...this.state.table.betFeed,
    ].slice(0, 10);
    const players =
      updatePlayerWallet(this.state.players, playerId, -betAmount);

    this.state = {
      ...this.state,
      players,
      table: {
        ...this.state.table,
        phase: "WAITING_ROLL",
        currentBet,
        instantPool: getInstantPoolFromBets(betFeed, this.state.table.round),
        betFeed,
      },
    };

    return this.getState();
  }

  closeQuickBetting() {
    const balanced = balanceInstantBets({
      betFeed: this.state.table.betFeed,
      players: this.state.players,
      round: this.state.table.round,
    });
    const currentBet =
      balanced.betFeed.find((bet) => bet.id === this.state.table.currentBet?.id) ??
      this.state.table.currentBet;

    this.state = {
      ...this.state,
      players: balanced.players,
      table: {
        ...this.state.table,
        currentBet,
        instantPool: balanced.instantPool,
        betFeed: balanced.betFeed,
      },
    };

    return this.getState();
  }

  settleQuickBets(outcome) {
    if (!outcome) {
      return {
        betFeed: this.state.table.betFeed,
        settlementFeed: this.state.table.settlementFeed,
        players: this.state.players,
      };
    }

    let nextPlayers = this.state.players;
    const betFeed = this.state.table.betFeed.map((bet) => {
      if (bet.status !== "CONFIRMADA") {
        return bet;
      }

      const won = bet.selection === outcome;
      const payout = won ? bet.amount * 2 : 0;

      if (payout > 0) {
        nextPlayers =
          updatePlayerWallet(nextPlayers, bet.playerId, payout);
      }

      return {
        ...bet,
        status: won ? "GANADA" : "PERDIDA",
        payout,
        profit: won ? bet.amount : -bet.amount,
      };
    });
    const settledBets = betFeed.filter(
      (bet) => bet.round === this.state.table.round &&
        (bet.status === "GANADA" || bet.status === "PERDIDA")
    );
    const settlementFeed = [
      ...settledBets,
      ...this.state.table.settlementFeed,
    ].slice(0, 5);

    return {
      betFeed,
      settlementFeed,
      players: nextPlayers,
    };
  }

  rollDice() {
    if (!this.state.table.running) {
      this.startTable();
    }

    if (this.state.table.mainPot.status !== "COPADO") {
      return this.getState();
    }

    const pointBeforeRoll =
      this.resolver.getPoint();
    const mainPotBeforeRoll =
      this.state.table.mainPot;
    const result = this.diceEngine.rollDice();
    const resolution = this.resolver.resolve(result);
    const outcome = normalizeWinner(resolution.winner);
    const point = resolution.finished ?
      null :
      resolution.point ?? this.resolver.getPoint();
    const round = this.state.table.round;
    const isMono =
      outcome === "KULO" &&
      resolution.finished &&
      pointBeforeRoll === null;
    const isFirstShooterSuerte =
      outcome === "SUERTE" &&
      resolution.finished &&
      (mainPotBeforeRoll.shooterWinCount ?? 0) === 0;
    const historyItem = {
      id: crypto.randomUUID(),
      round,
      dice: `${result.dice[0]} + ${result.dice[1]}`,
      total: result.total,
      result: isMono ? "MONO" : isFirstShooterSuerte ? "PRIMERA SUERTE" : outcome ?? "PUNTO",
      point: resolution.point ?? pointBeforeRoll,
    };
    const settled =
      this.settleQuickBets(outcome);
    const shooterWon =
      outcome === "SUERTE" && resolution.finished;
    const kuloWon =
      outcome === "KULO" && resolution.finished;
    let nextPlayers =
      settled.players;
    let mainPot =
      mainPotBeforeRoll;
    let nextPhase =
      resolution.finished ? "ROUND_FINISHED" : "POINT_ACTIVE";
    let nextPoint =
      point;

    if (shooterWon) {
      const shooterWinCount =
        mainPotBeforeRoll.shooterWinCount ?? 0;

      if (shooterWinCount >= 1) {
        nextPlayers =
          updatePlayerWallet(nextPlayers, mainPotBeforeRoll.shooterId, mainPotBeforeRoll.total);
        mainPot =
          createEmptyMainPot(mainPotBeforeRoll.shooterId, this.state.players, "PREGUNTAR_TIRADOR", "CONTINUAR");
        nextPhase = "WAITING_MAIN_POT";
        nextPoint = null;
        this.resolver.clearPoint();
      } else {
        const coverageQueue =
          createCoverageQueue(mainPotBeforeRoll.shooterId, this.state.players);
        const shooterAmount =
          Math.max(mainPotBeforeRoll.total, mainPotBeforeRoll.suerte);

        mainPot = {
          ...mainPotBeforeRoll,
          suerte: shooterAmount,
          kulo: 0,
          total: shooterAmount,
          target: shooterAmount * 2,
          shooterStake: shooterAmount,
          coverStake: 0,
          coverPlayerId: null,
          requiredCover: shooterAmount,
          promptedCoverPlayerId: coverageQueue[0] ?? null,
          coverageQueue,
          declinedCoverPlayerIds: [],
          coverageLog: [],
          shooterWinCount: shooterWinCount + 1,
          status: "SOLICITANDO_DOBLE",
        };
        nextPhase = "WAITING_MAIN_POT";
        nextPoint = null;
        this.resolver.clearPoint();
      }
    }

    if (kuloWon) {
      const nextShooterId =
        isMono ?
          mainPotBeforeRoll.shooterId :
          getNextShooterId(this.state.players, mainPotBeforeRoll.shooterId);
      (mainPotBeforeRoll.coverageLog ?? [])
        .filter((item) => item.action === "CUBRIO" && item.amount > 0)
        .forEach((item) => {
          nextPlayers =
            updatePlayerWallet(nextPlayers, item.playerId, item.amount * 2);
        });
      mainPot =
        createEmptyMainPot(
          nextShooterId,
          this.state.players,
          "PREGUNTAR_TIRADOR",
          isMono ? "CONTINUAR" : "NUEVO_TIRADOR"
        );
      nextPhase = "WAITING_MAIN_POT";
      nextPoint = null;
      this.resolver.clearPoint();
    }

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        phase: nextPhase,
        rollingStartedAt: null,
        shooterId: kuloWon ? mainPot.shooterId : this.state.table.shooterId,
        point: nextPoint,
        mainPot,
        betFeed: settled.betFeed,
        settlementFeed: settled.settlementFeed,
        instantPool: getInstantPoolFromBets(settled.betFeed, round),
        currentBet: settled.betFeed.find(
          (bet) => bet.id === this.state.table.currentBet?.id
        ) ?? this.state.table.currentBet,
      },
      players: kuloWon ? createPlayers(mainPot.shooterId, nextPlayers) : nextPlayers,
      dice: {
        values: result.dice,
        total: result.total,
        outcome: isMono ? "MONO" : outcome,
        finished: resolution.finished,
      },
      history: [
        historyItem,
        ...this.state.history,
      ].slice(0, 10),
    };

    return this.getState();
  }

  nextRound() {
    const nextRound = this.state.table.round + 1 || 1024;

    this.resolver.clearPoint();

    this.state = {
      ...this.state,
      table: {
        ...this.state.table,
        running: true,
        phase: "WAITING_ROLL",
        round: nextRound,
        point: null,
        currentBet: null,
        instantPool: {
          suerte: 0,
          kulo: 0,
          total: 0,
        },
      },
      dice: {
        values: [],
        total: null,
        outcome: null,
        finished: false,
      },
    };

    return this.getState();
  }
}

export {
  PaseCasinoDemoRuntime,
  formatMoney,
};

export default PaseCasinoDemoRuntime;
