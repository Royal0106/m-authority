import { Link } from '@tanstack/react-router'
import { cn } from '~/lib/utils'

/** Gold shield mark. Drawn inline so it stays crisp at every size. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 48"
      aria-hidden="true"
      className={cn('h-9 w-auto text-gold-400', className)}
      fill="none"
    >
      <path
        d="M22 1.6 41.5 8.4v18.9c0 9.4-7.7 15.4-19.5 19.1C10.2 42.7 2.5 36.7 2.5 27.3V8.4L22 1.6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 31V17.6h2.9L22 26.2l5.6-8.6h2.9V31h-3v-8.4l-4.3 6.5h-2.4l-4.3-6.5V31h-3Z"
        fill="currentColor"
      />
      <circle cx="32.4" cy="30.4" r="1.5" fill="currentColor" />
    </svg>
  )
}

export type LogoProps = {
  /** Hide the wordmark and show only the shield. */
  markOnly?: boolean
  className?: string
  tone?: 'light' | 'dark'
}

/** Full lockup: shield + MAN AUTHORITY + tagline. Links home. */
export function Logo({ markOnly = false, className, tone = 'light' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Man Authority — home"
      className={cn('group flex shrink-0 items-center gap-2.5', className)}
    >
      <LogoMark className="h-9 w-auto transition-transform duration-500 ease-premium group-hover:scale-105" />
      {!markOnly ? (
        <span className="grid leading-none">
          <span
            className={cn(
              'font-display text-[17px] font-bold tracking-[0.02em]',
              tone === 'light' ? 'text-white' : 'text-heading',
            )}
          >
            MAN AUTHORITY
          </span>
          <span
            className={cn(
              'mt-1 text-[7.5px] font-semibold uppercase tracking-[0.24em]',
              tone === 'light' ? 'text-white/45' : 'text-muted',
            )}
          >
            Be the best version of you
          </span>
        </span>
      ) : null}
    </Link>
  )
}
