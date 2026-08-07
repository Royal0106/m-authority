import { AppLink } from '~/components/ui/app-link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'

/** Windowed page list with ellipses, e.g. `1 2 3 4 5 … 20`. */
function buildPages(current: number, total: number): Array<number | 'gap'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, 'gap', total]
  if (current >= total - 3) return [1, 'gap', total - 4, total - 3, total - 2, total - 1, total]
  return [1, 'gap', current - 1, current, current + 1, 'gap', total]
}

export type PaginationProps = {
  page: number
  totalPages: number
  /** Route the page links point at; search params are preserved by the caller. */
  to: string
  baseSearch?: Record<string, string | number | undefined>
  className?: string
}

const cell =
  'inline-flex size-9 items-center justify-center rounded-[2px] border text-[12px] font-medium transition-colors duration-300'

export function Pagination({
  page,
  totalPages,
  to,
  baseSearch = {},
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null
  const pages = buildPages(page, totalPages)

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-2', className)}>
      <AppLink
        to={to}
        search={{ ...baseSearch, page: Math.max(1, page - 1) }}
        aria-label="Previous page"
        aria-disabled={page === 1}
        className={cn(
          cell,
          'border-cream-400 text-body hover:border-gold-400 hover:text-gold-600',
          page === 1 && 'pointer-events-none opacity-40',
        )}
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </AppLink>

      {pages.map((item, index) =>
        item === 'gap' ? (
          <span
            key={`gap-${index}`}
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center text-[12px] text-muted"
          >
            …
          </span>
        ) : (
          <AppLink
            key={item}
            to={to}
            search={{ ...baseSearch, page: item }}
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              cell,
              item === page
                ? 'border-gold-400 bg-gold-400 text-ink-950'
                : 'border-cream-400 text-body hover:border-gold-400 hover:text-gold-600',
            )}
          >
            {item}
          </AppLink>
        ),
      )}

      <AppLink
        to={to}
        search={{ ...baseSearch, page: Math.min(totalPages, page + 1) }}
        aria-label="Next page"
        aria-disabled={page === totalPages}
        className={cn(
          cell,
          'border-cream-400 text-body hover:border-gold-400 hover:text-gold-600',
          page === totalPages && 'pointer-events-none opacity-40',
        )}
      >
        <ChevronRight aria-hidden="true" className="size-4" />
      </AppLink>
    </nav>
  )
}
