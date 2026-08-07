import * as React from 'react'
import { AppLink } from '~/components/ui/app-link'
import { cn } from '~/lib/utils'
import { Eyebrow } from '~/components/layout/primitives'
import { ButtonArrow } from '~/components/ui/button'
import { Reveal } from '~/components/motion'

/** Gold emphasis inside a display heading. */
export function Accent({
  children,
  italic = false,
  className,
}: {
  children: React.ReactNode
  italic?: boolean
  className?: string
}) {
  return (
    <span className={cn('text-gold-400', italic && 'italic', className)}>{children}</span>
  )
}

export type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Optional trailing action rendered opposite the title on wide screens. */
  action?: { label: string; to: string; search?: Record<string, string> }
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  /** Stack title above description (default) or place them side by side. */
  layout?: 'stack' | 'split'
  className?: string
  titleClassName?: string
  size?: 'sm' | 'md' | 'lg'
  as?: 'h2' | 'h3'
}

const TITLE_SIZE = {
  sm: 'text-display-sm',
  md: 'text-display-md',
  lg: 'text-display-lg',
} as const

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  tone = 'light',
  align = 'left',
  layout = 'stack',
  className,
  titleClassName,
  size = 'md',
  as: Heading = 'h2',
}: SectionHeaderProps) {
  const heading = (
    <Heading
      className={cn(
        TITLE_SIZE[size],
        tone === 'dark' ? 'text-white' : 'text-heading',
        titleClassName,
      )}
    >
      {title}
    </Heading>
  )

  const body = description ? (
    <p
      className={cn(
        'max-w-xl text-[13.5px] leading-relaxed',
        tone === 'dark' ? 'text-white/55' : 'text-body',
        align === 'center' && 'mx-auto',
      )}
    >
      {description}
    </p>
  ) : null

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === 'dark' ? 'text-gold-400' : 'text-gold-500'}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      {layout === 'split' ? (
        <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {heading}
          {body}
        </div>
      ) : (
        <div className={cn('grid gap-3.5', action && 'sm:flex sm:items-end sm:justify-between sm:gap-8')}>
          <div className="grid gap-3.5">
            {heading}
            {body}
          </div>
          {action ? (
            <AppLink
              to={action.to}
              search={action.search}
              className={cn(
                'group/btn inline-flex shrink-0 items-center gap-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em]',
                'transition-colors duration-300',
                tone === 'dark'
                  ? 'text-gold-400 hover:text-gold-300'
                  : 'text-gold-600 hover:text-gold-500',
              )}
            >
              {action.label}
              <ButtonArrow />
            </AppLink>
          ) : null}
        </div>
      )}
    </Reveal>
  )
}
