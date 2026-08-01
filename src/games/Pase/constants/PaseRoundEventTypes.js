export const PaseRoundEventTypes = Object.freeze({
  ROUND_CREATED: "ROUND_CREATED",
  BETTING_OPENED: "BETTING_OPENED",
  BETTING_CLOSED: "BETTING_CLOSED",
  DICE_ROLLED: "DICE_ROLLED",
  ROUND_RESOLVED: "ROUND_RESOLVED",
  ROUND_SETTLED: "ROUND_SETTLED",
  ROUND_FINISHED: "ROUND_FINISHED",
});

export function isValidPaseRoundEventType(type) {
  return Object.values(PaseRoundEventTypes).includes(type);
}
