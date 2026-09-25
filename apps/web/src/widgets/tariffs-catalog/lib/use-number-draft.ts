import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

import { clampNumber } from '@/shared/lib/clamp-number'

const INTEGER_INPUT_PATTERN = /^\d*$/

export type NumberDraftOptions = {
  value: number
  min?: number
  max?: number
  onCommit: (value: number) => void
}

export function useNumberDraft({ value, min, max, onCommit }: NumberDraftOptions) {
  const [draft, setDraft] = useState(String(value))

  const reset = () => setDraft(String(value))

  const commit = () => {
    const parsed = Number.parseInt(draft, 10)

    if (Number.isNaN(parsed)) {
      reset()
      return
    }

    const clamped = clampNumber(parsed, min, max)
    setDraft(String(clamped))
    onCommit(clamped)
  }

  return {
    value: draft,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      if (INTEGER_INPUT_PATTERN.test(event.target.value)) {
        setDraft(event.target.value)
      }
    },
    onBlur: commit,
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.currentTarget.blur()
      }

      if (event.key === 'Escape') {
        reset()
      }
    },
  }
}
