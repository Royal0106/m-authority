import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

/* -------------------------------------------------------------------------- */
/*  Container                                                                   */
/* -------------------------------------------------------------------------- */

const containerVariants = cva('mx-auto w-full px-5 sm:px-6 lg:px-8', {
  variants: {
    width: {
      site: 'max-w-(--container-site)',
      narrow: 'max-w-5xl',
      prose: 'max-w-(--container-prose)',
      full: 'max-w-none',
    },
  },
  defaultVariants: { width: 'site' },
})

export type ContainerProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof containerVariants> & { as?: React.ElementType }

export function Container({ className, width, as: Tag = 'div', ...props }: ContainerProps) {
  return <Tag className={cn(containerVariants({ width }), className)} {...props} />
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                     */
/* -------------------------------------------------------------------------- */

const sectionVariants = cva('relative', {
  variants: {
    tone: {
      cream: 'bg-cream-200 text-body',
      white: 'bg-white text-body',
      dark: 'bg-ink-900 text-white/70',
      darker: 'bg-ink-950 text-white/70',
      panel: 'bg-ink-850 text-white/70',
      none: '',
    },
    spacing: {
      none: '',
      sm: 'py-12 md:py-14',
      md: 'py-14 md:py-18 lg:py-20',
      lg: 'py-16 md:py-20 lg:py-24',
      xl: 'py-20 md:py-24 lg:py-28',
    },
  },
  defaultVariants: { tone: 'cream', spacing: 'lg' },
})

export type SectionProps = React.ComponentPropsWithoutRef<'section'> &
  VariantProps<typeof sectionVariants>

export function Section({ className, tone, spacing, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ tone, spacing }), className)} {...props} />
}

/* -------------------------------------------------------------------------- */
/*  Grid                                                                        */
/* -------------------------------------------------------------------------- */

const gridVariants = cva('grid', {
  variants: {
    cols: {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      7: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7',
    },
    gap: {
      xs: 'gap-3',
      sm: 'gap-4',
      md: 'gap-5',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: { cols: 3, gap: 'lg' },
})

export type GridProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof gridVariants> & { as?: React.ElementType }

export function Grid({ className, cols, gap, as: Tag = 'div', ...props }: GridProps) {
  return <Tag className={cn(gridVariants({ cols, gap }), className)} {...props} />
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow                                                                     */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  as: Tag = 'p',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return (
    <Tag className={cn('text-eyebrow text-gold-500 uppercase', className)}>{children}</Tag>
  )
}
