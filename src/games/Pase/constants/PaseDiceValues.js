export const PaseDiceValues = Object.freeze({
  MIN: 1,
  MAX: 6,
});

export const PaseDiceFaces = Object.freeze([
  1,
  2,
  3,
  4,
  5,
  6,
]);

export function isValidDiceValue(value) {
  return PaseDiceFaces.includes(value);
}
