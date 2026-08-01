import PaseEngine from "../games/Pase/PaseEngine";
import PaseTable from "../games/Pase/PaseTable";
import PaseTurnManager from "../games/Pase/PaseTurnManager";
import PasePotFunding from "../games/Pase/PasePotFunding";
import PaseSettlementResolver from "../games/Pase/PaseSettlementResolver";

function PaseSandbox() {
  console.clear();

  console.log(
    "======================================"
  );

  console.log(
    " PLAYPLATFORM - PASE ENGINE SANDBOX"
  );

  console.log(
    "======================================"
  );

  try {
    // 1. Crear mesa
    const table =
      new PaseTable({
        id: "table-1",
        name: "Mesa Principal",
        maxPlayers: 5,
      });

    // 2. Agregar jugadores temporales
    table.addPlayer("player-1");
    table.addPlayer("player-2");
    table.addPlayer("player-3");
    table.addPlayer("player-4");
    table.addPlayer("player-5");

    // 3. Crear administrador de turnos
    const turnManager =
      new PaseTurnManager();

    // 4. Crear financiamiento
    const funding =
      new PasePotFunding(60);

    // 5. Crear resolver económico
    const settlementResolver =
      new PaseSettlementResolver({
        commissionRate: 0.1,
      });

    // 6. Construir motor
    const engine =
      new PaseEngine({
        table,
        turnManager,
        funding,
        settlementResolver,
      });
    console.log(
  "=== APUESTAS RÁPIDAS ==="
);

engine.openInstantBetPool();

engine.registerInstantBet(
  "player-1",
  "SUERTE",
  1000
);

engine.registerInstantBet(
  "player-2",
  "KULO",
  2000
);

engine.registerInstantBet(
  "player-3",
  "SUERTE",
  1500
);

console.log(
  engine.getInstantBetPoolState()
);

console.log(
  "Total del pozo:",
  engine.getInstantBetPoolTotal()
);

const balance =
  engine.closeInstantBetPool();
 engine.setInstantBetResult(
  "SUERTE"
);

console.log(
  "GANADORES:"
);

console.log(
  engine.getInstantWinningBets()
);

console.log(
  "TOTAL GANADOR:",
  engine.getInstantTotalWinningAmount()
);

console.log(
  "PAGOS:"
);

console.table(
  engine.calculateInstantPayouts()
);

console.log(
  "TOTAL A PAGAR:",
  engine.getInstantTotalPayout()
);

console.log(
  "REMANENTE DEL POZO:",
  engine.getInstantRemainingPoolAmount()
);

const instantSettlement =
  engine.settleInstantBetPool();

console.log(
  "=== LIQUIDACIÓN DEL POZO ==="
);

console.log(
  instantSettlement
);

engine.resetInstantBetPool();

console.log(
  "=== POZO REINICIADO ==="
);

console.log(
  engine.getInstantBetPoolState()
);

console.log("CODIGO GENERADO POR CODEX");

console.log(
  "=== BALANCE ==="
);
 
console.log(balance);

console.log(
  "SUERTE:",
  balance.totalSuerte
);

console.log(
  "MALA:",
  balance.totalMala
);

console.log(
  "EMPAREJADO:",
  balance.matchedAmount
);

console.log(
  "=== POZO EQUILIBRADO ==="
);

console.log(
  engine.getInstantBetPoolState()
);

const state =
  engine.getInstantBetPoolState();

console.log(
  "SUERTE:",
  state.totalSuerte
);

console.log(
  "MALA:",
  state.totalMala
);

console.log(
  "TOTAL:",
  state.totalAmount
);

console.log(
  "EMPAREJADO:",
  engine.getInstantMatchedAmount()
);

console.log(
  "Pozo cerrado:",
  engine.getInstantBetPoolState()
);

    // 7. Iniciar partida
    const gameStart =
      engine.startGame();

    console.log("");
    console.log(
      "✅ PARTIDA INICIADA CORRECTAMENTE"
    );
    
    console.log(
      "--------------------------------------"
    );

    console.log(
      "Mesa:",
      engine.getTable().getName()
    );

    console.log(
      "Jugadores:",
      gameStart.players
    );

    console.log(
      "Cantidad de jugadores:",
      gameStart.players.length
    );

    console.log(
      "Tirador:",
      gameStart.shooter
    );

    console.log(
      "Estado de la partida:",
      gameStart.status
    );

    console.log(
      "Estado inicial de la ronda:",
      gameStart.round.getState()
    );

    console.log(
      "Motor inicializado:",
      engine.isInitialized()
    );

    console.log(
      "Motor funcionando:",
      engine.isGameRunning()
    );

    console.log(
      "Mesa completa:",
      engine.getTable().toJSON()
    );

    console.log("");
    console.log(
      "======================================"
    );

    console.log(
      " CICLO REAL DE RONDA DESDE PASEENGINE"
    );

    console.log(
      "======================================"
    );

    const activeRound =
      engine.getCurrentRound();

    console.log(
      "Ronda activa:",
      activeRound.toJSON()
    );

    console.log("");
    console.log(
      "1. Estado inicial:",
      activeRound.getState()
    );

engine.placeBet({
  id: "bet-1",
  playerId: "player-1",
  type: "PASE",
  amount: 1000,
});

engine.placeBet({
  id: "bet-2",
  playerId: "player-2",
  type: "NO_PASE",
  amount: 1500,
});

    // 8. Cerrar apuestas
    const bettingClosed =
      engine.getRoundFlow().closeBetting();

    console.log(
      "2. Apuestas cerradas:",
      bettingClosed
    );


    
    // 9. Iniciar lanzamiento
    const rollStarted =
      engine.getRoundFlow().startRoll();

    console.log(
      "3. Lanzamiento iniciado:",
      rollStarted
    );

    // 10. Iniciar resolución
    const resolutionStarted =
      engine.getRoundFlow().beginResolution();

    console.log(
      "4. Resolución iniciada:",
      resolutionStarted
    );

    // 11. Registrar resultado
let result;
let resolution;

for (let i = 1; i <= 10; i++) {
  result = engine.rollDice();

  resolution = engine.resolveDice(result);

  console.log(
    `Tirada ${i}`,
    result,
    resolution
  );

  if (resolution.finished) {
    console.log(
      "========== JUEGO TERMINADO =========="
    );

    break;
  }
}

console.log(
  "Dados:",
  result.dice
);

console.log(
  "Total:",
  result.total
);

const resolvedResult = {
  ...result,
  resolution,
};

const roundResult =
  engine
    .getRoundFlow()
    .setResult(
      resolvedResult,
      "player-1"
    );

console.log(
  "5. Resultado registrado:",
  roundResult
);

 const roundResolution =
  engine.resolveRound();

const settlement =
  roundResolution.settlement;

console.log(
  "Reglas de Pase aplicadas:",
  {
    result: roundResolution.result,
    outcome: roundResolution.outcome,
    settlement: roundResolution.settlement,
  }
);

console.log(
  "Resolución automática:",
  {
    result:
      roundResolution.result,
    outcome:
      roundResolution.outcome,
    roundId:
      roundResolution.round.getId?.() ??
      roundResolution.round.id,
  }
);

console.log(
  "Resultados:",
  settlement
    .getResults()
    .map((result) => result.toJSON())
);
  
console.log(
  "Resolución automática:",
  {
    result:
      roundResolution.result,
    roundId:
      roundResolution.round.getId?.() ??
      roundResolution.round.id,
  }
);

console.log(
  "Resultados:",
  settlement
    .getResults()
    .map((result) => result.toJSON())
);

console.log(
  "Pago total:",
  settlement.getTotalPayout()
);

console.log(
  "Ganancia total:",
  settlement.getTotalProfit()
);

    // 12. Continuar flujo según el resultado oficial
if (roundResolution.outcome === "PASE") {
  const fundingStarted =
    engine.getRoundFlow().beginFunding();

  console.log(
    "6. Financiamiento iniciado:",
    fundingStarted
  );

 // ======================================
// PRUEBA DE PASE POT FUNDING
// ======================================

const currentRound =
  engine.getCurrentRound();

const fundingCalculation =
  engine.calculateFunding(
    currentRound
  );

console.log(
  "Cálculo automático del Funding:",
  fundingCalculation
);

const fundingStartedState =
  engine.startFunding(
    fundingCalculation.requiredFunding,
    "player-1"
  );

console.log("");
console.log(
  "Estado inicial del Funding:"
);
console.log(
  fundingStartedState
);

const firstContribution =
  engine.registerFundingContribution(
    "player-2",
    2000
  );

console.log("");
console.log(
  "Después del primer aporte:"
);
console.log(
  firstContribution
);

const remainingAmount =
  engine.getRemainingFundingAmount();

const secondContribution =
  engine.registerFundingContribution(
    "player-3",
    remainingAmount
  );

console.log("");
console.log(
  "Después del segundo aporte:"
);

console.log(
  "Aporte total player-2:",
  engine.getContributionByPlayer(
    "player-2"
  )
);

console.log(
  "Aporte total player-3:",
  engine.getContributionByPlayer(
    "player-3"
  )
);

console.log(
  "Cantidad de aportantes:",
  engine.getContributorCount()
);

console.log(
  "Último aportante:",
  engine.getLastContributor()
);

console.log(
  "Estado completo del Funding:",
  engine.getFundingState()
);

console.log(
  engine.getFundingState().lastContributor
);

console.log(
  secondContribution
);
  // Temporal:
  // avanzamos a PAYMENT hasta implementar
  // PasePotFunding y el segundo juego real.
  const paymentStarted =
    engine.getRoundFlow().beginPayment();

  console.log(
    "7. Pagos iniciados:",
    paymentStarted
  );
}

if (roundResolution.outcome === "NO_PASE") {
  const paymentStarted =
    engine.getRoundFlow().beginPayment();

  console.log(
    "6. Pagos iniciados:",
    paymentStarted
  );
}

// Guardamos referencia antes
// de que el Engine libere la ronda.
const roundBeforeFinish =
  engine.getCurrentRound();

// 13. Finalizar ronda
const finishedRound =
  engine.getRoundFlow().completeRound();

console.log(
  "8. Ronda finalizada:",
  finishedRound.toJSON()
);

console.log("");

console.log(
  "Estado final de la ronda:",
  finishedRound.getState()
);

console.log(
  "Estado final de la mesa:",
  engine.getTable().getStatus()
);

console.log(
  "Ronda activa en el Engine:",
  engine.getCurrentRound()
);

console.log("");

console.log(
  "======================================"
);

    console.log(
      " HISTORIAL DE ROUNDLIFECYCLE"
    );

    console.log(
      "======================================"
    );

    console.table(
      roundBeforeFinish
        .getLifecycle()
        .getHistory()
        .map(
          ({
            from,
            to,
            reason,
            timestamp,
          }) => ({
            from:
              from ?? "INICIO",
            to,
            reason,
            timestamp,
          })
        )
    );

    console.log("");
    console.log(
      "======================================"
    );

    console.log(
      " HISTORIAL DE LA ENTIDAD ROUND"
    );

    console.log(
      "======================================"
    );

    console.table(
      finishedRound
        .getHistory()
        .map(
          ({
            type,
            state,
            timestamp,
          }) => ({
            type,
            state,
            timestamp,
          })
        )
    );

    console.log("");
    console.log(
      "--------------------------------------"
    );

    console.log(
      " PRUEBA DE PROTECCIÓN DEL ENGINE"
    );

    console.log(
      "--------------------------------------"
    );

    try {
      /*
       * La ronda ya fue finalizada
       * y liberada del Engine.
       *
       * PaseEngine debe bloquear
       * cualquier nueva orden.
       */
      engine.beginPayment();
    } catch (engineError) {
      console.log(
        "✅ PaseEngine bloqueó una operación sin ronda activa."
      );

      console.log({
        name:
          engineError.name,
        message:
          engineError.message,
      });
    }

    console.log("");
    console.log(
      "--------------------------------------"
    );

    console.log(
      " PRUEBA DE PROTECCIÓN DEL LIFECYCLE"
    );

    console.log(
      "--------------------------------------"
    );

    try {
      /*
       * Aunque conservamos la referencia
       * a la ronda terminada, su Lifecycle
       * debe impedir nuevas transiciones.
       */
      finishedRound
        .getLifecycle()
        .startPayment({
          reason:
            "INVALID_PAYMENT_ATTEMPT",
        });
    } catch (lifecycleError) {
      console.log(
        "✅ RoundLifecycle bloqueó una transición terminal."
      );

      console.log({
        name:
          lifecycleError.name,
        code:
          lifecycleError.code,
        message:
          lifecycleError.message,
        currentState:
          lifecycleError.currentState,
        requestedState:
          lifecycleError.requestedState,
      });
    }

    console.log("");
    console.log(
      "======================================"
    );

    console.log(
      " SANDBOX FINALIZADO CORRECTAMENTE"
    );

    console.log(
      "======================================"
    );
  } catch (error) {
    console.error("");
    console.error(
      "======================================"
    );

    console.error(
      " ERROR EN PASE SANDBOX"
    );

    console.error(
      "======================================"
    );

    console.error({
      name:
        error.name,
      code:
        error.code ??
        "UNEXPECTED_ERROR",
      message:
        error.message,
      currentState:
        error.currentState ??
        null,
      requestedState:
        error.requestedState ??
        null,
      stack:
        error.stack,
    });
  }

  return null;

  
}

export default PaseSandbox;
