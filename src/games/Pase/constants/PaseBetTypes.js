export const PaseBetTypes = Object.freeze({
  PASE: "PASE",
  KULO: "KULO",
});

export const PaseBetLabels = Object.freeze({
  PASE: "PASE",
  KULO: "KULO (Mala)",
});

export function isValidPaseBetType(type) {
  return type === PaseBetTypes.PASE || type === PaseBetTypes.KULO;
}
