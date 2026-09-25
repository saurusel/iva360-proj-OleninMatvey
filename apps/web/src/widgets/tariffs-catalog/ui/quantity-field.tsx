import { MinusSignIcon, PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/shared/ui/number-field'

import { useNumberDraft, type NumberDraftOptions } from '../lib/use-number-draft'
import type { PlanQuantity } from '../model/types'

const STEPPER_CLASS =
  'static size-9 shrink-0 translate-y-0 p-0 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50'

type QuantityFieldProps = {
  quantity: PlanQuantity
  value: number
  onChange: (value: number) => void
}

export function QuantityField({ quantity, value, onChange }: QuantityFieldProps) {
  const min = quantity.min ?? undefined
  const max = quantity.max ?? undefined

  return (
    <div className="flex h-9 w-full items-center gap-4">
      {quantity.label && (
        <div className="min-w-0 flex-1 truncate text-base leading-9 font-medium">
          {quantity.label}
        </div>
      )}
      <NumberField
        value={value}
        min={min}
        max={max}
        step={quantity.step ?? undefined}
        onValueChange={onChange}
        className="shrink-0"
      >
        <NumberFieldContent className="inline-flex h-[38px] w-max items-stretch overflow-hidden rounded-md border border-input bg-background">
          <NumberFieldDecrement className={STEPPER_CLASS}>
            <HugeiconsIcon icon={MinusSignIcon} size={16} />
          </NumberFieldDecrement>

          <QuantityInput key={value} value={value} min={min} max={max} onCommit={onChange} />
          <NumberFieldIncrement className={STEPPER_CLASS}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
          </NumberFieldIncrement>
        </NumberFieldContent>
      </NumberField>
    </div>
  )
}

function QuantityInput(props: NumberDraftOptions) {
  const inputProps = useNumberDraft(props)

  return (
    <NumberFieldInput
      {...inputProps}
      className="h-9 w-14 min-w-0 rounded-none border-x border-y-0 border-input bg-transparent px-1 text-center text-base font-medium tabular-nums outline-none"
    />
  )
}
