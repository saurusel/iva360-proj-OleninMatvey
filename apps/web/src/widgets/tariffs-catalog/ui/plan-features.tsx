import { Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { Plan } from '@iva360/shared/payload-types'

export function PlanFeatures({ features }: { features: Plan['features'] }) {
  if (!features?.length) {
    return null
  }

  return (
    <ul className="flex flex-col gap-2 rounded-xl bg-card p-3">
      {features.map((feature, index) => (
        <li key={feature.id ?? index} className="flex items-start gap-2">
          <HugeiconsIcon icon={Tick02Icon} size={20} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-sm leading-6">
            {feature.text}
            {feature.value && <span className="mx-1 font-semibold">{feature.value}</span>}
          </p>
        </li>
      ))}
    </ul>
  )
}
