export const PaseOutcomes = Object.freeze({
  PASE: "PASE",
  KULO: "KULO",
});

export const PaseOutcomeLabels = Object.freeze({
  PASE: "PASE",
  KULO: "KULO (Mala)",
});

export function isValidPaseOutcome(outcome) {
  return outcome === PaseOutcomes.PASE || outcome === PaseOutcomes.KULO;
}
