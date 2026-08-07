import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Icon, IconTile } from '~/components/ui/icon'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Avatar } from '~/components/content/avatar'
import { ImageFrame } from '~/components/media/image-frame'
import type { Testimonial } from '~/data/testimonials'

/* -------------------------------------------------------------------------- */
/*  Expertise / feature card                                                    */
/* -------------------------------------------------------------------------- */

export function ExpertiseCard({
  icon,
  title,
  description,
  tone = 'light',
  align = 'center',
  className,
}: {
  icon: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <Card
      variant={tone === 'dark' ? 'outlineDark' : 'light'}
      interactive
      padding="md"
      className={cn(
        'flex h-full flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <Icon name={icon} className="size-7 text-gold-500" />
      <h3
        className={cn(
          'font-sans text-[13px] font-bold leading-snug',
          tone === 'dark' ? 'text-white' : 'text-heading',
        )}
      >
        {title}
      </h3>
      {description ? (
        <p
          className={cn(
            'text-[11.5px] leading-relaxed',
            tone === 'dark' ? 'text-white/50' : 'text-body',
          )}
        >
          {description}
        </p>
      ) : null}
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  Statistic card                                                              */
/* -------------------------------------------------------------------------- */

export function StatCard({
  value,
  label,
  icon,
  tone = 'dark',
  align = 'center',
  className,
}: {
  value: string
  label: string
  icon?: string
  tone?: 'light' | 'dark'
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex gap-3',
        align === 'center' ? 'flex-col items-center text-center' : 'items-center',
        className,
      )}
    >
      {icon ? <Icon name={icon} className="size-6 shrink-0 text-gold-400" /> : null}
      <div className={cn(align === 'center' && 'grid gap-1')}>
        <p
          className={cn(
            'font-display text-[26px] font-bold leading-none md:text-[30px]',
            tone === 'dark' ? 'text-gold-400' : 'text-heading',
          )}
        >
          {value}
        </p>
        <p
          className={cn(
            'text-[11px] leading-snug',
            tone === 'dark' ? 'text-white/50' : 'text-muted',
          )}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

/** Compact stat row used inside dark hero panels. */
export function StatPanel({
  stats,
  className,
}: {
  stats: ReadonlyArray<{ value: string; label: string; icon?: string }>
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid divide-y divide-white/8 border border-white/10 bg-ink-950/70 backdrop-blur-sm',
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3.5 px-6 py-4">
          {stat.icon ? <Icon name={stat.icon} className="size-5 text-gold-400" /> : null}
          <div>
            <p className="font-display text-[22px] font-bold leading-none text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-white/45">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Testimonial card                                                            */
/* -------------------------------------------------------------------------- */

export function TestimonialCard({
  testimonial,
  tone = 'light',
  showQuoteMark = false,
  className,
}: {
  testimonial: Testimonial
  tone?: 'light' | 'dark'
  showQuoteMark?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col gap-4 rounded-[3px] border p-6',
        'transition-[transform,border-color] duration-500 ease-premium hover:-translate-y-1',
        tone === 'dark'
          ? 'border-white/8 bg-ink-800 hover:border-gold-400/40'
          : 'border-cream-300 bg-white hover:border-gold-300',
        className,
      )}
    >
      {showQuoteMark ? (
        <span aria-hidden="true" className="font-display text-[34px] leading-none text-gold-400">
          &ldquo;
        </span>
      ) : null}

      {testimonial.rating ? (
        <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5`}>
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} aria-hidden="true" className="size-3.5 fill-gold-400 text-gold-400" />
          ))}
        </div>
      ) : null}

      <blockquote
        className={cn(
          'flex-1 text-[12.5px] leading-relaxed',
          tone === 'dark' ? 'text-white/70' : 'text-body',
        )}
      >
        {testimonial.quote}
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar name={testimonial.name} size="md" />
        <div>
          <p
            className={cn(
              'text-[12.5px] font-semibold',
              tone === 'dark' ? 'text-white' : 'text-heading',
            )}
          >
            {testimonial.name}
          </p>
          <p className={cn('text-[11px]', tone === 'dark' ? 'text-white/40' : 'text-muted')}>
            {testimonial.role}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/*  Case study card                                                             */
/* -------------------------------------------------------------------------- */

export function CaseStudyCard({
  sector,
  headline,
  description,
  tags,
  seed,
  variant = 'overlay',
  className,
}: {
  sector: string
  headline: string
  description?: string
  tags?: ReadonlyArray<string>
  seed: string
  /** `overlay` = text on the image; `panel` = text below it. */
  variant?: 'overlay' | 'panel'
  className?: string
}) {
  if (variant === 'overlay') {
    return (
      <article className={cn('group relative overflow-hidden rounded-[3px]', className)}>
        <ImageFrame seed={seed} ratio="aspect-[4/3]" overlay="bottom" zoomOnHover />
        <div className="absolute inset-x-0 bottom-0 z-20 grid gap-2 p-5">
          <Badge variant="categoryLight">{sector}</Badge>
          <h3 className="font-display text-[17px] font-bold leading-tight text-white">
            {headline}
          </h3>
          {description ? (
            <p className="text-[11.5px] leading-relaxed text-white/60">{description}</p>
          ) : null}
        </div>
      </article>
    )
  }

  return (
    <Card variant="dark" interactive padding="md" className={cn('grid h-full gap-3', className)}>
      <Badge variant="categoryLight">{sector}</Badge>
      <h3 className="font-sans text-[13.5px] font-bold leading-snug text-white">{headline}</h3>
      {description ? (
        <p className="text-[11.5px] leading-relaxed text-white/50">{description}</p>
      ) : null}
      {tags?.length ? (
        <ul className="mt-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[2px] border border-white/12 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-white/55"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  Author card                                                                 */
/* -------------------------------------------------------------------------- */

export function AuthorCard({
  name,
  role,
  bio,
  links,
  className,
}: {
  name: string
  role?: string
  bio?: string
  links?: React.ReactNode
  className?: string
}) {
  return (
    <Card
      variant="light"
      padding="lg"
      className={cn('flex flex-col items-start gap-5 sm:flex-row', className)}
    >
      <Avatar name={name} size="xl" />
      <div className="grid gap-2">
        <p className="text-eyebrow uppercase text-muted">Written by</p>
        <h3 className="font-display text-[19px] font-bold text-heading">{name}</h3>
        {role && !bio ? <p className="text-[12.5px] text-muted">{role}</p> : null}
        {bio ? <p className="max-w-2xl text-[12.5px] leading-relaxed text-body">{bio}</p> : null}
        {links ? <div className="mt-1 flex items-center gap-3">{links}</div> : null}
      </div>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*  Problem card (AI For Business)                                              */
/* -------------------------------------------------------------------------- */

export function ProblemCard({
  title,
  description,
  seed,
  className,
}: {
  title: string
  description: string
  seed: string
  className?: string
}) {
  return (
    <article className={cn('group relative overflow-hidden rounded-[3px]', className)}>
      <ImageFrame seed={seed} ratio="aspect-[3/4]" overlay="bottom" zoomOnHover />
      <div className="absolute inset-x-0 bottom-0 z-20 grid gap-1.5 p-4">
        <h3 className="font-sans text-[12.5px] font-bold leading-snug text-white">{title}</h3>
        <p className="text-[10.5px] leading-relaxed text-white/55">{description}</p>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/*  Icon feature row                                                            */
/* -------------------------------------------------------------------------- */

export function FeatureRow({
  icon,
  title,
  description,
  tone = 'light',
  className,
}: {
  icon: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div className={cn('flex items-start gap-4', className)}>
      <IconTile name={icon} tone={tone === 'dark' ? 'dark' : 'light'} size="sm" />
      <div className="grid gap-1">
        <p
          className={cn(
            'text-[12.5px] font-bold',
            tone === 'dark' ? 'text-white' : 'text-heading',
          )}
        >
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              'text-[11.5px] leading-relaxed',
              tone === 'dark' ? 'text-white/50' : 'text-body',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
