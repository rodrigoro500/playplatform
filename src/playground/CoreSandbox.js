import Player from "../core/Players/Player";
import Room from "../core/Rooms/Room";
import GameSession from "../core/GameSession/GameSession";
import EventManager from "../core/Engine/EventManager";
import Bet from "../core/Entities/Bet";
import BetManager from "../core/Managers/BetManager";
import BetValidator from "../core/Validators/BetValidator";
import BetResolver, {
  BET_RESULT,
} from "../core/Resolvers/BetResolver";
import Round from "../core/Rounds/Round";
import RoundEngine from "../core/Engine/RoundEngine";

export default function CoreSandbox() {
  console.clear();

  console.log("==================================");
  console.log("PLAYPLATFORM CORE SANDBOX");
  console.log("==================================");

  //---------------------------------
  // Crear jugadores
  //---------------------------------

  const rodrigo = new Player({
    id: "p1",
    nickname: "Rodrigo",
    isAdmin: true,
  });

  const carlos = new Player({
    id: "p2",
    nickname: "Carlos",
  });

  //---------------------------------
  // Crear sala
  //---------------------------------

  const room = new Room({
    id: "room-001",
    name: "Sala Principal",
    owner: rodrigo.getId(),
    maxPlayers: 5,
  });

  room.addPlayer(rodrigo);
  room.addPlayer(carlos);

  room.assignSeat(rodrigo.getId(), 1);
  room.assignSeat(carlos.getId(), 2);

  console.log("Sala:");
  console.log(room.toJSON());

  //---------------------------------
  // Crear sesión
  //---------------------------------

  const session = new GameSession({
    id: "session-001",
    roomId: room.getId(),
    gameName: "PASE",
    players: room.getPlayers(),
  });

  session.start();

  console.log("Sesión:");

  console.log(session.toJSON());

  console.log("Jugador actual:");

  console.log(session.getCurrentPlayer());

  console.log("==================================");
  //---------------------------------
  // Probar EventManager
  //---------------------------------

  const eventManager = new EventManager();

  const unsubscribeBetWon = eventManager.subscribe(
    "BET_WON",
    (event) => {
      console.log("Apuesta ganada:");
      console.log(event);
    }
  );

  eventManager.once("BET_LOCKED", (event) => {
    console.log("BET_LOCKED ejecutado una sola vez:");
    console.log(event);
  });

  eventManager.emit("BET_LOCKED", {
    betId: "bet-001",
  });

  eventManager.emit("BET_LOCKED", {
    betId: "bet-002",
  });

  eventManager.emit("BET_WON", {
    betId: "bet-001",
    playerId: rodrigo.getId(),
    resolvedAmount: 950,
  });

  unsubscribeBetWon();

  eventManager.emit("BET_WON", {
    betId: "bet-002",
    playerId: carlos.getId(),
    resolvedAmount: 1200,
  });

  console.log("Eventos registrados:");
  console.log(eventManager.getEvents());

  console.log("Resumen EventManager:");
  console.log(eventManager.toJSON());

    //---------------------------------
  // Probar BetManager
  //---------------------------------

  const betManager = new BetManager();

  const bet1 = new Bet({
    id: "bet-001",
    roundId: "round-001",
    playerId: rodrigo.getId(),
    walletId: "wallet-001",
    selection: "SUERTE",
    amount: 500,
  });

  const bet2 = new Bet({
    id: "bet-002",
    roundId: "round-001",
    playerId: carlos.getId(),
    walletId: "wallet-002",
    selection: "MALA",
    amount: 500,
  });

  betManager.addBet(bet1);
  betManager.addBet(bet2);

  console.log("==================================");
  console.log("BET MANAGER");

  console.log(
    "Cantidad de apuestas:",
    betManager.count()
  );

  console.log(
    "Todas las apuestas:",
    betManager.toJSON()
  );

  console.log(
    "Apuestas de Rodrigo:",
    betManager
      .getByPlayer(rodrigo.getId())
      .map((bet) => bet.toJSON())
  );

  console.log(
    "Apuestas de la ronda:",
    betManager
      .getByRound("round-001")
      .map((bet) => bet.toJSON())
  );

  console.log(
    "Apuestas creadas:",
    betManager
      .getByStatus("CREATED")
      .map((bet) => bet.toJSON())
  );

    //---------------------------------
  // Probar BetValidator
  //---------------------------------

  const betValidator = new BetValidator();

  const betValidationResult =
    betValidator.validate(bet1);

  console.log("==================================");
  console.log("BET VALIDATOR");

  console.log(
    "Resultado de validación:",
    betValidationResult
  );

  console.log(
    "Monto válido:",
    betValidator.validateAmount(500)
  );

  console.log(
    "Monto inválido:",
    betValidator.validateAmount(0)
  );

  console.log(
    "Selección válida:",
    betValidator.validateSelection(
      "SUERTE"
    )
  );

  console.log(
    "Selección inválida:",
    betValidator.validateSelection("")
  );

  console.log(
    "Estado inicial válido:",
    betValidator.validateInitialStatus(
      bet1.getStatus()
    )
  );

    //---------------------------------
  // Probar BetResolver
  //---------------------------------

  const betResolver = new BetResolver();

  const winningBet = new Bet({
    id: "bet-win-001",
    roundId: "round-001",
    playerId: rodrigo.getId(),
    walletId: "wallet-001",
    selection: "SUERTE",
    amount: 500,
  });

  winningBet.confirm();
  winningBet.lock();

  const winResolution =
    betResolver.resolve({
      bet: winningBet,
      result: BET_RESULT.WIN,
      resolvedAmount: 950,
    });

  const losingBet = new Bet({
    id: "bet-loss-001",
    roundId: "round-001",
    playerId: carlos.getId(),
    walletId: "wallet-002",
    selection: "MALA",
    amount: 500,
  });

  losingBet.confirm();
  losingBet.lock();

  const lossResolution =
    betResolver.resolve({
      bet: losingBet,
      result: BET_RESULT.LOSS,
    });

  const refundedBet = new Bet({
    id: "bet-refund-001",
    roundId: "round-001",
    playerId: rodrigo.getId(),
    walletId: "wallet-001",
    selection: "SUERTE",
    amount: 700,
  });

  refundedBet.confirm();
  refundedBet.lock();

  const refundResolution =
    betResolver.resolve({
      bet: refundedBet,
      result: BET_RESULT.REFUND,
    });

  console.log("==================================");
  console.log("BET RESOLVER");

  console.log(
    "Apuesta ganadora:",
    winResolution
  );

  console.log(
    "Apuesta perdedora:",
    lossResolution
  );

  console.log(
    "Apuesta reembolsada:",
    refundResolution
  );

  //---------------------------------
// Simulación completa de una ronda
//---------------------------------

console.log("==================================");
console.log("ROUND ENGINE");
console.log("==================================");

const round = new Round({
  id: "round-engine-001",
  sessionId: session.getId(),
  number: 1,
  players: room.getPlayers(),
});

const roundEngine = new RoundEngine();

roundEngine.startRound(round);

console.log("Estado inicial de la ronda:");
console.log(round.toJSON().state);

const engineBet = new Bet({
  id: "engine-bet-001",
  roundId: round.getId(),
  playerId: rodrigo.getId(),
  walletId: "wallet-001",
  selection: "SUERTE",
  amount: 500,
});

engineBet.confirm();
engineBet.lock();

const validation =
  roundEngine.validateBet(engineBet);

console.log("Resultado de validación:");
console.log(validation);

let roundResolution = null;

if (validation.valid) {
  roundResolution =
    roundEngine.resolveBet({
      bet: engineBet,
      result: BET_RESULT.WIN,
      resolvedAmount: 950,
    });

  console.log("Resultado de resolución:");
  console.log(roundResolution);
}

if (roundResolution) {
  roundEngine.finishRound(
    round,
    roundResolution.result,
    rodrigo.getId()
  );
}

console.log("Estado final de la ronda:");
console.log(round.toJSON());

console.log("==================================");

  return null;
}