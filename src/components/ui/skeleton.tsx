import { cn } from '~/lib/utils'

/** Shimmering placeholder block used while async content resolves. */
export function Skeleton({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-[2px]',
        tone === 'light' ? 'bg-cream-300' : 'bg-white/8',
        'after:absolute after:inset-0 after:-translate-x-full after:animate-[ma-shimmer_1.6s_infinite]',
        tone === 'light'
          ? 'after:bg-linear-to-r after:from-transparent after:via-white/70 after:to-transparent'
          : 'after:bg-linear-to-r after:from-transparent after:via-white/10 after:to-transparent',
        className,
      )}
    />
  )
}

/** Article card skeleton — matches `ArticleCard`'s exact rhythm. */
export function ArticleCardSkeleton({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <div className="grid gap-3.5">
      <Skeleton tone={tone} className="aspect-[4/3] w-full" />
      <Skeleton tone={tone} className="h-2.5 w-20" />
      <Skeleton tone={tone} className="h-4 w-full" />
      <Skeleton tone={tone} className="h-4 w-3/4" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton tone={tone} className="size-7 rounded-full" />
        <Skeleton tone={tone} className="h-2.5 w-32" />
      </div>
    </div>
  )
}

/** Grid of article skeletons for list/route pending states. */
export function ArticleGridSkeleton({
  count = 4,
  tone = 'light',
}: {
  count?: number
  tone?: 'light' | 'dark'
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} tone={tone} />
      ))}
    </div>
  )
}
