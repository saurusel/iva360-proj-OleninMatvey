import { cn } from '@/shared/lib/utils'
import { CarouselNext, CarouselPrevious, useCarousel } from '@/shared/ui/carousel'

const ARROW_CLASS = 'static size-10 translate-y-0 border-0 [&_svg]:size-[22px]'

type HeroControlsProps = {
  slideCount: number
  selectedIndex: number
}

export function HeroControls({ slideCount, selectedIndex }: HeroControlsProps) {
  const { api } = useCarousel()

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <CarouselPrevious variant="ghost" className={ARROW_CLASS} />

      <div className="flex items-center gap-2">
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === selectedIndex ? 'w-6 bg-foreground' : 'w-2 bg-muted-foreground/40',
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>

      <CarouselNext variant="ghost" className={ARROW_CLASS} />
    </div>
  )
}
