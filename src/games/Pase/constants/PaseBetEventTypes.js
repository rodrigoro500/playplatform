export const PaseBetEventTypes = Object.freeze({
  BET_CREATED: "BET_CREATED",
  BET_ACCEPTED: "BET_ACCEPTED",
  BET_REJECTED: "BET_REJECTED",
  BET_CANCELLED: "BET_CANCELLED",
  BET_RESOLVED: "BET_RESOLVED",
  BET_PAID: "BET_PAID",
});

export function isValidPaseBetEventType(type) {
  return Object.values(PaseBetEventTypes).includes(type);
}
