export function normalizeVector(_vector: number, max: number): number {
  let vector = _vector % max
  if (Math.abs(vector) > max / 2) {
    vector = -1 * (max - vector)
  }

  return vector
}
