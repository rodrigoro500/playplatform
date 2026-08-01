export const PaseGameStates = Object.freeze({
  CREATED: "CREATED",
  WAITING_PLAYERS: "WAITING_PLAYERS",
  READY: "READY",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  FINISHED: "FINISHED",
  CLOSED: "CLOSED",
});

export const PaseGameStateLabels = Object.freeze({
  CREATED: "Creada",
  WAITING_PLAYERS: "Esperando jugadores",
  READY: "Lista",
  RUNNING: "En juego",
  PAUSED: "Pausada",
  FINISHED: "Finalizada",
  CLOSED: "Cerrada",
});

export function isValidPaseGameState(state) {
  return Object.values(PaseGameStates).includes(state);
}
