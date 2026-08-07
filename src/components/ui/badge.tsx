import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap font-sans font-semibold uppercase',
  {
    variants: {
      variant: {
        /** Category eyebrow used on article cards. */
        category: 'text-gold-600 tracking-[0.14em]',
        categoryLight: 'text-gold-400 tracking-[0.14em]',
        solid: 'rounded-[2px] bg-gold-400 px-2.5 py-1 text-ink-950 tracking-[0.12em]',
        outline:
          'rounded-[2px] border border-gold-400/50 px-2.5 py-1 text-gold-400 tracking-[0.12em]',
        muted:
          'rounded-[2px] bg-ink-900/6 px-2.5 py-1 text-body tracking-[0.1em] normal-case',
        tag: cn(
          'rounded-[2px] border border-cream-400 bg-white px-3 py-1.5 normal-case tracking-normal',
          'text-body transition-colors duration-300 hover:border-gold-400 hover:text-gold-600',
        ),
      },
      size: {
        sm: 'text-[10px]',
        md: 'text-[11px]',
      },
    },
    defaultVariants: { variant: 'category', size: 'sm' },
  },
)

export type BadgeProps = React.ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof badgeVariants>

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { badgeVariants }
