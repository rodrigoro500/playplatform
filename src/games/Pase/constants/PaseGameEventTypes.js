export const PaseGameEventTypes = Object.freeze({
  GAME_CREATED: "GAME_CREATED",
  PLAYERS_READY: "PLAYERS_READY",
  GAME_STARTED: "GAME_STARTED",
  GAME_PAUSED: "GAME_PAUSED",
  GAME_RESUMED: "GAME_RESUMED",
  GAME_FINISHED: "GAME_FINISHED",
  GAME_CLOSED: "GAME_CLOSED",
});

export function isValidPaseGameEventType(type) {
  return Object.values(PaseGameEventTypes).includes(type);
}
