export const PaseBetStates = Object.freeze({
  CREATED: "CREATED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  RESOLVED: "RESOLVED",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
});

export const PaseBetStateLabels = Object.freeze({
  CREATED: "Creada",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
  RESOLVED: "Resuelta",
  PAID: "Pagada",
  CANCELLED: "Cancelada",
});

export function isValidPaseBetState(state) {
  return Object.values(PaseBetStates).includes(state);
}
