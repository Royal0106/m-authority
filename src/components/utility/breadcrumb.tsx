import { AppLink } from '~/components/ui/app-link'
import { ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'

export type Crumb = {
  label: string
  to?: string
  search?: Record<string, string>
}

export function Breadcrumb({
  items,
  tone = 'dark',
  className,
}: {
  items: Array<Crumb>
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.to && !isLast ? (
                <AppLink
                  to={item.to}
                  search={item.search}
                  className={cn(
                    'transition-colors duration-300',
                    tone === 'dark'
                      ? 'text-white/55 hover:text-gold-400'
                      : 'text-muted hover:text-gold-600',
                  )}
                >
                  {item.label}
                </AppLink>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(tone === 'dark' ? 'text-white/85' : 'text-heading')}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    'size-3',
                    tone === 'dark' ? 'text-white/30' : 'text-muted/60',
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
