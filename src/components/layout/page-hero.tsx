import * as React from 'react'
import { cn } from '~/lib/utils'
import { Container } from '~/components/layout/primitives'
import { ImageFrame } from '~/components/media/image-frame'
import { Breadcrumb, type Crumb } from '~/components/utility/breadcrumb'
import { Reveal, TextReveal } from '~/components/motion'

export type PageHeroProps = {
  eyebrow: string
  /** Rendered word-by-word; pass `titleNode` instead for mixed-colour titles. */
  title?: string
  titleNode?: React.ReactNode
  description?: React.ReactNode
  breadcrumb?: Array<Crumb>
  actions?: React.ReactNode
  /** Panel pinned to the right of the hero (stat blocks, quote, form). */
  aside?: React.ReactNode
  /** Extra content below the description (trust rows, search bar, meta). */
  footer?: React.ReactNode
  seed?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const MIN_HEIGHT = {
  sm: 'min-h-[300px] md:min-h-[340px]',
  md: 'min-h-[380px] md:min-h-[440px]',
  lg: 'min-h-[440px] md:min-h-[520px]',
} as const

/**
 * Shared dark page hero.
 *
 * The photography sits full-bleed behind the content with a directional
 * vignette, so copy stays at AA contrast regardless of the image behind it.
 */
export function PageHero({
  eyebrow,
  title,
  titleNode,
  description,
  breadcrumb,
  actions,
  aside,
  footer,
  seed = 'page-hero',
  size = 'md',
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-ink-950', className)}>
      <ImageFrame
        seed={seed}
        ratio="aspect-auto"
        className="absolute inset-0 h-full"
        priority
      />
      <div aria-hidden="true" className="hero-vignette absolute inset-0 z-10" />

      <Container
        className={cn(
          'relative z-20 flex flex-col justify-center gap-8 py-12 md:py-16',
          MIN_HEIGHT[size],
          aside && 'lg:flex-row lg:items-center lg:justify-between lg:gap-16',
        )}
      >
        <div className="max-w-2xl">
          {breadcrumb?.length ? (
            <Breadcrumb items={breadcrumb} tone="dark" className="mb-6" />
          ) : null}

          <Reveal immediate direction="none" duration={0.5}>
            <p className="text-eyebrow uppercase text-gold-400">{eyebrow}</p>
          </Reveal>

          {titleNode ? (
            <Reveal immediate direction="up" delay={0.08}>
              <h1 className="mt-4 text-display-xl text-white">{titleNode}</h1>
            </Reveal>
          ) : title ? (
            <TextReveal
              text={title}
              delay={0.1}
              className="mt-4 text-display-xl text-white"
            />
          ) : null}

          {description ? (
            <Reveal immediate direction="up" delay={0.2} className="mt-5">
              <p className="max-w-xl text-[13.5px] leading-relaxed text-white/60">
                {description}
              </p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal immediate direction="up" delay={0.28} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">{actions}</div>
            </Reveal>
          ) : null}

          {footer ? (
            <Reveal immediate direction="up" delay={0.36} className="mt-9">
              {footer}
            </Reveal>
          ) : null}
        </div>

        {aside ? (
          <Reveal immediate direction="left" delay={0.3} className="w-full lg:w-auto lg:shrink-0">
            {aside}
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
