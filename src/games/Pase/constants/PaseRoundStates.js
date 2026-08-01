export const PaseRoundStates = Object.freeze({
  WAITING_BETS: "WAITING_BETS",
  ROLLING_DICE: "ROLLING_DICE",
  RESOLVING: "RESOLVING",
  SETTLING: "SETTLING",
  FINISHED: "FINISHED",
});

export const PaseRoundStateLabels = Object.freeze({
  WAITING_BETS: "Esperando apuestas",
  ROLLING_DICE: "Lanzando dados",
  RESOLVING: "Resolviendo ronda",
  SETTLING: "Liquidando apuestas",
  FINISHED: "Finalizada",
});

export function isValidPaseRoundState(state) {
  return Object.values(PaseRoundStates).includes(state);
}
