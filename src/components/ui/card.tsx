import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const cardVariants = cva('relative rounded-[3px]', {
  variants: {
    variant: {
      /** White card on a cream section. */
      light: 'border border-cream-300 bg-white',
      /** Elevated white card. */
      raised: 'border border-cream-300 bg-white shadow-soft',
      /** Panel on a dark section. */
      dark: 'border border-white/8 bg-ink-800',
      /** Hairline-only panel on a dark section. */
      outlineDark: 'border border-white/10 bg-white/[0.02]',
      /** No chrome — used when the card is purely a layout wrapper. */
      plain: '',
    },
    interactive: {
      true: cn(
        'transition-[transform,box-shadow,border-color] duration-500 ease-premium',
        'hover:-translate-y-1 hover:border-gold-300 hover:shadow-elevated',
      ),
      false: '',
    },
    padding: {
      none: '',
      sm: 'p-5',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: { variant: 'light', interactive: false, padding: 'none' },
})

export type CardProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants>

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, interactive, padding, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    />
  )
})

export { cardVariants }
