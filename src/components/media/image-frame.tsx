import * as React from 'react'
import { cn, stableIndex } from '~/lib/utils'

/**
 * Cinematic image slot.
 *
 * The design system is photography-led, but this build ships without binary
 * assets. `ImageFrame` renders a deterministic, on-brand gradient stand-in when
 * no `src` is supplied and a fully-optimised `<img>` the moment one is — so
 * dropping real photography in later is a one-prop change with zero layout
 * shift (the aspect ratio is reserved either way).
 */

export type ImageFrameProps = {
  /** Real image URL. When omitted a deterministic placeholder is drawn. */
  src?: string
  /** Always required for real images; placeholders are decorative by default. */
  alt?: string
  /** Seed that keeps the placeholder identical across SSR and hydration. */
  seed?: string
  /** Tailwind aspect ratio utility, e.g. `aspect-[16/9]`. */
  ratio?: string
  className?: string
  imgClassName?: string
  /** Scale the image on parent hover (group-hover). */
  zoomOnHover?: boolean
  /** Dark scrim for text laid over the image. */
  overlay?: 'none' | 'soft' | 'strong' | 'bottom'
  /** Native lazy loading; switch to `eager` for above-the-fold hero art. */
  loading?: 'lazy' | 'eager'
  priority?: boolean
  children?: React.ReactNode
}

/** Warm, filmic gradient stacks matching the brand's low-key photography. */
const PLACEHOLDER_GRADIENTS = [
  'radial-gradient(120% 90% at 26% 18%, #4a3a26 0%, #241d15 42%, #0b0a09 100%)',
  'radial-gradient(100% 100% at 78% 12%, #3c3227 0%, #1a1714 48%, #070707 100%)',
  'linear-gradient(145deg, #2a231a 0%, #14110e 46%, #080808 100%)',
  'radial-gradient(90% 120% at 12% 88%, #3f3324 0%, #1c1814 52%, #090909 100%)',
  'linear-gradient(115deg, #191919 0%, #2e2519 55%, #0a0908 100%)',
  'radial-gradient(130% 80% at 50% 0%, #4b3b23 0%, #1f1a14 46%, #060606 100%)',
]

/** Inline film grain — no network request, safe under strict CSP. */
const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")"

const OVERLAY_CLASS: Record<NonNullable<ImageFrameProps['overlay']>, string> = {
  none: '',
  soft: 'after:absolute after:inset-0 after:bg-ink-950/35',
  strong: 'after:absolute after:inset-0 after:bg-ink-950/60',
  bottom:
    'after:absolute after:inset-0 after:bg-linear-to-t after:from-ink-950 after:via-ink-950/45 after:to-transparent',
}

export function ImageFrame({
  src,
  alt = '',
  seed = 'man-authority',
  ratio = 'aspect-[16/10]',
  className,
  imgClassName,
  zoomOnHover = false,
  overlay = 'none',
  loading = 'lazy',
  priority = false,
  children,
}: ImageFrameProps) {
  const gradient = PLACEHOLDER_GRADIENTS[stableIndex(seed, PLACEHOLDER_GRADIENTS.length)]

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-ink-900',
        ratio,
        // Only emit the ::after scrim when an overlay is requested — an empty
        // pseudo-element would otherwise sit in normal flow inside the frame.
        overlay !== 'none' && [OVERLAY_CLASS[overlay], 'after:pointer-events-none after:z-10'],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={cn(
            'absolute inset-0 size-full object-cover',
            zoomOnHover &&
              'transition-transform duration-700 ease-premium group-hover:scale-105',
            imgClassName,
          )}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            zoomOnHover &&
              'transition-transform duration-700 ease-premium group-hover:scale-105',
          )}
          style={{ backgroundImage: gradient }}
        >
          <div
            className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
            style={{ backgroundImage: GRAIN_URI }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-ink-950/25" />
        </div>
      )}
      {children}
    </div>
  )
}
