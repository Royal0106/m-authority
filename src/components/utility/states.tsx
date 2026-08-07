import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { FileQuestion, RotateCcw, SearchX, TriangleAlert } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Container, Section } from '~/components/layout/primitives'
import { ArticleGridSkeleton } from '~/components/ui/skeleton'

/* -------------------------------------------------------------------------- */
/*  Empty state                                                                 */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Try adjusting your filters or search for something else.',
  actionLabel,
  onAction,
  icon: Icon = SearchX,
  className,
}: {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-[3px] border border-dashed border-cream-400 bg-white px-6 py-16 text-center',
        className,
      )}
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold-200 bg-gold-50">
        <Icon className="size-6 text-gold-500" />
      </span>
      <h3 className="text-[19px]">{title}</h3>
      <p className="max-w-sm text-[13px] leading-relaxed text-body">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="outlineDark" size="sm" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Error state                                                                 */
/* -------------------------------------------------------------------------- */

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <Section tone="cream" spacing="xl" className={className}>
      <Container width="narrow">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-red-200 bg-red-50">
            <TriangleAlert aria-hidden="true" className="size-6 text-red-500" />
          </span>
          <h1 className="text-display-sm">{title}</h1>
          <p className="max-w-md text-[13.5px] leading-relaxed text-body">{description}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {onRetry ? (
              <Button variant="dark" size="md" onClick={onRetry}>
                <RotateCcw aria-hidden="true" className="size-4" />
                Try again
              </Button>
            ) : null}
            <Button asChild variant="outlineDark" size="md">
              <Link to="/">
                Back home
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  404                                                                         */
/* -------------------------------------------------------------------------- */

export function NotFound() {
  return (
    <Section tone="darker" spacing="xl">
      <Container width="narrow">
        <div className="flex flex-col items-center gap-5 py-10 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10">
            <FileQuestion aria-hidden="true" className="size-6 text-gold-400" />
          </span>
          <p className="text-eyebrow text-gold-400 uppercase">Error 404</p>
          <h1 className="text-display-lg text-white">Page Not Found</h1>
          <p className="max-w-md text-[13.5px] leading-relaxed text-white/55">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s
            get you back to something useful.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="md">
              <Link to="/">
                Back home
                <ButtonArrow />
              </Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link to="/blog">Browse articles</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Route pending fallback                                                      */
/* -------------------------------------------------------------------------- */

export function RouteFallback() {
  return (
    <Section tone="cream" spacing="xl" aria-busy="true" aria-live="polite">
      <Container>
        <span className="sr-only">Loading page</span>
        <ArticleGridSkeleton count={4} />
      </Container>
    </Section>
  )
}
