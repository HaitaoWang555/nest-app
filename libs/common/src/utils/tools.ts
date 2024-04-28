/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
export function getRandomInt(min: number, max: number): number {
  [min, max].forEach((v, idx) => {
    if (!Number.isSafeInteger(v)) {
      throw new Error(`${idx === 0 ? 'min' : 'max'} is not a valid integer`);
    }
  });
  if (max < min) {
    throw new Error('Min cannot be greater than max');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
