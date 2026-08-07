import { cn } from '~/lib/utils'
import { Stagger, StaggerItem } from '~/components/motion'

export type TimelineEntry = { year: string; description: string }

/**
 * Career timeline. Horizontal rail on desktop (matching the design), vertical
 * on small screens where a horizontal rail would be unreadable.
 */
export function Timeline({
  entries,
  className,
}: {
  entries: ReadonlyArray<TimelineEntry>
  className?: string
}) {
  return (
    <Stagger as="ol" className={cn('relative grid gap-8 lg:grid-cols-5 lg:gap-6', className)}>
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/12 sm:block lg:left-0 lg:top-[5px] lg:h-px lg:w-full"
      />
      {entries.map((entry) => (
        <StaggerItem
          as="li"
          key={entry.year}
          className="relative pl-7 sm:pl-8 lg:pl-0 lg:pt-8"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-gold-400 bg-ink-900 lg:top-0"
          />
          <p className="font-display text-[17px] font-bold text-gold-400">{entry.year}</p>
          <p className="mt-1.5 max-w-[220px] text-[11.5px] leading-relaxed text-white/50">
            {entry.description}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

export type ProcessStep = { step: string; title: string; description: string }

/** Numbered horizontal process rail (Discover → Strategize → …). */
export function ProcessSteps({
  steps,
  tone = 'dark',
  showArrows = true,
  className,
}: {
  steps: ReadonlyArray<ProcessStep>
  tone?: 'light' | 'dark'
  showArrows?: boolean
  className?: string
}) {
  return (
    <Stagger
      as="ol"
      className={cn(
        'grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4',
        className,
      )}
    >
      {steps.map((item, index) => (
        <StaggerItem as="li" key={item.step} className="relative flex flex-col items-center text-center">
          {showArrows && index < steps.length - 1 ? (
            <svg
              viewBox="0 0 24 10"
              aria-hidden="true"
              className={cn(
                'absolute right-[-14px] top-[26px] hidden h-2.5 w-6 lg:block',
                tone === 'dark' ? 'text-white/25' : 'text-cream-400',
              )}
              fill="none"
            >
              <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          ) : null}

          <p
            className={cn(
              'text-[11px] font-semibold tracking-[0.16em]',
              tone === 'dark' ? 'text-white/40' : 'text-muted',
            )}
          >
            {item.step}
          </p>
          <span
            className={cn(
              'mt-3 inline-flex size-12 items-center justify-center rounded-full border',
              tone === 'dark' ? 'border-white/12 text-gold-400' : 'border-cream-400 text-gold-500',
            )}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <p
            className={cn(
              'mt-3.5 text-[13px] font-bold',
              tone === 'dark' ? 'text-white' : 'text-heading',
            )}
          >
            {item.title}
          </p>
          <p
            className={cn(
              'mt-1.5 max-w-[210px] text-[11px] leading-relaxed',
              tone === 'dark' ? 'text-white/45' : 'text-body',
            )}
          >
            {item.description}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
