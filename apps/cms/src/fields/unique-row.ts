import type { ArrayFieldValidation } from 'payload'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export function uniqueRowValue(field: string, message: string): ArrayFieldValidation {
  return (value) => validateUniqueRowValue(value, field, message)
}

export function validateUniqueRowValue(
  value: unknown,
  field: string,
  message: string,
): true | string {
  if (!Array.isArray(value)) {
    return true
  }

  const seen = new Set<unknown>()

  for (const row of value) {
    if (!isRecord(row)) {
      continue
    }

    const current = row[field]

    if (current === undefined || current === null || current === '') {
      continue
    }

    if (seen.has(current)) {
      return message
    }

    seen.add(current)
  }

  return true
}
