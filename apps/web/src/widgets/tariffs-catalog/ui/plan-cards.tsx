import { useEffect, useState, type ReactNode } from 'react'

import type { Plan } from '@iva360/shared/payload-types'

import { useCarouselSelectedIndex } from '@/shared/lib/hooks/use-carousel-selected-index'
import { cn } from '@/shared/lib/utils'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/ui/carousel'

type PlanCardsProps = {
  plans: Plan[]
  selectedIndex: number
  renderCard: (plan: Plan) => ReactNode
}

export function PlanCards({ plans, selectedIndex, renderCard }: PlanCardsProps) {
  const [api, setApi] = useState<CarouselApi>()
  const visibleIndex = useCarouselSelectedIndex(api)

  useEffect(() => {
    api?.scrollTo(selectedIndex)
  }, [api, selectedIndex])

  return (
    <>
      <div className="hidden w-full grid-cols-3 gap-5 lg:grid">
        {plans.map((plan) => (
          <div key={plan.id} className={cn('h-full', !plan.highlighted && 'py-5')}>
            {renderCard(plan)}
          </div>
        ))}
      </div>

      <Carousel
        setApi={setApi}
        opts={{ startIndex: selectedIndex, align: 'center' }}
        className="w-full lg:hidden"
      >
        <CarouselContent className="ml-0 w-full sm:-ml-4">
          {plans.map((plan) => (
            <CarouselItem
              key={plan.id}
              className={cn(
                'basis-[90%] md:basis-1/2',
                plan.highlighted ? 'max-sm:pl-3' : 'py-5',
                plan.priceOnRequest && 'pr-4 max-sm:pl-3',
              )}
            >
              {renderCard(plan)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="-mt-3 flex justify-center gap-2 lg:hidden">
        {plans.map((plan, index) => (
          <button
            key={plan.id}
            type="button"
            className={cn(
              'h-2 rounded-full bg-slate-300 transition-all duration-200 hover:bg-slate-400',
              index === visibleIndex ? 'w-6' : 'w-2',
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}
