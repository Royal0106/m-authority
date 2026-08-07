import { cn, stableIndex } from '~/lib/utils'

const TONES = [
  'from-[#4a3a26] to-[#1a1512]',
  'from-[#3c3227] to-[#141210]',
  'from-[#2a231a] to-[#0f0d0b]',
  'from-[#4b3b23] to-[#191512]',
]

const SIZES = {
  xs: 'size-6 text-[8px]',
  sm: 'size-7 text-[9px]',
  md: 'size-10 text-[11px]',
  lg: 'size-14 text-[14px]',
  xl: 'size-[76px] text-[20px]',
} as const

/**
 * Initials avatar with a deterministic tone.
 *
 * Accepts a `src` for real portraits; without one it draws initials so author
 * rows keep their exact footprint in this asset-free build.
 */
export function Avatar({
  name,
  src,
  size = 'md',
  className,
}: {
  name: string
  src?: string
  size?: keyof typeof SIZES
  className?: string
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className={cn('shrink-0 rounded-full object-cover', SIZES[size], className)}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-br font-semibold text-gold-200 ring-1 ring-gold-400/20',
        TONES[stableIndex(name, TONES.length)],
        SIZES[size],
        className,
      )}
    >
      {initials}
    </span>
  )
}
