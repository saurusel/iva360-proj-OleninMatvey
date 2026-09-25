export function clampNumber(value: number, min?: number, max?: number) {
  let result = value

  if (min !== undefined && result < min) {
    result = min
  }

  if (max !== undefined && result > max) {
    result = max
  }

  return result
}
